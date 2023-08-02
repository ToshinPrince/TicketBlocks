const { expect } = require("chai");
const { ethers } = require("hardhat");

const NAME = "TicketBlocks";
const SYMBOL = "TB";

const OCCASION_NAME = "ETH Texes";
const OCCASION_COST = ethers.utils.parseUnits("1", "ether");
const OCCASION_MAX_TICKETS = 100;
const OCCASION_DATE = "Mar 22";
const OCCASION_TIME = "11:00AM CST";
const OCCASION_LOCATION = "Austin, Texes";

describe("TicketBlocks", () => {
  let ticketBlocks;
  let deployer, buyer;

  beforeEach(async () => {
    //Accounts
    [deployer, buyer] = await ethers.getSigners();

    //deploying
    const TicketBlocks = await ethers.getContractFactory("TicketBlocks");
    ticketBlocks = await TicketBlocks.deploy(NAME, SYMBOL);

    //
    const transaction = await ticketBlocks
      .connect(deployer)
      .list(
        OCCASION_NAME,
        OCCASION_COST,
        OCCASION_MAX_TICKETS,
        OCCASION_DATE,
        OCCASION_TIME,
        OCCASION_LOCATION
      );
    await transaction.wait();
  });

  // Deployment
  describe("Deployment", () => {
    it("Sets the name", async () => {
      let name = await ticketBlocks.name();
      expect(name).to.be.equal("TicketBlocks");
    });

    it("Sets the Symbol", async () => {
      let symbol = await ticketBlocks.symbol();
      expect(symbol).to.be.equal("TB");
    });

    it("sets the Owner", async () => {
      expect(await ticketBlocks.owner()).to.be.equal(deployer.address);
    });
  });

  describe("only Owner", () => {
    it("Owner Calling list function", async () => {
      const transaction = await ticketBlocks
        .connect(deployer)
        .list(
          OCCASION_NAME,
          OCCASION_COST,
          OCCASION_MAX_TICKETS,
          OCCASION_DATE,
          OCCASION_TIME,
          OCCASION_LOCATION
        );
      await transaction.wait();
    });
  });

  describe("Occasions", () => {
    it("Updates Occasions Count", async () => {
      const totalOccasions = await ticketBlocks.totalOccasions();
      expect(totalOccasions).to.be.equal(1);
    });

    it("Returns occasions attributes", async () => {
      const occasion = await ticketBlocks.getOccasion(1);
      expect(occasion.id).to.be.equal(1);
      expect(occasion.name).to.be.equal(OCCASION_NAME);
      expect(occasion.cost).to.be.equal(OCCASION_COST);
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS);
      expect(occasion.date).to.be.equal(OCCASION_DATE);
      expect(occasion.time).to.be.equal(OCCASION_TIME);
      expect(occasion.location).to.be.equal(OCCASION_LOCATION);
    });
  });
});
