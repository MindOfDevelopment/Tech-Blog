module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  isEqual: (a, b, options) => {
    return a == b ? options.fn(this) : options.inverse(this);
  },
};
