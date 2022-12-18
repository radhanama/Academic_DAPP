import { ethers } from "ethers";
import { AcademicCertificateContract } from "../contractsAdresses";

const AcademicTokenAbi = require("../smartContract/artifacts/contracts/AcademicCertificate.sol/AcademicCertificate.json")

export class AcademicTokenServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(AcademicCertificateContract, AcademicTokenAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async awardCertificate(address, amount) {
        const result = await this.academicContractWithSigner.awardCertificate(this.academicContractWithSigner.address, amount)
        return result;
    }
}
