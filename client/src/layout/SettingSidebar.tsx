import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import TransitionIcon from '../icons/fluent--slide-settings-24-regular.svg?react';
import SlidesIcon from '../icons/fluent--slide-multiple-24-regular.svg?react';

export default function SettingSidebar() {
  return (
    <SidebarContainer>
      <Nav>
        <NavList>
          <NavItem>
            <StyledNavLink to='slide'>
              <NavContent>
                <StyledSlidesIcon />
                <NavText>슬라이드</NavText>
              </NavContent>
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to='display'>
              <NavContent>
                <StyledTransitionIcon />
                <NavText>전환 설정</NavText>
              </NavContent>
            </StyledNavLink>
          </NavItem>
        </NavList>
      </Nav>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  width: 100%;
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 1rem 0;
  padding: 0;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--theme-darkbrown-color);
  text-decoration: none;
  font-size: 1.4rem;
  display: block;
  border-radius: 1.8rem;
  transition: background-color 0.3s ease-in-out;

  &.active {
    color: var(--theme-orange-color);
    background-color: var(--theme-lightyellow-color);
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.2rem;
`;

const NavText = styled.div`
  font-weight: bold;
  text-align: center;
  padding-left: 1rem;
`;

const StyledSlidesIcon = styled(SlidesIcon)`
  width: 4rem;
  height: 4rem;
`;

const StyledTransitionIcon = styled(TransitionIcon)`
  width: 4rem;
  height: 4rem;
`;
