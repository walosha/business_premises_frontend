import React, { Fragment } from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  BlobProvider,
} from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import invoice from "files/invoice";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const Invoice = ({ invoice }) => (
  <Document>
    <Page pageNumber={1} size="A4" style={styles.page}>
      {/* <Image style={styles.logo} src={logo} /> */}
      <InvoiceTitle title="Invoice" />
      <InvoiceNo invoice={invoice} />
      <BillTo invoice={invoice} />
      <InvoiceItemsTable invoice={invoice} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);

const InvoiceDoc = ({ data, isloading }) => {
  if (Object.keys(data).length < 1) {
    return null;
  }

  return (
    // <BlobProvider document={<Invoice invoice={invoice} />}>
    //   {({ url, loading, error }) => {
    //     if (loading) {
    //       return (
    //         <div
    //           style={{
    //             height: "100vh",
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <h1 style={{ marginLeft: "10px" }}>Generating receipt</h1>
    //         </div>
    //       );
    //     }

    //     if (!loading) {
    //       return (
    //         <div
    //           style={{
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             flexDirection: "column",
    //           }}
    //         >
    //           <div>
    //             <a style={styles} href={url} download={`payment-receipt.pdf`}>
    //               DOWNLOAD
    //             </a>
    //           </div>
    //         </div>
    //       );
    //     }
    //     if (error) {
    //       return <button>Receipt error</button>;
    //     }
    //     return null;
    //   }}
    // </BlobProvider>
    <Document>
      <Page pageNumber={1} size="A4" style={styles.page}>
        <Image style={styles.logo} src={"/img/pattern_nextjs.png"} />
        <InvoiceTitle title="Invoice" />
        <InvoiceNo invoice={data} />
        <BillTo invoice={data} />
        <InvoiceItemsTable invoice={data} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
};

export default InvoiceDoc;
