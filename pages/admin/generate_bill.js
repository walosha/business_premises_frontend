import React from "react";

// components

// import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import { Page } from "components/Helmet/Helmet";

function Tables() {
  return (
    <Page title={"Generate Bills"}>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">{/* <CardTable /> */}</div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </Page>
  );
}

function AdminTables() {
  return (
    <Admin>
      <Tables />
    </Admin>
  );
}

export default withAuth(AdminTables);
