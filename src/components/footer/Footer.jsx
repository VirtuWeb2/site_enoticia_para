import React from "react";
import LinksFooter from "./LinksFooter";
import LinksFooterRegioes from "./LinksFooterRegioes";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="containerFooter">
          {/* EN Regiões - Esquerda */}
          <div className="linksRegioes">
            <h1>
              <i className="fa-solid fa-filter"></i> EN Regiões:
            </h1>
            <LinksFooterRegioes />
          </div>

          {/* EN Municipais - Centro */}
          <div className="linksMunicipios">
            <h1>
              <i className="fa-solid fa-filter"></i> EN Munícipais:
            </h1>
            <LinksFooter />
          </div>

          {/* Logo e Texto - Direita */}
          <section className="box">
            <div className="logo">
              <img src="../images/logo.png" alt="Logo" />
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

      <div className="legal">
        <div
          className="container flexSB"
          style={{ flexDirection: "column", width: "100%" }}
        >
          <div className="footer-links">
            <Link to="/termos-de-uso">Termos de Uso</Link>
            <span> | </span>
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
          </div>
          <p>© 2025 - Todos os direitos reservados para É Notícia Pará</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
