import { useEffect, useState } from "react";
import Clima from "./components/Clima";
import Error from "./components/Error";
import Formulario from "./components/Formulario";
import Header from "./components/Header";


function App() {

  // state del formulario
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false);
  const { ciudad, pais } = busqueda;
  const [resultado, setresultado] = useState({});
  const [error, setError] = useState(false);


  useEffect( ()=> {
    const consultarApi = async ()=>{
      if( consultar){
        const appId = '3233d258e269e54bd75b91644ac63a5e';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${ pais }&appid=${appId}`;
  
        const respuest = await fetch( url );
        const resultado = await respuest.json();
  
        setresultado(resultado);
        setConsultar( false );

        // detecta si hay resultados correctos
        if(resultado.cod === '404'){
          setError( true );
        } else {
          setError( false );
        }

      }
    }
    consultarApi();
  },[consultar])

  return (
    <>
      <Header 
        titulo = 'Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda = { busqueda }
                setBusqueda = { setBusqueda }
                setConsultar = { setConsultar }
              />
            </div>{}
            <div className="col m6 s12">
              {
                (!error) ? 
                  <Clima 
                    resultado={ resultado }
                  />  :
                  <Error mensaje = 'No hay Resultados' />  

              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
