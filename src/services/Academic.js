import { ethers } from "ethers";
import { AcademicCertificateContract } from "../contractsAdresses";

const AcademicAbi = require("../smartContract/artifacts/contracts/Academic.sol/Academic.json")

export class AcademicServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(AcademicCertificateContract, AcademicAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async awardCertificate(tokenUri) {
        const result = await this.academicContractWithSigner.getAcademicCertificate(this.academicContractWithSigner.address, tokenUri)
        return result;
    }
    async setAlunoGraduated(id) {
        const result = await this.academicContractWithSigner.setAlunoGraduated(id)
        return result;
    }
    async abrirLancamentoNota() {
        const result = await this.academicContractWithSigner.abrirLancamentoNota()
        return result;
    }
    async inserirNota(id, diciplina, nota) {
        const result = await this.academicContractWithSigner.inserirNota(id, diciplina, nota)
        return result;
    }
    async getNotaAlunoByDisciplinaId(id, diciplina) {
        const result = await this.academicContractWithSigner.getNotaAlunoByDisciplinaId(id, diciplina)
        return result;
    }
    async listarNotasDisciplina(id, diciplina) {
        const result = await this.academicContractWithSigner.listarNotasDisciplina(diciplina)
        return result;
    }
}
