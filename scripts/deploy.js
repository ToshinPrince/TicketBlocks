const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  //Setting up Accounts and Constants
  const deployer = await hre.ethers.getSigner();
  const NAME = "TicketBlocks";
  const SYMBOL = "TB";

  // Deploying Contarct
  const TicketBlocks = await hre.ethers.getContractFactory("TicketBlocks");
  const ticketBlocks = await TicketBlocks.deploy(NAME, SYMBOL);

  await ticketBlocks.deployed();

  console.log(`Deployed TicketBlocks Contract at: ${ticketBlocks.address}\n`);

  //Occasions
  // List 6 events
  const occasions = [
    {
      name: "Web3 Summit",
      cost: tokens(3),
      tickets: 0,
      date: "May 31",
      time: "6:00PM EST",
      location: "Miami-Dade Arena - Miami, FL",
    },
    {
      name: "ETH Tokyo",
      cost: tokens(1),
      tickets: 125,
      date: "Jun 2 2025",
      time: "1:00PM JST",
      location: "Tokyo, Japan",
    },
    {
      name: "ETH Privacy Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9 2025",
      time: "10:00AM TRT",
      location: "Turkey, Istanbul",
    },
    {
      name: "EthGlobal Events",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11 2025",
      time: "2:30PM CST",
      location: "American Airlines Center - Dallas, TX",
    },
    {
      name: "ETH Global Toronto",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23 2025",
      time: "11:00AM EST",
      location: "Toronto, Canada",
    },
    {
      name: "Scaling Ethereum India",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 21 2025",
      time: "4:30 CST",
      location: "Mumbai, India",
    },
  ];

  for (var i = 0; i < 6; i++) {
    const transaction = await ticketBlocks
      .connect(deployer)
      .list(
        occasions[i].name,
        occasions[i].cost,
        occasions[i].tickets,
        occasions[i].date,
        occasions[i].time,
        occasions[i].location
      );

    await transaction.wait();

    console.log(`Listed Events ${i + 1}: ${occasions[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
