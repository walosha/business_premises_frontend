import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
// import CardProfile from "components/Cards/CardProfile.js";

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import { Page } from "components/Helmet/Helmet";

function Settings() {
  return (
    <Page title={"Business Registration"}>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardSettings />
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </Page>
  );
}

function AdminSettings() {
  return (
    <Admin>
      <Settings />
    </Admin>
  );
}
export default withAuth(AdminSettings);
