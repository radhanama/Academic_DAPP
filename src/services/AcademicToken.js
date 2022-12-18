import { ethers } from "ethers";
import { AcademicToken, pathContracts } from "../contractsAdresses";

const AcademicTokenAbi = require(`${pathContracts}/AcademicToken.sol/AcademicToken.json`)

export class AcademicTokenServices
{
    constructor(provider){
        const academicContract = new ethers.Contract(AcademicToken, AcademicTokenAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async transfer(address, amount){
        const result = await this.academicContractWithSigner.transfer(address, amount)
        return result;
    }
}
