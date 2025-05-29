import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthContext } from "../context/authContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../components/helpers/Loader"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);
  const [seePassword, setSeePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login, currentUser, setCurrentUser, setIsLoggedIn, isLoggedIn, loading, validateToken } = useContext(AuthContext);
  const timeOut = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email && password){
      setIsLoading(true)
      try {
        const res = await axios.post(`https://api-sites-en.vercel.app/login`, {
          email,
          password,
        });
        setCurrentUser({
          token: res.data.token,
          email: res.data.user.email,
          username: res.data.user.username,
        });
        Cookies.set("authToken", res.data.token, {expires: 7, secure: true});
        clearTimeout(timeOut.current);
        timeOut.current = setTimeout(() => {
          setIsLoggedIn(true)
          navigate("/admin/noticias");
        }, 3000);
        toast.success("Login efetuado com sucesso");
      } catch (err) {
        toast.error("Email ou senha incorretos");
      }finally{
        setIsLoading(false)
      }
    }
  };
useEffect(()=>{
validateToken()
},[])
if(loading) return null
if(isLoading) return <Loader />
if(isLoggedIn) return (<Navigate to="/admin/noticias" />)
return (
  <>
    <HelmetProvider>
      <Helmet>
        <title>Login | É NOTÍCIA</title>
      </Helmet>
    </HelmetProvider>

    <div className="container-login">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <Link to="/" className="login-logo">
              <img src="../images/logo.png" alt="" />
            </Link>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="email"
                className="login__input"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type={`${seePassword ? "text" : "password"}`}
                className="login__input"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                onClick={() => setSeePassword(!seePassword)}
                style={{
                  position: "absolute",
                  right: "25%",
                  bottom: "40%",
                  cursor: "pointer",
                  color: "#c45048",
                }}
                className={`fa-solid fa-${seePassword ? "eye-slash" : "eye"}`}
              ></i>
            </div>
            <p>{err}</p>
            <button onClick={handleSubmit} className="button login__submit">
              <span className="button__text">Fazer Login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>

        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
    <ToastContainer autoClose={3000} position="bottom-right" />
  </>
);
};

export default Login;
