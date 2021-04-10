import React, { useEffect, useState } from 'react'
import { Table, Button, Form, InputGroup, FormControl } from 'react-bootstrap'

function Cart() {
    useEffect(() => {
        // calculatePrice()
        showProductsInCart()
    }, [])
    const [products, setproducts] = useState([])
    const [price, setprice] = useState(0)

    // var productIds = []
    const productsToBuy = async (options) =>{
        const data = await fetch('/api/buy', options)
        const res = data.json()
    }


    const showProductsInCart = async () => {
        const data = await fetch('/api/showProductsInCart')
        const products = await data.json()
        setproducts(products)
        console.log(products);
        var p = 0
        products.map(product => {
            // produc tIds.push(product._id)
            p = p + (product.price*product.quantity)
            console.log(product.price);
            setprice(p)
        })
    }
    const s = {
        marginTop: 50,
        marginLeft: 150,
        marginRight: 150
    }
    const decodeBase64 = (base64data) => {
        var b64 = Buffer.from(base64data).toString('base64');
        // setimg(b64)
        return b64
    }
    const imageStyle = {
        width: 80,
        margin: 10
    }
    function handleClick(event){
        const p={
            products:products,
            price:price
        }

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p)
        }
        productsToBuy(options)
    }

    return (
        <div style={s}>
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Product Image</th>
                        <th>Product Name</th>

                        <th>Product Price</th>
                        <th>Product Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index + 1}>

                            <td>
                                <img style={imageStyle} src={"data:image/png;base64, " + decodeBase64(product.img.data.data)} />
                            </td>
                            <td>{product.name}</td>

                            <td>${product.price}</td>
                            <td>
                            {product.quantity}
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
            </Table>
            <h5 className="forgot-password text-center">Total Price : ${price}</h5>
            
            <Button onClick={handleClick} variant="dark" name='id' value = {products} size="lg" type='submit'>
                    Buy
            </Button>
       
            
        </div>
    )
}

export default Cart
