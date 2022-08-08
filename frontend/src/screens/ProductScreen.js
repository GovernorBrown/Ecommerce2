import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useState, useEffect }from 'react'
import axios from 'axios'

export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       console.log("these are the url param values")
       console.log(match.params)
       return <Children {...props}  match = {match}/>
   }
 }
const ProductScreen = ({ match }) => {
    {/*const product = products.find(p =>p.ProductID === match.params.ProductID)*/}
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            
            const { data } = await axios.get(`https://21tkfbdxh1.execute-api.us-east-1.amazonaws.com/dev/products/${match.params.id}`
            )
            /*${match.params.ProductID}*/
            setProducts(data[0])
            console.log("this is the individual product in an array")
            console.log(data)
            console.log("this is the individual product as just the object")
            console.log(data[0])
        }
        fetchProducts()
    }, [])
    return (<>
        <Link className='btn btn-dark my-3' to='/'>
            Go Back
        </Link>
        <Row>
            <Col md={6}>
                <Image src={products.image} alt={products.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{products.ProductName}</h3>
                </ListGroup.Item>
                <ListGroup.Item> Price: ${products.ProductPrice} </ListGroup.Item>
                <ListGroup.Item> Description: {products.description} </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                  <Row>
                      <Col>Price:</Col>
                      <Col>
                      <strong>${products.price}</strong>
                      </Col>
                  </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Row>
                          <Col>
                          {products.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                          </Col>
                      </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <Button className='btn-block' type='button' disabled={products.countInStock === 0}>Add To Cart</Button>
                  </ListGroup.Item>
                  </ListGroup>  
            </Card>
        </Col>
        </Row>
        
        </>
    )
}

export default withRouter(ProductScreen)