// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./AcademicToken.sol";
import "./IDisciplinaContract.sol";
import "./AlunoContract.sol";
import "./AcademicTypes.sol";

contract DisciplinaContract is IDisciplinaContract {

	address owner;
	address _academicContractAddr;
	address _alunoContractAddr;
	
	Periodo public etapaDisciplinas;

	mapping(uint => uint[]) inscritosDisciplinaById; 
	mapping(uint => Disciplina) disciplinaById;
	mapping(uint => mapping(uint => uint8)) notaByDisciplinaId;
	
	constructor(address academicContractAddr, address alunoContractAddress){
		_academicContractAddr = academicContractAddr;
		_alunoContractAddr = alunoContractAddress;

		etapaDisciplinas = Periodo.INSCRICAO_DISCIPLINAS;
		owner = msg.sender;
	}
	
	modifier onlyOwner() {
			require(msg.sender == owner, "Nao autorizado");
			_;
	}

	modifier onlyStudent(uint alunoId) {
		address aluno = AlunoContract(_alunoContractAddr).getAlunoById(alunoId).aluno;
		require(msg.sender == aluno, "Apenas o aluno pode pagar pela sua disciplina");
		_;
	}

	function getDisciplinaById(uint id) external view returns (Disciplina memory) {
		return disciplinaById[id];
	}

	function inserirDisciplina(uint id, string memory name, address professor) onlyOwner public {
			
		disciplinaById[id] = Disciplina(id, name, professor);
	}

	function inserirAlunoNaDisciplina(uint disciplinaId, uint alunoId) onlyOwner() public { 
		require(bytes(IAlunoContract(_alunoContractAddr).getAlunoById(alunoId).nome).length != 0, "Aluno nao existente");
		require(etapaDisciplinas == Periodo.INSCRICAO_DISCIPLINAS, "Fora do periodo de inscricao de disciplinas");

		inscritosDisciplinaById[disciplinaId].push(alunoId);
	}

	function pagarDisciplina(uint alunoId, uint amount) onlyStudent(alunoId) public {
		require(amount > 0, "Valor invalido");

		AcademicToken(_academicContractAddr).transferFrom(msg.sender, address(this), amount);
	}
}