import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { Table, Button, Form } from 'react-bootstrap'

function Allcategories() {
    useEffect(() => {
        fetchCategories()
    }, [])

    const [categories, setcategories] = useState([])

    const fetchCategories = async () => {
        const data = await fetch('/api/getCategories')
        const categories = await data.json()
        setcategories(categories)
    }

    const deleteCategories = async (options) =>{
        const data = await fetch('/api/deleteCategories', options)
        const categories = await data.json()
        fetchCategories()
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
        deleteCategories(options)
    }

    const s = {
        margin: 100

    }
    return (
        <div style={s}>
            <Sidebar />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Type</th>
                        {/* <th>Last Name</th> */}
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category,index) => (
                       
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{category.name}</td>
                            <td>
                            <Button variant="danger" name={category.name}  size="lg" onClick={handleClick}>Delete</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Form method='POST' action='/api/addNewCategory'>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Add New Category</Form.Label>
    <Form.Control type="text" name="newCategory" placeholder="Enter Category Name" />
    
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Form>
        </div>
    )
}

export default Allcategories;
{/* <tr>
                        <td>2</td>
                        <td>categories[0].name</td>
                        <td>Thornton</td>
                    </tr> */}