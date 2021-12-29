import React from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import CardTable from "components/Cards/CardTable";
import { Page } from "components/Helmet/Helmet";

function Maps() {
  return (
    <Page title={"Payments"}>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardTable data={[]} />
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
