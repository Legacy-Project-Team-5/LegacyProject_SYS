import Item from './Item';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { BiGame } from 'react-icons/bi';
import { TbDrone } from 'react-icons/tb';
import { RiSlideshowLine } from 'react-icons/ri';
import { BsFillCartPlusFill } from 'react-icons/bs';

function List({ product, setProduct, getAllProducts }) {
  async function showGames() {
    try {
      const response = await axios.get('http://localhost:8000');
      console.log('response games', response.data);
      let filteredGames = product.filter((game) => game.category === 'Games');
      await setProduct(filteredGames);
      console.log('game', product);
    } catch (error) {
      console.log(error);
    }
  }

  async function showTech() {
    try {
      const response = await axios.get('http://localhost:8000');
      console.log('tech', product, response.data);
      let filteredTech = response.data.filter(
        (tech) => tech.category === 'Tech',
      );
      await setProduct(filteredTech);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
    console.log(product);
  }

  async function showOther() {
    try {
      const response = await axios.get('http://localhost:8000');
      console.log('other', product, response.data);
      let filteredOther = response.data.filter(
        (other) => other.category === 'Other',
      );
      await setProduct(filteredOther);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
    console.log(product);
  }

  async function showAll() {
    await getAllProducts();
    console.log(product);
  }

  return (
    <>
      <div>
        <div className="list">
          <Button onClick={showGames}>
            <BiGame />
            Games
          </Button>
          <Button onClick={showTech} variant="success" className="ms-2">
            <TbDrone />
            Tech
          </Button>
          <Button onClick={showOther} variant="danger" className="ms-2">
            <RiSlideshowLine />
            Other
          </Button>
          <Button onClick={showAll} variant="dark" className="ms-2">
            <BsFillCartPlusFill />
            All
          </Button>
        </div>
        <div className="list-item">
          <Item product={product} getAllProducts={getAllProducts} />
        </div>
      </div>
    </>
  );
}

export default List;
