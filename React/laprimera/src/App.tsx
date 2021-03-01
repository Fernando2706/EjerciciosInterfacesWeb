import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css'
import './componets/Calculadora/calculadora'
import Calculadora from './componets/Calculadora/calculadora';

function App() {
  let texto="Hola soy una variable";
  const numbers=[1,2,3,4,5,6]
  return (
    <div className="App">
      <Calculadora text="Soy una calculadora"/>
    </div>
  );
}

export default App;
