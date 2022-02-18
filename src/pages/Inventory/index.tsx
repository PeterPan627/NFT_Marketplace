import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import ItemList from "../../components/ItemList";
import SubNavbar from "../../components/SubNav";

import { GraphQueryUrls } from "../../Constants";
import { makeGraphQlVariables, sendRequestByGraphQl } from "../../utils/fetch";

import {
  InventoryContent,
  InventoryContentContainer,
  InventoryContentHeader,
  InventoryNavigation,
  InventoryNavigationHeader,
  InventoryNavigationItem,
  InventoryNavigationItemArrowIcon,
  InventoryNavigationItemIcon,
  InventoryNavigationSubTitle,
  InventoryNavigationTitle,
  InventoryWrapper,
} from "./styled";

const INVENTORY_NAVIGATION = [
  {
    title: "MyNFTs",
    subTitle: "Listing All your NFTs",
    icon: "fa-house-chimney",
    baseLink: "/inventory/mynfts",
    link: "/inventory/mynfts/hero",
  },
  {
    title: "Marketplace",
    subTitle: "Your order in marketplace",
    icon: "fa-store",
    baseLink: "/inventory/marketplace",
    link: "/inventory/marketplace/hero",
  },
  {
    title: "Activity",
    subTitle: "History Buy/Sell NFTs",
    icon: "fa-clock-rotate-left",
    baseLink: "/inventory/activity",
    link: "/inventory/activity/hero",
  },
];

const Inventory: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState(INVENTORY_NAVIGATION[0].baseLink);
  const [filterCondition, setFilterCondition] = useState<any>({
    recruitCounter: { start: 0, end: 7 },
    pagination: { page: 1, size: 20, total: 1 },
  });
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    console.log(location.pathname);
    // const fetchData = async () => {
    //   const fetchedData = await sendRequestByGraphQl({
    //     query: GraphQueryUrls.heroListByOwner,
    //     variables: makeGraphQlVariables(filterCondition),
    //   });
    //   console.log(fetchedData);
    // };
    // fetchData();
  }, [location, filterCondition]);

  return (
    <InventoryWrapper>
      <InventoryNavigation>
        <div>
          <InventoryNavigationHeader>Wallets</InventoryNavigationHeader>
          {INVENTORY_NAVIGATION.map((navigation, index) => {
            return (
              <InventoryNavigationItem
                key={index}
                checked={pathname.indexOf(navigation.baseLink) > -1}
                onClick={() => {
                  history.push(navigation.link);
                  setBaseUrl(navigation.baseLink);
                }}
              >
                <div>
                  <InventoryNavigationTitle>
                    {navigation.title}
                  </InventoryNavigationTitle>
                  <InventoryNavigationSubTitle>
                    {navigation.subTitle}
                  </InventoryNavigationSubTitle>
                  <InventoryNavigationItemIcon
                    className={`fa-solid ${navigation.icon} fa-2x`}
                  />
                  <InventoryNavigationItemArrowIcon className="fa-solid fa-chevron-right" />
                </div>
              </InventoryNavigationItem>
            );
          })}
        </div>
      </InventoryNavigation>
      <InventoryContent>
        <SubNavbar
          externalLink={{
            hero: `${baseUrl}/hero`,
            equipment: `${baseUrl}/equipment`,
            // hero: "",
            // equipment: "",
          }}
        />
        <InventoryContentContainer>
          <Switch>
            <Redirect to="/inventory/mynfts/hero" />
          </Switch>
          <InventoryContentHeader>
            <span>My Heros</span>
          </InventoryContentHeader>
          <ItemList
            isOnlyList
            totalItemsCount={0}
            filterCondition={filterCondition}
            setFilterCondition={setFilterCondition}
            items={[]}
          />
        </InventoryContentContainer>
      </InventoryContent>
    </InventoryWrapper>
  );
};

export default Inventory;
