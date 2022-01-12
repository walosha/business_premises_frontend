import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "50%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ item }) => (
  <Fragment>
    <View style={styles.row}>
      <Text style={styles.description}>MDA</Text>
      <Text style={styles.qty}>{item.mda_id}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Revenue Item</Text>
      <Text style={styles.qty}>{item.tax_item_id}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}> Amount</Text>
      <Text style={styles.qty}>{item.amount}</Text>
    </View>
  </Fragment>
);

export default InvoiceTableRow;
