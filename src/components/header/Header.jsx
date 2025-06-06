import React, { useState } from "react";
import Head from "./Head";
import { Link, useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [navbar, setnavbar] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <Head />
      <header>
        <div className="container paddingSmall">
          <div className="header-content">
            <nav>
              <ul
                className={navbar ? "navbar" : "flex"}
                onClick={() => setnavbar(false)}
              >
                <li>{pathname !== "/" && <Link to="/">Home</Link>}</li>
                <li>
                  {pathname !== "/regioes" && (
                    <Link to="/regioes">Regiões</Link>
                  )}
                </li>
                <li>
                  {pathname !== "/tv-en-para" && (
                    <Link to="/tv-en-para">Tv é notícia Pará</Link>
                  )}
                </li>
                <li>
                  {pathname !== "/politica" && (
                    <Link to="/politica">Política</Link>
                  )}
                </li>
                <li>
                  {pathname !== "/seguranca" && (
                    <Link to="/seguranca">Segurança</Link>
                  )}
                </li>
                <li>
                  {pathname !== "/esportes" && (
                    <Link to="/esportes">Esportes</Link>
                  )}
                </li>
                <li>{pathname !== "/foco" && <Link to="/foco">Foco</Link>}</li>
              </ul>
            </nav>

            <div className="header-right">
              <div className="social-icons">
                <a
                  target="_blank"
                  href="https://www.facebook.com/enoticiapara"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 320 512">
                    <path
                      fill="currentColor"
                      d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                    />
                  </svg>
                </a>
                <a
                  target="_blank"
                  href="https://x.com/i/flow/login?redirect_after_login=%2Fenoticiapara"
                  className="social-icon"
                  aria-label="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24">
                    <g>
                      <path
                        fill="currentColor"
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      />
                    </g>
                  </svg>
                </a>
                <a
                  target="_blank"
                  href="https://www.youtube.com/@enoticiapara8977"
                  className="social-icon"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 576 512">
                    <path
                      fill="currentColor"
                      d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                    />
                  </svg>
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/enoticiapara/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D#"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 448 512">
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    />
                  </svg>
                </a>
                <a
                  target="_blank"
                  href="https://t.me/+Dg8ldGPwsrg3Mzgx"
                  className="social-icon"
                  aria-label="Telegram"
                >
                  <svg viewBox="0 0 448 512">
                    <path
                      fill="currentColor"
                      d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
                    />
                  </svg>
                </a>
              </div>

              <div className="searchButton">
                {pathname !== "/search" && (
                  <Link to="/search">
                    <i className="fa-solid fa-magnifying-glass"></i> Pesquisar
                  </Link>
                )}
              </div>
            </div>

            <button className="barIco" onClick={() => setnavbar(!navbar)}>
              {navbar ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
