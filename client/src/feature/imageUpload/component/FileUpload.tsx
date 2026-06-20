import { useState, useEffect } from 'react';
import InfoIcon from '../../../icons/fluent--info-20-regular.svg?react';
import { useQueryFiles } from '../../../query/useQueryFiles.ts';
import useQueryUpdateSort from '../../../query/useQueryUpdateSort.ts';
import ImageUploadButton from './ImageUploadButton.tsx';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import SortableItem from './SortItem.tsx';
import { Images } from '../../common/types.ts';
import styled from 'styled-components';

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
    <FileUploadStyleWrapper>
      <ImageUploadButton />

      <div className='desc-container'>
        <InfoIcon className='info-icon' />
        <p className='desc'>이미지를 드래그해서 순서를 조정할 수 있어요</p>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        {fileList.length > 0 && (
          <SortableContext items={fileList.map((file) => file.id)}>
            <div className='dnd-container'>
              {fileList.map((file) => (
                <SortableItem key={file.id} slideImage={file} />
              ))}
            </div>
          </SortableContext>
        )}
      </DndContext>
    </FileUploadStyleWrapper>
  );
};

export default FileUpload;

const FileUploadStyleWrapper = styled.div`
  .desc-container {
    color: var(--theme-orange-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.8rem;
    gap: 0.4rem;
  }

  .desc {
    font-size: 1.1rem;
    margin: 0;
  }

  .info-icon {
    width: 1.3rem;
    height: 1.3rem;
  }

  .dnd-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 10px;
  }

  .file-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
