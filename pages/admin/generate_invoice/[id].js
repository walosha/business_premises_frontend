import React from "react";

// components

// import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import { Page } from "components/Helmet/Helmet";
import GenerateBill from "components/Cards/GenerateBill";
import { useRouter } from "next/router";

function Tables() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Page title={"Generate Bills"}>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <GenerateBill paramsId={id} />
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
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
