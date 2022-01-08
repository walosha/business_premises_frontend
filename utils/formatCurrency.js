export const formatCurrency = (value, code) => {
  return new Intl.NumberFormat(code ? "ng-NG" : "en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};
