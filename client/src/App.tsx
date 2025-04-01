import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main.tsx';
import ScreenDisplaySetting from './pages/transition-time/ScreenDisplaySetting.tsx';
import ScreenImageUpload from './pages/image-upload/ScreenImageUpload.tsx';
import './App.css';
import Layout from './pages/layout..tsx';
import useQueryDisplayTime from './query/useQueryDisplayTime.ts';
import { Suspense } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Main />} />
          <Route path='slide' element={<ScreenImageUpload />} />
          <Route path='display' element={<ScreenDisplaySetting />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
