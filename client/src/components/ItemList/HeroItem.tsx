import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { TokenPriceContext } from "../../pages/HomePage";

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

const HeroItem: React.FC<Props> = ({ hero }) => {
  let history = useHistory();
  const tokenPrice = useContext(TokenPriceContext);

  const heroPriceSymbol: string = hero.currency?.symbol || "";
  const symbolPrice = tokenPrice[heroPriceSymbol] || {};

  const handleClickHeroItem = (tokenId: number) => {
    history.push(`/marketplace/hero?tokenId=${tokenId}`);
  };

  return (
    <Item onClick={() => handleClickHeroItem(hero.tokenId)}>
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
              <span>{heroPriceSymbol}</span>
            </div>
            <div>{`~ $${
              (hero.price / 10 ** hero.currency.decimal) *
              (symbolPrice.price || 1)
            }`}</div>
          </div>
        </ItemDescription>
      </div>
    </Item>
  );
};

export default HeroItem;
