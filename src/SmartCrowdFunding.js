import web3 from "./web3";

const address = "0x232E537695e2612433E8198712c970567a323766";

const abi = [
];

export default new web3.eth.Contract(abi, address);
