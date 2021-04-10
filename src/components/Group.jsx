import React from 'react'
import {Link} from 'react-router-dom'

function Group(){
    return (
        <div>
        <Link to='/men'>
        <div className='title-img'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgBIf9_nDbICSBXXVkc7YwFSKxSTEAoyNY0Q&usqp=CAU' />
            <h1>Men's Section</h1>
        </div>
        </Link>
        <Link to='/women'>
        <div className='title-img'>
            <img src='https://images.unsplash.com/photo-1511111928333-046ec1d3bef6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80' />
            <h1>Women's Section</h1>
        </div>
        </Link>
        </div>
    )
}

export default Group;