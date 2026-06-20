import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '../layout/TopBar.tsx';
import SettingSidebar from '../layout/SettingSidebar.tsx';

const Layout = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/';

  return (
    <div className='relative m-0 flex h-screen w-screen flex-col overflow-hidden p-0'>
      <TopBar />
      <div className='flex h-[calc(100vh-50px)]'>
        {!isRootPath && (
          <div className='relative h-full w-[250px] bg-[#f0f0f0] shadow-[2px_0_5px_rgba(0,0,0,0.1)]'>
            <SettingSidebar />
          </div>
        )}
        <div className='h-full grow overflow-auto p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
