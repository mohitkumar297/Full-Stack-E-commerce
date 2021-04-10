import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { Button, Table } from 'react-bootstrap'

function Allproducts() {
    useEffect(() => {
        fetchAllProducts()
    }, [])

    const [products, setproducts] = useState([])
    const [img, setimg] = useState("")

    const fetchAllProducts = async () => {
        const data = await fetch('/api/products')
        const products = await data.json()
        setproducts(products)
        // decodeBase64(products.img.data.data)
    }

    const deleteProduct = async (options) => {
        const data = await fetch('/api/deleteProduct', options)
        const res = data.json()
        fetchAllProducts()
    }

    const decodeBase64 = (base64data) => {
        var b64 = Buffer.from(base64data).toString('base64');
        // setimg(b64)
        return b64
    }
    const s = {
        margin: 100
    }

    function handleClick(event) {
        if (event.target.value === 'edit') {
            console.log(event.target.name);

        } else {
            const productChosen = {
                name: event.target.name
            }
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productChosen)
            }
            deleteProduct(options)

        }
    }

    const imageStyle = {
        width: 100,
        margin: 10
    }
    return (
        <div style={s}>
            <Sidebar />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Type</th>
                        <th>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (

                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>
                                <img style={imageStyle} src={"data:image/png;base64, " + decodeBase64(product.img.data.data)} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.type}</td>
                            <td>${product.price}</td>
                            <td>
                                <Button variant="success" name={product._id} value="edit" size="sm" onClick={handleClick}>Edit</Button>{' '}
                                <Button variant="danger" name={product._id} value="delete" size="sm" onClick={handleClick}>Delete</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    )
}

export default Allproducts
