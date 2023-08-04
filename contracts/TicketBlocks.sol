// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketBlocks is ERC721 {
    address public owner;
    uint256 public totalOccasions;
    uint256 public totalSupply;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) Occasions;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;
    mapping(uint256 => mapping(address => bool)) public hasBought;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasions = totalOccasions + 1;
        // totalOccasions++;
        Occasions[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        );
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        //Require _id is not 0 or less than total occasions
        require(_id != 0);
        require(_id <= totalOccasions);

        // Eth Send is greater than cost
        require(msg.value >= Occasions[_id].cost);

        //seat is not taken and it exists
        require(seatTaken[_id][_seat] == address(0));
        require(_seat <= Occasions[_id].maxTickets);

        Occasions[_id].tickets -= 1; //update ticket COunt

        hasBought[_id][msg.sender] = true; //updated Bought Status

        seatTaken[_id][_seat] = msg.sender; //Assigning Seat
        seatsTaken[_id].push(_seat); //seats Curently Taken

        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return Occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }
}
