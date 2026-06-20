import UploadIcon from '../../../icons/fluent--arrow-upload-20-filled.svg?react';
import { ChangeEvent } from 'react';
import useQueryFileUpload from '../../../query/useQueryFileUpload.ts';
import styled from 'styled-components';

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
    <UploadButtonWrapper>
      <form encType='multipart/form-data'>
        <label htmlFor='file' className='upload-button'>
          <UploadIcon />
          <span>이미지 업로드</span>
        </label>
        <input
          type='file'
          id='file'
          name='file'
          className='upload'
          onChange={handleImageUpload}
        />
      </form>
    </UploadButtonWrapper>
  );
};

export default ImageUploadButton;

const UploadButtonWrapper = styled.div`
  border-radius: 1rem;
  background-color: var(--theme-orange-color);
  color: white;

  .upload-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    cursor: pointer;
    font-size: 1.6rem;
    gap: 1rem;
  }
  .upload {
    display: none;
  }
`;
