import { ethers } from "ethers";
import { AcademicToken } from "../contractsAdresses";

const AcademicTokenAbi = require("../smartContract/artifacts/contracts/AcademicToken.sol/AcademicToken.json")

export class AcademicTokenServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(AcademicToken, AcademicTokenAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async transfer(address, amount) {
        const result = await this.academicContractWithSigner.transfer(this.academicContractWithSigner.address, amount)
        return result;
    }
}
