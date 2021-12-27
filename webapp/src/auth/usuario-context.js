import { useState, createContext, useMemo } from 'react';

const UsuarioContext = createContext();

const UsuarioProvider = (props) => {
  const [usuario, setUsuario] = useState({ loading: true });
  // the state that we'll be storing the user into

  /* 
    because we will be providing an object to the provider, 
    it is better to put the value inside a useMemo so that the component will only re-render when there's a change in the value. 
  */

  const value = useMemo(() => ({ usuario, setUsuario }), [usuario])


  return (
    <UsuarioContext.Provider
      value={value}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
}

export { UsuarioContext, UsuarioProvider };