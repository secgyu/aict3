import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <StyledTopBar>
      <img
        src='/image/logo.png'
        alt='logo'
        style={{ width: '150px', height: 'auto' }}
        onClick={() => navigate('/')}
      />
    </StyledTopBar>
  );
}

const StyledTopBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffad0c;
  padding: 8px;
`;
