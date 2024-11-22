const moneyString = (amount) => {
  const num = parseFloat(amount);
  return num.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};

export default moneyString;
