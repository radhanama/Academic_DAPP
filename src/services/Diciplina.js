import { ethers } from "ethers";
import { DisciplinaContract } from "../contractsAdresses";

const DiciplinaAbi = require("../smartContract/artifacts/contracts/DisciplinaContract.sol/DisciplinaContract.json")

export class DiciplinaServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(DisciplinaContract, DiciplinaAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async insert(id, nome, professor) {
        const result = await this.academicContractWithSigner.inserirDiciplina(id, nome, professor)
        return result;
    }
    async getDisciplinaById(id) {
        const result = await this.academicContractWithSigner.getDisciplinaById(id)
        return result;
    }
    async inserirAlunoNaDisciplina(diciplina, id) {
        const result = await this.academicContractWithSigner.inserirAlunoNaDisciplina(diciplina,id)
        return result;
    }
    async pagarDisciplina(amount) {
        const result = await this.academicContractWithSigner.pagarDisciplina(amount)
        return result;
    }
}
