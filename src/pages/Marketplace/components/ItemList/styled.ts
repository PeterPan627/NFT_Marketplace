import styled from "styled-components";

export const ItemListWrapper = styled.div`
  padding-left: 1rem;
  color: #fdfdfd;
  font-size: 1.4rem;
`;

export const ItemListHeader = styled.div`
  padding: 7px 0;
  & > span {
    font-size: 2rem;
  }
  & > div {
    float: right;
    position: relative;
    display: flex;
    & > select {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.5;
      width: 15rem;
      background-color: #09111b;
      border: 1px solid #f4e8e8;
      box-sizing: border-box;
      border-radius: 4px;
      color: #fdfdfd;
      padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    }
  }
`;

export const CurrencyToggle = styled.div`
  background-color: #1f2734;
  margin-right: 10px;
  display: flex;
  border-radius: 5px;
  overflow: hidden;
`;

export const CurrencyItem = styled.div<{ image: string; active: boolean }>`
  --image-size: 30px;
  cursor: pointer;
  width: calc(var(--image-size) + 10px);
  height: calc(var(--image-size) + 10px);
  background: ${({ image }) => `url(${image})`};
  background-size: var(--image-size) var(--image-size);
  background-repeat: no-repeat;
  background-position: 5px 5px;
  ${({ active }) => active && `background-color: rgba(255, 255, 255, 0.5);`}
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export const ItemListBody = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  color: #fdfdfd;
  font-size: 1.4rem;
`;

export const ItemNotFound = styled.div`
  max-width: 400px;
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  & > div {
    background: url("/assets/images/main/icon_404.png");
    background-size: 100% 100%;
    width: 385px;
    height: 276px;
  }
  & > span {
    font-size: 2rem;
    color: #566e87;
  }
`;

// HeroItem

export const Item = styled.div`
  max-width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-top: 0;
  cursor: pointer;

  & > div {
    background: #1f2734;
    border-radius: 11px;
    margin-bottom: 2rem;
    display: inline-block;
    font-weight: 400;
    font-size: 1.2rem;
    width: 100%;
  }

  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 50%;
  }
  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: 25%;
  }
`;

export const ItemImage = styled.div<{ image: string }>`
  background-image: ${({ image }) => `url(${image})`};
  border-radius: 5px;
  padding-bottom: 10px;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ItemImageTopPart = styled.div`
  font-weight: 400;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  & > div:first-of-type {
    float: left;
    padding: 0 5px;
    border-radius: 4px;
    & > img {
      width: 35px;
      height: 35px;
    }
  }
  & > div:last-of-type {
    float: right;
    color: #1f2734;
  }
`;

export const ItemImageContent = styled.div`
  width: 100%;
  & > img {
    width: 100%;
  }
  & > div {
    text-align: center;
    font-size: 11px;
    line-height: 16px;
    color: #dfd5c7;
    & > span {
      background: rgba(31, 39, 52, 0.7);
      border-radius: 2px;
      padding: 5px 10px;
    }
  }
`;

export const ItemDescription = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div:first-of-type {
    font-size: 9px;
    & > div {
      border-radius: 5px;
      padding: 0.1rem 0.6rem;
      width: fit-content;
      font-size: 1.1rem;
      text-transform: capitalize;
    }
    & > div:first-of-type {
      background: #b9b9b9;
    }
    &>div: last-of-type {
      background: #dc0505;
      margin-top: 5px;
    }
  }
  & > div:last-of-type {
    text-align: right;
    line-height: 1;
    & > div:first-of-type {
      font-size: 1.375rem;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      & > span {
        text-transform: uppercase;
      }
    }
    & > div:last-of-type {
      font-weight: 300;
      font-size: 1.1rem;
    }
  }
`;

export const CurrencyImage = styled.div<{ coin: string }>`
  background: ${({ coin }) => `url("/assets/images/currency/${coin}.png")`};
  width: 12px;
  height: 12px;
  background-size: 12px 12px;
  margin-right: 3px;
`;

export const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

export const PaginationButton = styled.button`
  font-size: 1.6rem;
  padding: 2px 10px;
  margin-top: -5px;
  display: inline;
  display: initial;
  background-color: #5c636a;
  border: 1px solid #5c636a;
  cursor: pointer;
  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.65;
  }
`;

export const PaginationValue = styled.span`
  margin: 0 1.2%;
  text-align: center;
  & > input {
    background: #414141;
    color: #fdfdfd;
    padding: 2px 3px;
    width: 50px;
    border-radius: 0.25rem;
    border: none;
    height: 30px;
    margin: 1px 10px 0;
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    &[type="number"] {
      -moz-appearance: textfield;
    }
  }
`;
