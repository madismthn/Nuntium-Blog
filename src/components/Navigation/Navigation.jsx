import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import s from "./style.module.css";

export default function Navigation() {
  return (
    <nav className={s.nav}>
      <div className={s.leftNav}>
        <img className={s.logo} src={Logo} alt="logo" />
        <NavLink className={s.navLink} to="/">
          Home
        </NavLink>
        <NavLink className={s.navLink} to="/articles">
          Articles
        </NavLink>
      </div>
      <div className={s.rightNav}>
        <button className={s.searchBtn}></button>
        <button className={s.loginBtn}>Login</button>
      </div>
    </nav>
  );
}
