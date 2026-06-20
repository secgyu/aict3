import { useState, useEffect } from 'react';
import InfoIcon from '../../../icons/fluent--info-20-regular.svg?react';
import { useQueryFiles } from '../../../query/useQueryFiles.ts';
import useQueryUpdateSort from '../../../query/useQueryUpdateSort.ts';
import ImageUploadButton from './ImageUploadButton.tsx';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import SortableItem from './SortItem.tsx';
import { Images } from '../../common/types.ts';

const FileUpload = () => {
  const [fileList, setFileList] = useState<Images[]>([]);
  const { data: slideImages, isLoading, error } = useQueryFiles();

  const { mutate } = useQueryUpdateSort();
  useEffect(() => {
    if (slideImages) {
      setFileList(slideImages);
    }
  }, [slideImages]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active?.id || !over?.id || active.id === over.id) return;

    const oldIndex = fileList.findIndex((file) => file.id === active.id);
    const newIndex = fileList.findIndex((file) => file.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const updatedFileList: Images[] = arrayMove(fileList, oldIndex, newIndex);
    setFileList(updatedFileList);
    requestImageSort(updatedFileList);
  };

  const requestImageSort = (newFileList: Images[]) => {
    mutate(newFileList, {
      onSuccess: (data) => {
        console.log('Updated file order successfully:', data);
        setFileList(newFileList);
      },
      onError: (error) => {
        console.error('Failed to update file order:', error);
      },
    });
  };
  console.log(fileList);
  return (
    <div>
      <ImageUploadButton />

      <div className='m-[0.8rem] flex items-center justify-center gap-[0.4rem] text-theme-orange'>
        <InfoIcon className='h-[1.3rem] w-[1.3rem]' />
        <p className='m-0 text-[1.1rem]'>
          이미지를 드래그해서 순서를 조정할 수 있어요
        </p>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        {fileList.length > 0 && (
          <SortableContext items={fileList.map((file) => file.id)}>
            <div className='flex flex-wrap justify-center gap-4 rounded-[10px] bg-white p-4'>
              {fileList.map((file) => (
                <SortableItem key={file.id} slideImage={file} />
              ))}
            </div>
          </SortableContext>
        )}
      </DndContext>
    </div>
  );
};

export default FileUpload;
