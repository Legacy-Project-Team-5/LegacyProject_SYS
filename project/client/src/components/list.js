import Item from './Item';
import React from 'react';
import axios from 'axios';
function List({ product,setProduct, getAllProducts }) {


  async function showGames() {
    try {
      const response = await axios.get('http://localhost:8000');
      console.log("response games" ,response.data)
      let filteredGames = product.filter( game => game.category==="Games")
      await setProduct(filteredGames)
      console.log("game" , product) 
    } catch (error) {
      console.log(error)
    }    
  };

  async function showTech() { 
    try {
      const response = await axios.get('http://localhost:8000');
      console.log("tech" , product, response.data)
       let filteredTech = response.data.filter( tech => tech.category==="Tech")
       await setProduct(filteredTech)
       console.log(product) 
     } catch (error) {
       console.log(error)
     }  console.log(product) 
  };

  async function showOther() {
    try {
      const response = await axios.get('http://localhost:8000');
      console.log("other" , product, response.data)
       let filteredOther = response.data.filter( other => other.category==="Other")
       await setProduct(filteredOther)
       console.log(product) 
     } catch (error) {
       console.log(error)
     }  console.log(product) 
  };

  async function showAll() {
await getAllProducts();
    console.log(product) 
  };

  return (
    <>
      <div className="justify ">
        <button
        onClick={showGames}>Games</button>
        <button
        onClick={showTech}>Tech</button>
        <button
        onClick={showOther}>Other</button>
         <button
        onClick={showAll}>All</button>
        <Item product={product} getAllProducts={getAllProducts} />
      </div>
    </>
  );
}

export default List;
