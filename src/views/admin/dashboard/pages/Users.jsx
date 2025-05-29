import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "../dashboard.css";
import Cookies from "js-cookie";
const Users = ({ users, setUsers, getUsers }) => {
  const baseUrl = "https://api-sites-en.vercel.app/admin";
  //const modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [user, setUser] = useState(null);
  Modal.setAppElement("#root");
  //SEARCHBAR
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    const filteredUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(newSearchTerm) ||
        user.email.toLowerCase().includes(newSearchTerm) ||
        user.cargo.toLowerCase().includes(newSearchTerm)
    );

    setFilteredUsers(filteredUsers);
  };

  //ADD
  const ref = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;

    if (
      !user.username.value ||
      !user.email.value ||
      !user.password.value ||
      !user.cargo.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      const { data } = await axios.post(
        `${baseUrl}/users`,
        {
          username: user.username.value,
          email: user.email.value,
          password: user.password.value,
          cargo: user.cargo.value,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } }
      );
      toast.success(data);
      setModalIsOpen(false);
    } catch (error) {
      toast.error(error.response.data || error.message || "Ocorreu um erro.");
    }
    getUsers();
  };

  const editUser = async (e) => {
    e.preventDefault();
    console.log('first')
    try {
      const resposta = await axios.patch(
        `${baseUrl}/edit-user/${user.id}`,
        {
          username: user.username,
          email: user.email,
          cargo: user.cargo,
          password: user.password,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } }
      );
      toast.success("Usuário atualizado com sucesso");
      setModalEditUser(false)
      getUsers()
    } catch (err) {
      toast.error("Erro ao atualizar usuário");
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/users/` + id, {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
      });
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(response.data || "Usuário deletado com sucesso.");
    } catch (error) {
      toast.error(error.response.data || error.message || "Ocorreu um erro!");
    }
  };

  function getSpecificUser(id) {
    const foundUser = users?.filter((user) => user.id === id)[0];
    setUser({ ...foundUser });
  }

  return (
    <>
      <div className="app-content-header">
        <h1 className="app-content-header-text">Usuários</h1>
      </div>

      <div className="app-content-actions">
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
        <button
          className="app-content-headerButton"
          onClick={() => setModalIsOpen(true)}
        >
          Adicionar novo usuário
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead className="table-header">
            <tr>
              <th className="table-cell">username</th>
              <th className="table-cell">E-mail</th>
              <th className="table-cell">Cargo</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm === ""
              ? users.map((item, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-cell">{item.username}</td>
                    <td className="table-cell">{item.email}</td>
                    <td className="table-cell">{item.cargo}</td>
                    <td className="table-cell table-cell__actions">
                      <button
                        className="table-cell__button--edit table-cell__button"
                        style={{ fontSize: "1.75rem" }}
                        onClick={() => {
                          setModalEditUser(true);
                          getSpecificUser(item.id);
                        }}
                      >
                        <i className="fa-solid fa-user-pen"></i>
                      </button>
                      <button
                        className="table-cell__button--delete table-cell__button"
                        style={{ fontSize: "1.75rem" }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fa-solid fa-user-xmark"></i>
                      </button>
                    </td>
                  </tr>
                ))
              : filteredUsers.map((item, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-cell">{item.username}</td>
                    <td className="table-cell">{item.email}</td>
                    <td className="table-cell">{item.cargo}</td>
                    <td className="table-cell table-cell__actions">
                      <button
                        className="table-cell__button--edit table-cell__button"
                        style={{ fontSize: "1.75rem" }}
                        onClick={() => {
                          setModalEditUser(true);
                          getSpecificUser(item.id);
                        }}
                      >
                        <i className="fa-solid fa-user-pen"></i>
                      </button>
                      <button
                        className="table-cell__button--delete table-cell__button"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fa-solid fa-user-xmark"></i>
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
        <form ref={ref} onSubmit={handleSubmit} className="form-modal">
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              required
              name="username"
              className="form__input"
              placeholder="Nome de Usuário"
            />
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-envelope"></i>
            <input
              required
              name="email"
              type="email"
              className="form__input"
              placeholder="E-mail"
            />
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              required
              name="password"
              type="password"
              className="form__input"
              placeholder="Senha"
            />
          </div>
          <div className="login__field">
            <i className="login__icon fa-solid fa-screwdriver-wrench"></i>
            <select required id="cargo" name="cargo">
              <option disabled>--Nível de Acesso--</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="button login__submit">
            <span className="button__text">Salvar</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
        </form>
      </Modal>

      <Modal
        className="modal"
        isOpen={modalEditUser}
        onRequestClose={() => setModalEditUser(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <button
          className="button__Exit"
          onClick={() => setModalEditUser(false)}
        >
          <h2>
            <i className="fa-solid fa-xmark"></i>
          </h2>
        </button>
        <h2>Adicionar</h2>
        <form ref={ref} onSubmit={editUser} className="form-modal">
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input
              required
              name="username"
              className="form__input"
              placeholder="Nome de Usuário"
              value={user?.username}
              onChange={({ target }) =>
                setUser({ ...user, username: target.value })
              }
            />
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-envelope"></i>
            <input
              required
              name="email"
              type="email"
              className="form__input"
              placeholder="E-mail"
              value={user?.email}
              onChange={({ target }) =>
                setUser({ ...user, email: target.value })
              }
            />
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input
              required
              name="password"
              type="password"
              className="form__input"
              placeholder="Senha"
              value={user?.password}
              onChange={({ target }) =>
                setUser({ ...user, password: target.value })
              }
            />
          </div>
          <div className="login__field">
            <i className="login__icon fa-solid fa-screwdriver-wrench"></i>
            <select required id="cargo" name="cargo">
              <option disabled>--Nível de Acesso--</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="button login__submit">
            <span className="button__text">Editar usuário</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Users;
