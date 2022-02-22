import styled from "styled-components";
import Modal from "react-modal";

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  min-height: calc(100% - 1rem);
  transition: transform 0.3s ease-out;
  transform: none;
  font-size: 1.3rem;

  @media (min-width: 576px) {
    max-width: 500px;
    margin: 1.75rem auto;
    min-height: calc(100% - 3.5rem);
  }
`;

export const ModalContent = styled.div`
  color: #fff;
  background: #1f2734;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
`;

export const ModalHeader = styled.div`
  position: relative;
  justify-content: center;
  border-bottom: 1px solid rgba(222, 226, 230, 0.2);
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: 1rem;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
  & > div {
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    font-size: calc(1.275rem + 0.3vw);
    @media (min-width: 1200px) {
      font-size: 1.5rem;
    }
  }
  & > button {
    position: absolute;
    right: 20px;
    margin: 0;
    padding: 0;
    cursor: pointer;
    filter: invert(1) grayscale(100%) brightness(200%);
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    color: #000;
    background: transparent url() 50%/1em auto no-repeat;
    border: none;
  }
`;

export const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  & > div {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0;
    margin-right: -0.75rem;
    margin-left: -0.75rem;
  }
`;

export const WalletItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-top: 0;
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 50%;
  }
  & > button {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    padding: 16px 24px;
    height: auto;
    text-transform: none;
    -webkit-appearance: button;
    & > img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
    }
    & > span {
      font-weight: 700;
    }
  }
`;

export const ModalFooter = styled.div`
  justify-content: center;
  border-top: 1px solid rgba(222, 226, 230, 0.2);
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  padding: 0.75rem;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    & > p {
      margin-top: 0;
      margin-bottom: 1rem;
    }
    & > button {
      background-color: unset;
      border-image-source: url("/assets/images/main/btn-green.png");
      cursor: pointer;
      font-weight: 700;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-image-slice: 5 5 5 5 fill;
      border-image-width: 5px 5px 5px 5px;
      border-image-outset: 0 0 0 0;
      border-image-repeat: stretch stretch;
      transition: all 0.1s ease-in;
      color: #fff;
      border-color: #0d6efd;
      line-height: 1.5;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      user-select: none;
      border-radius: 0.25rem;
      padding: 0.375rem 0.75rem;
      &:hover {
        transform: translateY(1px);
      }
    }
  }
`;
