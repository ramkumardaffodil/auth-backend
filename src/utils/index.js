export const randomHash = () =>
  new Date().getTime().toString() +
  new Date().getTime().toString() +
  new Date().getTime().toString();

export const getErrorMessge = (error) => {
  console.log("error is ", error.name);
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
