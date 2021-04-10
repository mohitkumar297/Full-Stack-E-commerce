import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { Button, Form, Col } from 'react-bootstrap'
import Product from '../Product'

function Addnewproduct() {

    const [categories, setcategories] = useState([])
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () =>{
        const data = await fetch('/api/getCategories');
        const categories = await data.json()
        setcategories(categories)
        console.log(categories);
    }


    const formStyle = {
        marginLeft: '290px',
        marginRight: '290px',
        marginTop: '50px'
    }
    const [productName, setproductName] = useState("")
    const [productPrice, setproductPrice] = useState(0)
    const [productType, setproductType] = useState("")
    const [file, setfile] = useState('')

    function addProduct(event) {

        // saveNewProduct();
        // event.preventDefault();
        
        }
    

    function handleName(event) {
        setproductName(event.target.value)
    }
    function handlePrice(event) {
        setproductPrice(event.target.value)
    }
    function handleType(event) {
        // console.log(event.target.value);
        setproductType(event.target.value)
    }
    function handleFile(event){
        // console.log(event.target.input.files.length);
        // console.log(event.target.input.files[0]);
setfile(event.target.value)
    }


    const getProduct = {
        name: productName,
        price: productPrice,
        type: productType ,
        img:file
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getProduct)
    }
    const saveNewProduct = async () => {
        const data = await fetch('/api/addnewproduct', options);
        console.log(data);
        // const foundProduct = await data.json()
        // setProduct(foundProduct)
        // console.log(foundProduct);
    }

    return (
        <div>
            <Sidebar />
            <Form style={formStyle} method='POST' action='/api/addnewproduct' onSubmit={addProduct} encType='multipart/form-data'>
                <h5>Add new Product</h5>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' type="text" onChange={handleName} placeholder="Enter product name" value={productName} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name='price' as='input' onChange={handlePrice} type="decimal" placeholder="Enter product price" value={productPrice} required />
                    </Form.Group>
                </Form.Row>

                <Form.Row>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Type of Product</Form.Label>
                        <Form.Control  name='type' as="select" value={productType} onChange={handleType}>
                        {categories.map(category => (
    <option value={category.name}>{category.name}</option>
  ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.File type='file' name='myImage' id="exampleFormControlFile1" label="Upload an Image" onChange={handleFile}/>
                    </Form.Group>
                </Form.Row> 

                <Button variant="primary" type="submit">
                    Submit
  </Button>
            </Form>

        </div>
    )
}

export default Addnewproduct;
