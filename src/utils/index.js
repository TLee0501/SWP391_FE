import moment from "moment/moment";

export const formatDate = (date, pattern) => {
  const result = moment(date).format(pattern);
  return result;
};
