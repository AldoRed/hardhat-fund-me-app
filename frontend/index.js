// in nodejs
// require()

// in frontend javascript you can't use require so we use import
import { ethers } from "./ethers-5.2.esm.min.js"
import { abi } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
connectButton.onclick = connect
fundButton.onclick = fund

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

async function fund(ethAmount) {
	console.log(`Funding ${ethAmount}...`)
	if (typeof window.ethereunm !== "undefined") {
		// provider / connection to the blockchain
		// signer / wallet / someone with some gas
		// contract that we want to interact with
		// ^ ABI & Address

		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const contract = "" // ?
	}
}

// fund function

// widthdraw function
