import React, { Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Admin from "layouts/Admin";
import withAuth from "lib/Hoc/withAuth";
import { useRouter } from "next/router";
import Invoice from "../../components/reports/Invoice";
import invoice from "../../files/invoice";

function ViewInvoice() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Fragment>
      <PDFViewer width="100%" height="1000" className="app">
        <Invoice invoice={invoice} />
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
