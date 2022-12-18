import { ethers } from "ethers";
import { AlunoContract } from "../contractsAdresses";

const AlunoAbi = require("../smartContract/artifacts/contracts/AlunoContract.sol/AlunoContract.json")

export class AlunoServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(AlunoContract, AlunoAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async insert(id, name) {
        const result = await this.academicContractWithSigner.inserirAluno(id, name)
        return result;
    }
}
