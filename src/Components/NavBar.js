import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../images/MVLogo.png";

const NavBar = () => {
  let location = useLocation();

  return (
    <div className="sideBar">
      <ul className="sideBarList">
        <div className="logo">
          <img src={logo} width="100%" />
        </div>

        {NavBarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={location.pathname == val.link ? "active" : ""}
              onClick={console.log(location.pathname)}
            >
              <Link className="link" to={val.link}>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavBar;
