// LinksFooterRegioes.jsx
import React from "react";
import { links } from "./dataLinksReg"; // importa os links das regiões

const LinksFooterRegioes = () => {
  return (
    <div className="links">
      <select name="Regioes" placeholder="" id="Regioes">
        <option value="">Escolha a Região</option>
        <option value="">É Notícia Araguaia</option>
      </select>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-chevron-right"></i> {link.name}
        </a>
      ))}
    </div>
  );
};

export default LinksFooterRegioes;
