import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Images } from '../../common/types.ts';
import '../css/ImageItem.css';
import CloseIcon from '../../../icons/fluent--dismiss-24-filled.svg?react';
import useQueryFileDelete from '../../../query/useQueryFileDelete.ts';

type SortableItemProps = {
  slideImage: Images;
};

const SortableItem: React.FC<SortableItemProps> = ({ slideImage }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: slideImage.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { mutate } = useQueryFileDelete();

  const handleDelete = () => {
    mutate(slideImage.filename);
  };

  return (
    <div className='relative'>
      <button
        className='absolute right-px top-px z-99 m-0 cursor-pointer border-none bg-transparent p-0'
        type='button'
        onClick={() => handleDelete()}
      >
        <CloseIcon className='close-icon close-icon1' />
        <CloseIcon className='close-icon close-icon2' />
      </button>
      <div
        className='flex cursor-grab items-center justify-center rounded-lg bg-theme-lightyellow p-[10px]'
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className='card-bg m-[10px] rounded-lg border-0 bg-white shadow-[0_0px_3px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.05)] transition-all'>
          <img
            src={slideImage.path}
            alt={slideImage.filename}
            className='h-[100px] w-[100px] rounded-lg object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default SortableItem;
