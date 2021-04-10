import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { Button, Table, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Product from '../Product';

function Orders() {
    const [orders, setorders] = useState([])
    const [status, setstatus] = useState('')
    const [idChanged, setidChanged] = useState('')
    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        const data = await fetch('/api/getAllOrders')
        const allorders = await data.json()
        setorders(allorders)
    }

    const s = {
        margin: 100
    }

    function handleChange(event){
        setidChanged(event.target.name)
        setstatus(event.target.value)
    }
    const changeStatusInDatabase = async (options)=>{
        const data = await fetch('/api/changeStatusInDatabase', options)
        const res = await data.json()
    }

    function handleClick(){
        // const statusChange = {
        //     _id: idChanged,
        //     status: status
        // }

        // const options = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(statusChange)
        // }

        // changeStatusInDatabase(options)
    }

    return (
        <div style={s}>
            <Sidebar />
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
                    {orders.map((order, index) => (

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
                            <p>{order.order}</p>
                                <select className="widefat" name={order._id} onChange={handleChange}>
                                <option value="Pending">Change Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Ready for shipment">Ready for shipment</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="completed">completed</option>
                                </select>
                            </td>
                            <td> 
                            <Form method='POST' action = '/api/changeStatusInDatabase'>
                                <Button variant="success" name='status' value={JSON.stringify({'id':idChanged, 'status':status})} size="sm" onClick={handleClick} type='submit'>Save</Button>{' '}
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Orders
{/* <Button variant="danger" name={product._id} value="delete" size="sm" onClick={handleClick}>Delete</Button>{' '} */}