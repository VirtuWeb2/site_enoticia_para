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
import Loader from "../../../../components/helpers/Loader.jsx";
import resizeImage from "../upload/resize.js";
import { useParams } from "react-router-dom";
import ReactCalendar from "react-calendar";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
const Edit = () => {
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
  const [imgAlterada, setImgAlterada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState([]);
  const [link, setLink] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [regiao, setRegiao] = useState("");
  const [imgContent, setImgContent] = useState("");
  const [imgAlterada2, setImgAlterada2] = useState(false);
  const [switchImage, setSwitchImage] = useState(false);
  const [totalImagens, setTotalImagens] = useState([]);
  const [totalFiles, setTotalFiles] = useState([]);
  const { noticiaId } = useParams();
  const [selectDate, setSelectDate] = useState(false);

  async function getData() {
    setLoading(true);
    try {
      const dados = await (
        await axios.get(`https://api-sites-en.vercel.app/news/${noticiaId}`)
      ).data[0];
      setTotalImagens(() => {
        const arrImgs = Array.from(dados.imgContent.split(","));
        arrImgs.unshift(dados.cover);
        return arrImgs;
      });
      setTitulo(dados.title);
      setDescricao(dados.desc);
      setData(dados.date);
      setCategoria(dados.cat);
      setImagem(dados.cover);
      setImgContent(dados.imgContent.split(","));
      setLink(dados.link);
      setMunicipio(dados.muni);
      setRegiao(dados.reg);
      setPreview(dados.cover);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  //IMAGE UPLOAD
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImgAlterada(true);
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
            setTotalImagens(arrPreview); // Atualiza o estado com todas as URLs
            setTotalFiles(arrFile);
          }
        });
      });
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
    if (totalFiles && totalFiles.length > 0) {
      const uploadPromises = totalFiles.map((i) => {
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
          console.error("Erro ao enviar imagens:", error);
          throw error; // Rejeita a promessa se ocorrer um erro
        });
    } else {
      return Promise.resolve([]); // Retorna uma promessa resolvida com um array vazio se não houver arquivos
    }
  };
  const upload2 = () => {
    if (file2) {
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
              setLoading(true);
            },
            (error) => {
              toast.error(error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                toast.success("A Imagem foi salva no banco de dados ");
                resolve(downloadURL);
                setLoading(false);
              });
            }
          );
        } catch (err) {
          toast.error(err);
          reject(err);
          setLoading(false);
        }
      });
    }
  };
  //ADD
  const handleClick = async (e) => {
    e.preventDefault();
    const coverUrl = imgAlterada ? await upload() : totalImagens;
    const coverUrl2 = imgAlterada2 ? await upload2() : imgContent;
    const currentDate = moment(values.date).format("YYYY-MM-DD");
    setLoading(true);
    try {
      const data = await axios.patch(
        `https://api-sites-en.vercel.app/admin/edit-news`,
        {
          title: titulo,
          cat: categoria,
          imgContent: `${coverUrl.slice(1)}`,
          cover: coverUrl[0],
          desc: descricao.replace(
            /(<img\s+[^>]*src=")([^"]*)(")/,
            function (match, p1, p2, p3) {
              return p1 + "" + p3;
            }
          ),
          date: currentDate,
          reg: regiao,
          muni: municipio,
          link: link,
          id: noticiaId,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } }
      );
      toast.success("Notícia editada com sucesso");
      getData();
    } catch (error) {
      toast.error(error.response.data || error.message || "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // const editor = document.querySelector(".ql-editor");
    // const imagem = editor.querySelector("img");
    // if (!imagem) {
    //   const imgCriada = document.createElement("img");
    //   imgCriada.src = preview2;
    //   editor.appendChild(imgCriada);
    // } else if (imgAlterada2) {
    //   imagem.src = preview2;
    // } else {
    //   imagem.src = imgContent;
    // }
    if (totalImagens && totalImagens.length > 0) {
      const editor = document.querySelector(".ql-editor");
      const arrPreview = totalImagens.slice(1); // Remove a primeira imagem
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
  }, [totalImagens]);
  if (loading) return <Loader />;
  return (
    <div className="add" onClick={()=> setSelectDate(false)}>
      <div className="content">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={titulo || ""}
          onChange={({ target }) => setTitulo(target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            name="desc"
            value={descricao}
            onChange={(value) => setDescricao(value)}
          />
        </div>
        <input type="file" name="" id="file2" onChange={handleFileChange2} />
        <div className="write-buttons">
          <button className="app-content-headerButton" onClick={handleClick}>
            Editar notícia
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
                accept={["image/png", "image/jpg", "image/webp", "image/jpeg"]}
                multiple
                onChange={handleFileChange}
              />
              {!preview && (
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
                <img
                  src={totalImagens[0]}
                  alt="Imagem"
                  className="img-preview"
                />
              )}
            </label>
          </div>
          <div className="login__field">
            <i className="login__icon fa-solid fa-map"></i>
            <select
              name="reg"
              value={regiao}
              onChange={(e) => {
                setRegiao(e.target.value);
                setMunicipio(regionesMunicipios[e.target.value][0]);
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
              onChange={(e) => setMunicipio(e.target.value)}
              value={municipio}
            >
              <option value="" disabled>
                Selecione o Munícipio
              </option>
              {regionesMunicipios[regiao]?.map((muni) => (
                <>
                  <option key={muni} value={muni}>
                    {muni}
                  </option>
                </>
              ))}
            </select>
            <p>{linkMunicipio}</p>
          </div>

          <div className="date">
            <label htmlFor="date">Selecione a data:</label>
            <div className="date-select" onClick={(e) => {
              e.stopPropagation()
              setSelectDate(true);
            }}>
              <span>{dayjs(values.date).format("L")}</span>
              {selectDate && (
                <div
                  className="calendar-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ReactCalendar
                    value={values.date}
                    onChange={(value) => {
                      setValues({ ...values, date: value });
                      setSelectDate(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="item">
          <h2>Categorias</h2>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="política"
              onChange={({ target }) => setCategoria(target.value)}
              checked={categoria === "política"}
            />
            <label htmlFor="politica">Política</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="segurança"
              onChange={({ target }) => setCategoria(target.value)}
              checked={categoria === "segurança"}
            />
            <label htmlFor="seguranca">Segurança</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="esportes"
              onChange={({ target }) => setCategoria(target.value)}
              checked={categoria === "esportes"}
            />
            <label htmlFor="esportes">Esportes</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="foco"
              checked={categoria === "foco"}
              onChange={({ target }) => setCategoria(target.value)}
            />
            <label htmlFor="foco">Foco</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
