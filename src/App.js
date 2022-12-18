import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AcademicToken from './views/academicToken';
import InserirAluno from './views/AdicionarAluno';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { AcademicTokenServices } from './services/AcademicToken';
import { AlunoServices } from './services/Aluno';

function App() {
  const [academicToken, setAcademicToken]  = useState()
  const [aluno, setAluno]  = useState()
  useEffect(() => {

    async function connect() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      if(provider != undefined)
      {
        provider._networkPromise.then(()=>
        {
          setAluno(new AlunoServices(provider))
          setAcademicToken(new AcademicTokenServices(provider))
        })
      }
    }
    connect();
  }, [])

  return (
    <Router>
      <ul>
        <li>
          <Link to="/">AcademicToken</Link>
        </li>
        <li>
          <Link to="/Aluno">Aluno</Link>
        </li>
      </ul>
      <Routes>
      <Route exact path='/' element={< AcademicToken academic={academicToken} />}></Route>
      <Route exact path='/Aluno' element={< InserirAluno academic={aluno} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
