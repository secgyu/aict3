import { useRef } from 'react';
import useQueryDisplayTime from '../../query/useQueryDisplayTime.ts';
import useQueryTransitionSetting from '../../query/useQueryTransitionSetting.ts';

const ScreenDisplaySetting = () => {
  const isFirstRender = useRef(true);
  const { data: delaySec, isFetching } = useQueryDisplayTime();
  const {
    mutate,
    isPending: isPendingMutate,
    variables,
  } = useQueryTransitionSetting();

  // mutation : POST, PUT // query : GET
  // 낙관적 렌더링
  // 내가 23으로 mutation을 날렸으면, 실제론 22 더라도 23을보여줄거야.
  //
  // 23 POST 요청날리고 있는상태 (variables)  :  isPending (Mutate)
  // 23 성공해서 다시 query를 날리는상태 (variables) : isFetching (query)

  const sec = isPendingMutate || isFetching ? variables : delaySec?.count;

  const handleCount = (type: 'increase' | 'decrease') => {
    mutate(type === 'increase' ? sec + 1 : Math.max(sec - 1, 5));
  };

  const counterButtonClass =
    'flex h-10 w-10 items-center justify-center rounded-lg border-0 bg-theme-orange text-xl text-white';
  const presetButtonClass =
    'flex h-10 w-20 items-center justify-end gap-[10px] rounded-lg border-0 bg-theme-lightgray text-xl text-black';

  return (
    <div className='flex flex-col items-start gap-[10px] px-5'>
      <h1 className='px-5 text-[38px]'>초 설정</h1>
      <div className='flex flex-col items-start gap-5 px-5'>
        <div className='flex items-center gap-[10px] py-[14px]'>
          <button
            className={counterButtonClass}
            onClick={() => handleCount('decrease')}
          >
            -
          </button>
          <div className='flex h-10 w-20 items-center justify-center rounded-lg bg-[#f0f0f0] text-base'>
            <h2>{sec}초</h2>
          </div>
          <button
            className={counterButtonClass}
            onClick={() => handleCount('increase')}
          >
            +
          </button>
        </div>

        <div className='flex items-center gap-[10px] py-[14px]'>
          <button className={presetButtonClass} onClick={() => mutate(15)}>
            <img src='/image/clock.png' alt='clock' width='20px' />
            15
          </button>
          <button className={presetButtonClass} onClick={() => mutate(30)}>
            <img src='/image/clock.png' alt='clock' width='20px' />
            30
          </button>
          <button className={presetButtonClass} onClick={() => mutate(60)}>
            <img src='/image/clock.png' alt='clock' width='20px' />
            60
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreenDisplaySetting;
