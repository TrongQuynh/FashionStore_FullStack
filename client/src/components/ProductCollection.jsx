
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCart from '../components/ProductCart';
import style from "../assets/css/Home.module.css";

import {Link,useNavigate} from "react-router-dom";

import React from 'react'

function ProductCollection(data) {
    return (
        <div className={style.collection}>
            <Row className='bg-light mb-2 mt-3'>
                <Col xs={11}><h3 className={style.header_Collection}>{data.collection}</h3></Col>
                <Col xs={1}><p><Link className={style.btn_More} to={`/product/${data.collection}`}>More...</Link></p></Col>
            </Row>

            <Row>
                {
                    data.products.map(function(product,index){
                        return (
                            <Col key={index} xs={2} className='mb-2'>
                                <ProductCart {...product} />
                            </Col>
                        );
                    })
                }
            </Row>
        </div>
    )
}

export default ProductCollection