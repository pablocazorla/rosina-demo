const statusTypes = [
  {
    value: "pending",
    text: "Pendiente", // Pendiente
    textCharge: "Pendiente", // Pendiente
    color: "#ea580c",
  },
  {
    value: "ended",
    text: "Finalizado (por cobrar)", // Finalizado
    textCharge: "Finalizado", // Finalizado
    color: "#16a34a",
  },
  {
    value: "completed",
    text: "Completado (cobrado)", // Completado
    textCharge: "Cobrado", // Completado
    color: "#007c6c",
  },
  {
    value: "cancelled",
    text: "Cancelado", // Cancelado
    textCharge: "Cancelado", // Cancelado
    color: "#dc2626",
  },
];

export default statusTypes;
