import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RxUpdate } from 'react-icons/rx';
import { TiCancelOutline } from 'react-icons/ti';

function Edit({ g, setId }) {
  const handleEdit = () => {
    console.log('it works');
  };

  return (
    <div key={g._id}>
      <Form.Label htmlFor="inputTitle">Title:</Form.Label>
      <Form.Control
        type="text"
        name="title"
        placeholder="Title..."
        onChange={handleEdit}
        value={g.title}
      />
      <Form.Label htmlFor="inputImage">ImgUrl:</Form.Label>
      <Form.Control
        type="text"
        name="imgUrl"
        placeholder="imgUrl..."
        onChange={handleEdit}
        value={g.imgUrl}
      />
      <Form.Label htmlFor="inputDescription">Description:</Form.Label>
      <Form.Control
        type="text"
        name="description"
        placeholder="description...."
        onChange={handleEdit}
        value={g.description}
      />

      <Form.Label htmlFor="inputPrice">Price:</Form.Label>
      <Form.Control
        type="text"
        name="price"
        placeholder="price..."
        onChange={handleEdit}
        value={g.price}
      />
      <div className="mt-2">
        <Button type="submit">
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
