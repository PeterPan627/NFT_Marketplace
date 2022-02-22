import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BackButton = styled.div`
  cursor: pointer;
  margin-top: 30px;
  color: #dfdfdf;
  font-size: 1.4rem;
  & > div {
    display: flex;
    align-items: center;
    & > i {
      font-size: 23px;
      padding-right: 10px;
      font-weight: 900;
    }
  }
`;

export const HeroDetailWrapper = styled.div`
  margin: 5% 0;
  display: flex;
  flex-wrap: wrap;
  color: #dfdfdf;
  font-size: 1.4rem;
  width: 100%;
`;

export const HeroDetailImage = styled.div<{ backImage: string }>`
  position: relative;
  padding: 50px 0;
  background: ${({ backImage }) => `url(${backImage})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  border-radius: 5px;
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 100%;
  }
  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
`;

export const HeroDetailImageContent = styled.div`
  margin-top: 2rem;
  color: #fff;
  border-radius: 5px;
  font-size: 1.4rem;
`;

export const HeroDetailRace = styled.div`
  position: absolute;
  top: 60px;
  left: 10px;
  color: #fff;
  & > div {
    padding: 0.1rem 0.6rem;
    border-radius: 5px;
    color: #fff;
  }
  &>div: first-of-type {
    background: #71b1fd;
    text-transform: capitalize;
  }
  &>div: last-of-type {
    background: #dc0505;
    margin-top: 5px;
    width: fit-content;
  }
`;

export const HeroName = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 8px;
  position: absolute;
  top: 10px;
  left: 10px;
  & > img {
    width: 22px;
    height: 22px;
  }
  & > span {
    font-weight: 700;
  }
`;

export const HeroDetailMainImage = styled.div`
  width: 100%;
  text-align: center;
  & > img {
    width: 80%;
    vertical-align: middle;
  }
`;

export const HeroDetailIntroduction = styled.div`
  position: relative;
  background: #2e2e2e;
  padding-left: 0;
  padding-right: 0;

  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 100%;
  }
  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: 58.33333333%;
  }

  & > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 100%;
  }
`;

export const HeroIntroductionPanel = styled.div`
  padding-left: 25px;
  width: 90%;
  word-break: break-all;
  color: #dfdfdf;
  font-size: 1.4rem;
`;

export const HeroCommonIntroduction = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  height: 500px;
  & > h2 {
    text-align: center;
    padding: 2rem 0 1rem;
    font-weight: 700;
    font-size: 3rem;
    color: #fff;
    @media (min-width: 960px) {
      padding: 1rem 0;
    }
    @media (min-width: 1120px) {
      padding: 1rem 0;
    }
    @media (min-width: 1280px) {
      padding: 1rem 0;
    }
    @media (min-width: 1395px) {
      padding: 2rem 0;
    }
  }
`;

export const HeroIntroductionName = styled.div`
  font-weight: 700;
  font-size: 2rem;
  line-height: 22px;
  color: #dfd5c7;
`;

export const HeroIntroductionRecruitCount = styled.div`
  margin-top: 8px;
  color: #dfd5c7;
`;

export const HeroIntroductionOwner = styled.div`
  color: #dfd5c7;
`;

export const EquipmentIntroductionRace = styled.div`
  margin-top: 30px;
  font-weight: 700;
  font-size: 18px;
  & > div {
    font-weight: 700;
    font-size: 18px;
    & > img {
      width: 41px;
      height: 41px;
    }
  }
`;

export const HeroIntroductionStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  width: 100%;
  & > p {
    color: #dfd5c7;
    font-size: 1.8rem;
    font-weight: 700;
    padding-right: 0.75rem;
    padding-left: 0;
    padding-top: 10px;
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
  }
  & > div {
    border-radius: 8px;
    width: 380px;
    margin: 0 auto;
    height: 120px;
    padding: 0 1rem;
    display: inline-flex;
    flex-shrink: 0;
    max-width: 100%;
  }
`;

export const HeroIntroductionStatsItem = styled.div`
  flex: 0 0 auto;
  width: 33.33333333%;
  & > div {
    margin: 5px 20px;
    height: 80px;
    background: #141414;
    border: 1px solid #98b5c8;
    border-radius: 3px;
    width: 70%;
    position: relative;
    & > div {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 20%;
      left: 33%;
      & > img {
        width: 30px;
        margin-right: 5px;
      }
      & > p {
        position: absolute;
        /* bottom: 0;
        left: 39%; */
        width: 100%;
        text-align: center;
        color: #fff;
        margin-top: 0;
        margin-bottom: 1rem;
      }
    }
  }
`;

