import React,{useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Profile() {
    useEffect(() => {
        fetchOrder() 
    }, [])

    const [products, setproduct] = useState([])

    const fetchOrder = async ()=>{
        const data = await fetch('/api/getProfileOrder')
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
                        <th>#</th>
                        <th>User Name</th>
                        <th>Products Ordered</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((order, index) => (

                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            {/* <td>
                                <img style={imageStyle} src={"data:image/png;base64, " + decodeBase64(product.img.data.data)} />
                            </td> */}
                            <td>{order.user}</td>

                            {/* <Link style={{color:'#000', width:200}} key={order._id} to={`/orders/${order._id}`}> */}
                            <td>
                                <Link style={{ color: '#000', width: 200 }} key={order._id} to={`/orders/${order._id}`}>
                                    {order.products.length}
                                </Link>
                            </td>
                            {/* </Link> */}

                            <td>${order.price}</td>

                            {/* <td>{order.order}</td> */}
                            <td>
                            {order.order}
                                
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Profile
