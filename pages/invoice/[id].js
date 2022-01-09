import React, { Fragment, useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Admin from "layouts/Admin";
import withAuth from "lib/Hoc/withAuth";
import { useRouter } from "next/router";
import Invoice from "../../components/reports/Invoice";
import axios from "axios";

function ViewInvoice() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    //if in Edit mode fetch the parmas ID and set form with values
    setLoading(true);
    axios
      .get(`/api/invoices?id=${id}`)
      .then((form) => {
        setInvoice(form.data?.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <PDFViewer width="100%" height="1000" className="app">
        <Invoice isLoading={isLoading} data={invoice} />
      </PDFViewer>
    </Fragment>
  );
}

function AdminDashboard() {
  return (
    <Admin>
      <ViewInvoice />
    </Admin>
  );
}

export default withAuth(AdminDashboard);
