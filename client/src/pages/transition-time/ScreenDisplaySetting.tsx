import { useRef, useEffect, useState, useCallback } from 'react';
import useQueryDisplayTime from '../../query/useQueryDisplayTime.ts';
import useQueryTransitionSetting from '../../query/useQueryTransitionSetting.ts';
import styled from 'styled-components';

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

  return (
    <Container>
      <Title>초 설정</Title>
      <SettingWrapper>
        <Row>
          <Button onClick={() => handleCount('decrease')}>-</Button>
          <Box>
            <h2>{sec}초</h2>
          </Box>
          {/* {(isPendingMutate || isFetching) && (
            <span style={{ opacity: '0.5' }}>{variables}초</span>
          )} */}
          <Button onClick={() => handleCount('increase')}>+</Button>
        </Row>

        <Row>
          <SecondaryButton onClick={() => mutate(15)}>
            <img src='/image/clock.png' alt='clock' width='20px' />
            15
          </SecondaryButton>
          <SecondaryButton onClick={() => mutate(30)}>
            <img src='/image/clock.png' alt='clock' width='20px' />
            30
          </SecondaryButton>
          <SecondaryButton onClick={() => mutate(60)}>
            <img src='/image/clock.png' alt='clock' width='20px' />
            60
          </SecondaryButton>
        </Row>
      </SettingWrapper>
    </Container>
  );
};

export default ScreenDisplaySetting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  align-items: flex-start;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 38px;
  padding: 0 20px;
`;

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 0 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 0;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #fc670c;
  color: white;
  font-size: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #f0f0f0;
  font-size: 16px;
`;

const SecondaryButton = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 8px;
  background-color: #dfdfdf;
  color: black;
  font-size: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
`;
