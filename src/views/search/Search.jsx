import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Side from "../../components/sideContent/side/Side";
import axios from "axios";
import NewSection from "../../components/cards/Sections";
import "./search.css";

const Search = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const baseUrl = "https://api-sites-en.vercel.app";

  const searchLowerCase = search.toLocaleLowerCase();

  const getNews = async () => {
    try {
      const res = await axios.get(`${baseUrl}/news`);
      setNews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    const filteredResults = news.filter(
      (item) =>
        item.title.toLocaleLowerCase().includes(searchLowerCase) ||
        item.desc.toLocaleLowerCase().includes(searchLowerCase)
    );
    setResults(filteredResults);
    if (search !== "") {
      setSearched(true);
    }
  }, [search, news, searchLowerCase]);


  let countResults = searched
    ? "Nenhuma notícia foi encontrado"
    : "Pesquise por uma notícia específica";
  const count = results.length;
  if (count > 0) {
    const noun =
      count > 1 ? "Total de notícias encontradas: " : "Nóticia encontrada";
    countResults = `${noun} ${count}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Pesquisar | EN PARÁ</title>
        </Helmet>
      </HelmetProvider>

      <main>
        <div className="container">
          <section className="mainContent search ">
            <div className="searchForm">
              <h1>Pesquisar: </h1>
              <input
                type="text"
                placeholder="Pesquise por uma notícia específica..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {search === "" ? <NewSection regionTitle={countResults} newsData={news} /> : <NewSection regionTitle={countResults} newsData={results}  />}
          </section>
          <section className="sideContent">
            <Side />
          </section>
        </div>
      </main>
    </>
  );
};

export default Search;
