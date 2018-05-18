window.addEventListener('load', function() {
		if (typeof web3 !== 'undefined') {
			document.getElementById('logooverlay').style.visibility='hidden';
			startApp(web3);
		} else {
		}
	})

	const abi = [{
		"constant": false,
		"inputs": [],
		"name": "drawCard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "revealWinner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "viewInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getTicket",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	}]
	const contract_address = '0x2f04558b21c318658a25b6e0e961897a69c2f65f'
	const writeValue = (elementId, value) => document.getElementById(elementId).textContent = value;
	const etherValue = web3.toWei(10, 'ether');
	var address = '0x2f04558b21c318658a25b6e0e961897a69c2f65f'

	web3.version.getNetwork((err, netId) => {
	  switch (netId) {
		case "1":
		  console.log('This is mainnet')
		  break
		case "2":
		  console.log('This is the deprecated Morden test network.')
		  break
		case "3":
		  console.log('This is the ropsten test network.')
		  break
		case "4":
		  console.log('This is the Rinkeby test network.')
		  break
		case "42":
		  console.log('This is the Kovan test network.')
		  break
		default:
		  console.log('This is an unknown network.')
	  }
	})

	var account = web3.eth.accounts[0];
	var accountInterval = setInterval(function() {
	  if (web3.eth.accounts[0] !== account) {
		account = web3.eth.accounts[0];
		location.reload();
	  }
	}, 100);

	function startApp(web3) {
		const eth = new Eth(web3.currentProvider)
		const token = eth.contract(abi).at(contract_address);
	}

	const myContract = web3.eth.contract(abi).at(contract_address);
	const registrationVar = setInterval(checkContributionStatus, 3000);
	
	function checkContributionStatus () {
		myContract.viewInfo({from: account}, (err, result) => {
			var currentTicket = (result[0] + 0) / 10;
			var currentDeckSize = (result[1] + 0) / 10;
			var canDraw = (result[2] + 0) / 10;
			var lastCard = (result[3] + 0) / 10;
			var currentJackpot = (result[4] + 0) / 10000000000000000000;
			var roundWinner = result[5];
			var joinedVar = document.getElementById("nsp1")
			var currentTicketVar = document.getElementById("nsp2")
			var lastCardVar = document.getElementById("nsp3")
			var drawCardVar = document.getElementById("drawCardId")
			var currentJackpotVar = document.getElementById("jackpotId")
			var roundWinnerVar = document.getElementById("roundWinnerId")
			var revealSwitchVar = document.getElementById("revealId")
			currentTicketVar.innerHTML = (currentTicket + "/25");
			if (canDraw == 1) {
				 drawCardVar.style.color = "#26b30a";
			}
			if (canDraw == 0) {
				 drawCardVar.style.color = "#b30a0a";
			}
			if (currentTicket >= 25) {
			currentTicketVar.style.color = "#26b30a";
			document.getElementById('rollTheDice').style.visibility='visible';
			}
			if (currentTicket < 25) {
			currentTicketVar.style.color = "#b30a0a";
			document.getElementById('rollTheDice').style.visibility='hidden';
			}
			drawCardVar.innerHTML = currentDeckSize;
			roundWinnerVar.innerHTML = roundWinner;
			lastCardVar.src = (lastCard + '.png');
			currentJackpotVar.innerHTML = (currentJackpot + ' ETH');
		});
	}
	
function startGame () {
	const eth = new Eth(web3.currentProvider)
	const myContract = eth.contract(abi).at(contract_address);
	web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
	myContract.startGame({ from: account})
}

function getTicket () {
	const eth = new Eth(web3.currentProvider)
	const myContract = eth.contract(abi).at(contract_address);
	web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
	var ticketPrice = 10000000000000000;
	myContract.getTicket({ from: account, value: ticketPrice})
}

function revealWinner () {
	const eth = new Eth(web3.currentProvider)
	const myContract = eth.contract(abi).at(contract_address);
	web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
	myContract.revealWinner({ from: account})
}

function drawCard () {
	const eth = new Eth(web3.currentProvider)
	const myContract = eth.contract(abi).at(contract_address);
	web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
	myContract.drawCard({ from: account})
}