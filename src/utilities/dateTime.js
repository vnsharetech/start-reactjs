import moment from "moment";
const FORMAT_DATE = "DD/MM/YYYY";
const dateTimeFormat = {
  startDate: (date) =>
    moment(moment(date).format("YYYY-MM-DDT00:00:00.000") + "Z").toISOString(),
  endDate: (date) =>
    moment(moment(date).format("YYYY-MM-DDT23:59:59.999") + "Z").toISOString(),
  parseStartTime: (date, format = FORMAT_DATE) => moment(date).format(format),
  parseEndTime: (date, format = FORMAT_DATE) =>
    moment(date).utc(0).endOf("day").format(format),
  // moment(date).subtract(1, "days").format(format),
  parseStartTimeUtc: (date, format = FORMAT_DATE) =>
    date && moment(date).isValid()
      ? moment(date).utc(0).startOf("day").format(format)
      : "",
};

export default dateTimeFormat;
