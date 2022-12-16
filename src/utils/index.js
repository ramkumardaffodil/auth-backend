export const randomHash = () =>
  new Date().getTime().toString() +
  new Date().getTime().toString() +
  new Date().getTime().toString();

export const getErrorMessge = (error) => {
  let errorMessage = "";
  switch (error.name) {
    case "CastError":
      errorMessage = "Not authorized";
      break;
    default:
      errorMessage = "";
  }
  return errorMessage;
};
