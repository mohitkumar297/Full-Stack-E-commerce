import React, { useState, useEffect } from 'react';
import Product from './Product';
import { Card, CardDeck, Button, Form, InputGroup, FormControl } from 'react-bootstrap';


function ProductDisplay({ match }) {
    useEffect(() => {
        fetchItem();
        console.log(match.params.id);
    }, []);

    const [product, setProduct] = useState([])

    const getProduct = {
        _id: match.params.id
    }
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getProduct)
    }
    const fetchItem = async () => {
        const data = await fetch('/api/product', options);
        const foundProduct = await data.json()
        setProduct(foundProduct)     
    }
    const a = {
        // display: flex,
alignItems: 'center',
justifyContent: 'center',

    }

    return (
        <div>
            <CardDeck>
                {product.map(product => (
                    <Product
                        key={product._id}
                        name={product.name}
                        price={product.price}
                        img={product.img}
                    />
                )
                )}
            </CardDeck>
            
            <Form className="text-center" method='POST' action='/api/addToCart'>
            <Form.Group controlId="formGridEmail" style={{width:200}}>
                        {/* <Form.Label>Quantity</Form.Label> */}
                        <Form.Control style={{marginLeft:540}} name='quantity' type="number" placeholder="Enter product quantity" required />
                    </Form.Group>
                <Button variant="dark" name='id' value={match.params.id} size="lg" type='submit'>
                    Add to Cart
  </Button>
            </Form>

        </div>
    );
}
export default ProductDisplay;