import { ethers } from "ethers";
import { AcademicUtilsContract } from "../contractsAdresses";

const DiciplinaAbi = require("../smartContract/artifacts/contracts/Academic.sol/Academic.json")

export class DiciplinaServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(AcademicUtilsContract, DiciplinaAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async insert(id, nome, address) {
        const result = await this.academicContractWithSigner.inserirDiciplina(id, nome, address)
        return result;
    }
}
