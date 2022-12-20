// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

struct Aluno {
    uint id;
    string nome;
    address aluno;
    bool isGraduated;
}

struct Disciplina {
    uint id;
    string nome;
    address professor;
}

struct Notas {
    uint disciplinaId;
    uint alunoId;
    uint8 nota;
}

enum Periodo {
    INSCRICAO_ALUNOS,
    INSCRICAO_DISCIPLINAS,
    LANCAMENTO_NOTAS
}