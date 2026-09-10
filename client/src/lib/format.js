// Prices are stored/transferred in paise (integer) — this renders them as rupees.
export function formatPaise(paise) {
  const value = (Number(paise) || 0) / 100;
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
