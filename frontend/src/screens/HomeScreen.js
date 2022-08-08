import React, { useState, useEffect }from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('https://21tkfbdxh1.execute-api.us-east-1.amazonaws.com/dev/products/')
            //setProducts(data)
            setProducts(data)
            console.log("this is the")
            console.log(data)
        }
        fetchProducts()
    }, [])

    const priceFilter = function(){
        
        var filteredProducts;
        const maxPrice = 20;
        if(maxPrice == ""){
          filteredProducts = products;
          console.log("original filteredProducts are:")
          console.log(filteredProducts)
        }else{
          filteredProducts = products.filter(function(item) {
          //return item.ProductPrice < maxProps;
          return item.ProductPrice < maxPrice;
        });
        }
        console.log("filteredProducts are:")
        console.log(filteredProducts)
        setProducts(filteredProducts)
        
        
    
    }

    
  return (
        <>
        <h1>Latest Products</h1>
        <button onClick={priceFilter}>Under 20$</button>
        <Row>
            {products.map((product) => (
                <Col key={product.ProductID} sm={12} md={6} lg={4} xl={3}>
               <Product product={product} />
               </Col>
            ))}
        </Row>
        </>
    )
}

export default HomeScreen