import React from "react";
import { links } from "./dataLinks";

const LinksFooter = () => {
  return (
    <div className="links">
      {links.map(
        (link, index) =>
          !link.hidden && (
            <a key={index} href={link.url}>
              <i className="fa-solid fa-chevron-right"></i> {link.name}
            </a>
          )
      )}
    </div>
  );
};

export default LinksFooter;
