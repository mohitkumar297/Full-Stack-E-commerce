import React, { useState, useEffect } from 'react'
import Product from './Product'
import { CardDeck, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Women() {
    const [products, setproducts] = useState([])
    const [categories, setcategories] = useState([])
    const [selectedCategory, setselectedCategory] = useState('Women')

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, [])

    const fetchItems = async () => {
        const data = await fetch('/api/productsWomen');
        const p = await data.json()
        setproducts(p)
        console.log(p);
    }

    

    const fetchCategories = async () => {
        const data = await fetch('/api/getCategoriesWomen');
        const p = await data.json()
        setcategories(p)
    }

    const getSortedProducts = async (options) => {
        const data = await fetch('/api/getSortedProduct', options);
        const p = await data.json()
        setproducts(p)
    }

    function handleDropdown(event) {
        setselectedCategory(event.target.text)
        const getProduct = {
            type: event.target.text
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getProduct)
        }
        getSortedProducts(options)
    }
    function handleSort(event){
        const getProduct = {
            sort: event.target.text,
            type: selectedCategory
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getProduct)
        }
        getSortedProducts(options)
    }


    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Select Category
  </Dropdown.Toggle>

                <Dropdown.Menu>
                    {categories.map(category => (
                        <Dropdown.Item onClick={handleDropdown}>{category.name}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Sort
  </Dropdown.Toggle>
<Dropdown.Menu>

                    <Dropdown.Item onClick={handleSort}>Price: Low to High</Dropdown.Item>
                    <Dropdown.Item onClick={handleSort}>Price: High to Low</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <CardDeck>
                {products.map(product => (
                    <Link key={product._id} to={`/men/${product._id}`}>
                        <Product
                            key={product._id}
                            name={product.name}
                            price={product.price}
                            type={product.type}
                            img={product.img}
                        />
                    </Link>
                )
                )}
            </CardDeck>
        </div>
    )
}

export default Women;