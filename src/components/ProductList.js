import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filterState } = useFilterContext();
  const { showProducts, isGridView } = filterState;
  if (isGridView) {
    return <GridView showProducts={showProducts} />;
  }
  return <ListView showProducts={showProducts} />;
};

export default ProductList;
