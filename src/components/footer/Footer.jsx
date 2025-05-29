import React from "react";
import LinksFooter from "./LinksFooter";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="containerFooter">
          <nav className="linksBox">
            <h1>
              <i className="fa-solid fa-filter"></i> EN Munícipais:
            </h1>
            <LinksFooter />
          </nav>

          <section className="box">
            <div className="logo">
              <img src="../images/logo.png" alt="" />
            </div>
            <div className="text">
              <p>
                Deseja anunciar aqui? entre em contato com nossa central de
                atendimento.
              </p>
              <span>
                <i className="fa fa-envelope"></i> contato@enoticiapara.com.br
              </span>
              <br />
              <span>
                <i className="fa fa-headphones"></i> +55 (91) 982240561
              </span>
            </div>
          </section>
        </div>
      </footer>

      <div className="legal  ">
        <div
          className="container flexSB"
          style={{ flexDirection: "column", width: "100%" }}
        >
          <div className="footer-links">
            <Link to="/termos-de-uso">Termos de Uso</Link>
            <span> | </span>
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
          </div>
          <p>© 2025 - Todos os direitos reservados para Virtù Conect</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
