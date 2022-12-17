import { ethers } from "ethers";

const AcademicTokenAbi = require("../smartContract/artifacts/contracts/AcademicToken.sol/AcademicToken.json")

export class AcademicTokenServices
{
    constructor(provider){
        const academicContract = new ethers.Contract("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", AcademicTokenAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async transfer(address, amount){
        const result = await this.academicContractWithSigner.transfer(address, amount)
        return result;
    }
}
