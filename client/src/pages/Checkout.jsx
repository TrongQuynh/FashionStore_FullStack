import React, { useEffect, useMemo, useState } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "../assets/css/Checkouts.css";

import { Link, useNavigate } from "react-router-dom";

import provinceDB from "../assets/data/provinces.json";

import { formatToMoney } from "../helpers/index";

function Checkout() {
    const nagative = new useNavigate();

    const [userID, setUserID] = useState("u_19841");
    const [productCarts, setProductCart] = useState([]);

    const [username, setUsername] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [note, setNote] = useState("");
    const [isPaymentOnline, setIsPaymentOnline] = useState(false);

    const [provinces, setProvinces] = useState(provinceDB);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");


    const transportFee = 30000;

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

    const totalMoney = useMemo(() => {

        return productCarts.length > 0 ? productCarts.reduce(function (pre, current) {
            return (pre.price * pre.quantity) + (current.price * current.quantity);
        }) : 0;
    }, [productCarts]);

    async function onHandleDeleteAllProductInCart() {
        let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/cart/product/all`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userID': userID
            }
        });

        let data = await res.json();
        console.log(data);
    }

    async function onhandleOrder() {

        console.log(
            {
                "userID": userID,
                "orders": [
                    {
                        "username": username,
                        "products": productCarts.map((product) => (
                            {
                                "productCode": product.productCode, "quantity": product.quantity, "size": product.size,
                                "color": product.color
                            }
                        ))
                        ,
                        "phonenumber": phonenumber,
                        "address": {
                            "detail": addressDetail,
                            "province": province,
                            "district": district,
                            "ward": ward
                        },
                        "status": [
                            {
                                "key": 0,
                                "value": true
                            }
                        ],
                        "note": note,
                        "isPaymentOnline": isPaymentOnline
                    }
                ]
            }
        );

        // return;

        let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/order`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userID': userID
            },
            body: JSON.stringify({
                "userID": userID,
                "orders": [
                    {
                        "username": username,
                        "products": productCarts.map((product) => (
                            {
                                "productCode": product.productCode, "quantity": product.quantity, "size": product.size,
                                "color": product.color
                            }
                        ))
                        ,
                        "phonenumber": phonenumber,
                        "address": {
                            "detail": addressDetail,
                            "province": province,
                            "district": district,
                            "ward": ward
                        },
                        "status": [
                            {
                                "key": 0,
                                "value": true
                            }
                        ],
                        "note": note,
                        "isPaymentOnline": isPaymentOnline
                    }
                ]
            })
        });

        let data = await res.json();
        console.log(data);
        if (data.status != 200) return;
    
        await onHandleDeleteAllProductInCart();

        let orderID = data.orderID;
        nagative(`/checkouts/success/${orderID}`);
    }

    function onHandleChooseProvince(code) {
        // console.log(code);
        let data = provinces.filter(prov => prov.code == code);
        if (!data) return;
        setProvince(data[0].name);
        setDistricts(data[0].districts);
    }

    function onHandleDistric(code) {
        let data = districts.filter(dis => dis.code == code);
        // console.log(data);
        if (!data) return;
        setDistrict(data[0].name)
        setWards(data[0].wards);

    }

    function onHandleWard(code) {
        let data = wards.filter(dis => dis.code == code);
        // console.log(data);
        if (!data) return;
        setWard(data[0].name);
    }

    return (
        <div className='checkout_box'>
            <div className="container">
                <div className="main">
                    <div className="main-container">
                        <div className="main-header">
                            <div className="logo">

                                <Link to="/cart">
                                    <img src={require("../assets/imgs/logoShop.png")} alt="" />
                                </Link>
                            </div>

                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/cart">Giỏ hàng</Link>
                                </li>
                                <li className="breadcrumb-item breadcrumb-item-current">
                                    <a href="">
                                        Thông tin giao hàng & Phương thức thanh toán
                                    </a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="" className="isDisabled">
                                        Hoàn Thành
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="main-content">
                            <form action="">
                                <h2>Thông tin giao hàng</h2>
                                <div className="main-content-info">
                                    <div className="row">
                                        <input className="field" id="username" type="text" placeholder="Họ và tên" onChange={(e) => { setUsername(e.target.value) }} />
                                        <input className="field" id="phonenumber" type="text" placeholder="Số điện thoại" onChange={(e) => { setPhonenumber(e.target.value) }} />
                                    </div>
                                    <div className="row">
                                        <input className="field" id="address" type="text" placeholder="Địa chỉ" onChange={(e) => { setAddressDetail(e.target.value) }} />
                                    </div>
                                    <div className="row">
                                        <select className="field field-third" name="calc_shipping_provinces" required="" onChange={(e) => { onHandleChooseProvince(e.target.value) }}>
                                            <option value="">Tỉnh / Thành phố</option>
                                            {
                                                provinces.length > 0 ?
                                                    (
                                                        provinces.map(function (value, index) {
                                                            return (
                                                                <option key={index} value={value.code}>{value.name}</option>
                                                            )
                                                        })
                                                    ) :
                                                    ""
                                            }
                                        </select>
                                        <input className="billing_address_1" name="" type="hidden" value="" />

                                        <select className="field field-third" name="calc_shipping_provinces" required="" onChange={(e) => { onHandleDistric(e.target.value) }}>
                                            <option value="">Tỉnh / Thành phố</option>
                                            {
                                                districts.length > 0 ?
                                                    (
                                                        districts.map((value, index) => {
                                                            return <option key={index} value={value.code}>{value.name}</option>
                                                        })
                                                    ) :
                                                    ""
                                            }
                                        </select>
                                        <input className="billing_address_1" name="" type="hidden" value="" />

                                        <select className="field field-third" name="calc_shipping_provinces" required="" onChange={(e) => { onHandleWard(e.target.value) }}>
                                            <option value="">Tỉnh / Thành phố</option>
                                            {
                                                wards.length > 0 ?
                                                    (
                                                        wards.map((value, index) => {
                                                            return <option key={index} value={value.code}>{value.name}</option>
                                                        })
                                                    ) :
                                                    ""
                                            }
                                        </select>
                                        <input className="billing_address_1" name="" type="hidden" value="" />
                                    </div>
                                    <div className="row">
                                        <input className="field" type="text" placeholder="Email" id="email" />
                                    </div>
                                    <div className="row">
                                        <textarea className="field" placeholder="Nội dung" name="" id="billing_note" onChange={(e) => { setNote(e.target.value) }}></textarea>
                                    </div>
                                </div>

                            </form>

                            <div className="payment-by">
                                <div className="section-header">
                                    <h2 className="section-title">Phương thức thanh toán</h2>
                                </div>
                                <div className="radio-wrapper">
                                    <label className={`radio-label ${isPaymentOnline == false ? "paymentBy-active" : ""}`}>
                                        <div className="radio-input"><input type="radio" name="btn-payment-by" id="rbtn_directPayment" onChange={() => { setIsPaymentOnline(false) }} checked /></div>
                                        <span className="radio-label-primary">Thanh toán trực tiếp</span>
                                    </label>
                                </div>
                                <div className="radio-wrapper">
                                    <label className={`radio-label ${isPaymentOnline ? "paymentBy-active" : ""}`}>
                                        <div className="radio-input"><input type="radio" name="btn-payment-by" id="rbtn_onlinePayment" onChange={() => { setIsPaymentOnline(true) }} /></div>
                                        <span className="radio-label-primary">Chuyển khoản ngân hàng</span>
                                    </label>
                                </div>
                            </div>

                            <div className="payment-info">
                                <div className="section-header">
                                    <h2 className="section-title">Thông tin thanh toán</h2>
                                </div>
                                <div className="radio-wrapper">
                                    <div className="margin-box">
                                        <p>
                                            <img src="https://kingshoes.vn/data/upload/media/king-shoes-thanh-toan.png"
                                                alt="" width="619" height="376" />
                                        </p>
                                        <p>Chúng tôi biết BẠN có nhiều sự lựa chọn. Cảm ơn BẠN đã chọn HAN SHOES</p>
                                    </div>
                                </div>
                            </div>

                            <div className="main-content-footer">
                                <a href="" id="btn-shoppingCart">Giỏ hàng</a>
                                <button id="btn-payment" type="button" onClick={() => { onhandleOrder() }}>
                                    Tiếp tục đến phương thức thanh toán
                                </button>
                            </div>
                        </div>
                        <div className="main-footer">
                            <ul className="menu">
                                <li className="menu-item">
                                    <a href="">Chăm sóc khách hàng</a>
                                </li>
                                <li className="menu-item">
                                    <a href="">Chế độ bảo hành</a>
                                </li>
                                <li className="menu-item">
                                    <a href="">Thanh toán</a>
                                </li>
                                <li className="menu-item">
                                    <a href="">Chính sách đổi hàng</a>
                                </li>
                                <li className="menu-item">
                                    <a href="">Hướng dẫn mua hàng</a>
                                </li>
                                <li className="menu-item">
                                    <a href="">Bảo mật thông tin</a>
                                </li>
                                <li className="menu-item">
                                    <a href="">Chính sách giao nhận</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="sidebar">
                    <h2>Thong Tin Don Hang</h2>
                    <div className="product-list">
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productCarts.length > 0 ?
                                        (
                                            productCarts.map(function (product, index) {
                                                return (
                                                    <tr className="product" data-product-id="1419">
                                                        <td className="product-image">
                                                            <a href="" target="_blank">
                                                                <div className="product-thumbnail">
                                                                    <div className="product-thumbnail-wrapper">
                                                                        <img className="product-thumbnail-image" alt="saffron-salam" src={product.image} />
                                                                    </div>
                                                                    <span className="product-thumbnail-quantity" aria-hidden="true">{product.quantity}</span>
                                                                </div>
                                                            </a>
                                                        </td>
                                                        <td className="product-description">
                                                            <a href="adidas-qtflex-da9449.html" target="_blank"><span className="product-description-name order-summary-emphasis">{product.name}</span></a>
                                                            <div className="attribute_pro"><span className="badge-size">Size Giày: <b>A-US 5.5 | 36 2/3</b></span></div>
                                                        </td>
                                                        <td className="product-quantity visually-hidden">1</td>
                                                        <td className="product-price">
                                                            <span className="order-summary-emphasis">{formatToMoney(product.price)}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                        :
                                        ""
                                }

                                <tr className="product" data-product-id="1419">
                                    <td className="product-image">
                                        <a href="" target="_blank">
                                            <div className="product-thumbnail">
                                                <div className="product-thumbnail-wrapper">
                                                    <img className="product-thumbnail-image" alt="saffron-salam" src="https://kingshoes.vn/data/upload/media/adidas-qtflex-da94491-king-shoes-sneaker-real-hcm-1624254373.jpeg" />
                                                </div>
                                                <span className="product-thumbnail-quantity" aria-hidden="true">1</span>
                                            </div>
                                        </a>
                                    </td>
                                    <td className="product-description">
                                        <a href="adidas-qtflex-da9449.html" target="_blank"><span className="product-description-name order-summary-emphasis">ADIDAS QTFLEX</span></a>
                                        <div className="attribute_pro"><span className="badge-size">Size Giày: <b>A-US 5.5 | 36 2/3</b></span></div>
                                    </td>
                                    <td className="product-quantity visually-hidden">1</td>
                                    <td className="product-price">
                                        <span className="order-summary-emphasis">1,200,000 đ</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="total-section">
                        <div className="total-line total-line-subtotal">
                            <span className="total-line-name">Tạm tính</span>
                            <span className="total-line-price">{formatToMoney(totalMoney)}</span>
                        </div>
                        <div className="total-line total-line-shipping">
                            <span className="total-line-name">Phí vận chuyển</span>
                            <span className="total-line-price">{formatToMoney(transportFee)}</span>
                        </div>
                        <div className="total-line total-line-footer">
                            <span className="total-line-name">Tổng cộng</span>
                            <span className="payment-due-price">{formatToMoney(transportFee + totalMoney)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout