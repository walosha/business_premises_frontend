import React, { useEffect, useState } from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";
import withAuth from "lib/Hoc/withAuth";
import CardTable from "components/Cards/CardTable";
import axios from "axios";

function Maps() {
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    axios
      .get("/api/businesses")
      .then((response) => {
        setBusinesses(response.data.data);
      })
      .catch(console.log);
  }, []);

  console.log({ businesses });
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardTable data={businesses} />
          </div>
        </div>
      </div>
    </>
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
