import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../../heading/Heading";
import axios from "axios";
import "./tvposts.css";

const TvPosts = () => {
  const [posts, setPosts] = useState([]);

  const baseUrl = "https://api-sites-en.vercel.app";

  const getPosts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tv`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderedItems = posts.slice(-6);
  return (
    <>
      <section className="tpost">
        <Link to={"/tv-en-para"} aria-label="Acesse os vídeos do É Notícia Pará">
          <Heading title={"TV EN Pará"} />
          {renderedItems.map((val) => {
            return (
              <div key={val.id} className="box flexSB">
                <div className="img">
                  <img src={val.cover} alt="" width={80} height={80} />
                </div>
                <div className="text">
                  <h1 className="title">{val.title.slice(0, 30)}...</h1>
                </div>
              </div>
            );
          })}
        </Link>
      </section>
    </>
  );
};

export default TvPosts;
