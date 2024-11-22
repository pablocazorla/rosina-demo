import parsePhoneNumber from "libphonenumber-js";

export const formatPhone = (phone) => {
  if (!phone) return "-";
  const phoneNumber = parsePhoneNumber(phone);
  return phoneNumber?.formatInternational() || phone;
};
