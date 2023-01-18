// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./AcademicTypes.sol";
import "./IAlunoContract.sol";
import "./AcademicCertificate.sol";
import "./AlunoContract.sol";

/**
 * @title Academic
 * @dev Academic system contract
 */
contract Academic {

  Periodo public etapaAlunos;
  Periodo public etapaDisciplinas;

	mapping(uint => mapping(uint => uint8)) public alunoIdToDisciplinaIdToNota;
	mapping(uint => Disciplina) public disciplinaById;
	mapping(uint => uint[]) public alunosByDisciplina;

	address owner;
	address _alunoContractAddr;

	constructor(){
			etapaAlunos = Periodo.INSCRICAO_ALUNOS;
			etapaDisciplinas = Periodo.INSCRICAO_DISCIPLINAS;
			owner = msg.sender;
	}

	modifier onlyOwner(){
			require(msg.sender == owner, "Nao autorizado");
			_;
	}

	event tryProfessor(address actual, uint concat, Disciplina right);

	modifier onlyProfessor(uint disciplinaId){
			Disciplina memory d = disciplinaById[disciplinaId];
			emit tryProfessor(msg.sender, disciplinaId, d);
			//require(msg.sender == d.professor, "nao authorizado");
			_;
	}

	function setAlunoContractAddress(address alunoContractAddr) public onlyOwner {
			_alunoContractAddr = alunoContractAddr;
	}

	function setAlunoGraduated(uint alunoId) public onlyOwner {
		require(bytes(IAlunoContract(_alunoContractAddr).getAlunoById(alunoId).nome).length != 0, "Aluno nao existente");

		Aluno memory aluno = AlunoContract(_alunoContractAddr).getAlunoById(alunoId);
        aluno.isGraduated = true;
        AlunoContract(_alunoContractAddr).updateAluno(aluno);
	}

	function abrirLancamentoNota() onlyOwner public {
			etapaAlunos = Periodo.LANCAMENTO_NOTAS;
	}

	function inserirNota(uint alunoId, uint disciplinaId, uint8 nota) onlyProfessor(disciplinaId) public {
			require(bytes(IAlunoContract(_alunoContractAddr).getAlunoById(alunoId).nome).length != 0, "Aluno nao existente");
			require(etapaAlunos == Periodo.LANCAMENTO_NOTAS, "Fora do periodo de lancamento de notas");

			Disciplina memory d = disciplinaById[disciplinaId];
			emit tryProfessor(msg.sender, disciplinaId, d);
			alunoIdToDisciplinaIdToNota[alunoId][disciplinaId] = nota;
	}

	function getNotaAlunoByDisciplinaId(uint alunoId, uint disciplinaId) external view returns (uint8) {
			return alunoIdToDisciplinaIdToNota[alunoId][disciplinaId];
	}

	function listarNotasDisciplina(uint disciplinaId) view public returns(Aluno[] memory, uint8[] memory){
			uint numAlunos = alunosByDisciplina[disciplinaId].length;

			Aluno[] memory alunos = new Aluno[](numAlunos);
			uint8[] memory notas = new uint8[](numAlunos);

			for(uint i = 0; i < numAlunos; i++){
					uint alunoId = alunosByDisciplina[disciplinaId][i];
					
					alunos[i] = IAlunoContract(_alunoContractAddr).getAlunoById(alunoId); 
					notas[i] = alunoIdToDisciplinaIdToNota[alunoId][disciplinaId];
			}
			return (alunos, notas);
	}

	function getAcademicCertificate() public returns (uint256){
		return AcademicCertificate(address(this)).awardCertificate(msg.sender, "TokenUri");
	}
}
