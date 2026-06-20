import { Link } from 'react-router-dom';
import NoFileIcon from '../icons/fluent--document-split-hint-off-20-regular.svg?react';
import styled from 'styled-components';

const NoData = () => {
  return (
    <StyledWrapper>
      <NoFileIcon className='no-file-icon' />
      <h3 className='no-slide-title'>슬라이드가 비어있어요</h3>
      <div className='no-slide-desc'>
        <Link className='no-slide-link' to='./slide'>
          설정
        </Link>
        <p>페이지에서 이미지를 추가해 보세요</p>
      </div>
    </StyledWrapper>
  );
};

export default NoData;

const StyledWrapper = styled.div`
  color: var(--theme-darkbrown-color);
  background-color: var(--theme-lightyellow-color);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .no-file-icon {
    width: 6rem !important;
    height: 6rem !important;
    margin: 1rem !important;
  }

  .no-slide-link {
    color: var(--theme-orange-color);
    display: inline-block;
  }

  .no-slide-desc {
    display: flex;
    align-items: center;
    gap: 4px; /* 설정과 설명 간의 간격 */
  }

  .no-slide-title {
    margin: 0;
    font-size: 1.8rem;
  }
`;
