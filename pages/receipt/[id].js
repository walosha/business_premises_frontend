import React, { Fragment, useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Admin from "layouts/Admin";
import withAuth from "lib/Hoc/withAuth";
import { useRouter } from "next/router";
import Receipt from "../../components/receipt/Receipt";
import axios from "axios";

function ViewReceipt() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState({});

  useEffect(() => {
    //if in Edit mode fetch the parmas ID and set form with values
    setLoading(true);
    axios
      .get(`/api/payments?id=${id}`)
      .then((form) => {
        setReceipt(form.data?.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <PDFViewer width="100%" height="1000" className="app">
        <Receipt isLoading={isLoading} data={receipt} />
      </PDFViewer>
    </Fragment>
  );
}

function AdminDashboard() {
  return (
    <Admin>
      <ViewReceipt />
    </Admin>
  );
}

export default withAuth(AdminDashboard);
