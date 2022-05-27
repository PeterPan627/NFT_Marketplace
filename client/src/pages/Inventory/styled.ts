import styled from "styled-components";

export const InventoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  color: #fdfdfd;
  font-size: 1.4rem;
`;

export const InventoryNavigation = styled.div`
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-top: 0;
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: 25%;
  }
  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: 25%;
  }
`;

export const InventoryNavigationHeader = styled.div`
  width: 100%;
  height: 46px;
  background: #1f2734;
  color: #dfd5c7;
  border-radius: 5px 5px 0 0;
  padding: 14px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
`;

export const InventoryNavigationItem = styled.div<{ checked?: boolean }>`
  margin-bottom: 2px;
  border-radius: 5px;
  width: 100%;
  margin-top: 7px;
  position: relative;
  & > div {
    background: ${({ checked }) => (checked ? "#2e2e2e" : "#1f2734")};
    color: #dfd5c7;
    height: 67px;
    padding: 15px 14px;
  }
`;

export const InventoryNavigationTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;

export const InventoryNavigationSubTitle = styled.div`
  font-size: 12px;
  line-height: 14px;
  width: 60%;
`;

export const InventoryNavigationItemIcon = styled.i`
  width: 39px;
  height: 40px;
  position: absolute;
  right: 40px;
  top: 12px;
  color: #dfd5c7;
  text-align: center;
  padding-top: 4px;
  font-weight: 900;
`;

export const InventoryNavigationItemArrowIcon = styled.i`
  position: absolute;
  color: #dfd5c7;
  right: 10px;
  top: 25px;
  cursor: pointer;
  font-weight: 900;
`;

export const InventoryContent = styled.div`
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: 75%;
  }
  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: 75%;
  }
`;

export const InventoryContentContainer = styled.div`
  padding-left: 1rem;
`;

export const InventoryContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & > span {
    font-weight: 700;
    font-size: 19px;
    line-height: 29px;
    text-align: center;
    color: #dfd5c7;
  }
`;
