import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Images } from '../../common/types.ts';
import '../css/ImageItem.css';
import { ReactComponent as CloseIcon } from '../../../icons/fluent--dismiss-24-filled.svg';
import useQueryFileDelete from '../../../query/useQueryFileDelete.ts';
import styled from 'styled-components';

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
    <SortableItemStyleWrapper>
      <button
        className='close-btn'
        type='button'
        onClick={() => handleDelete()}
      >
        <CloseIcon className='close-icon close-icon1' />
        <CloseIcon className='close-icon close-icon2' />
      </button>
      <div
        className='dnd-item'
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className='card-bg'>
          <img
            src={slideImage.path}
            alt={slideImage.filename}
            className='file-image'
            // onClick={() => handleDelete()}
          />
        </div>
      </div>
    </SortableItemStyleWrapper>
  );
};

export default SortableItem;

const SortableItemStyleWrapper = styled.div`
  position: relative;

  .card-bg {
    margin: 10px;
    background-color: #fff;
    border: 0px solid #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    outline: 0 solid var(--theme-lightyellow-color);
  }
  .dnd-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--theme-lightyellow-color);
    padding: 10px;
    border-radius: 8px;
    cursor: grab;
  }
  .close-btn {
    position: absolute;
    background: none;
    border: none;
    top: 1px;
    right: 1px;
    margin: 0;
    padding: 0;
    z-index: 99;
    pointer-events: all;
    cursor: pointer;
  }
`;
