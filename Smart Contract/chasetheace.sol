pragma solidity ^0.4.21;

contract chasetheace {
    
    function chasetheace() {
        owner = msg.sender;
        currentDeckSize = 52;
        minTickets = 5;
        roundWinner = owner;
        ticketPrice = 0.01 ether;
        gameOn = 1;
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    address public owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
	
	mapping (uint => address) tickets;
	uint ticketPrice;
	uint currentTicket;
	uint currentDeckSize;
	uint randomNumber;
	uint minTickets;
	uint gameOn;
	uint canDraw;
	uint lastCard;
	uint totalTickets;
	address roundWinner;
	
	function viewInfo() view returns(uint, uint, uint, uint, uint, address) {
	    uint _jackpot = (totalTickets * ticketPrice / 4);
	    _jackpot = _jackpot * 3;
	    return (currentTicket, currentDeckSize, canDraw, lastCard, _jackpot, roundWinner);
	}
	
	function getTicket() payable {
	    require (canDraw == 0 && gameOn == 1 && msg.value == ticketPrice);
	    currentTicket++;
	    totalTickets++;
	    tickets[currentTicket] = msg.sender;
	    if (currentTicket > minTickets) {
	        randomNumber = (block.number + 1);
	    }
	}
	
	function revealWinner() external {
	    require (block.number > randomNumber && currentTicket > minTickets && canDraw == 0);
	    if (block.number - randomNumber <= 255) {
	    uint _randomNumber = uint(keccak256(block.blockhash(randomNumber))) % currentTicket + 1;
	    roundWinner = tickets[_randomNumber];
	    roundWinner.transfer((ticketPrice / 4) * currentTicket);
	    randomNumber = block.number + 1;
	    canDraw = 1;
	    currentTicket = 0;
	    }
	    else {
	        randomNumber = (block.number + 1);
	    }
	}
	
	function drawCard() external {
	    require (block.number > randomNumber && canDraw == 1);
	    uint _randomNumber = uint(keccak256(block.blockhash(randomNumber))) % currentDeckSize + 1;
	    if (_randomNumber == 1) {
	        roundWinner.transfer(this.balance);
	        gameOn = 1;
	        canDraw = 0;
	        randomNumber = 0;
	        totalTickets = 0;
	        roundWinner = owner;
	        currentDeckSize = 52;
	    }
	    else {
	    currentDeckSize--;
	    currentTicket = 0;
	    canDraw = 0;
	    lastCard = _randomNumber;
	    }
	}
    
}