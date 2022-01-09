import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{invoice.business_id.name}</Text>
    <Text>{invoice.business_id.address}</Text>
    {/* <Text>{invoice.business_id.phone || "N/A"}</Text>
    <Text>{invoice.business_id.email || "N/A"}</Text> */}
  </View>
);

export default BillTo;
