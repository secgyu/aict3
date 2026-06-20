import FileUpload from '../../feature/imageUpload/component/FileUpload.tsx';

const ScreenImageUpload = () => {
  return (
    <div className='m-5 px-5'>
      <h2 className='my-5 flex text-[38px] text-theme-darkbrown'>
        슬라이드 선택
      </h2>
      <FileUpload />
    </div>
  );
};

export default ScreenImageUpload;
