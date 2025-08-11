import React from "react";
import "./socialmedia.css";

const SocialMedia = () => {
  return (
    <section className="social">
      {/* Facebook - Direto para curtir */}
      <a
        href="https://www.facebook.com/enoticiapara"
        target="_blank"
        rel="noreferrer"
        className="socBox facebook"
      >
        <i className="fa-brands fa-facebook-f"></i>
        <span>Curta nossa Pagina no Facebook</span>
      </a>
      {/* Whatsapp - Direto para entrar no canal */}
      <a
        href="https://whatsapp.com/channel/0029Vaz5nS6EquiGd2jMQS3w"
        target="_blank"
        rel="noreferrer"
        className="socBox whatsapp"
      >
        <i className="fa-brands fa-whatsapp"></i>
        <span>Curta nossa Pagina no Facebook</span>
      </a>

      {/* Telegram - Direto para entrar no canal */}
      <a
        href="https://t.me/+Dg8IdGPwsrg3Mzgx"
        target="_blank"
        rel="noreferrer"
        className="socBox telegram"
      >
        <i className="fa-brands fa-telegram"></i>
        <span>Entrar no Canal</span>
      </a>

      {/* X (Twitter) - Direto para seguir com confirmação */}
      <a
        href="https://x.com/enoticiapara"
        target="_blank"
        rel="noreferrer"
        className="socBox twitter"
      >
        <i className="fa-brands fa-x-twitter"></i>
        <span>Siga-nos no X</span>
      </a>

      {/* Instagram - Direto para seguir com confirmação */}
      <a
        href="https://www.instagram.com/enoticiapara"
        target="_blank"
        rel="noreferrer"
        className="socBox instagram"
      >
        <i className="fa-brands fa-instagram"></i>
        <span>Siga-nos no Instagram</span>
      </a>

      {/* TikTok - Direto para seguir com popup */}
      <a
        href="https://www.tiktok.com/@enoticia_pa?_t=ZM-8yn8L61WyBE&_r=1"
        target="_blank"
        rel="noreferrer"
        className="socBox tiktok"
      >
        <i className="fa-brands fa-tiktok"></i>
        <span>Siga-nos no TikTok</span>
      </a>

      {/* YouTube - Direto para inscrição (já perfeito) */}
      <a
        href="https://www.youtube.com/@enoticiapara"
        target="_blank"
        rel="noreferrer"
        className="socBox youtube"
      >
        <i className="fa-brands fa-youtube"></i>
        <span>Inscreva-se no YouTube</span>
      </a>
    </section>
  );
};

export default SocialMedia;
