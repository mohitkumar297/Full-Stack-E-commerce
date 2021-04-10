import React, { useEffect, useState } from 'react'
import { CardDeck } from 'react-bootstrap'
import Product from './Product'


function SearchDisplay({ match }) {
    useEffect(() => {
        fetchSearchedOrders()
        console.log(match.params.query);
    }, [])
    const [products, setproducts] = useState([])
    const searchProduct = {
        query: match.params.query
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchProduct)
    }
    const fetchSearchedOrders = async () => {
        const data = await fetch('/api/search', options)
        const res = await data.json()
        setproducts(res)
        console.log(products);
    }

    return (
        <div>
        
            <CardDeck>
                {products.map(product => (
                    <Product
                        key={product._id}
                        name={product.name}
                        price={product.price}
                        img={product.img}
                    />
                )
                )}
            </CardDeck>
        </div>
    )
}

export default SearchDisplay
