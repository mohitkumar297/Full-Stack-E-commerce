import React,{useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'


function OrderDisplay({ match }) {
    useEffect(() => {
        fetchOrder()
        console.log(match.params.id);
    }, [])

    const [products, setproduct] = useState([])

    const getOrderedProduct = {
        _id: match.params.id
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getOrderedProduct)
    }

    const fetchOrder = async ()=>{
        const data = await fetch('/api/getOrder', options)
        const res = await data.json()
        setproduct(res)
    }
    const s = {
        marginTop: 50,
        marginLeft: 150,
        marginRight: 150
    }
    const imageStyle = {
        width: 80,
        margin: 10
    }
    const decodeBase64 = (base64data) => {
        var b64 = Buffer.from(base64data).toString('base64');
        // setimg(b64)
        return b64
    }
    return (
        <div style={s}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        
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
                            
                        </tr>
                    ))

                    }
                </tbody>
            </Table>
        </div>
    )
}

export default OrderDisplay
