import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";
import { storage } from "../upload/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../dashboard.css";
import Cookies from "js-cookie"
const Ad = ({ ad, getAd, setAd }) => {
  const [values, setValues] = useState({
    title: "",
    link: "",
    position: "",
  });
  const baseUrl = "https://api-sites-en.vercel.app";

  const handleaddValues = (value) => {
    if (value.target) {
      setValues((prevValues) => ({
        ...prevValues,
        [value.target.name]: value.target.value,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        desc: value,
      }));
    }
  };

  //IMAGE UPLOAD
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const upload = () => {
    return new Promise((resolve, reject) => {
      try {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast.info("Enviando imagem " + progress + "% concluído");
          },
          (error) => {
            toast.error(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              toast.success("A Imagem foi salva no banco de dados ");
              resolve(downloadURL);
            });
          }
        );
      } catch (err) {
        toast.error(err);
        reject(err);
      }
    });
  };

  //CONST MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  Modal.setAppElement("#root");

  //ADD
  const handleSubmit = async (e) => {
    e.preventDefault();

    const coverUrl = await upload();

    if (!values.title || !coverUrl || !values.link || !values.position) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      const { data } = await axios.post(`${baseUrl}/ad/create`, {
        title: values.title,
        cover: coverUrl,
        link: values.link,
        position: values.position,
      }, {headers: {Authorization: `Bearer ${Cookies.get("authToken")}`}});
      toast.success(data);
    } catch (error) {
      toast.error(error.response.data || error.message || "Ocorreu um erro.");
    }
    getAd();
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/ad/delete/` + id, {headers: {Authorization: `Bearer ${Cookies.get("authToken")}`}});
      const newArray = ad.filter((post) => post.id !== id);
      setAd(newArray);
      toast.success(response.data || "Anúncio deletado com sucesso.");
    } catch (error) {
      toast.error(error.response.data || error.message || "Ocorreu um erro!");
    }
  };
  return (
    <>
      <div className="app-content-header">
        <h1 className="app-content-header-text">Anúncios</h1>
      </div>

      <div className="app-content-actions">
        <button
          style={{ marginLeft: "30px" }}
          className="app-content-headerButton"
          onClick={() => setModalIsOpen(true)}
        >
          Adicionar novo anúncio
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead className="table-header">
            <tr>
              <th className="table-cell">Título</th>
              <th className="table-cell">Imagem</th>
              <th className="table-cell">Link</th>
              <th className="table-cell">Posição do Banner</th>
            </tr>
          </thead>
          <tbody>
            {ad.map((item, i) => (
              <tr key={i} className="table-row">
                <td className="table-cell">{item.title}</td>
                <td className="table-cell">
                  <img src={item.cover} alt="" />
                </td>
                <td className="table-cell">{item.link}</td>
                <td className="table-cell">{item.position}</td>
                <td className="table-cell table-cell__actions">
                  <button
                    className="table-cell__button--delete table-cell__button"
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
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <button className="button__Exit" onClick={() => setModalIsOpen(false)}>
          <h2>
            <i className="fa-solid fa-xmark"></i>
          </h2>
        </button>
        <h2>Adicionar</h2>
        <form className="form-modal">
          <div className="login__field">
            <i className="login__icon fa-solid fa-quote-left"></i>
            <input
              required
              name="title"
              className="form__input"
              placeholder="Título"
              onChange={handleaddValues}
            />
          </div>
          <div className="login__field">
            <i className="login__icon fa-solid fa-link"></i>
            <input
              required
              name="link"
              type="url"
              className="form__input"
              placeholder="Link"
              onChange={handleaddValues}
            />
          </div>
          <div className="login__field">
            <i className="login__icon fa-solid fa-up-down-left-right"></i>
            <select
              required
              name="position"
              className="form__input"
              onChange={handleaddValues}
            >
              <option selected> Selecione o Banner</option>
              <option value="banner header">Banner Header</option>
              <option value="banner side">Banner Side</option>
              <option value="banner single page">Banner SinglePage</option>
              <option value="banner hero">Banner na Hero</option>
            </select>
          </div>

          <div className="login__field">
            <div className="preview login__preview">
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name=""
                onChange={handleFileChange}
              />
              <label className="file" htmlFor="file">
                Enviar Imagem
              </label>
              <img src={previewUrl} alt="" />
            </div>
          </div>
          <button onClick={handleSubmit} className="button login__submit">
            <span className="button__text">Salvar</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Ad;
