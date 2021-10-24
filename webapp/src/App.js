import { useState } from 'react';
import User from './User'
import './App.css';

function randomUserId() {
  const min = 1;
  const max = 10;

  return Math.ceil(Math.random() * (max-min));
}

function App() {

  const [userId, setUserId] = useState(randomUserId)

  const nextUser = () => {
    setUserId(randomUserId());
  }

  return (
    <div className="App">
      <header className="App-header">
        <hgroup>
          <h1>Klass</h1>
          <h3>Faculdades</h3>
        </hgroup>  
      </header>
      <main>
        <button onClick={nextUser}>Recarregar</button>
        <User userId={userId}/>
      </main>
    </div>
  );
}

export default App;
