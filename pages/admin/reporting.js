import React, { useEffect, useState } from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import CardTable from "components/Cards/CardTable";
import axios from "axios";
import { Page } from "components/Helmet/Helmet";
import ReactPaginate from "react-paginate";

function Maps() {
  const [businesses, setBusinesses] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [page, setPage] = useState({
    count: 3,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    next: null,
    pageCount: 1,
    perPage: 50,
    prev: null,
  });
  useEffect(() => {
    axios
      .get(`/api/businesses?page=${pageOffset}`)
      .then((response) => {
        setBusinesses(response.data.data.data);
        setPage(response.data.data.page);
      })
      .catch(console.log);
  }, []);

  const handlePageChange = (event) => {
    // when its content is loaded in useEffect.
    setPageOffset(event.selected);
  };
  return (
    <Page title={"Bisness Register"}>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardTable data={businesses} />
          </div>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={page.pageCount}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination flex"
            activeClassName="active"
            // forcePage={pageOffset}
          />
        </div>
      </div>
    </Page>
  );
}

function AdminMaps() {
  return (
    <Admin>
      <Maps />
    </Admin>
  );
}

export default withAuth(AdminMaps);
