import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import ItemList from "../../components/ItemList";
import SubNavbar from "../../components/SubNav";

import { GraphQueryUrls } from "../../constants";
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
import { fetchMyHeroes } from "../../utils/wallet";

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
  const [items, setItems] = useState<{ [key: string]: any }>({});
  const [baseUrl, setBaseUrl] = useState(INVENTORY_NAVIGATION[0].baseLink);
  const [filterCondition, setFilterCondition] = useState<any>({
    recruitCounter: { start: 0, end: 7 },
    pagination: { page: 1, size: 20, total: 1 },
  });
  const { account } = useWeb3React();
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;

  const fetchInventoryInfo = async (account: any) => {
    if (!account) {
      setItems({});
      return;
    }
    const myHeroes = await fetchMyHeroes(account);

    let marketplaceInfo: any = [];
    myHeroes.map(
      (item) => item.status === "Open" && marketplaceInfo.push(item)
    );
    setItems({
      "/inventory/mynfts/hero": myHeroes || [],
      "/inventory/marketplace/hero": marketplaceInfo,
    });
  };

  useEffect(() => {
    fetchInventoryInfo(account);
    // const fetchData = async () => {
    //   const fetchedData = await sendRequestByGraphQl({
    //     query: GraphQueryUrls.heroListByOwner,
    //     variables: makeGraphQlVariables(filterCondition),
    //   });
    //   console.log(fetchedData);
    // };
    // fetchData();
  }, [account]);

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
            items={items[pathname] || []}
          />
        </InventoryContentContainer>
      </InventoryContent>
    </InventoryWrapper>
  );
};

export default Inventory;
