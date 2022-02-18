import React, { useState, useEffect } from "react";

import ItemList from "../../../../components/ItemList";
import { GraphQueryUrls } from "../../../../Constants";
import {
  makeGraphQlVariables,
  sendRequestByGraphQl,
} from "../../../../utils/fetch";

import { Filter, GeneralFilter } from "..";
import { FilterWrapper, ContentsWrapper, Wrapper } from "./styled";

const AllEquipments: React.FC = () => {
  const [filterCondition, setFilterCondition] = useState<any>({
    recruitCounter: { start: 0, end: 7 },
    pagination: { page: 1, size: 20, total: 1 },
  });
  const [listItems, setListItems] = useState<any[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await sendRequestByGraphQl({
        query: GraphQueryUrls.equipmentList,
        variables: makeGraphQlVariables(filterCondition),
      });
      const items = fetchedData.data?.getNFTEquipmentOrders?.items || [];
      setListItems(items);
      setTotalItemsCount(fetchedData.data?.getNFTEquipmentOrders?.total || 0);
      // setFilterCondition({
      //   ...filterCondition,
      //   pagination: {
      //     page: fetchedData.data?.heroOrders?.page || 0,
      //     size: fetchedData.data?.heroOrders?.size || 20,
      //     total: fetchedData.data?.heroOrders?.total || 0,
      //   },
      // });
    };
    fetchData();
  }, [filterCondition]);

  return (
    <Wrapper>
      <FilterWrapper>
        <Filter
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
        <GeneralFilter
          isEquipment
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
      </FilterWrapper>
      <ContentsWrapper>
        <ItemList
          isEquipment
          items={listItems}
          totalItemsCount={totalItemsCount}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
        />
      </ContentsWrapper>
    </Wrapper>
  );
};

export default AllEquipments;
