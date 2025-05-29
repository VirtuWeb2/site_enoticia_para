import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "../dashboard.css";
import Cookies from "js-cookie";
import { GlobalContext } from "../../context/GlobalContext";
const Sidebar = ({
  route,
  setRoute,
  children,
}) => {
  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };
  const { currentUser, logout, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {sidebarActive, setSidebarActive} = useContext(GlobalContext)
  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    navigate("/admin");
  };
  useEffect(()=>{
    setSidebarActive(false)
  },[setSidebarActive])
  return (
    <>
      {/* <div className="sidebar-header">
        {sidebarActive && (
          <Link to="/" className="app-icon">
            <img src="../images/logo.png" alt="" />
          </Link>
        )}
      </div> */}

      <ul className="sidebar-list">
        {/* {sidebarActive && (
          <li className="sidebar-list-item user">
            <p>
              <span> Usuário: </span>
              {currentUser?.username}
            </p>
          </li>
        )} */}
        <li className="sidebar-list-item">
          <NavLink to={"/"} end>
            {/* <i className="fa-solid fa-house"></i> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff3333"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-house"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            {sidebarActive && "Início"}
          </NavLink>
        </li>
        {currentUser?.role === "admin" && (
          <li className="sidebar-list-item">
            <NavLink to={"/admin/usuarios"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff3333"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {sidebarActive && "Usuários"}
            </NavLink>
          </li>
        )}
        <li className="sidebar-list-item">
          <NavLink to={"/admin/noticias"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff3333"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-newspaper"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
            {sidebarActive && "Notícias"}
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to={"/admin/tv-posts"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff3333"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-tv"
            >
              <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
            {sidebarActive && "TvEN"}
          </NavLink>
        </li>

        {currentUser?.role === "admin" && (
          <li className="sidebar-list-item">
            <NavLink to={"/admin/anuncios"}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 7.99992V11.9999M10.25 5.49991H6.8C5.11984 5.49991 4.27976 5.49991 3.63803 5.82689C3.07354 6.11451 2.6146 6.57345 2.32698 7.13794C2 7.77968 2 8.61976 2 10.2999L2 11.4999C2 12.4318 2 12.8977 2.15224 13.2653C2.35523 13.7553 2.74458 14.1447 3.23463 14.3477C3.60218 14.4999 4.06812 14.4999 5 14.4999V18.7499C5 18.9821 5 19.0982 5.00963 19.1959C5.10316 20.1455 5.85441 20.8968 6.80397 20.9903C6.90175 20.9999 7.01783 20.9999 7.25 20.9999C7.48217 20.9999 7.59826 20.9999 7.69604 20.9903C8.64559 20.8968 9.39685 20.1455 9.49037 19.1959C9.5 19.0982 9.5 18.9821 9.5 18.7499V14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z"
                  stroke="#ff3333"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {sidebarActive && "Anuncíos"}
            </NavLink>
          </li>
        )}
        <li className="sidebar-list-item">
          <button
            // onClick={() => handleRouteChange("anuncios")}
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff3333"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            {sidebarActive && <span>Logout</span>}
          </button>
        </li>
        <li className="sidebar-list-item">
          <button
          // onClick={() => handleRouteChange("anuncios")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff3333"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-circle-user-round"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            {sidebarActive && currentUser?.username}
          </button>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
