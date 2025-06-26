import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import "../dashboard.css";
import Cookies from "js-cookie";
import Loader from "../../../../components/helpers/Loader";
import gsap from "gsap/all";
import { NavLink } from "react-router-dom";
const News = ({ route, setRoute, getNews, news, setNews }) => {
  const [loading, setLoading] = useState(false);
  const [filtroModal, setFiltroModal] = useState(false);
  const [preference, setPreference] = useState([
    {
      label: "Título",
      value: "title",
    },
    {
      label: "Data",
      value: "date",
    },
    {
      label: "Categoria",
      value: "cat",
    },
    {
      label: "Região",
      value: "reg",
    },
    {
      label: "Município",
      value: "muni",
    },
  ]);
  const timeOut = useRef();
  const preferencesContainer = useRef();

  const [filtroAtivo, setFiltroAtivo] = useState({
    category: "",
    orderBy: "",
  });
  const newsContainer = useRef();
  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };
  const [orderedNews, setOrderedNews] = useState([]);
  const [limit, setLimit] = useState(50);
  const baseUrl = "https://api-sites-en.vercel.app";

  //SEARCHBAR
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    const filteredNews = news.filter(
      (news) =>
        news.title.toLowerCase().includes(newSearchTerm) ||
        news.cat.toLowerCase().includes(newSearchTerm) ||
        news.reg.toLowerCase().includes(newSearchTerm) ||
        news.muni.toLowerCase().includes(newSearchTerm)
    );

    setFilteredNews(filteredNews);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/news`);
      setNews(response.data);
      toast.success("Notícias atualizadas com sucesso.");
    } catch (error) {
      toast.error(
        error.response.data ||
          error.message ||
          "Ocorreu um erro ao atualizar as notícias!"
      );
    } finally {
      setLoading(false);
    }
  };

  function scroll(e) {
    const scrollTop = e.target.scrollTop;
    const elementHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    const scrollActive = elementHeight - scrollTop - clientHeight;
    if (scrollActive <= 200 && limit <= news.length) {
      setLimit(limit + 50);
    }
  }

  useEffect(() => {
    if (preferencesContainer.current && filtroModal) {
      gsap.fromTo(
        ".preferencias",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, duration: 0.15, scale: 1, ease: "power3.inOut" }
      );
    }
  }, [filtroModal, preferencesContainer]);

  useEffect(() => {
    handleUpdate();
  }, []);

  //DELETE
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/admin/delete/` + id, {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
      });
      const newArray = news.filter((item) => item.id !== id);
      setNews(newArray);
      toast.success(response.data || "Notícia deletada com sucesso.");
    } catch (error) {
      toast.error(error.response.data || error.message || "Ocorreu um erro!");
    }
  };

  function ordenarNoticias(e) {
    e.preventDefault();
    if (filtroAtivo.orderBy === "asc") {
      setOrderedNews(
        news
          ?.map((i) => i)
          .sort((a, b) =>
            a[filtroAtivo.category].localeCompare(b[filtroAtivo.category])
          )
      );
    }
    if (filtroAtivo.orderBy === "desc") {
      setOrderedNews(
        news
          ?.map((i) => i)
          .sort((a, b) =>
            a[filtroAtivo.category].localeCompare(b[filtroAtivo.category])
          )
          .reverse()
      );
    }
    setFiltroModal(false);
  }

  function fecharModal() {
    gsap.fromTo(
      ".preferencias",
      { opacity: 1, scale: 1 },
      {
        scale: 0.95,
        opacity: 0,
        duration: 0.15,
        ease: "power3.inOut",
      }
    );
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      setFiltroModal(false);
    }, 500);
  }

  if (loading) return <Loader />;
  return (
    <>
      <div className="app-content-header">
        <h1 className="app-content-header-text">Notícias</h1>
      </div>

      <div className="app-content-actions" style={{ position: "relative" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#222"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="pesquisar"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <NavLink
          to={"/admin/criar-noticia"}
          className="app-content-headerButton"
        >
          {/* <i className="fa-solid fa-add"></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Adicionar nova notícia
        </NavLink>
        <button className="app-content-headerButton" onClick={handleUpdate}>
          {/* <i className="fa-solid fa-arrows-rotate"></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-refresh-cw"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          Recarregar notícias
        </button>
        <button
          className="app-content-headerButton"
          onClick={() => setFiltroModal(true)}
        >
          {/* <i className="fa-solid fa-sliders"></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-filter"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filtros
        </button>
        {filtroModal && (
          <form
            className="preferencias"
            ref={preferencesContainer}
            onSubmit={ordenarNoticias}
          >
            <div className="header">
              <span>Preferências</span>
              <i
                className="fa-solid fa-close"
                style={{ fontSize: "1.8rem", cursor: "pointer" }}
                onClick={fecharModal}
              ></i>
            </div>

            <div className="options">
              <div style={{ marginBottom: "1rem" }}>
                <label>Categoria</label>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              <div style={{ display: "grid", gap: ".4rem" }}>
                {preference.map((i) => (
                  <label
                    key={i.label}
                    style={{ display: "flex", gap: ".4rem" }}
                  >
                    <input
                      type="radio"
                      value={i.value}
                      checked={filtroAtivo.category === i.value}
                      onChange={({ target }) =>
                        setFiltroAtivo({
                          ...filtroAtivo,
                          category: target.value,
                        })
                      }
                      name="categoria"
                    />
                    {i.label}
                  </label>
                ))}
              </div>

              <div style={{ margin: "1rem 0" }}>
                <label>Ordenar por</label>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
              <div style={{ display: "grid" }}>
                <label style={{ display: "flex", gap: ".4rem" }}>
                  <input
                    type="radio"
                    checked={filtroAtivo.orderBy === "asc"}
                    onChange={({ target }) =>
                      setFiltroAtivo({ ...filtroAtivo, orderBy: target.value })
                    }
                    name="type"
                    value={"asc"}
                  />
                  Crescente
                </label>
                <label style={{ display: "flex", gap: ".4rem" }}>
                  <input
                    type="radio"
                    checked={filtroAtivo.orderBy === "desc"}
                    onChange={({ target }) =>
                      setFiltroAtivo({ ...filtroAtivo, orderBy: target.value })
                    }
                    name="type"
                    value={"desc"}
                  />
                  Decrescente
                </label>
              </div>
              <div style={{ display: "flex", gap: ".8rem" }}>
                <button>Salvar filtros</button>
                <button
                  type="button"
                  onClick={() => {
                    setOrderedNews([]);
                    setFiltroAtivo({
                      category: "",
                      orderBy: "",
                    });
                    fecharModal();
                  }}
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <div
        className="table-wrapper"
        id="akka"
        ref={newsContainer}
        onScroll={scroll}
      >
        <table>
          <thead className="table-header">
            <tr>
              <th
                className="table-cell"
                onClick={() => {
                  setOrderedNews(
                    news
                      .map((i) => i)
                      .sort((a, b) =>
                        a.title.localeCompare(b.title, "pt", {
                          ignorePuntation: true,
                        })
                      )
                  );
                }}
              >
                Titulo
              </th>
              <th className="table-cell">Data</th>

              <th className="table-cell">Categoria</th>
              <th className="table-cell">Região</th>
              <th className="table-cell">Municipio</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm === "" ? (
              <>
                {orderedNews.length >= 1
                  ? orderedNews.slice(0, limit).map((item, i) => (
                      <tr key={i} className="table-row">
                        <td className="table-cell">{item.title}</td>
                       {/* <td className="table-cell">
                          {moment(item.date).format("DD-MM-YYYY")}
                        </td> */}
                        <td
                          className="table-cell"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.cat}
                        </td>
                        <td
                          className="table-cell"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.reg}
                        </td>
                        <td
                          className="table-cell"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.muni}
                        </td>
                        <td className="table-cell table-cell__actions">
                          <NavLink
                            to={`/admin/editar-noticia/${item.id}`}
                            className="table-cell__button--edit table-cell__button"
                            title="Editar notícia"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
                                stroke="currentColor"
                                stroke-width="2.15"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </NavLink>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="table-cell__button--delete table-cell__button"
                            title="Excluir notícia"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#ff3333"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-trash-2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  : news.slice(0, limit).map((item, i) => (
                      <tr key={i} className="table-row">
                        <td className="table-cell">{item.title}</td>
                        <td className="table-cell">
                          {moment(item.date).format("DD-MM-YYYY")}
                        </td>
                        <td
                          className="table-cell"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.cat}
                        </td>
                        <td
                          className="table-cell"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.reg}
                        </td>
                        <td
                          className="table-cell"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.muni}
                        </td>
                        <td className="table-cell table-cell__actions">
                          <NavLink
                            to={`/admin/editar-noticia/${item.id}`}
                            className="table-cell__button--edit table-cell__button"
                            title="Editar notícia"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
                                stroke="currentColor"
                                stroke-width="2.15"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </NavLink>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="table-cell__button--delete table-cell__button"
                            title="Excluir notícia"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#ff3333"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-trash-2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
              </>
            ) : (
              filteredNews.map((item, i) => (
                <tr key={i} className="table-row">
                  <td className="table-cell">{item.title}</td>
                  <td className="table-cell">
                    {moment(item.date).format("DD-MM-YYYY")}
                  </td>
                  <td
                    className="table-cell"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.cat}
                  </td>
                  <td
                    className="table-cell"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.reg}
                  </td>
                  <td
                    className="table-cell"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.muni}
                  </td>
                  <td className="table-cell table-cell__actions">
                    <NavLink
                      to={`/admin/editar-noticia/${item.id}`}
                      className="table-cell__button--edit table-cell__button"
                      title="Editar notícia"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
                          stroke="currentColor"
                          stroke-width="2.15"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="table-cell__button--delete table-cell__button"
                      title="Excluir notícia"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff3333"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-trash-2"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default News;
