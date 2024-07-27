const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-CA", options);
};

module.exports = {
  formatDate,
};
