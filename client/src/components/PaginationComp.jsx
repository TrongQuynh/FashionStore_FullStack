import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

function PaginationComp(props) {
    let { currentPage, totalPage } = props;
    let items = [];

    if (currentPage > 1) {
        items.push(<Pagination.First key="first" onClick={() => props.onChangePage(1)} />)
        items.push(<Pagination.Prev key="prev" onClick={() => props.onChangePage(currentPage - 1)}></Pagination.Prev>);
    }

    let page = currentPage > 5 ? currentPage - 3 : 1;
    for (; page <= currentPage + 3 && page <= totalPage; page++) {
        let t = page;
        items.push(
            <Pagination.Item active={page === currentPage} key={page} onClick={() => props.onChangePage(t)}>
                {page}
            </Pagination.Item>
        )
    }

    if (currentPage < totalPage) {
        items.push(<Pagination.Next key="next" onClick={() => props.onChangePage(currentPage + 1)} />);
    }

    return (
        <Pagination className='justify-content-center'>
            {items}
        </Pagination>
    )
}

export default PaginationComp