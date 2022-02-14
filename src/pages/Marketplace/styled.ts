import styled from 'styled-components';

export const BannerImage = styled.div`
  background: url('/assets/images/main/banner.png');
  background-size: 100% 95vh;
  width: 100%;
  height: 95vh;
`

export const BannerFeet = styled.div`
  background: url('/assets/images/main/banner-feet.png');
  background-size: 100% 100%;
  width: 100%;
  margin-top: -4%;
  position: relative;
  height: 164px;
`

export const BannerFeetLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: block;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: #478911 1px 0 0, #478911 0.540302px 0.841471px 0, #478911 -0.416147px 0.909297px 0, #478911 -0.989992px 0.14112px 0, #478911 -0.653644px -0.756802px 0, #478911 0.283662px -0.958924px 0, #478911 0.96017px -0.279415px 0;
  color: #fff;
  font-size: 2.8rem;
  text-align: center;
  cursor: pointer;
`

export const Contents = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 576px) {
    max-width: 720px;
  }
  @media (min-width: 768px) {
    max-width: 960px;
  }
  @media (min-width: 992px) {
    max-width: 1120px;
  }
  @media (min-width: 1200px) {
    max-width: 1367px;
  }
`

export const ContentsContainer = styled.div`
  display: flex;
  padding-top: 20px;
`

export const FilterWrapper = styled.div`
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 25%;
  }
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 25%;
  }
`
