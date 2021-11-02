import useAxios from "axios-hooks";
import React from "react";
import Loading from '../../assets/loading-circle.gif'

import {
  BrowserRouter as Router,
  useHistory,
  Link,
} from "react-router-dom";

function Home() {
  
  const [{data, loading, error}] = useAxios({
    url: 'http://localhost:3000/profile',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('api-token')
    }
  });

  return (
    <main>
        {data && 
          <div>
            <h3>Bom dia, {data.nome}</h3>
            <h4>Você nasceu em {new Date(data.data_nascimento).toLocaleDateString()}</h4>
          <img src={'http://localhost:3001/img/' + data.avatar} alt="loading..." width="100" width="100" />
          </div>}
        { data && <pre>{JSON.stringify(data, null, 2)}</pre> }
        {loading && <img src={Loading} alt="loading..." width="60" height="60"/>}
      </main>
  );
}
export default Home;
