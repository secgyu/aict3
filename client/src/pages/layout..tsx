import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '../layout/TopBar.tsx';
import SettingSidebar from '../layout/SettingSidebar.tsx';

const Layout = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/'; // 현재 경로가 "/"인지 확인

  return (
    <LayoutWrapper>
      <TopBar />
      <Content>
        {!isRootPath && (
          <SidebarWrapper>
            <SettingSidebar />
          </SidebarWrapper>
        )}
        <MainContent>
          <Outlet />
        </MainContent>
      </Content>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  height: calc(100vh - 50px); // TopBar 높이 제외
`;

const SidebarWrapper = styled.div`
  width: 250px; // Sidebar 너비
  height: 100%;
  background-color: #f0f0f0; // 배경색 (선택 사항)
  position: relative;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow: auto;
  padding: 20px;
`;
