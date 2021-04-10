import React, { useEffect, useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';


function Product(props) {
    useEffect(() => {
        decodeBase64(props.img.data.data)
    }, [])

    const [img, setimg] = useState("")

    const decodeBase64 =  (base64data) => {
        var b64 = Buffer.from(base64data).toString('base64');
        setimg(b64)
    }

    const a = {
        // display: flex,
alignItems: 'center',
justifyContent: 'center',

    }
    const s = {
        width: 200,
        margin: 10,
    }
    return (
        <Card style={a}>
            <Card.Img style={s} src={"data:image/png;base64, "+ img} />
            <Card.Body center>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>${props.price}</Card.Text>
                <Card.Text>{props.type}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;
