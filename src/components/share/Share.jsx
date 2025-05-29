import React, { useState } from "react";
import "./share.css";

const Share = ({ link }) => {
  const [copied, setCopied] = useState(false);
  const [shareInProgress, setShareInProgress] = useState(false);

  const handleClick = () => {
    if (navigator.share) {
      if (shareInProgress) {
        console.log("Aguarde, compartilhamento em andamento...");
        return;
      }

      setShareInProgress(true);

      navigator
        .share({
          url: link,
        })
        .then(() => {
          console.log("Link compartilhado");
          setShareInProgress(false);
        })
        .catch((error) => {
          console.error("Erro ao compartilhar:", error);
          setShareInProgress(false);
        });
    } else {
      copyToClipboard(link);
      setCopied(true);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Link copiado para a área de transferência!");
        setCopied(true);
      },
      () => {
        console.error("Erro ao copiar o link");
      }
    );
  };

  return (
    <>
      <button className="share" onClick={handleClick}>
        <i className="fa-solid fa-share-nodes"></i>
        Compartilhar
      </button>
      {copied && <p>Link copiado para a área de transferência!</p>}
    </>
  );
};

export default Share;
