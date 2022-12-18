import { ethers } from "ethers";
import { AlunoContract, pathContracts } from "../contractsAdresses";

const AlunoAbi = require(`${pathContracts}/AlunoContract.sol/AlunoContract.json`)

export class AlunoServices
{
    constructor(provider){
        const academicContract = new ethers.Contract(AlunoContract, AlunoAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async insert(address, amount){
        const result = await this.academicContractWithSigner.inserirAluno(address, amount)
        return result;
    }
}
