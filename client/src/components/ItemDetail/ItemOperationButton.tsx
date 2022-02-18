import React from "react";
import { ItemOperationButtonWrapper, ItemPriceContainer } from "./styled";

const ItemOperationButton: React.FC = ({ price }: any) => {
  return (
    <ItemOperationButtonWrapper>
      <ItemPriceContainer></ItemPriceContainer>
    </ItemOperationButtonWrapper>
  );
};

export default ItemOperationButton;
