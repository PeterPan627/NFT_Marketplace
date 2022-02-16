import React from "react";

import {
  Item,
  ItemImage,
  ItemImageTopPart,
  ItemImageContent,
  ItemDescription,
  CurrencyImage,
} from "./styled";

interface Props {
  hero: any;
}

const ItemList: React.FC<Props> = ({ hero }) => {
  return (
    <Item>
      <div>
        <ItemImage image="/assets/images/inventory/mapmini_angle.png">
          <ItemImageTopPart>
            <div>
              <img
                src={`/assets/images/igo/race-${hero.heroRace.toLowerCase()}.png`}
                alt="hero-type-img"
              />
            </div>
            <div>
              <span>{`Recruit: ${hero.recruitedCount}/7`}</span>
            </div>
          </ItemImageTopPart>
          <ItemImageContent>
            <img src={hero.image || ""} alt="hero-main" />
            <div>
              <span>{hero.name}</span>
            </div>
          </ItemImageContent>
        </ItemImage>
        <ItemDescription>
          <div>
            <div>{hero.rarity}</div>
            <div>Genesis</div>
          </div>
          <div>
            <div>
              <CurrencyImage coin={hero.currency.slug} />
              {hero.price / 10 ** hero.currency.decimal}
              <span>{hero.currency.symbol}</span>
            </div>
            <div>{`~ $${hero.price / 10 ** hero.currency.decimal}`}</div>
          </div>
        </ItemDescription>
      </div>
    </Item>
  );
};

export default ItemList;
