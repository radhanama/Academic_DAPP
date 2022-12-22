import { ethers } from "ethers";
import { AcademicCertificateContract } from "../contractsAdresses";

const AcademicAbi = require("../smartContract/artifacts/contracts/Academic.sol/Academic.json")

export class AcademicServices {
    constructor(provider) {
        const academicContract = new ethers.Contract(AcademicCertificateContract, AcademicAbi.abi, provider);
        this.academicContractWithSigner = academicContract.connect(provider.getSigner());
    }
    async awardCertificate(tokenUri) {
        const result = await this.academicContractWithSigner.awardCertificate(this.academicContractWithSigner.address, tokenUri)
        return result;
    }
}
