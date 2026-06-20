import UploadIcon from '../../../icons/fluent--arrow-upload-20-filled.svg?react';
import { ChangeEvent } from 'react';
import useQueryFileUpload from '../../../query/useQueryFileUpload.ts';

const ImageUploadButton = () => {
  const { mutate } = useQueryFileUpload();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      mutate(selectedFile);
    } else {
      alert('이미지 파일을 선택해주세요.');
    }
  };

  return (
    <div className='rounded-2xl bg-theme-orange text-white'>
      <form encType='multipart/form-data'>
        <label
          htmlFor='file'
          className='flex cursor-pointer items-center justify-center gap-4 py-4 text-[1.6rem]'
        >
          <UploadIcon />
          <span>이미지 업로드</span>
        </label>
        <input
          type='file'
          id='file'
          name='file'
          className='hidden'
          onChange={handleImageUpload}
        />
      </form>
    </div>
  );
};

export default ImageUploadButton;
