import styled from 'styled-components';
 
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  top: 0;
  transition: top 0.5s;
  background: url('/assets/images/main/header-bar.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 1360px 70px;
  max-width: 1360px;
  margin: 0 auto;
  height: 70px;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  width: 100vw;
  padding: 0.6rem 7.5rem 1.8rem; 
  z-index: 1000; 
`;

export const Logo = styled.div`
  background: url('/assets/images/main/logo.png');
  /* background-size: 90px 42px; */
  background-size: 9rem 4.2rem;
  /* width: 90px;
  height: 42px; */
  width: 9rem;
  height: 4.2rem;
`;

export const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
 
export const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
`;
 
export const MenuItem = styled.div`
  color: #dfd5c7;
  /* font-size: 16px; */
  font-size: 1.3rem;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-transform: uppercase;
  padding-right: 2.2rem;
  padding-left: 2.2rem;
  /* padding-right: 32px;
  padding-left: 32px; */
  transition: text-shadow 0.2s linear;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 24px #ffe788;
    color: #fff;
  }
`;

export const ConnectWalletButton = styled.button`
  background-color: unset;
  border-image-source: url('/assets/images/main/btn-orange.png');
  border-image-slice: 5 5 5 5 fill;
  border-image-width: 5px 5px 5px 5px;
  border-image-outset: 0 0 0 0;
  border-image-repeat: stretch stretch;
  transition: all 0.1s ease-in;
  padding: 5px 10px;
  cursor: pointer;
  color: #d16717;
  font-weight: 900;
  font-size: 1.3rem;
  &:hover {
    transform: translateY(1px);
  }
`
