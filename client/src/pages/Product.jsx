import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProductCart from '../components/ProductCart';
import "../assets/css/Product.css";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import PaginationComp from '../components/PaginationComp';

function Product() {
  const [userID, setUserID] = useState("u_19841");

  const [products, setProducts] = useState([]);

  // const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const searchParams = new URLSearchParams(window.location.search);
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const { collection } = useParams();

  const navigate = useNavigate();

  useEffect(function () {
    (async () => {
      let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/product/${collection}?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'userID': userID
        }
      });

      let data = await res.json();
      console.log(data);
      setProducts(data.products);
      // setCurrentPage(data.currentPage);
      setTotalPage(data.totalPage);
    })();
  }, [currentPage]);

  function onHandleChangePage(page){
    navigate(`/product/${collection}?page=${page}`);
  }

  return (
    <div>
      <Header />

      <div className='product_collection_box'>
        <Row>
          {
            products.length > 0 ?
              (
                products.map(function (product, index) {
                  return (
                    <Col key={index} xs={2} className='mb-2'>
                      <ProductCart {...product} />
                    </Col>
                  )
                })
              ) :
              ""
          }
        </Row>

        <div className='text-center'>
          <PaginationComp currentPage={currentPage} totalPage={totalPage} onChangePage={onHandleChangePage}/>
        </div>
      </div>

    </div>
  )
}

export default Product