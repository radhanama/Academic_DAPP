// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./IDisciplinaContract.sol";
import "./AcademicTypes.sol";

contract DisciplinaContract is IDisciplinaContract {

    address owner;
    address _academicContractAddr;
    mapping(uint => Disciplina) disciplinaById;
    
    constructor(address academicContractAddr){
       _academicContractAddr = academicContractAddr;
       owner = msg.sender;
    }
    
    modifier onlyOwner() {
       require(msg.sender == owner, "Nao autorizado");
       _;
    }
    
    function getDisciplinaById(uint id) external view returns (Disciplina memory) {
        return disciplinaById[id];
    }
    
    function InserirDisciplina(uint id, string memory name, address professor) onlyOwner public {
        disciplinaById[id] = Disciplina(id, name, professor);
    }

    function InserirAlunoNaDisciplina(uint id, address aluno) public {

    }
}