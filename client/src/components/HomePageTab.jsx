
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'

import { FaAngleDown } from 'react-icons/fa';

import style from "../assets/css/HomePageTab.module.css";
import Loading from './Loading';
function HomePageTab() {
    const [collection, setCollection] = useState([]);
    useEffect(function () {
        (async () => {
            let res = await fetch(`${process.env.REACT_APP_API_IMG_LIST}`);
            setCollection((await res.json()).images);
        })();
    })
    return (
        <div className={style.homepage_tab}>
            <img style={{ maxWidth: "1463px", maxHeight: "557px" }} src={require("../assets/imgs/slideshow_4.webp")} alt="" />
            <Tabs
                defaultActiveKey="home"
                id="justify-tab-example"
                className="mb-5 mt-3"
                justify
            >
                <Tab eventKey="home" title="Outfit Of The Day">
                    <div>
                        <Row>
                            {
                                collection.length > 0 ?
                                collection.map(function (album, index) {
                                    if(index > 7) return;
                                    return (
                                        <Col xs={3} key={index} >
                                            <img className={style.item_Collection} src={`https://mixmatch.bluecore.vn/${album.image_Url}`} alt={album.category_Name} />
                                        </Col>
                                    );
                                })
                                :
                                <Loading/>
                            }
                            <Col xs={12}><h5 className='text-center'>Xem Them <FaAngleDown/></h5></Col>
                        </Row>
                    </div>
                </Tab>
                <Tab eventKey="profile" title="Sale 50%">
                    Home Tab 2
                </Tab>
            </Tabs>
        </div>
    )
}

export default HomePageTab