export const EquipmentIntroductionStats = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-top: 22px;
  &>p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  &>div {
    background: #3c3c3c;
    padding: 12px 20px 20px;
    font-size: 14px;
  }
}
`;

export const EquipmentIntroductionStatsItem = styled.div`
  margin-top: 8px;
  & > span {
    margin-right: 5px;
  }
`;

export const HeroDetailOperationButtons = styled.div`
  background: #09101a;
  padding: 22% 0 0;
  height: 100%;
  flex: 0 0 auto;
  width: 8.33333333%;
  color: #dfdfdf;
  font-size: 1.4rem;
  & > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
`;

export const HeroDetailOperationButtonItem = styled.div<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#575757" : "#2e2e2e")};
  border-left: none;
  box-sizing: border-box;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  position: relative;
  height: 80px;
  width: 50px;
  color: #fff;
  position: relative;
  & > div {
    position: absolute;
    & > i {
      font-weight: 900;
      font-size: 2em;
    }
    & > img {
      width: 39px;
      height: 39px;
      vertical-align: middle;
    }
  }
`;

export const HeroIntroductionSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  width: 100%;
  @media (min-width: 960px) {
    margin-top: -20px;
  }
  & > p {
    color: #dfd5c7;
    font-size: 1.8rem;
    font-weight: 700;
    padding-right: 0.75rem;
    padding-left: 0;
    padding-top: 10px;
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
  }
  & > div {
    display: inline-flex;
    margin: 0 0 30px;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }
`;

export const HeroIntroductionSKillItem = styled.div<{ totalCount: number }>`
  flex: 0 0 auto;
  width: ${({ totalCount }) => `calc(100% / ${totalCount})`};
  text-align: center;
  cursor: pointer;
  & > img {
    width: 75px;
    border-radius: 10px;
    border: 3px solid #9d2af8;
    vertical-align: middle;
  }
`;

export const HeroIntroductionProperties = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  height: 500px;
  & > h2 {
    text-align: center;
    padding: 3rem 0;
    font-weight: 700;
    font-size: 3rem;
    color: #fff;
  }
  & > div {
    padding: 0 2rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0;
    margin-left: -0.75rem;
    margin-right: -0.75rem;
  }
`;

export const HeroPropertyItem = styled.div`
  max-width: 100%;
  width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
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
    width: 33.33333333%;
  }
  & > div {
    background: #141414;
    border-radius: 5px;
    width: 100%;
    margin: 0 auto 1rem;
    font-weight: 400;
    font-size: 1.6rem;
    padding: 0 5px;
    display: flex;
    text-align: center;
    border: 1px solid #98b5c8;
    height: 100px;
    align-items: center;
    word-break: break-word;
  }
`;

export const HeroPropertyItemImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 5px;
  width: 35%;
  flex-direction: column;
  & > div {
    display: flex;
    & > img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const HeroPropertyItemDetail = styled.div<{ color?: any }>`
  text-align: left;
  margin-left: 5px;
  &>div: first-of-type {
    font-weight: 700;
    color: ${({ color }) => color || "#b9b9b9"};
  }
  &>div: last-of-type {
    color: #c4c4c4;
    font-size: 9px;
  }
`;

export const ItemOperationButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.4);
  align-items: center;
  height: 70px;
  padding-right: 15px;
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const ItemPriceContainer = styled.div`
  font-weight: 700;
  display: flow-root;
  margin: 1rem 0;
  & > span {
    float: right;
    text-align: right;
    font-size: 1.8rem;
    line-height: 1;
    & > div {
      display: flex;
      align-items: center;
      & > img {
        width: 25px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    & > small {
      font-weight: 400;
      font-size: 1.3rem;
    }
  }
`;

export const ItemOperationButton = styled.div`
  margin-left: 10px;
`;

export const OperationButton = styled.div`
  border-image-source: url("/assets/images/main/btn-green.png");
  border-image-slice: 5 5 5 5 fill;
  border-image-width: 5px 5px 5px 5px;
  border-image-outset: 0 0 0 0;
  border-image-repeat: stretch stretch;
  transition: all 0.1s ease-in;
  font-weight: 700;
  color: #fff;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 20px;
  &:hover {
    transform: translateY(1px);
  }
`;

export const ConnectWalletButton = styled.div`
  margin-left: 10px;
  & > ${OperationButton} {
    margin: 0 auto;
    background: #1f2734;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 6px 50px;
  }
`;

export const OwnerButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OrderButton = styled(OperationButton)`
  margin-left: 5px;
`;

export const CancelOrderButton = styled(OperationButton)`
  margin-left: 5px;
  border-image-source: url("/assets/images/main/btn-danger.png");
`;

export const EditPriceButton = styled(OperationButton)`
  margin-left: 5px;
`;

export const BuyNowButton = styled(ConnectWalletButton)``;
