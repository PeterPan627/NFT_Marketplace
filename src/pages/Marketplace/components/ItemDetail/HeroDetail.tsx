import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import Tooltip from "rc-tooltip";
import { GraphQueryUrls } from "../../../../Constants";
import { sendRequestByGraphQl } from "../../../../utils/fetch";
import {
  Wrapper,
  BackButton,
  HeroCommonIntroduction,
  HeroDetailImage,
  HeroDetailImageContent,
  HeroDetailIntroduction,
  HeroDetailMainImage,
  HeroDetailOperationButtonItem,
  HeroDetailOperationButtons,
  HeroDetailRace,
  HeroDetailWrapper,
  HeroIntroductionName,
  HeroIntroductionOwner,
  HeroIntroductionPanel,
  HeroIntroductionProperties,
  HeroIntroductionRecruitCount,
  HeroIntroductionSKillItem,
  HeroIntroductionSkills,
  HeroIntroductionStats,
  HeroIntroductionStatsItem,
  HeroName,
  HeroPropertyItem,
  HeroPropertyItemDetail,
  HeroPropertyItemImage,
} from "./styled";

const HeroDetail: React.FC = () => {
  const [heroDetail, setHeroDetail] = useState<any>(null);
  const [introductionType, setIntroductionType] =
    useState<string>("introduction");
  let history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tokenId = +(query.get("tokenId") || "");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await sendRequestByGraphQl({
        query: GraphQueryUrls.heroDetail,
        variables: { tokenId },
      });
      const fetchedHeroDetail = fetchedData?.data?.userHeroDetail || null;
      if (fetchedHeroDetail) {
        setHeroDetail(fetchedHeroDetail);
      }
    };
    fetchData();
  }, []);

  const handleChangeIntroductionType = (value: string) => {
    setIntroductionType(value);
  };

  const skillsRenderOrder = [
    "normalSkill",
    "passiveOneSkill",
    "passiveTwoSkill",
    "ultimateOneSkill",
    "ultimateTwoSkill",
  ];
  const statsRenderOrder = ["strength", "vitality", "agility"];

  const skillsCount =
    skillsRenderOrder
      .map((skillKey) => (heroDetail || {})[skillKey])
      .filter((item) => !!item).length || 1;

  const heroPropertyItemFontColor: { [key: string]: string } = {
    dark: "#784890",
    forest: "#228b22",
    earth: "#806043",
  };

  return (
    <Wrapper>
      <BackButton onClick={() => history.goBack()}>
        <div>
          <i className="fa-solid fa-angle-left" />
          Back
        </div>
      </BackButton>
      {!!heroDetail && (
        <HeroDetailWrapper>
          <HeroDetailImage backImage="/assets/images/inventory/mapmini_angle.png">
            <HeroDetailImageContent>
              <HeroDetailRace>
                <div>{heroDetail.rarity.replace("_", " ")}</div>
                <div>Genesis</div>
              </HeroDetailRace>
              <HeroName>
                <img
                  src={`/assets/images/igo/race-${heroDetail.heroRace.toLowerCase()}.png`}
                  alt="hero-type-img"
                />
                <span>{heroDetail.name}</span>
              </HeroName>
            </HeroDetailImageContent>
            <HeroDetailMainImage>
              <img src={heroDetail.image} alt="hero-img" />
            </HeroDetailMainImage>
          </HeroDetailImage>
          <HeroDetailIntroduction>
            <div>
              <HeroIntroductionPanel>
                {introductionType === "introduction" && (
                  <HeroCommonIntroduction>
                    <h2>Introduction</h2>
                    <div>
                      <HeroIntroductionName>
                        {heroDetail.name}
                      </HeroIntroductionName>
                      <HeroIntroductionRecruitCount>
                        <span>Recruit Count:</span>
                        <span>{`${heroDetail.recruitedCount}/7`}</span>
                      </HeroIntroductionRecruitCount>
                      <HeroIntroductionOwner>
                        <span>Owner</span>
                        <span>{heroDetail.owner.address}</span>
                      </HeroIntroductionOwner>
                      <HeroIntroductionStats>
                        <p>Stats</p>
                        <div>
                          {statsRenderOrder.map((item, key) => {
                            return (
                              <HeroIntroductionStatsItem key={key}>
                                <div>
                                  <div>
                                    <img
                                      src={`/assets/images/stats/icon_${item}.png`}
                                      alt=""
                                    />
                                    <p>{heroDetail[item]}</p>
                                  </div>
                                </div>
                              </HeroIntroductionStatsItem>
                            );
                          })}
                        </div>
                      </HeroIntroductionStats>
                      <HeroIntroductionSkills>
                        <p>Skill</p>
                        <div>
                          {skillsRenderOrder.map((item, key) => {
                            return !!heroDetail[item] ? (
                              <HeroIntroductionSKillItem
                                totalCount={skillsCount}
                                key={key}
                              >
                                <img
                                  src="/assets/images/skill/BasicDragonBreath.png"
                                  alt=""
                                />
                              </HeroIntroductionSKillItem>
                            ) : null;
                          })}
                        </div>
                      </HeroIntroductionSkills>
                    </div>
                  </HeroCommonIntroduction>
                )}
                {introductionType === "properties" && (
                  <HeroIntroductionProperties>
                    <h2>Properties</h2>
                    <div>
                      {heroDetail.bodyParts.map(
                        (bodyPart: any, index: number) => {
                          const bodyPartElement: string =
                            bodyPart.element?.toLowerCase() || "";
                          const bodyPartType =
                            bodyPart.type?.toLowerCase() || "";

                          return (
                            <HeroPropertyItem key={index}>
                              <div>
                                <HeroPropertyItemImage>
                                  <div>
                                    <img
                                      src={`/assets/images/stats/icon_${bodyPartType}${
                                        bodyPart.element
                                          ? `_${bodyPartElement}`
                                          : ""
                                      }.png`}
                                      alt=""
                                    />
                                  </div>
                                </HeroPropertyItemImage>
                                <HeroPropertyItemDetail
                                  color={
                                    heroPropertyItemFontColor[bodyPartElement]
                                  }
                                >
                                  <div>
                                    <span>{bodyPart.name}</span>
                                  </div>
                                  <div>{`${bodyPart.percentage.toFixed(
                                    2
                                  )}% have this trait`}</div>
                                </HeroPropertyItemDetail>
                              </div>
                            </HeroPropertyItem>
                          );
                        }
                      )}
                    </div>
                  </HeroIntroductionProperties>
                )}
              </HeroIntroductionPanel>
              <HeroDetailOperationButtons>
                <div>
                  <HeroDetailOperationButtonItem
                    onClick={() => handleChangeIntroductionType("introduction")}
                    active={introductionType === "introduction"}
                  >
                    <div style={{ top: "35%", left: "40%" }}>
                      <i className="fa-solid fa-info fa-2x" />
                    </div>
                  </HeroDetailOperationButtonItem>
                  <HeroDetailOperationButtonItem
                    onClick={() => handleChangeIntroductionType("properties")}
                    active={introductionType === "properties"}
                  >
                    <div style={{ top: "20%", left: "15%" }}>
                      <img
                        src="/assets/images/stats/icon_bodypart.png"
                        alt=""
                      />
                    </div>
                  </HeroDetailOperationButtonItem>
                </div>
              </HeroDetailOperationButtons>
            </div>
          </HeroDetailIntroduction>
        </HeroDetailWrapper>
      )}
    </Wrapper>
  );
};

export default HeroDetail;
