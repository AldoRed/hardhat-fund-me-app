// in nodejs
// require()

// in frontend javascript you can't use require so we use import
import { ethers } from "./ethers-5.2.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw

console.log(ethers)

async function connect() {
	if (typeof window.ethereum !== "undefined") {
		try {
			await window.ethereum.request({ method: "eth_requestAccounts" })
		} catch (error) {
			console.error("User denied account access")
		}
		document.getElementById("connectButton").innerHTML = "Connected!"
		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		})
		console.log(accounts)
	} else {
		document.getElementById("connectButton").innerHTML =
			"Please install MetaMask!"
	}
}

async function getBalance(){
	if (typeof window.ethereum !== "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const balance = await provider.getBalance(contractAddress)
		console.log(ethers.utils.formatEther(balance))
	}
}

async function fund() {
	const ethAmount = document.getElementById("ethAmount").value
	console.log(`Funding ${ethAmount}...`)
	if (typeof window.ethereum !== "undefined") {
		// provider / connection to the blockchain
		// signer / wallet / someone with some gas
		// contract that we want to interact with
		// ^ ABI & Address

		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const contract = new ethers.Contract(contractAddress, abi, signer)
		try {
			const transactionResponse = await contract.fund({ 
				value: ethers.utils.parseEther(ethAmount)
			})
			await listenForTransactionMine(transactionResponse, provider)
			console.log("Done!")
		}catch(error){
			console.log(error)
		}
	}
}

function listenForTransactionMine(transactionResponse, provider) {
	console.log(`Mining ${transactionResponse.hash}`)
	return new Promise((resolve, reject) => {
		provider.once(transactionResponse.hash, (transactionReceipt) => {
			console.log(`Completed with ${transactionReceipt.confirmations} confirmations`)
			resolve()
		})
	})
}

// widthdraw function
async function withdraw(){
	if (typeof window.ethereum !== "undefined") {
		console.log("Withdrawing...")
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const contract = new ethers.Contract(contractAddress, abi, signer)
		try {
			const transactionResponse = await contract.cheaperWithdraw()
			await listenForTransactionMine(transactionResponse, provider)
		} catch (error) {
			console.log(error)
		}
	}
}