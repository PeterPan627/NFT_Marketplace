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

  // const heroPriceSymbol: string = hero.currency?.symbol || "";
  const heroPriceSymbol: string = "BNB";
  const symbolPrice = tokenPrice[heroPriceSymbol] || {};

  const handleClickHeroItem = (tokenId: number) => {
    history.push(`/marketplace/hero?tokenId=${tokenId}`);
  };

  return (
    <Item
      // onClick={() => handleClickHeroItem(hero.tokenId)}
      onClick={() => handleClickHeroItem(hero.elpisHeroId)}
    >
      <div>
        <ItemImage image="/assets/images/inventory/mapmini_angle.png">
          <ItemImageTopPart>
            <div>
              <img
                // src={`/assets/images/igo/race-${hero.heroRace.toLowerCase()}.png`}
                src="/assets/images/igo/race-human.png"
                alt="hero-type-img"
              />
            </div>
            <div>
              <span>{`Recruit: ${hero.recruitedCount || 0}/7`}</span>
            </div>
          </ItemImageTopPart>
          <ItemImageContent>
            {/* <img src={hero.image || ""} alt="hero-main" /> */}
            <img
              src={`/assets/images/heroes/${hero.elpisHeroName.toLowerCase()}.png`}
              alt="hero-main"
            />
            <div>
              {/* <span>{hero.name}</span> */}
              <span>{hero.elpisHeroName}</span>
            </div>
          </ItemImageContent>
        </ItemImage>
        <ItemDescription>
          <div>
            {/* <div>{hero.rarity}</div> */}
            <div>Common</div>
            <div>Genesis</div>
          </div>
          <div>
            <div>
              {/* <CurrencyImage coin={hero.currency.slug} />
              {hero.price / 10 ** hero.currency.decimal} */}
              <CurrencyImage coin="binance-coin" />
              {hero.heroPrice / 10 ** 18}
              <span>{heroPriceSymbol}</span>
            </div>
            {/* <div>{`~ $${
              (hero.price / 10 ** hero.currency.decimal) *
              (symbolPrice.price || 1)
            }`}</div> */}
            <div>{`~ $${
              (hero.heroPrice / 10 ** 18) * (symbolPrice.price || 1)
            }`}</div>
          </div>
        </ItemDescription>
      </div>
    </Item>
  );
};

export default HeroItem;
