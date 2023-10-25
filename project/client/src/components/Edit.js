import React from "react";
import "./Edit.css";

function Edit( { g ,setId }) {
 
const handleEdit  = () =>  {
  console.log ("it works")
}

  return (
    <div key = {g._id} >
          <input
            type="text"
            name="title"
            placeholder="Title..."
            onChange={handleEdit}
            value={g.title}
          />
          <label>ImgUrl:</label>
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl..."
            onChange={handleEdit}
            value={g.imgUrl}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="description...."
            onChange={handleEdit}
            value={g.description}
          />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            placeholder="price..."
            onChange={handleEdit}
            value={g.price}
          />
          <button type="submit" className="addProductBtn">
            Update
          </button>
          <button className="addProductBtn" onClick={() => setId(1)}>
            Cancel
          </button>
    </div>
  );
}

export default Edit;
