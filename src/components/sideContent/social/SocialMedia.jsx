import React from "react";
import "./socialmedia.css";

const SocialMedia = () => {
  return (
    <section className="social">
      {/* Facebook - Direto para curtir */}
      <a
        href="https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fenoticiapara%2F%3Fshow_switched_toast%3Dtrue"
        target="_blank"
        rel="noreferrer"
        className="socBox facebook"
      >
        <i className="fa-brands fa-facebook-f"></i>
        <span>Inscrever no Facebook</span>
      </a>

      {/* Telegram - Direto para entrar no canal */}
      <a
        href="https://t.me/+Dg8ldGPwsrg3Mzgx"
        target="_blank"
        rel="noreferrer"
        className="socBox telegram"
      >
        <i className="fa-brands fa-telegram"></i>
        <span>Entrar no Canal</span>
      </a>

      {/* X (Twitter) - Direto para seguir com confirmação */}
      <a
        href="https://twitter.com/intent/follow?screen_name=enoticiapara&tw_p=followbutton&ref_src=twsrc%5Etfw"
        target="_blank"
        rel="noreferrer"
        className="socBox twitter"
      >
        <i className="fa-brands fa-x-twitter"></i>
        <span>Inscrever-se no X</span>
      </a>

      {/* Instagram - Direto para seguir com confirmação */}
      <a
        href="https://www.instagram.com/enoticiapara/?action=follow"
        target="_blank"
        rel="noreferrer"
        className="socBox instagram"
      >
        <i className="fa-brands fa-instagram"></i>
        <span>Inscrever-se no Instagram</span>
      </a>

      {/* TikTok - Direto para seguir com popup */}
      <a
        href="https://www.tiktok.com/@en_para?refer=follow&modal=follow"
        target="_blank"
        rel="noreferrer"
        className="socBox tiktok"
      >
        <i className="fa-brands fa-tiktok"></i>
        <span>Inscrever-se no TikTok</span>
      </a>

      {/* YouTube - Direto para inscrição (já perfeito) */}
      <a
        href="https://www.youtube.com/@enoticiapara8977?sub_confirmation=1"
        target="_blank"
        rel="noreferrer"
        className="socBox youtube"
      >
        <i className="fa-brands fa-youtube"></i>
        <span>Inscrever-se YouTube</span>
      </a>
    </section>
  );
};

export default SocialMedia;
