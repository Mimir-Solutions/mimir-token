
const MIMIRContract = artifacts.require("MimirToken")
const MIMIRIOContract = artifacts.require("MIMIRInitialOffering")
const BN = web3.utils.BN


const send = (method, params = []) =>
  new Promise((resolve, reject) =>
    web3.currentProvider.send({id: 0, jsonrpc: "2.0", method, params}, (err, x) => {
        if(err) reject(err)
        else resolve(x)
    })
  )

const getIOContracts = () => Promise.all([
    MIMIRIOContract.deployed(),
    MIMIRContract.deployed()
]).then(([InitialOffering, MIMIR]) => ({InitialOffering, MIMIR}))

const snapshot = () => send("evm_snapshot").then(x => x.result)
const revert = (snap) => send("evm_revert", [snap])
const timeTravel = async (seconds) => {
  await send("evm_increaseTime", [seconds])
  await send("evm_mine")
}

module.exports = {
    getIOContracts,
    timeTravel, snapshot, revert,
    toWei: (value) => web3.utils.toWei(value.toString(), "ether"),
}
