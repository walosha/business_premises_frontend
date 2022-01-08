import React, { useEffect, useState } from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import CardTable from "components/Cards/Invoice";
import { Page } from "components/Helmet/Helmet";
import axios from "axios";

function Maps() {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    axios
      .get("/api/invoices")
      .then((response) => {
        setInvoices(response.data.data);
      })
      .catch(console.log);
  }, []);

  console.log({ invoices });
  return (
    <Page title={"Invoices"}>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardTable data={invoices} />
          </div>
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
