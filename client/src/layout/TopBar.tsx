import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div className='h-[60px] w-full bg-theme-gold p-2'>
      <img
        src='/image/logo.png'
        alt='logo'
        className='h-auto w-[150px]'
        onClick={() => navigate('/')}
      />
    </div>
  );
}
