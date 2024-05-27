import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Product(props) {
    const {product, add} = props;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}грн</Card.Text>
        <Card.Text>{product.text}</Card.Text>
        <Button onClick={() => add(product)} variant="primary">Купити</Button>
      </Card.Body>
    </Card>
  )
}
