import { useState } from "react";
import axios from "axios";
import "./productForm.css";
import { useNavigate } from "react-router-dom";

function AddProduct({ getAllProducts }) {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    imgUrl: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: value,
    });
  };

  //Function to validate the form
  const validForm = () => {
    return (
      product.title.trim() !== "" &&
      product.imgUrl.trim() !== "" &&
      product.description.trim() !== "" &&
      product.price.trim() !== ""
    );
  };

  function addNewProduct(e) {
    e.preventDefault();
    if (!validForm()) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:8000/create", product, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        navigate("/");
      })

      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="formContainer">
      <div className="inputDiv">
        <form className="form1" onSubmit={addNewProduct}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title..."
            onChange={handleInputChange}
            value={product.title}
          />
          <label>ImgUrl:</label>
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl..."
            onChange={handleInputChange}
            value={product.imgUrl}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="description...."
            onChange={handleInputChange}
            value={product.description}
          />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            placeholder="price..."
            onChange={handleInputChange}
            value={product.price}
          />
          <button type="submit" className="addProductBtn">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
