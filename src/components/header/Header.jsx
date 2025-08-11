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
                  href="https://chat.whatsapp.com/FOU7kve5mtDIxrs3wWBq0m"
                  className="social-icon"
                  aria-label="Whatsapp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" x="90px" y="10px" width="50" height="50" viewBox="0 0 24 24">
    <path d="M19.077,4.928c-2.082-2.083-4.922-3.134-7.904-2.894C7.164,2.356,3.65,5.144,2.474,8.99 c-0.84,2.748-0.487,5.617,0.881,7.987L2.059,21.28c-0.124,0.413,0.253,0.802,0.67,0.691l4.504-1.207 c1.459,0.796,3.101,1.215,4.773,1.216h0.004c4.195,0,8.071-2.566,9.412-6.541C22.728,11.563,21.762,7.616,19.077,4.928z M16.898,15.554c-0.208,0.583-1.227,1.145-1.685,1.186c-0.458,0.042-0.887,0.207-2.995-0.624c-2.537-1-4.139-3.601-4.263-3.767 c-0.125-0.167-1.019-1.353-1.019-2.581S7.581,7.936,7.81,7.687c0.229-0.25,0.499-0.312,0.666-0.312c0.166,0,0.333,0,0.478,0.006 c0.178,0.007,0.375,0.016,0.562,0.431c0.222,0.494,0.707,1.728,0.769,1.853s0.104,0.271,0.021,0.437s-0.125,0.27-0.249,0.416 c-0.125,0.146-0.262,0.325-0.374,0.437c-0.125,0.124-0.255,0.26-0.11,0.509c0.146,0.25,0.646,1.067,1.388,1.728 c0.954,0.85,1.757,1.113,2.007,1.239c0.25,0.125,0.395,0.104,0.541-0.063c0.146-0.166,0.624-0.728,0.79-0.978 s0.333-0.208,0.562-0.125s1.456,0.687,1.705,0.812c0.25,0.125,0.416,0.187,0.478,0.291 C17.106,14.471,17.106,14.971,16.898,15.554z"></path>
</svg>


                </a>
                <a
                  target="_blank"
                  href="https://x.com/enoticiapara"
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
                  href="https://www.youtube.com/@enoticiapara"
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
                  href="https://www.instagram.com/enoticiapara"
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
                  href="https://t.me/+Dg8IdGPwsrg3Mzgx"
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
