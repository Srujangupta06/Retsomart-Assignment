const ALLOWED_FIELDS = ["title", "dueDate", "description", "status"];

const isEditAllowed = (data) => {
  const fields = Object.keys(data);
  const isValid = fields.every((field) => ALLOWED_FIELDS.includes(field));
  return isValid;
};

module.exports = { isEditAllowed };
