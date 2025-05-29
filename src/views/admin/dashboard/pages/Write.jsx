import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { regionesMunicipios, municipioLinks } from "../fragments/reg.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../upload/firebase.js";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import resizeImage from "../upload/resize.js";
import ReactCalendar from "react-calendar";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"
import "dayjs/locale/pt-br"
import "react-calendar/dist/Calendar.css";
const Write = () => {
  dayjs.extend(localizedFormat);
  dayjs.locale("pt-br");
  const [values, setValues] = useState({
    title: "",
    cat: "",
    cover: "",
    desc: "",
    date: new Date(),
    reg: "",
    muni: "",
  });
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [preview, setPreview] = useState([]);
  const [preview2, setPreview2] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [linkMunicipio, setLinkMunicipio] = useState("");
  const [switchImage, setSwitchImage] = useState(false);
  // const baseUrl = "https://api-sites-en.vercel.appadmin";
  const baseUrl = "https://api-sites-en.vercel.app/admin";
  const [selectDate, setSelectDate] = useState(false);

  //GET VALUES
  const handleaddValues = (value) => {
    if (value.target) {
      setValues((prevValues) => ({
        ...prevValues,
        [value.target.name]: value.target.value,
      }));

      if (value.target.name === "reg") {
        setMunicipios(regionesMunicipios[value.target.value]);
      } else if (value.target.name === "muni") {
        const municipioSelecionado = value.target.value;
        const linkParaMunicipio = municipioLinks[municipioSelecionado];
        setLinkMunicipio(linkParaMunicipio);
      }
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        desc: value,
      }));
    }
  };
  //IMAGE UPLOAD
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const arrPreview = []; // Array para armazenar as URLs
      const arrFile = []; // Array para armazenar as imagens redimensionadas
      let processedImages = 0; // Contador para imagens processadas

      files.forEach((img) => {
        resizeImage(img, (resizedImage) => {
          const url = URL.createObjectURL(resizedImage); // Cria a URL da imagem redimensionada
          arrPreview.push(url); // Adiciona a URL ao array
          arrFile.push(resizedImage); // Adiciona a imagem redimensionada ao array

          processedImages++; // Incrementa o contador

          // Verifica se todas as imagens foram processadas
          if (processedImages === files.length) {
            setPreview(arrPreview); // Atualiza o estado com todas as URLs
            setFile(arrFile);
          }
        });
      });
      setValues({...values, cover: "."})
    }
    
  };
  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImage(file, (resizedImage) => {
        const url = URL.createObjectURL(file);
        setFile2(resizedImage);
        setPreview2(url);
      });
    }
  };

  const upload = () => {
    if (file && file.length > 0 && Object.values(values).every((i)=> i !== "")) {
      const uploadPromises = file.map((i) => {
        return new Promise((resolve, reject) => {
          try {
            const storageRef = ref(storage, i.name);
            const uploadTask = uploadBytesResumable(storageRef, i);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                toast.info("Enviando imagem " + progress + "% concluído");
              },
              (error) => {
                toast.error(error);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  toast.success("A imagem foi salva no banco de dados");
                  resolve(downloadURL); // Resolve a promessa com a URL
                });
              }
            );
          } catch (err) {
            toast.error(err);
            reject(err);
          }
        });
      });

      // Aguarda o upload de todas as imagens
      return Promise.all(uploadPromises)
        .then((downloadURLs) => {
          return downloadURLs; // Retorna um array com as URLs de download
        })
        .catch((error) => {
          throw error; // Rejeita a promessa se ocorrer um erro
        });
    } else {
      return Promise.resolve([]); // Retorna uma promessa resolvida com um array vazio se não houver arquivos
    }
  };
  const upload2 = () => {
    if (file2 && Object.values(values).every((i)=> i !== "")) {
      return new Promise((resolve, reject) => {
        try {
          const storageRef = ref(storage, file2.name);
          const uploadTask = uploadBytesResumable(storageRef, file2);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
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
    }
  };

  useEffect(() => {
    if (preview && preview.length > 0) {
      const editor = document.querySelector(".ql-editor");
      const arrPreview = preview.slice(1); // Remove a primeira imagem
      const existingImages = editor.querySelectorAll("img");

      // Substitui imagens existentes ou adiciona novas
      arrPreview.forEach((src, index) => {
        if (index < existingImages.length) {
          // Se houver uma imagem existente, substitui a URL
          existingImages[index].src = src;
        } else {
          // Se não houver mais imagens existentes, adiciona a nova imagem
          const img = document.createElement("img");
          img.src = src;
          editor.appendChild(img);
        }
      });

      // Remove imagens extras se o novo array for menor
      if (arrPreview.length < existingImages.length) {
        for (let i = arrPreview.length; i < existingImages.length; i++) {
          existingImages[i].remove(); // Remove imagens extras
        }
      }
    }
  }, [preview]);
  //ADD
  const handleClick = async (e) => {
    e.preventDefault();
    const coverUrl = await upload();
    const coverUrl2 = file2 ? await upload2() : "";
    const currentDate = moment(values.date).format("YYYY-MM-DD");
    if(Object.values(values).every((i)=> i !== "")){
      try {
        const { data } = await axios.post(
          `${baseUrl}/post-news`,
          {
            title: values.title,
            cat: values.cat,
            cover: coverUrl[0],
            imgContent: `${coverUrl.slice(1)}`,
            desc: values.desc.replace(
              /(<img\s+[^>]*src=")([^"]*)(")/,
              function (match, p1, p2, p3) {
                return p1 + "" + p3;
              }
            ),
            date: currentDate,
            reg: values.reg,
            muni: values.muni,
            link: linkMunicipio,
          },
          { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } }
        );
        toast.success(data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data || error.message || "Ocorreu um erro.");
      }
    }
    else{
     Object.keys(values).forEach((prop) => {
       if(prop === 'title' && values[prop] === ""){
        toast.error("Título faltando na notícia")
       }
       if(prop === 'desc' && values[prop] === ""){
        toast.error("Conteúdo faltando na notícia")
       }
       if(prop === 'cat' && values[prop] === ""){
        toast.error("Categoria faltando na notícia")
       }
       if(prop === 'cover' && values[prop] === ""){
        toast.error("Imagem faltando na notícia")
       }
       if(prop === 'date' && values[prop] === ""){
        toast.error("Data faltando na notícia")
       }
       if(prop === 'reg' && values[prop] === ""){
        toast.error("Região faltando na notícia")
       }
       if(prop === 'muni' && values[prop] === ""){
        toast.error("Município faltando na notícia")
       }
     });
    }
    
  };
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          name="title"
          placeholder="Título da notícia"
          onChange={({ target }) =>
            setValues({ ...values, title: target.value })
          }
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            placeholder="Conteúdo da notícia"
            name="desc"
            onChange={(value) => setValues({ ...values, desc: value })}
          />
        </div>
        <input type="file" id="file2" onChange={handleFileChange2} />
        <div className="write-buttons">
          <button className="app-content-headerButton" onClick={handleClick}>
            Publicar notícia
          </button>
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Configurações</h1>
          <div
            className="preview"
            style={{ position: "relative" }}
            onMouseEnter={() => setSwitchImage(true)}
            onMouseLeave={() => setSwitchImage(false)}
          >
            <label className="file">
              <input
                className="input-img-preview"
                type="file"
                accept={["image/png", "image/webp", "image/jpg", "image/jpeg"]}
                multiple
                onChange={handleFileChange}
              />
              {preview.length === 0 && (
                <>
                  <i
                    className="fa-solid fa-image"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <span>Selecionar ou arrastar imagem</span>
                </>
              )}

              {switchImage && preview && (
                <div className="switch__image">
                  <i
                    className="fa-solid fa-image"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <span>Selecionar ou arrastar imagem</span>
                </div>
              )}

              {preview && (
                // preview.map((i) => (
                <img src={preview[0]} alt="" className="img-preview" />
              )}
            </label>
          </div>
          <div className="login__field">
            <i className="login__icon fa-solid fa-map"></i>
            <select
              name="reg"
              defaultValue=""
              style={{ textTransform: "capitalize" }}
              onChange={({ target }) => {
                setMunicipios(regionesMunicipios[target.value]);
                setValues({ ...values, reg: target.value });
              }}
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
          </div>
          <div className="login__field">
            <i className="login__icon fa-solid fa-map-location-dot"></i>
            <select
              name="muni"
              defaultValue=""
              style={{ textTransform: "capitalize" }}
              onChange={({ target }) => {
                setLinkMunicipio(municipioLinks[target.value]);
                setValues({ ...values, muni: target.value });
              }}
            >
              <option value="" disabled>
                Selecione o Munícipio
              </option>
              {municipios.map((municipio) => (
                <option key={municipio} value={municipio}>
                  {municipio}
                </option>
              ))}
            </select>
            <p>{linkMunicipio}</p>
          </div>

          <div className="date">
            <label htmlFor="date">Selecionar data</label>
            <div className="date-select" onClick={() => setSelectDate(true)}>
              <span>{dayjs(values.date).format("L")}</span>
              {selectDate && (
                <div className="calendar-container" onClick={(e)=> e.stopPropagation()}>
                  <ReactCalendar
                    value={values.date}
                    onChange={(value) => {
                      setValues({ ...values, date: value });
                      setSelectDate(false)
                    }}
                  />
                </div>
              )}
            </div>
            {/* <input type="date" name="date" onChange={handleaddValues} /> */}
          </div>
        </div>

        <div className="item">
          <h2>Categorias</h2>
          <div className="cat">
            <label className="cat">
              <input
                type="radio"
                name="cat"
                value="política"
                id="política"
                onChange={({ target }) => {
                  setValues({ ...values, cat: target.value });
                }}
              />
              Política
            </label>
          </div>

          <div className="cat">
            <label className="cat">
              <input
                type="radio"
                name="cat"
                value="segurança"
                onChange={({ target }) => {
                  setValues({ ...values, cat: target.value });
                }}
              />
              Segurança
            </label>
          </div>
          <div className="cat">
            <label className="cat">
              <input
                type="radio"
                name="cat"
                value="esportes"
                onChange={({ target }) => {
                  setValues({ ...values, cat: target.value });
                }}
              />
              Esportes
            </label>
          </div>

          <div className="cat">
            <label className="cat">
              <input
                type="radio"
                name="cat"
                value="foco"
                onChange={({ target }) => {
                  setValues({ ...values, cat: target.value });
                }}
              />
              Foco
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
