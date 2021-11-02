import useAxios from "axios-hooks";
import React from "react";
import Loading from '../../assets/loading-bar.gif'

import {
  BrowserRouter as Router,
  useHistory,
  Link,
} from "react-router-dom";

function Home() {
  
  const history = useHistory();

  const [{data, loading, error}] = useAxios({
    url: 'http://localhost:3000/profile',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('api-token')
    }
  });
  
  const doLogout = () => {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <aside>
        {data && 
          <div>
            <h3>Bom dia, {data.nome}</h3>
          <img src={'http://localhost:3001/img/' + data.avatar} alt="loading..." width="100" width="100" />
          </div>}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
        <button onClick={doLogout}>Logout</button>
      </aside>
      <main>
        { data && <pre>{JSON.stringify(data, null, 2)}</pre> }
        {loading && <img src={Loading} alt="loading..." />}
      </main>
    </div>
  );
}
export default Home;
