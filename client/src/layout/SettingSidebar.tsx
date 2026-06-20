import { NavLink } from 'react-router-dom';
import TransitionIcon from '../icons/fluent--slide-settings-24-regular.svg?react';
import SlidesIcon from '../icons/fluent--slide-multiple-24-regular.svg?react';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-[1.8rem] text-[1.4rem] text-theme-darkbrown no-underline transition-colors duration-300',
    isActive ? 'bg-theme-lightyellow text-theme-orange' : '',
  ].join(' ');

export default function SettingSidebar() {
  return (
    <div className='flex h-screen w-[250px] flex-col bg-white p-4 shadow-[2px_0_5px_rgba(0,0,0,0.1)]'>
      <nav className='w-full'>
        <ul className='m-0 list-none p-0'>
          <li className='my-4 p-0'>
            <NavLink to='slide' className={navLinkClass}>
              <div className='flex items-center justify-start p-[1.2rem]'>
                <SlidesIcon className='h-16 w-16' />
                <div className='pl-4 text-center font-bold'>슬라이드</div>
              </div>
            </NavLink>
          </li>
          <li className='my-4 p-0'>
            <NavLink to='display' className={navLinkClass}>
              <div className='flex items-center justify-start p-[1.2rem]'>
                <TransitionIcon className='h-16 w-16' />
                <div className='pl-4 text-center font-bold'>전환 설정</div>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
