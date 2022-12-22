import { ethers } from "ethers";
import { DisciplinaContract } from "../contractsAdresses";

const DiciplinaAbi = require("../smartContract/artifacts/contracts/DisciplinaContract.sol/DisciplinaContract.json")

export class DiciplinaServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(DisciplinaContract, DiciplinaAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async insert(id, nome, address) {
        const result = await this.academicContractWithSigner.inserirDiciplina(id, nome, address)
        return result;
    }
}
