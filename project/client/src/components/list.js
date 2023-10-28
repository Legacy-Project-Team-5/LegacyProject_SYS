import Item from './Item';
import React from 'react';

function List({ product, getAllProducts }) {
  return (
    <>
      <div className="justify ">
        <button>games</button>
        <button>tech</button>
        <button>other</button>
        <Item product={product} getAllProducts={getAllProducts} />
      </div>
    </>
  );
}

export default List;
