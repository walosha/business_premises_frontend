import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { formatCurrency } from "utils/formatCurrency";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 9,
    textAlign: "center",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
  },
});

const InvoiceThankYouMsg = ({ invoice }) => {
  const canvas = document.createElement("canvas");
  QRCode.toCanvas(
    canvas,
    `MDA: ${invoice.invoice_id.mda_id} with Revenue Item ${
      invoice.invoice_id.tax_item_id
    } was paid by ${
      invoice.invoice_id.business_id.name
    } the amount paid ${formatCurrency(invoice.amount)}`
  );
  const qr = canvas.toDataURL();
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>Thank you for your business</Text>
      <Image style={styles.logo} source={{ uri: qr }} />
    </View>
  );
};

export default InvoiceThankYouMsg;
