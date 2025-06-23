import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import VinoVoting from './contracts/VinoVoting.json';
import './App.css';

function App() {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(0);
  const [votingActive, setVotingActive] = useState(true);
  const contractAddress = "<YOUR_DEPLOYED_ADDRESS>";

  useEffect(() => {
    if (!window.ethereum) return;
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(prov);
    prov.send("eth_requestAccounts", []);
    const sign = prov.getSigner();
    setSigner(sign);

    const voteContract = new ethers.Contract(contractAddress, VinoVoting.abi, sign);
    setContract(voteContract);
  }, []);

  useEffect(() => {
    if (!contract) return;
    loadCandidates();
    contract.votingActive().then(setVotingActive);
  }, [contract]);

  async function loadCandidates() {
    const data = await contract.getCandidates();
    setCandidates(data);
  }

  async function castVote() {
    await contract.vote(selected);
    loadCandidates();
  }

  async function endVoting() {
    await contract.endVoting();
    setVotingActive(false);
  }

  return (
    <div className="App">
      <h1>VoteChain by Vino </h1>
      <p>Built by S Vinodhini – decentralized voting made easy</p>

      <div className="candidates">
        {candidates.map((c, i) => (
          <div key={i} className="candidate-card">
            <h3>{c.name}</h3>
            <p>Votes: {c.voteCount.toString()}</p>
            <button onClick={() => setSelected(i)}>Select</button>
          </div>
        ))}
      </div>

      <button onClick={castVote} disabled={!votingActive}>Vote Now</button>
      <button onClick={endVoting} disabled={!votingActive}>End Voting</button>
      <footer>© 2025 | Built by <strong>S Vino</strong></footer>
    </div>
  );
}

export default App;
