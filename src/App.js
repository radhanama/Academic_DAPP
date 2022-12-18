import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AcademicToken from './views/academicToken';
import AcademicCertificate from './views/AcademicCertificate';
import InserirAluno from './views/AdicionarAluno';
import InserirDiciplina from './views/AdicionarDiciplina';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { AcademicTokenServices } from './services/AcademicToken';
import { AlunoServices } from './services/Aluno';
import { DiciplinaServices } from './services/Diciplina';

function App() {
  const [academicToken, setAcademicToken] = useState()
  const [academicCertificate, setAcademicCerAcademicCertificate] = useState()
  const [diciplina, setDiciplina] = useState()
  const [aluno, setAluno] = useState()
  useEffect(() => {

    async function connect() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      if (provider !== undefined) {
        provider._networkPromise.then(() => {
          setAluno(new AlunoServices(provider))
          setAcademicToken(new AcademicTokenServices(provider))
          setDiciplina(new DiciplinaServices(provider))
          setAcademicCerAcademicCertificate(new AcademicTokenServices(provider))
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
          <Link to="/Certificado">Certificado</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path='/Pagar' element={< AcademicToken academic={academicToken} />}></Route>
        <Route exact path='/Aluno' element={< InserirAluno academic={aluno} />}></Route>
        <Route exact path='/Diciplina' element={< InserirDiciplina academic={diciplina} />}></Route>
        <Route exact path='/Certificado' element={< AcademicCertificate academic={academicCertificate} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
