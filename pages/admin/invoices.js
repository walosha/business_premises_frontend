import React, { useEffect, useState } from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import InvoiceTable from "components/Cards/Invoice";
import { Page } from "components/Helmet/Helmet";

function Maps() {
  return (
    <Page title={"Invoices"}>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <InvoiceTable />
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
