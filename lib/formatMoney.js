export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: 2,
  }
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0
  }

  const formatter = Intl.NumberFormat('ro-RO', options)
  return formatter.format(amount / 100);
}
