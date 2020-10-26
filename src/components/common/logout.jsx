import auth from "../../services/authService";

const Logout = (props) => {
  auth.loguot();
  window.location = "/";
  return null;
};

export default Logout;
