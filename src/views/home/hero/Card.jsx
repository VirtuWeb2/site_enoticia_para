import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item: { id, cover, muni, cat, title, date, link } }) => {
  return (
    <>
      <div className="box shadow">
        <div className="img">
          <Link to={`/noticia/${id}`}>
            <img src={cover} alt={title} width={1000} height={1000}/>
          </Link>
        </div>
        <div className="text">
          <span className="category">
            <Link style={{ color: "#fff" }} to={link} target="_blank">
              {muni} | {cat}
            </Link>
          </span>
          <Link to={`/noticia/${id}`}>
            <h1 className="titleBg">{title}</h1>
          </Link>
          <div className="author flex">
            <span style={{ cursor: "auto" }}>
              {moment(date).format("DD-MM-YYYY")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
