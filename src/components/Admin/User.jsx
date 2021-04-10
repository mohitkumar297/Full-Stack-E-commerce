import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { Table, Button, Form } from 'react-bootstrap'

function User() {

    useEffect(() => {
        fetchUsers()
    }, [])

    const [users, setusers] = useState([])

    const fetchUsers = async() =>{
        const data = await fetch('/api/getAllUsers')
        const user = await data.json()
        setusers(user)
    }

    const s = {
        margin: 100
    }

    const deleteUsers = async (options) =>{
        const data = await fetch('/api/deleteUsers', options)
        const users = await data.json()
        fetchUsers()
    }

    function handleClick(event){
        const deleteCategory = {
            name:event.target.name
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteCategory)
        }
         deleteUsers(options)
    }

    return (
        <div style={s}>
            <Sidebar />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Users</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index) => (
                       
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{user.username}</td>
                            <td>
                            <Button variant="danger" name={user.username}  size="lg" onClick={handleClick}>Delete</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    )
}

export default User
