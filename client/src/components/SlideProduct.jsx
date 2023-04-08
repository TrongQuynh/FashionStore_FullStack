import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../assets/css/ProductDetail.css";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SlideProduct(data) {
    console.log(data.images)
    const [currentImage, setCurrentImage] = useState(data.images[0]);
    const [images, setImages] = useState(data.images);

    var settings = {
        className: "center",
        // centerMode: true,
        // infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        vertical: true,
        verticalSwiping: true,
    };

    return (
        <div>
            <h2>Custom Paging</h2>
            <Row>
                <Col xs={5}>
                    <Slider {...settings}>
                        {
                            !images || images.length == 0 ?
                            "Note found"
                            :
                            images.map(function (image, index) {
                                return (
                                    <div key={index}>
                                        <img className="imgProduct" onClick={(e) => { setCurrentImage(e.target.getAttribute('src')) }} src={image} />
                                    </div>
                                );
                            })

                            
                        }
                    </Slider>
                </Col>
                <Col xs={7}>
                    <img className='imgProduct_active' src={currentImage} id="current_img" alt="" />
                </Col>
            </Row>
        </div>
    )
}

export default SlideProduct;