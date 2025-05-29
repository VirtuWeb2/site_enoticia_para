import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Iframe from "react-iframe";
import Heading from "../../components/heading/Heading";
import Side from "../../components/sideContent/side/Side";
import axios from "axios";
import Share from "../../components/share/Share";
import "./tv.css";

const Tv = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searched, setSearched] = useState(false);
  const searchLowerCase = search.toLocaleLowerCase();
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

  useEffect(() => {
    const filteredResults = posts.filter((item) =>
      item.title.toLocaleLowerCase().includes(searchLowerCase)
    );
    setResults(filteredResults);
    if (search !== "") {
      setSearched(true);
    }
  }, [search]);

  let countResults = searched
    ? "Nenhum vídeo foi encontrado"
    : "Pesquise por um vídeo específico";
  const count = results.length;
  if (count > 0) {
    const noun = count > 1 ? " vídeos encontrados" : "vídeo encontrado";
    countResults = `${count} ${noun}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>TV | EN PARÁ</title>
          <meta property="og:title" content="TV É Notícia Pará" />
          <meta
            property="og:description"
            content="Tv de notícias Paraense, atualizado diariamente com notícias de todos os jornais convencionais e fontes seguras"
          />
          <meta property="og:image" content="../images/logo.png" />
        </Helmet>
      </HelmetProvider>

      <main>
        <div className="container">
          <section className="mainContent tv ">
            <Heading title={"TV EN PARÁ"} />

            <div className="live">
              <Iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/DqIy6z-EEcA?si=QPGzWFiD1WGf-XvO"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></Iframe>
            </div>

            <div className="searchForm">
              <h1>Pesquisar vídeos: </h1>
              <input
                type="text"
                placeholder="Pesquisar por um vídeo específico..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="cards">
              <Heading title={countResults} />
              {search === ""
                ? posts.map((val) => (
                    <div key={val.id} className="box flexSB">
                      <a
                        href={val.link}
                        target="_blank"
                        className="img"
                        rel="noreferrer"
                      >
                        <img src={val.cover} alt="" />
                      </a>
                      <div className="text">
                        <a href={val.link} target="_blank" rel="noreferrer">
                          <h1 className="title">{val.title}</h1>
                        </a>
                        <Share link={val.link} />
                      </div>
                    </div>
                  ))
                : results.map((val) => (
                    <div key={val.id} className="box flexSB">
                      <div className="img">
                        <img src={val.cover} alt="" />
                      </div>
                      <div className="text">
                        <h1 className="title">{val.title}</h1>
                        <Share link={val.link} />
                      </div>
                    </div>
                  ))}
            </div>
          </section>
          <section className="sideContent">
            <Side />
          </section>
        </div>
      </main>
    </>
  );
};

export default Tv;
