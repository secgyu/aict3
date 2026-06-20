import { Outlet } from 'react-router-dom';
import { useQueryFiles } from '../query/useQueryFiles.ts';
import Slider from '../components/Slider.tsx';

const Main = () => {
  const { data: slides } = useQueryFiles();

  return (
    <div className='relative m-0 h-screen w-screen overflow-hidden p-0'>
      <Slider slides={slides} />
      <Outlet />
    </div>
  );
};

export default Main;
