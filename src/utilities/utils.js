import { orderBy, isEmpty, get } from "lodash";

const Utils = {
  getLocationIdentifer,
  getCostCenterName,
  showNotify,
  orderByPosition,
  getAccountNameDebtorContact,
  getEmployeeName,
  getDistance,
  getLocationIdFromHash,
  initLocationData,
};

function getLocationIdentifer(location = {}) {
  if (!location?.city) return "";
  const { city = "", street = "", number = "", suffix = "" } = location;
  return `${city} ${street} ${number} ${suffix}`;
}

function getCostCenterName(costCenter) {
  return costCenter ? `${costCenter.costIdentifier} - ${costCenter.name}` : "";
}

function showNotify(intl, notification) {
  return notification.key
    ? intl.formatMessage({ id: notification.key })
    : notification.message;
}

function orderByPosition(data) {
  return orderBy(data, [(item) => item.position || 0]);
}

function getAccountNameDebtorContact(debtorContact) {
  const { person, grouping } = debtorContact;

  if (!isEmpty(grouping)) {
    return get(grouping, "name");
  }

  if (!isEmpty(person)) {
    return `${get(person, "firstName")} ${get(person, "lastName")}`;
  }
}

function getEmployeeName(firstName, lastName) {
  return firstName + " " + lastName;
}

function getDistance(lat, zoom) {
  return (156543.03392 * Math.cos((lat * Math.PI) / 180)) / Math.pow(2, zoom);
}

function getLocationIdFromHash() {
  const hashUrl = window.location.hash;
  let locationId = "";

  if (hashUrl.indexOf("locationId=") >= 0) {
    locationId = hashUrl
      .substr(hashUrl.indexOf("locationId="), hashUrl.length)
      .replace("locationId=", "");
  }

  return locationId;
}

function initLocationData(data) {
  const { fullAddress, country, _id, id } = data;
  data["id"] = id || _id;
  data.label = fullAddress ? fullAddress : getLocationIdentifer(data);
  data.country = country?._id || "";
  return data;
}

export default Utils;
