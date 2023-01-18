import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AcademicToken from './views/academicToken';
import Academic from './views/Academic';
import InserirAluno from './views/AdicionarAluno';
import InserirDiciplina from './views/AdicionarDiciplina';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { AcademicServices } from './services/Academic';
import { AlunoServices } from './services/Aluno';
import { DiciplinaServices } from './services/Diciplina';
import { TokenServices } from './services/token';

function App() {
  const [academic, setAcademicContract] = useState()
  const [token, setAcademicToken] = useState()
  const [diciplina, setDiciplina] = useState()
  const [aluno, setAluno] = useState()
  useEffect(() => {

    async function connect() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      if (provider !== undefined) {
        provider._networkPromise.then(() => {
          setAluno(new AlunoServices(provider))
          setDiciplina(new DiciplinaServices(provider))
          setAcademicContract(new AcademicServices(provider))
          setAcademicToken(new TokenServices(provider))
        })
      }
    }
    connect();
  }, [])

  return (
    <Router>
      <ul>
        <li>
          <Link to="/Pagar">Pagar</Link>
        </li>
        <li>
          <Link to="/Aluno">Aluno</Link>
        </li>
        <li>
          <Link to="/Diciplina">Diciplina</Link>
        </li>
        <li>
          <Link to="/Academia">Academia</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path='/Pagar' element={< AcademicToken academic={token} />}></Route>
        <Route exact path='/Aluno' element={< InserirAluno academic={aluno} />}></Route>
        <Route exact path='/Diciplina' element={< InserirDiciplina academic={diciplina} />}></Route>
        <Route exact path='/Academia' element={< Academic academic={academic} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
