import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../assets/css/InfoProduct.css";

import { FaTruck, FaPhoneAlt, FaExchangeAlt } from "react-icons/fa";
import { formatToMoney } from "../helpers/index";
function InfoProduct(product) {
    const [indexType, setIndexType] = useState(0);
    const [indexSize, setIndexSize] = useState(0);

    const [color, setColor] = useState(product.types[0].color);
    const [quantity, setQuantity] = useState(product.types[0].sizes[0].quantity);
    const [size, setSize] = useState(product.types[0].sizes[0].size);

    const setQuantityAndSize = (quantity, size, index) => {
        setIndexSize(index);
        // setQuantity(e.target.getAttribute("data-quantity"));
        // setSize(e.target.getAttribute("data-size"))
        setQuantity(quantity);
        setSize(size);
    }

    const chooseColor = (index, color) => {
        setColor(color);
        setIndexType(index)
        let quantity = product.types[index].sizes[indexSize].quantity;
        setQuantity(quantity);
    }


    const addToCart = (code,name,price,image) => {
        product.onHandleAddToCart({
            "productCode": code,
            "name": name,
            "price": price,
            "size": size,
            "quantity": 1,
            "color": color,
            "image": image
        });
    }
    return (
        <div className='productInfo'>
            <Row>
                <Col xs={7}>
                    <span className='productName'>{product.name}</span>
                </Col>
                <Col xs={5}>
                    <span>Rating</span>
                </Col>
            </Row>
            <div>
                <span className="productCode">SKU: {product.code}</span>
                <br />
                <span className="productPrice">{formatToMoney(product.price)}</span>
            </div>
            <div>
                <b>Màu sắc</b>
                <ul className='colorOption'>
                    {
                        product ?
                            (
                                product.types.map(function (value, index) {
                                    return (
                                        <li className='colorItem' onClick={() => chooseColor(index, value.color)} key={index}>
                                            <img className='colorImage' src={value.image} alt="" />
                                            <span className='colorText'>{value.color}</span>
                                            <span className={`selected ${value.color === color ? "active" : ""}`}></span>
                                        </li>
                                    )
                                })
                            )
                            :
                            ""
                    }
                </ul>
            </div>

            <div>
                <b>Kích thước</b>
                <ul className='sizeOption'>
                    {
                        product ?
                            (
                                product.types[indexType].sizes.map(function (s, index) {
                                    return (
                                        <li className='sizeItem' onClick={(e) => { setQuantityAndSize(s.quantity, s.size, index) }} data-quantity={s.quantity} data-size={s.size} key={index}>
                                            <span className='sizeText'>{s.size}</span>
                                            <span className={`selected ${size === s.size ? "active" : ""}`}></span>
                                        </li>
                                    )
                                })
                            )
                            :
                            ""
                    }
                </ul>
            </div>

            <div className='productQuantity'>
                <b>Thông Số Sản Phẩm</b>
                <br />
                <span>Sản phẩm tồn kho: {quantity}</span>
            </div>

            <div>
                <button id='btn_AddCart' onClick={() => { addToCart(product.code,product.name,product.price,product.images[0]) }}>Thêm vào giỏ hàng</button>
            </div>

            <div className='otherInfo'>
                <ul>
                    <li>
                        <span className='icon'><FaTruck /></span>
                        <span className='info'>Miễn phí giao hàng với đơn hàng trên 500.000₫</span>
                    </li>
                    <li>
                        <span className='icon'><FaPhoneAlt /></span>
                        <span className='info'>028 73076 464</span>
                    </li>
                    <li>
                        <span className='icon'><FaExchangeAlt /></span>
                        <span className='info'>Chính sách đổi trả hàng</span>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default InfoProduct;