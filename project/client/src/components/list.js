import Item from './Item';
// import { useEffect } from "react";
import React from 'react';

function List({ product, getAllProducts }) {
  return (
    <>
      <div className="justify ">
        <Item product={product} getAllProducts={getAllProducts} />
      </div>
    </>
  );
}

export default List;
