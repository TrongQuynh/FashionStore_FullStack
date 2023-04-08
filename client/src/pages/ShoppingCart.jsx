import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../assets/css/ShoppingCart.css"
import { Link,useNavigate } from 'react-router-dom';
import Quantity from '../components/Quantity';
import {formatToMoney} from "../helpers/index";

function ShoppingCart() {
    const navigate = useNavigate();
    const [userID, setUserID]  = useState("u_19841");
    const [productCarts, setProductCart] = useState([]);
    
    useEffect(function () {
        (async () => {
            let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/cart/product`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'userID': userID
                }
            });

            let data = await res.json();
            console.log(data.products.products);
            setProductCart(data.products.products);

        })();
    }, []);

    const totalMoney = useMemo(()=>{
        let result = 0;
        for(let product of productCarts){
            result += (product.price * product.quantity)
        }
        return result;
        // return productCarts.length > 0 ? productCarts.reduce(function(pre,current){
        //     return (pre.price * pre.quantity) + (current.price * current.quantity);
        // }) : 0;
    },[productCarts]);

    async function onHandleQuantity(productCartID, quantity) {
        // console.log(quantity);
        // console.log(productCartID);
        quantity = quantity < 0 ? 0 : quantity;
        console.log(productCartID);
        let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/cart/product`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userID': userID
            },
            body: JSON.stringify({
                "userID": userID,
                "productCartID": productCartID,
                "quantity": quantity
            })
        });

        let data = await res.json();
        if(data.status != 200) return;

        let tmpProductCarts = productCarts.map(function(product, index){
            if(product.productCartID == productCartID){
                product.quantity = quantity;
            }
            return product;
        })

        setProductCart(tmpProductCarts);
    }

    async function onHandleDeleteProduct(productCartID){
        
        if(!window.confirm("Are you sure wanna delete this item ?")){
            return;
        }
        let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/cart/product`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userID': userID
            },
            body: JSON.stringify({
                "userID": userID,
                "productCartID": productCartID,
                
            })
        });

        let data = await res.json();
        if(data.status != 200) return;

        let tmpProductCarts = productCarts.filter(product => product.productCartID !== productCartID);

        setProductCart(tmpProductCarts);

    }

    function onHandleOrder(){
        navigate("/checkouts");
    }

    return (
        <div style={{ backgroundColor: "#EBEBEB" }}>
            <Header />

            <Container className='container-box'>
                <Row>
                    <Col xs={9}>
                        <div className="order_info">
                            <div className='add_and_delivery'>
                                <img src="https://theme.hstatic.net/1000026602/1001012449/14/truck.png?v=646" alt="" />
                                <div className='detail-discount'>
                                    <strong> MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</strong>
                                    <Link to="/sales">Mua thêm</Link>
                                </div>
                            </div>
                            <div className='device-line'></div>
                            <div className='info-header'>
                                <Row>
                                    <Col xs={5}>Sản phẩm</Col>
                                    <Col xs={3}>Giá</Col>
                                    <Col xs={2}>Số lượng</Col>
                                    <Col xs={2}>Tổng cộng</Col>
                                </Row>
                            </div>
                            <div className='device-line'></div>
                            <div className='product_list'>
                                {
                                    productCarts.length > 0 ?
                                        (
                                            productCarts.map(function (product, index) {
                                                return (
                                                    <Row key={index}>
                                                        <Col xs={5}>
                                                            <div className='img_thumbnail'>
                                                                <img src={product.image} alt="" />
                                                            </div>
                                                            <div className='product_name'>
                                                                <span>{product.name}</span>
                                                                <div className='size_and_color'>
                                                                    <span>{product.color}/{product.size}</span>
                                                                </div>
                                                                <div className='btn_modifie'>
                                                                    <button onClick={()=>{onHandleDeleteProduct(product.productCartID)}}>Xoa</button>
                                                                    <button>Sua</button>
                                                                </div>
                                                            </div>
                                                            <div className='clear'></div>
                                                        </Col>
                                                        <Col xs={3}>{formatToMoney(product.price)}</Col>
                                                        <Col xs={2}>
                                                            <Quantity productCartID={product.productCartID} quantity={product.quantity} onHandleQuantity={onHandleQuantity} />
                                                        </Col>
                                                        <Col xs={2}>{formatToMoney(Number(product.price) * Number(product.quantity))}</Col>
                                                    </Row>
                                                );
                                            })

                                        )
                                        :
                                        <h5 className='notification'>"Không có sản phẩm nào trong giỏ hàng!"</h5>
                                }
                                {/*
                                <Row>
                                    <Col xs={5}>
                                        <div className='img_thumbnail'>
                                            <img src="https://product.hstatic.net/1000026602/product/dsc03821_5ee845874e8940e98a973d97ed1f5e76_compact.jpg" alt="" />
                                        </div>
                                        <div className='product_name'><span>Áo Khoác BWG Innovative Frabric</span></div>
                                        <div className='clear'></div>
                                    </Col>
                                    <Col xs={3}>385,000₫</Col>
                                    <Col xs={2}>
                                        <Quantity productCartID="PC-72358" quantity="5" onHandleQuantity={onHandleQuantity} />
                                    </Col>
                                    <Col xs={2}>Tổng cộng</Col>
                                </Row>
                            */}
                            </div>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className='summry_order'>
                            <b>Tóm tắt đơn hàng</b>
                          
                            <div>
                                <span>Giá còn</span>
                                <span className='txt_totalMoney'>{formatToMoney(totalMoney)}</span>
                            </div>
                            <div>
                                <button className='btn_payment' onClick={()=>{onHandleOrder()}}>THANH TOÁN</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ShoppingCart