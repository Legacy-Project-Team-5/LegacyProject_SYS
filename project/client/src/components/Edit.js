import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Edit.css";

function Edit( { g ,setId, getAllProducts, id }) {
 //states
  const [updatedValue, setUpdatedValue] = useState({
    title: g.title,
    imgUrl: g.imgUrl,
    description: g.description,
    price:g.price,
  });
  

const handleInputChange = (e) =>  {
  console.log ("it works")
  setUpdatedValue({
    ...updatedValue,
    [e.target.name]: e.target.value,
  });
  console.log(updatedValue);
}

 function saveChanges() {
  try {
    axios
      .put(`http://localhost:8000/${id}`, {
        title: updatedValue.title,
        imgUrl: updatedValue.imgUrl,
        description: updatedValue.description,
        price: updatedValue.price
      })
      .then((res) => console.log(res.data))
      .then(() => getAllProducts())
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
  setId(1);
}

  return (
    <div key = {g._id} >
          <input
            type="text"
            name="title"
            placeholder="Title..."
            onChange={(e) => handleInputChange(e)}
            value={updatedValue.title}
          />
          <label>ImgUrl:</label>
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl..."
            onChange={(e) => handleInputChange(e)}
            value={updatedValue.imgUrl}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="description...."
            onChange={(e) => handleInputChange(e)}
            value={updatedValue.description}
          />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            placeholder="price..."
            onChange={(e) => handleInputChange(e)}
            value={updatedValue.price}
          />
          <button type="submit" className="addProductBtn" onClick={() => saveChanges()}>
            Update
          </button>
          <button className="addProductBtn" onClick={() => setId(1)}>
            Cancel
          </button>
    </div>
  );
}

export default Edit;
