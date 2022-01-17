import useAxios from 'axios-hooks';
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { UsuarioContext } from '../../auth/usuario-context';
import Loading from '../../assets/loading-circle.gif'
import './signup.css';

function SignUp() {

  const history = useHistory();

  // Prepara a requisição de login
  const [{ data: signUpResponse, loading, error }, executeSignUp] = useAxios({
    url: 'http://localhost:3000/auth/signup',
    method: 'POST'
  }, { manual: true });

  const [{ data: faculdades, loading: loadingFaculdades, error: errorLoadingFaculdades }] = useAxios('http://localhost:3000/faculdades');

  const [details, setDetails] = useState({
    email: "",
    password: "",
    faculdade: null,
    curso: null
  });

  const [faculdade, setFaculdade] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    executeSignUp({ data: details });

    return false;
  };

  const goToLogin = () => {
    history.push('/');

    return false;
  }

  useEffect(() => {
    const faculdadeId = details.faculdade;

    if (faculdadeId) {
      return;
    }

    if (faculdades && faculdade.id != faculdadeId) {
      setFaculdade(faculdades.find(f => f.id === faculdadeId) || {});
      setDetails({...details, curso: null})
    }
  }, [details])

  return (
    <div className="signup--layout">
      <h1 className="klass-title">klass</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <div>
            <h2>Novo Cadastro</h2>
            {error != "" ? <div className="error">{error}</div> : ""}

            <div className="inner-form">
              <div className="form-group">
                <label> Primeiro Nome </label>
                <input
                  placeholder="Nome"
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
                <label> Sobrenome Nome </label>
                <input
                  placeholder="Sobrenome"
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
                <label> Faculdade </label>

                <select onChange={(e) => setDetails({ ...details, faculdade: e.target.value }) }>
                  <option>{loadingFaculdades ? 'Carregando faculdades...' : 'Selecione a faculdade'}</option>
                  { faculdades && faculdades.map((faculdade, i) => (
                      <option key={i} value={faculdade.id}>{faculdade.nome} - {faculdade.campus}</option>
                    ))
                  }
                </select>
              </div>

              <div className="form-group">
                <label> Curso </label>

                <select onChange={(e) => setDetails({ ...details, curso: e.target.value })}>
                  <option>{loadingFaculdades ? 'Carregando cursos...' : 'Selecione o curso'}</option>
                  {faculdade.cursos && faculdade.cursos.map((curso, i) => (
                    <option key={i} value={curso.id}>{curso.nome}</option>
                  ))
                  }
                </select>
              </div>

              <div className="form-group">
                <label> Curso </label>
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

              <div className="form-group buttons">
                <button type="submit" disabled={loading}>Cadastrar</button>
                <button disabled={loading} type="button" onClick={goToLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
