import React, { useEffect, useState } from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import InvoiceTable from "components/Cards/Invoice";
import { Page } from "components/Helmet/Helmet";
import ReactPaginate from "react-paginate";
import axios from "axios";

function Maps() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setLoading] = useState(false);
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
    setLoading(true);
    axios
      .get(`/api/invoices?page=${pageOffset}`)
      .then((response) => {
        setInvoices(response.data.data.data);
        setPage(response.data.data.page);
        setLoading(false);
      })
      .catch((err) => setLoading(true));
  }, []);

  const handlePageChange = (event) => {
    // when its content is loaded in useEffect.
    setPageOffset(event.selected);
  };
  return (
    <Page title={"Invoices"}>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <InvoiceTable invoices={invoices} isLoading={isLoading} />
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
