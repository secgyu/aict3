import { Link } from 'react-router-dom';
import NoFileIcon from '../icons/fluent--document-split-hint-off-20-regular.svg?react';

const NoData = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-theme-lightyellow text-theme-darkbrown'>
      <NoFileIcon className='m-4 h-24 w-24' />
      <h3 className='m-0 text-[1.8rem]'>슬라이드가 비어있어요</h3>
      <div className='flex items-center gap-1'>
        <Link className='inline-block text-theme-orange' to='./slide'>
          설정
        </Link>
        <p>페이지에서 이미지를 추가해 보세요</p>
      </div>
    </div>
  );
};

export default NoData;
