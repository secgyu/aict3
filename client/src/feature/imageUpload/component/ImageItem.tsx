import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../css/ImageItem.css';
import { ReactComponent as CloseIcon } from '../../../icons/fluent--dismiss-24-filled.svg';
import { Images } from '../../common/types.ts';

interface Props {
  image: Images;
  onDelete: (image: string) => void;
}

const ImageItem = ({ image, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.filename });

  console.log('image:', image);
  return (
    <div
      className='card-item'
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
    >
      <div className='card-bg'>
        <button className='close-btn' onClick={() => onDelete(image.filename)}>
          <CloseIcon className='close-icon close-icon1' />
          <CloseIcon className='close-icon close-icon2' />
        </button>
        <img
          className='card-img'
          src={image?.path}
          {...listeners} // 드래그 리스너를 이미지에만 적용
        />
      </div>
      <div className='card-idx'>{image.id}</div>
    </div>
  );
};

export default ImageItem;
