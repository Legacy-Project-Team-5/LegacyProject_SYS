import { useState } from 'react';
import axios from 'axios';
import './productForm.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import Select from 'react-select';

function AddProduct({ getAllProducts }) {
  let token = localStorage.getItem('token');
  const navigate = useNavigate();

  //states
  const [product, setProduct] = useState({
    title: '',
    imgUrl: '',
    description: '',
    price: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: value,
    });
    console.log(product);
  };

  //Function to validate the form
  const validForm = () => {
    return (
      product.title.trim() !== '' &&
      product.imgUrl.trim() !== '' &&
      product.description.trim() !== '' &&
      product.price.trim() !== '' &&
      product.category.trim() !== ''
    );
  };

  function addNewProduct(e) {
    e.preventDefault();
    if (!validForm()) {
      Swal.fire({
        icon: 'error',
        title: 'ooppsss',
        text: 'Please fill in all fields.',
      });

      return;
    }

    axios
      .post('http://localhost:8000/create', product, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        navigate('/');
      })

      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="formContainer mt-4" border="secondary">
      <Form className="form1" onSubmit={addNewProduct}>
        <Form.Label htmlFor="inputTitle" className="mt-2">
          Title:
        </Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Title..."
          onChange={handleInputChange}
          value={product.title}
        />

        <Form.Label htmlFor="inputTitle" className="mt-2">
          ImgUrl:
        </Form.Label>
        <Form.Control
          type="text"
          name="imgUrl"
          placeholder="imgUrl..."
          onChange={handleInputChange}
          value={product.imgUrl}
        />

        <Form.Label htmlFor="inputTitle" className="mt-2">
          Description:
        </Form.Label>
        <Form.Control
          type="text"
          name="description"
          placeholder="description...."
          onChange={handleInputChange}
          value={product.description}
        />

        <Form.Label htmlFor="inputTitle" className="mt-2">
          Price:
        </Form.Label>
        <Form.Control
          type="text"
          name="price"
          placeholder="price..."
          onChange={handleInputChange}
          value={product.price}
        />

        <Form.Label htmlFor="inputTitle" className="mt-2">
          Category:
        </Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="category"
          value={product.category}
          onChange={handleInputChange}
        >
          <option value="">Selected</option>
          <option value="Games">Games</option>
          <option value="Tech">Tech</option>
          <option value="Other">Other</option>
        </Form.Select>

        <div className="mt-4">
          <Button type="submit" className="addProductBtn">
            ADD
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddProduct;
