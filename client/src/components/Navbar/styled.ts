import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  top: 0;
  transition: top 0.5s;
  background: url("/assets/images/main/header-bar.png");
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
  background: url("/assets/images/main/logo.png");
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
`;

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
  border-image-source: url("/assets/images/main/btn-orange.png");
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
`;

export const AccountInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.3rem;
  position: relative;
`;

export const AccountContainer = styled.div`
  position: relative;
  margin: 0 2px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  & > span {
    background-color: rgba(40, 22, 17, 0.8);
    color: #dfd5c7;
    padding: 5px 10px 5px 15px;
    font-weight: 700;
    @media (min-width: 992px) {
      display: block !important;
    }
  }
  & > div {
    margin-right: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(40, 22, 17, 0.8);
    border: 3px solid #8b6046;
    color: #dfd5c7;
    font-size: 2rem;
    & > i {
      font-weight: 900;
    }
  }
`;

export const AccountDetail = styled.div<{ visible: boolean }>`
  width: 280px;
  left: auto;
  right: 0;
  transform: unset;
  display: block;
  background-color: #32231f;
  transition: all 0.3s;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  border-radius: 10px;
  position: absolute;
  z-index: 1000;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  top: 100%;
  margin-top: 0.125rem;
`;

export const AccountDetailTitle = styled.div`
  font-size: 1.2rem;
  color: #6d625b;
  display: block;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  white-space: nowrap;
`;

export const AccountDetailAddress = styled.a`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  font-size: 1.3rem;
  color: #dfd5c7;
  display: block;
  padding: 0.25rem 1rem;
  clear: both;
  font-weight: 400;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  & > i {
    font-size: 20px;
    margin-left: 10px;
    font-weight: 400;
  }
`;

export const AccountDetailBalanceWrapper = styled.div`
  padding: 0.25rem 1rem;
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
  & > div {
    flex: 0 0 auto;
    width: 50%;
    max-width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    & > div {
      border-radius: 10px;
      background: #32231f;
      box-shadow: inset 20px 20px 60px #2b1e1a, inset -20px -20px 60px #3a2824;
      color: #dfd5c7;
      font-size: 1.3rem;
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      & > img {
        width: 25px;
        height: 25px;
        margin-bottom: 5px;
      }
      & > span {
        color: #dfd5c7;
        font-size: 1.3rem;
      }
    }
  }
`;

export const AccountDetailActionButton = styled.a`
  font-size: 1.3rem;
  color: #dfd5c7;
  display: block;
  width: 100%;
  padding: 0.25rem 1rem;
  clear: both;
  font-weight: 400;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  &:hover {
    background: none;
    text-shadow: 0 0 1.5rem #ffe788;
  }
`;

export const AccountDetailDivider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(155, 107, 94, 0.7);
  height: 1px;
  margin: 0.5rem 0;
  overflow: hidden;
  background-color: currentColor;
  opacity: 0.25;
`;
