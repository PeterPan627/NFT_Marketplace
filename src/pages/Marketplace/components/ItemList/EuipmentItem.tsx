import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { TokenPriceContext } from "../../../HomePage";

import {
  Item,
  ItemImage,
  ItemImageContent,
  ItemDescription,
  ItemImageTopPart,
  CurrencyImage,
} from "./styled";

interface Props {
  equipment: any;
}

const EquipmentItem: React.FC<Props> = ({ equipment }) => {
  let history = useHistory();
  const tokenPrice = useContext(TokenPriceContext);

  const equipmentPriceSymbol: string = equipment.currency?.symbol || "";
  const symbolPrice = tokenPrice[equipmentPriceSymbol] || {};

  const handleClickHeroItem = (tokenId: number) => {
    history.push(`/equipment?tokenId=${tokenId}`);
  };

  return (
    <Item onClick={() => handleClickHeroItem(equipment.tokenId)}>
      <div>
        <ItemImage image="/assets/images/inventory/bg_basic.png" isEquipment>
          {equipment.race && equipment.race !== "ALL" && (
            <ItemImageTopPart isEquipment>
              <div>
                <img
                  src={`/assets/images/igo/race-${equipment.race.toLowerCase()}.png`}
                  alt="hero-type-img"
                />
              </div>
            </ItemImageTopPart>
          )}
          <ItemImageContent>
            <img src={equipment.image || ""} alt="hero-main" />
            <div>
              <span>{equipment.name}</span>
            </div>
          </ItemImageContent>
        </ItemImage>
        <ItemDescription>
          <div>
            <div>{equipment.rarity}</div>
          </div>
          <div>
            <div>
              <CurrencyImage coin={equipment.currency.slug} />
              {equipment.price / 10 ** equipment.currency.decimal}
              <span>{equipmentPriceSymbol}</span>
            </div>
            <div>{`~ $${
              (equipment.price / 10 ** equipment.currency.decimal) *
              (symbolPrice.price || 1)
            }`}</div>
          </div>
        </ItemDescription>
      </div>
    </Item>
  );
};

export default EquipmentItem;
