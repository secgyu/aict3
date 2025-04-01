import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryFiles } from '../query/useQueryFiles.ts';
import Slider from '../components/Slider.tsx';

const Main = () => {
  const { data: slides } = useQueryFiles();

  return (
    <MainWrapper>
      <Slider slides={slides} />
      <Outlet />
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;

  .slide img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;
