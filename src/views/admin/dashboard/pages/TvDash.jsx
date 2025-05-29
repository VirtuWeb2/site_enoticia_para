import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";
import { regionesMunicipios } from "../fragments/reg";
import { storage } from "../upload/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../dashboard.css";
import Cookies from "js-cookie";

const TvDash = ({ tv, setTv }) => {
  const [municipios, setMunicipios] = useState([]);
  const [values, setValues] = useState({
    title: "",
    link: "",
    reg: "",
    muni: "",
  });

  const baseUrl = "https://api-sites-en.vercel.app";

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  Modal.setAppElement("#root");

  const handleaddValues = (e) => {
    const { name, value } = e.target;

    if (name === "reg") {
      setMunicipios(regionesMunicipios[value] || []);
      setValues((prev) => ({ ...prev, muni: "" }));
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const upload = () => {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject("Nenhum arquivo selecionado.");
      }

      const storageRef = ref(storage, `tv/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          toast.info(`Enviando imagem: ${progress}% concluído`);
        },
        (error) => {
          toast.error(error.message);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.success("Imagem salva com sucesso.");
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    const filtered = tv.filter(
      (post) =>
        post.title.toLowerCase().includes(newSearchTerm) ||
        post.muni.toLowerCase().includes(newSearchTerm)
    );

    setFilteredPosts(filtered);
  };

  const validateYoutubeLink = (url) => {
    const pattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
    return pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.title || !values.link || !values.muni || !values.reg) {
      return toast.warn("Preencha todos os campos!");
    }

    if (!validateYoutubeLink(values.link)) {
      return toast.warn("Insira um link válido do YouTube.");
    }

    if (!file) {
      return toast.warn("Selecione uma imagem para enviar!");
    }

    try {
      const coverUrl = await upload();
      const token = Cookies.get("authToken");

      const response = await axios.post(
        `${baseUrl}/tv`,
        {
          title: values.title,
          cover: coverUrl,
          link: values.link,
          muni: values.muni,
          reg: values.reg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Vídeo criado com sucesso!");

      const newPost = response.data;
      setTv((prev) => [...prev, newPost]);

      // Resetar estados
      setModalIsOpen(false);
      setValues({ title: "", link: "", reg: "", muni: "" });
      setFile(null);
      setPreviewUrl("");
      setMunicipios([]);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar vídeo.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deseja realmente excluir este vídeo?");
    if (!confirm) return;

    try {
      const token = Cookies.get("authToken");

      const response = await axios.delete(`${baseUrl}/tv/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newArray = tv.filter((post) => post.id !== id);
      setTv(newArray);
      toast.success(response.data || "Vídeo deletado com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Erro ao deletar o vídeo."
      );
    }
  };

  return (
    <>
      <div className="app-content-header">
        <h1 className="app-content-header-text">TV POSTS</h1>
      </div>

      <div className="app-content-actions">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="app-content-headerButton"
          onClick={() => setModalIsOpen(true)}
        >
          Adicionar novo post
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead className="table-header">
            <tr>
              <th>Título</th>
              <th>Imagem</th>
              <th>Link</th>
              <th>Município</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {(searchTerm ? filteredPosts : tv).map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <img src={item.cover} alt="cover" height={50} />
                </td>
                <td>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.link}
                  </a>
                </td>
                <td>{item.muni}</td>
                <td>
                  <button
                    className="delete-button"
                    style={{ color: "red", cursor: "pointer"}}
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <button className="button__Exit" onClick={() => setModalIsOpen(false)}>
          <h2>
            <i className="fa-solid fa-xmark"></i>
          </h2>
        </button>
        <h2>Adicionar</h2>
        <form className="form-modal" onSubmit={handleSubmit}>
          <input
            required
            name="title"
            placeholder="Título"
            onChange={handleaddValues}
            value={values.title}
          />
          <input
            required
            name="link"
            type="url"
            placeholder="Link do Youtube"
            onChange={handleaddValues}
            value={values.link}
          />
          <select
            name="reg"
            value={values.reg}
            onChange={handleaddValues}
            required
          >
            <option value="" disabled>
              Selecione a Região
            </option>
            {Object.keys(regionesMunicipios).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            name="muni"
            value={values.muni}
            onChange={handleaddValues}
            required
          >
            <option value="" disabled>
              Selecione o Município
            </option>
            {municipios.map((municipio) => (
              <option key={municipio} value={municipio}>
                {municipio}
              </option>
            ))}
          </select>

          <div className="login__field">
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label className="file" htmlFor="file">
              {file ? file.name : "Escolher imagem"}
            </label>
            {previewUrl && <img src={previewUrl} alt="preview" height={80} />}
          </div>

          <button type="submit" className="submit-button">
            Enviar
          </button>
        </form>
      </Modal>
    </>
  );
};

export default TvDash;
