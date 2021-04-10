import React, { useEffect, useState } from 'react'
import { CardDeck } from 'react-bootstrap'
import Product from './Product'
import { Link } from 'react-router-dom';


function Search() {
    useEffect(() => {
        fetchSearchedOrders()
        // console.log(match.params.query);
    }, [])
    const [products, setproducts] = useState([])
    // const searchProduct = {
    //     query: match.params.query
    // }
    // const options = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(searchProduct)
    // }
    const fetchSearchedOrders = async () => {
        const data = await fetch('/api/getSearchedProducts')
        const res = await data.json()
        setproducts(res)
        console.log(products);
    }


    return (
        <div>
        
            <CardDeck>
                {products.map(product => (
                    <Link key={product._id} to={`/men/${product._id}`}>
                    <Product
                        key={product._id}
                        name={product.name}
                        price={product.price}
                        img={product.img}
                    />
                    </Link>
                )
                )}
            </CardDeck>
        </div>
    )
}

export default Search
