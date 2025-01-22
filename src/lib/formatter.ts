const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount / 100);
}

const numberFormatter = new Intl.NumberFormat("en-US");
export function formatNumber(amount: number) {
  return numberFormatter.format(amount);
}
