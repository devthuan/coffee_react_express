import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faPeopleRoof,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const listMenuManagement = [
    { route: "/dashboard", name: "Bảng điều kiển", icon: faGauge },
    {
      route: "/statistics-order",
      name: "Thống kê đơn hàng",
      icon: faCartShopping,
    },
    {
      route: "/user-management",
      name: "Quản lý thành viên",
      icon: faPeopleRoof,
    },
    {
      route: "/management-order",
      name: "Quản lý giỏ hàng",
      icon: faCartShopping,
    },
  ];

  const handleClickLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content")}>
          <ul className={cx("list")}>
            {listMenuManagement &&
              listMenuManagement.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={cx(
                      "item",
                      item.route === location.pathname ? "active" : ""
                    )}
                  >
                    <NavLink to={item.route} className={cx("link")}>
                      <FontAwesomeIcon
                        className={cx("icon")}
                        icon={item.icon}
                      />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}

            <li onClick={() => handleClickLogout()} className={cx("item")}>
              <a className={cx("link", "logout")} href="/">
                <FontAwesomeIcon
                  className={cx("icon")}
                  icon={faRightFromBracket}
                />
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
