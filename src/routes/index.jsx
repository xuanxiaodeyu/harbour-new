//import Pages from "layouts/Pages.jsx";
import RTL from "layouts/RTL.jsx";
import Dashboard from "layouts/Dashboard.jsx";
import LoginPage  from '../LoginPage.jsx';
import  RegisterPage  from '../RegisterPage.jsx';
import ButtonBases from 'containers/App/FirstPage.jsx'

var indexRoutes = [
  { path: "/rtl", name: "RTL", component: RTL },
  //{ path: "/pages", name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Dashboard },
    { path: "/login", name: "Login", component: LoginPage },
    { path: "/register", name: "Register", component: RegisterPage },
    { path: "/firstpage", name: "Firstpage", component: ButtonBases }
];

export default indexRoutes;
