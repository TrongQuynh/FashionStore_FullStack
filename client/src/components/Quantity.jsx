import React, { useState } from 'react'
import style from "../assets/css/Quantity.module.css";
function Quantity(props) {
    // const [quantity, setQuantity] = useState(props.quantity);
    // console.log("re render ShoppingCart: " + quantity);
    function updateQuantity(productCartID,quantity){
        // console.log(quantity);
        props.onHandleQuantity(productCartID,quantity)
        console.log("Pre set: " + quantity);
        // setQuantity(quantity)
    }
  return (
    <div className={style.amount_box}>
        <button className={style.btn_decrease} onClick={()=>updateQuantity(props.productCartID,Number(props.quantity) - 1)}>-</button>
        <input type="number" value={props.quantity} className={style.txt_amount} disabled />
        <button className={style.btn_increase} onClick={()=>updateQuantity(props.productCartID,Number(props.quantity) + 1)}>+</button>
    </div>
  )
}

export default Quantity