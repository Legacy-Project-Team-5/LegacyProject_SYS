import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./item.css";

function Item({ getAllProducts, product }) {
  const [creatorIds, setCreatorIds] = useState([]);
  let token = localStorage.getItem("token");
  
  const decoded = token ? jwt_decode(token) : null;
  

  useEffect(() => {
    if(decoded){
      function filtered() {
        let updatedCreatorIds = product
          .filter((p) => p.creator._id === decoded.id)
          .map((p) => p._id);
        setCreatorIds(updatedCreatorIds);
      }
      filtered();
    }
   

    
  }, [product]);

  // function filtered() {
  //   let updatedCreatorIds = product
  //     .filter((p) => p.creator._id === decoded.id)
  //     .map((p) => p._id);
  //   setCreatorIds(updatedCreatorIds);
  // }


  // useEffect(()=>{
  //   if(decoded){
  //     filtered()
  //   }
    
  // }, [product])

  async function deleteProduct(id) {
    const alertDeleteProduct = window.confirm("are you sure mate?");
    if (alertDeleteProduct) {
      try {
        await axios.delete(`http://localhost:8000/${id}`);
        getAllProducts();
      } catch (error) {
        console.log("delete product", error);
      }

      // getAllProducts();
    }
  }

  return (
    <div className="container">
      {product.map((g, index) => (
        <div className="block" key={index}>
          <div className="return">
            <h1>{g.title}</h1>
            <h3>{g.creator.email}</h3>
            <img className="image" src={g.imgUrl} alt="img" />
            <p>{g.description}</p>
            <p>{g.price}€</p>
            {token && creatorIds.includes(g._id) && (
              <button onClick={() => deleteProduct(g._id)}>
                <i className="deleteIcon">delete</i>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;
