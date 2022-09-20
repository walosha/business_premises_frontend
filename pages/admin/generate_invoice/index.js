import React from "react";
import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import { Page } from "components/Helmet/Helmet";
import GenerateBill from "components/Cards/GenerateBill";

function Tables() {
  return (
    <Page title={"Generate Bills"}>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <GenerateBill />
        </div>
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
