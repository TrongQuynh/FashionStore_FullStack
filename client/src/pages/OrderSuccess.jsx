import React, { useEffect, useMemo, useState } from 'react'

import { FaAward } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import "../assets/css/OrderSuccess.css";

import { Link, useParams } from "react-router-dom"

import { formatToMoney } from "../helpers/index";

function OrderSuccess() {
    const [userID, setUserID] = useState("u_19841");
    const [order, setOrder] = useState();
    const [totalMoney, setTotalMoney] = useState(0);
    const { orderCode } = useParams();
    
    useEffect(function () {
        (async () => {
            let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/order/${orderCode}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'userID': userID
                }
            });
            let data = await res.json();
            setOrder(data.order[0]);
            let result = 0;
            for (let product of data.order[0].products) {
                result += (product.price * product.quantity);
            }
            setTotalMoney(result);
            console.log(data.order[0]);
        })();
    }, [])
    // const totalMoney = useMemo(function(){
    //     // if(!order) return 0;
    //     let result = 0;
    //     for(let product of order.products){
    //         result += (product.price * product.quantity);
    //     }
    //     return result;
    // },[]);
    return (
        <div className='order_success_box'>
            <div>
                <span className='icon'><FaAward /></span>
            </div>
            <div>
                <h5><i>Đặt Hàng Thành Công</i></h5>
            </div>
            <div className='row'>
                <div>OrderID: <i>{order ? order.orderCode : ""}</i></div>
            </div>
            <div className='row'>
                <div className='header usernameHeader'>Tên người nhận</div>
                <div className='username'>{order ? order.username : ""}</div>
            </div>
            <div className='row'>
                <div className='header addressHeader'>Địa Chỉ</div>
                <div className='fullAddress'><i>{order ? order.address.detail : ""}</i></div>
                <ul className='addressList'>
                    <li className='address'>
                        <b>Phương</b>
                        <span>{order ? order.address.ward : ""}</span>
                    </li>
                    <li className='address'>
                        <b>Quan</b>
                        <span>{order ? order.address.district : ""}</span>
                    </li>
                    <li className='address'>
                        <b>Thanh Pho</b>
                        <span>{order ? order.address.province : ""}</span>
                    </li>
                </ul>
            </div>
            <div className='row'>
                <div className='header usernameHeader'>Tổng số tiền</div>
                <div className='totalMoney'>{formatToMoney(totalMoney)}</div>
            </div>
            <div className="row">
                <Link to="/" className='btn_Back'>Tiếp tục mua hàng</Link>
            </div>
        </div>
    )
}

export default OrderSuccess