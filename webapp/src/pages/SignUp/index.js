import useAxios from "axios-hooks";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UsuarioContext } from "../../auth/usuario-context";
import Loading from "../../assets/loading-circle.gif";
import "./signup.css";

function SignUp() {
  const history = useHistory();

  // Prepara a requisição de login
  const [{ data: signUpResponse, loading, error }, executeSignUp] = useAxios(
    {
      url: "http://localhost:3000/auth/signup",
      method: "POST",
    },
    { manual: true }
  );

  const [
    {
      data: faculdades,
      loading: loadingFaculdades,
      error: errorLoadingFaculdades,
    },
  ] = useAxios("http://localhost:3000/faculdades");

  const [details, setDetails] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    password: "",
    faculdade: null,
    curso: null,
  });

  const [faculdade, setFaculdade] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    executeSignUp({ data: details });

    return false;
  };

  const goToLogin = () => {
    history.push("/");

    return false;
  };

  useEffect(() => {
    if (faculdade.id === details.faculdade) {
      return;
    }

    const faculdadeSelecionada = (faculdades || []).find((f) => f.id == details.faculdade) || {};

    console.log({faculdadeSelecionada});


    setFaculdade(faculdadeSelecionada);
  }, [details]);

  return (
    <div className="signup--layout">
      <h1 className="klass-title">klass</h1>
      <div className="signup--form-outer">
        <form onSubmit={handleSubmit}>
          <div className="form-inner">
            <div>
              <h2>Novo Cadastro</h2>
              {error != "" ? <div className="error">{error}</div> : ""}

              <div className="inner-form">
                <div className="form-fields">

                  <div className="form-group">
                    <label> Nome </label>
                    <input
                      placeholder="Nome"
                      name="nome"
                      id="nome"
                      onChange={(e) =>
                        setDetails({ ...details, nome: e.target.value })
                      }
                      value={details.nome}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label> Sobrenome </label>
                    <input
                      placeholder="Sobrenome"
                      name="sobrenome"
                      id="sobrenome"
                      onChange={(e) =>
                        setDetails({ ...details, sobrenome: e.target.value })
                      }
                      value={details.sobrenome}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label> Usuário </label>
                    <input
                      placeholder="@nome.sobrenome"
                      name="username"
                      id="username"
                      onChange={(e) =>
                        setDetails({ ...details, username: e.target.value })
                      }
                      value={details.username}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label> Data de Nascimento </label>
                    <input
                      placeholder="00/00/0000"
                      name="dataNascimento"
                      id="dataNascimento"
                      type="date"
                      onChange={(e) =>
                        setDetails({ ...details, dataNascimento: e.target.value })
                      }
                      value={details.dataNascimento}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label> Campus </label>

                    <select
                      onChange={(e) =>
                        setDetails({ ...details, faculdade: e.target.value })
                      }
                    >
                      <option>
                        {loadingFaculdades
                          ? "Carregando campus..."
                          : "Selecione o Campus"}
                      </option>
                      {faculdades &&
                        faculdades.map((faculdade, i) => (
                          <option key={i} value={faculdade.id}>
                            {faculdade.nome} - {faculdade.campus}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label> Curso </label>

                    <select
                      onChange={(e) =>
                        setDetails({ ...details, curso: e.target.value })
                      }
                    >
                      <option>
                        {loadingFaculdades
                          ? "Carregando cursos..."
                          : "Selecione o curso"}
                      </option>
                      {faculdade.cursos &&
                        faculdade.cursos.map((curso, i) => (
                          <option key={i} value={curso.id}>
                            {curso.nome}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label> E-mail </label>
                    <input
                      placeholder="email"
                      name="email"
                      id="email"
                      type="email"
                      onChange={(e) =>
                        setDetails({ ...details, email: e.target.value })
                      }
                      value={details.sobrenome}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label> Senha </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Senha"
                      id="password"
                      onChange={(e) =>
                        setDetails({ ...details, password: e.target.value })
                      }
                      value={details.password}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group-buttons">
                  <button type="submit" disabled={loading}>
                    Cadastrar
                  </button>
                  <button disabled={loading} type="button" onClick={goToLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
