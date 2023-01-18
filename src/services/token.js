import { ethers } from "ethers";
import { AcademicToken } from "../contractsAdresses";

const TokenAbi = require("../smartContract/artifacts/contracts/AcademicToken.sol/AcademicToken.json")

export class TokenServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(AcademicToken, TokenAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async pagarDisciplina(amount) {
        try {
            const result = await this.academicContractWithSigner.transfer(AcademicToken, amount)
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}
