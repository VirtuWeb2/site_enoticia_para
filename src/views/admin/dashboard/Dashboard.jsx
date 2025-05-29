import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../context/authContext";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Sidebar from "./fragments/Sidebar";
import Users from "./pages/Users";
import News from "./pages/News";
import TvDash from "./pages/TvDash";
import Ad from "./pages/Ad";
import HomeDash from "./pages/HomeDash";
import Write from "./pages/Write";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";
import Edit from "./pages/Edit";
import Cookies from "js-cookie";
import gsap from "../../../lib/gsap";
import { GlobalContext } from "../context/GlobalContext";
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //ROTAS
  const [route, setRoute] = useState("noticias");

  // AUTENTICAÇÂO ADMIN
  const { currentUser, validateToken, loading, isLoggedIn } =
    useContext(AuthContext);
  // const [logado, setLogado] = useState(false);
  const baseUrl = "https://api-sites-en.vercel.app";

  useEffect(() => {
    validateToken();
  }, []);
  useEffect(() => {
    validateToken();
  }, [location]);

  // useEffect(() => {
  //   if (!loading && logado) {
  //     setLogado(true);
  //   }
  //   if(!loading && !logado){
  //     setLogado(false);
  //     navigate("/admin");
  //   }
  // }, [currentUser, navigate, loading, logado]);

  //CONST DATA
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [tv, setTv] = useState([]);
  const [ad, setAd] = useState([]);
  const { sidebarActive, setSidebarActive } = useContext(GlobalContext);
  const sideBar = useRef();
  //GET USERSv
  const getUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/admin/users`, {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (
      sidebarActive &&
      sideBar.current &&
      matchMedia("(min-width:1024px)").matches
    ) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".sidebar",
        { width: "6rem", flexBasis: "6rem" },
        {
          width: "24rem",
          flexBasis: "24rem",
          padding: "1rem",
          duration: 0.3,
          ease: "power2.inOut",
          fontSize: "0",
        }
      );
      tl.fromTo(
        ".sidebar-list-item",
        { opacity: 0 },
        { opacity: 1, stagger: 0.05, fontSize: "1.3rem", duration: 0.15 }
      );
    }
    if (
      !sidebarActive &&
      sideBar.current &&
      matchMedia("(min-width:1024px)").matches
    ) {
      gsap.fromTo(
        ".sidebar",
        { width: "24rem", flexBasis: "24rem" },
        { width: "6rem", flexBasis: "6rem", padding: "1rem" }
      );
    }
  }, [sidebarActive, sideBar]);

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  //GET NEWS
  const getNews = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/news`);
      setNews(res?.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getNews();
  }, []);

  //GET TV
  const getTv = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tv`);
      setTv(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTv();
  }, [setTv]);

  //GET AD
  const getAd = async () => {
    try {
      const res = await axios.get(`${baseUrl}/ad`);
      setAd(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAd();
  }, [setAd]);
  if (!loading && isLoggedIn)
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Dashboard | É NOTÍCIA</title>
          </Helmet>
        </HelmetProvider>

        {isLoggedIn && (
          <div className="app-container">
            <div
              ref={sideBar}
              className="sidebar"
              style={
                !sidebarActive && matchMedia("(min-width:1024px)").matches
                  ? { maxWidth: "6rem", flexBasis: "6rem", padding: "1rem" }
                  : {}
              }
              onMouseEnter={() => {
                if (matchMedia("(min-width:1024px)").matches) {
                  setSidebarActive(true);
                }
              }}
              onMouseLeave={() => {
                if (matchMedia("(min-width:1024px)").matches) {
                  setSidebarActive(false);
                }
              }}
            >
              <Sidebar
                route={route}
                setRoute={setRoute}
                sidebarActive={sidebarActive}
                setSidebarActive={setSidebarActive}
              />
            </div>
            <div className="app-content">
              {/* {route === "homedash" && <HomeDash />}
              {route === "usuarios" && (
                <Users getUsers={getUsers} users={users} setUsers={setUsers} />
              )}
              {route === "noticias" && (
                <News
                  route={route}
                  setRoute={setRoute}
                  news={news.sort((a, b) => b.id - a.id)}
                  getNews={getNews}
                  setNews={setNews}
                />
              )}
              {route === "nova-noticia" && <Write />}
              {route === "tv-posts" && (
                <TvDash tv={tv} setTv={setTv} getTv={getTv} />
              )}
              {route === "anuncios" && (
                <Ad ad={ad} setAd={setAd} getAd={getAd} />
              )}
              {route.startsWith("editar-noticia") && <Edit params={route} />} */}
              <Routes>
                <Route
                  path="/noticias"
                  element={
                    <News
                      news={news.sort((a, b) => b.id - a.id)}
                      getNews={getNews}
                      setNews={setNews}
                    />
                  }
                />
                <Route
                  path="/usuarios"
                  element={
                    <Users
                      getUsers={getUsers}
                      users={users}
                      setUsers={setUsers}
                    />
                  }
                />
                <Route path="/criar-noticia" element={<Write />} />
                <Route
                  path="/tv-posts"
                  element={<TvDash tv={tv} setTv={setTv} getTv={getTv} />}
                />
                <Route
                  path="/anuncios"
                  element={<Ad ad={ad} setAd={setAd} getAd={getAd} />}
                />
                <Route path="/editar-noticia/:noticiaId" element={<Edit />} />
              </Routes>
            </div>
          </div>
        )}

        <ToastContainer autoClose={3000} position="bottom-left" />
      </>
    );
  if (!loading && !isLoggedIn) return <Navigate to="/admin" />;
};

export default Dashboard;
