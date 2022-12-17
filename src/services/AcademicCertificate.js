import { ethers } from "ethers";

const AcademicTokenAbi = require("../smartContract/artifacts/contracts/AcademicCertificate.sol/AcademicCertificate.json")

export class AcademicTokenServices
{
    constructor(provider){
        const academicContract = new ethers.Contract("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", AcademicTokenAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async awardCertificate(address, amount){
        const result = await this.academicContractWithSigner.awardCertificate(address, amount)
        return result;
    }
}
