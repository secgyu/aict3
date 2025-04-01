import FileUpload from '../../feature/imageUpload/component/FileUpload.tsx';
import styled from 'styled-components';

const ScreenImageUpload = () => {
  return (
    <ScreenStyleWrapper>
      <h2 className='settingTitle'>슬라이드 선택</h2>
      <FileUpload />
    </ScreenStyleWrapper>
  );
};

export default ScreenImageUpload;

const ScreenStyleWrapper = styled.div`
  margin: 20px;
  padding: 0 20px;

  .settingTitle {
    display: flex;
    margin: 20px 0;
    font-size: 38px;
    color: var(--theme-darkbrown-color);
  }
`;
