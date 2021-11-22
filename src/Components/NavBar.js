import { NavBarData } from "./NavBarData";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="sideBar">
      {NavBarData.map((val, key) => {
        return (
          <ul>
            <li>
              <Link
                key={key}
                className={`test ${val.icon}`}
                to="https://www.facebook.com/MauiVisionRentals"
              >
                <div>{val.title}</div>
              </Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default NavBar;
