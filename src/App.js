import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AcademicToken from './views/academicToken';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { AcademicTokenServices } from './services/AcademicToken';

function App() {
  const [academicToken, setAcademicToken]  = useState()
  useEffect(() => {

    async function connect() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      if(provider != undefined)
      {
        provider._networkPromise.then(()=>
        {
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
      </ul>
      <Routes>
      <Route exact path='/' element={< AcademicToken academic={academicToken} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
