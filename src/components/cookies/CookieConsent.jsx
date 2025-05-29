// src/components/cookies/CookieConsent.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      setShowBanner(true);
    } else {
      activateTrackingCookie(); 
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    activateTrackingCookie();
  };

  const activateTrackingCookie = () => {
    const trackingId = 'tracking_' + new Date().getTime();
    document.cookie = `trackingId=${trackingId}; path=/; max-age=31536000;`;
    console.log("Cookie de rastreamento ativado:", trackingId);
  };

  if (!showBanner) return null;

  return (
    <div className="cookieConsentContainer">
      <div className="cookieTitle">
        <strong>Aviso de Cookies</strong>
      </div>
      <div className="cookieDesc">
        <p>
          Utilizamos cookies para melhorar a sua experiência em nosso site, conforme a LGPD. 
          Ao continuar navegando, você concorda com o uso de cookies?
        </p>
        <p><Link to="/politica-de-privacidade">Saiba mais</Link></p>
      </div>
      <div className="cookieButton">
        <button onClick={acceptCookies}>Aceitar</button>
      </div>
    </div>
  );
};

export default CookieConsent;

