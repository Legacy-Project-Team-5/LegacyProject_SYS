import axios from 'axios';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import Edit from './Edit';
import { RiDeleteBin5Line, RiEditLine } from 'react-icons/ri';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Item({ getAllProducts, product }) {
  //states
  const [creatorIds, setCreatorIds] = useState([]);
  const [id, setId] = useState(1);

  let token = localStorage.getItem('token');
  const decoded = token ? jwt_decode(token) : null;

  useEffect(() => {
    if (decoded) {
      function filtered() {
        let updatedCreatorIds = product
          .filter((p) => p.creator._id === decoded.id)
          .map((p) => p._id);
        setCreatorIds(updatedCreatorIds);
      }
      filtered();
    }
  }, [product]);

  function editProduct(id) {
    console.log('from the button' + id);
    console.log(product);
    setId(id);
  }

  function handleEdit() {
    console.log('hi');
  }

 /*  async function deleteProduct(id) {
    const alertDeleteProduct = window.confirm("are you sure mate?");
    if (alertDeleteProduct) {
      try {
        await axios.delete(`http://localhost:8000/${id}`);
        getAllProducts();
        Swal.fire(
          'Good job!',
          'You deleted the product!',
          'success'
        )
      } catch (error) {
        console.log("delete product", error);
      }
    }
  }; */
  async function deleteProduct(id) {
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8000/${id}`)
      .then (() => getAllProducts())
      .then (() => Swal.fire('Saved!', '', 'success'))
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
  };

  return (
    <Container fluid className="m-4 " style={{ width: '100%' }}>
      <Row md={2} lg={3} xl={4} style={{ width: '100%' }} className="g-2">
        {product.map((g, index) =>
          id === g._id ? (
            <Edit g={g} setId={setId} handleEdit={handleEdit} getAllProducts ={getAllProducts} id={id} />
          ) : (
            <Col key={index}>
              <Card style={{ width: '18rem' }} border="secondary">
                <Card.Img
                  variant="top"
                  src={g.imgUrl}
                  alt="img"
                  style={{ width: '100%', height: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{g.title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Price: {g.price}€</ListGroup.Item>
                  <ListGroup.Item>Description: {g.description}</ListGroup.Item>
                  <ListGroup.Item>User: {g.creator.email}</ListGroup.Item>
                  <ListGroup.Item>Category: {g.category}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  {token && creatorIds.includes(g._id) && (
                    <Button onClick={() => deleteProduct(g._id)}>
                      <RiDeleteBin5Line />
                      Delete
                    </Button>
                  )}
                  {token && creatorIds.includes(g._id) && (
                    <Button
                      onClick={() => editProduct(g._id)}
                      variant="danger"
                      className="ms-2"
                    >
                      <RiEditLine />
                      Edit
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
}

export default Item;