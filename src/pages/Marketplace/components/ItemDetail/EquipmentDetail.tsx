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
  HeroDetailRace,
  HeroDetailWrapper,
  HeroIntroductionName,
  HeroIntroductionOwner,
  EquipmentIntroductionRace,
  HeroIntroductionPanel,
  HeroName,
  EquipmentIntroductionStats,
  EquipmentIntroductionStatsItem,
} from "./styled";

const EquipmentDetail: React.FC = () => {
  const [equipmentDetail, setEquipmentDetail] = useState<any>(null);
  let history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tokenId = +(query.get("tokenId") || "");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await sendRequestByGraphQl({
        query: GraphQueryUrls.equipmentDetail,
        variables: { tokenId },
      });
      const fetchedEquipmentDetail =
        fetchedData?.data?.getNFTEquipmentDetail || null;
      if (fetchedEquipmentDetail) {
        setEquipmentDetail(fetchedEquipmentDetail);
      }
    };
    fetchData();
  }, []);

  console.log(equipmentDetail);

  const statsRenderOrder = ["attribute1", "attribute2"];

  const affixesRenderOrder = [
    "subAttribute1",
    "subAttribute2",
    "subAttribute3",
    "subAttribute4",
  ];

  const allRaces = ["demon", "dwarf", "elf", "orc", "human", "naga", "angel"];
  let equipmentRaces = equipmentDetail?.race || "";
  equipmentRaces =
    typeof equipmentRaces === "string"
      ? equipmentRaces === "ALL"
        ? allRaces
        : [equipmentRaces]
      : equipmentRaces;

  return (
    <Wrapper>
      <BackButton onClick={() => history.goBack()}>
        <div>
          <i className="fa-solid fa-angle-left" />
          Back
        </div>
      </BackButton>
      {!!equipmentDetail && (
        <HeroDetailWrapper>
          <HeroDetailImage backImage="/assets/images/inventory/bg_basic.png">
            <HeroDetailImageContent>
              <HeroDetailRace>
                <div>{equipmentDetail.rarity}</div>
                <div>Recyclable</div>
              </HeroDetailRace>
              <HeroName>
                <img
                  src={`/assets/images/igo/${equipmentDetail.type.toLowerCase()}.png`}
                  alt="hero-type-img"
                />
                <span>{equipmentDetail.name}</span>
              </HeroName>
            </HeroDetailImageContent>
            <HeroDetailMainImage>
              <img
                style={{ width: 250, height: 250 }}
                src={equipmentDetail.image}
                alt="hero-img"
              />
            </HeroDetailMainImage>
          </HeroDetailImage>
          <HeroDetailIntroduction>
            <div>
              <HeroIntroductionPanel>
                <HeroCommonIntroduction>
                  <h2>Introduction</h2>
                  <div>
                    <HeroIntroductionName>
                      {equipmentDetail.name}
                    </HeroIntroductionName>
                    <HeroIntroductionOwner>
                      <span>Owner</span>
                      <span>{equipmentDetail.owner.address}</span>
                    </HeroIntroductionOwner>
                    <EquipmentIntroductionRace>
                      <div>Race</div>
                      <div>
                        {equipmentRaces.map(
                          (raceItem: string, raceIndex: number) => {
                            return (
                              <img
                                key={raceIndex}
                                src={`/assets/images/igo/race-${raceItem.toLowerCase()}.png`}
                                alt=""
                              />
                            );
                          }
                        )}
                      </div>
                    </EquipmentIntroductionRace>
                    <EquipmentIntroductionStats>
                      <p>Stats</p>
                      <div>
                        {statsRenderOrder.map((item, key) => {
                          return equipmentDetail[item] ? (
                            <EquipmentIntroductionStatsItem key={key}>
                              <span>
                                <img
                                  src="/assets/images/stats/arrow_attribute.png"
                                  alt=""
                                />
                              </span>
                              {equipmentDetail[item]}
                            </EquipmentIntroductionStatsItem>
                          ) : null;
                        })}
                      </div>
                    </EquipmentIntroductionStats>
                    <EquipmentIntroductionStats>
                      <p>Affixes</p>
                      <div>
                        {affixesRenderOrder.map((item, key) => {
                          return equipmentDetail[item] ? (
                            <EquipmentIntroductionStatsItem key={key}>
                              <span>
                                <img
                                  src="/assets/images/stats/arrow_attribute.png"
                                  alt=""
                                />
                              </span>
                              {equipmentDetail[item]}
                            </EquipmentIntroductionStatsItem>
                          ) : null;
                        })}
                      </div>
                    </EquipmentIntroductionStats>
                  </div>
                </HeroCommonIntroduction>
              </HeroIntroductionPanel>
            </div>
          </HeroDetailIntroduction>
        </HeroDetailWrapper>
      )}
    </Wrapper>
  );
};

export default EquipmentDetail;
