import React from 'react';
import { useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RxUpdate } from 'react-icons/rx';
import { TiCancelOutline } from 'react-icons/ti';

function Edit({g ,setId, getAllProducts, id }) {
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
  };

  function saveChanges() {
    try {
      axios
        .put(`http://localhost:8000/${id}`, {
          title: updatedValue.title,
          imgUrl: updatedValue.imgUrl,
          description: updatedValue.description,
          price: updatedValue.price,
        })
        .then((res) => console.log(res.data))
        .then(() => getAllProducts())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setId(1);
  };

  return (
    <div key={g._id}>
      <Form.Label htmlFor="inputTitle">Title:</Form.Label>
      <Form.Control
        type="text"
        name="title"
        placeholder="Title..."
        onChange={(e) => handleInputChange(e)}
        value={updatedValue.title}
      />
      <Form.Label htmlFor="inputImage">ImgUrl:</Form.Label>
      <Form.Control
        type="text"
        name="imgUrl"
        placeholder="imgUrl..."
        onChange={(e) => handleInputChange(e)}
        value={updatedValue.imgUrl}
      />
      <Form.Label htmlFor="inputDescription">Description:</Form.Label>
      <Form.Control
        type="text"
        name="description"
        placeholder="description...."
        onChange={(e) => handleInputChange(e)}
        value={updatedValue.description}
      />

      <Form.Label htmlFor="inputPrice">Price:</Form.Label>
      <Form.Control
        type="text"
        name="price"
        placeholder="price..."
        onChange={(e) => handleInputChange(e)}
        value={updatedValue.price}
      />
      <div className="mt-2">
        <Button type="submit" onClick={() => saveChanges()}>
          <RxUpdate /> Update
        </Button>
        <Button className="ms-2" onClick={() => setId(1)} variant="danger">
          <TiCancelOutline /> Cancel
        </Button>
      </div>

    </div>
  );
}

export default Edit;