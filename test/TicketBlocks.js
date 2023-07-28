const { expect } = require("chai");
const { ethers } = require("hardhat");

const NAME = "TicketBlocks";
const SYMBOL = "TB";

describe("TicketBlocks", () => {
  let ticketBlocks;

  beforeEach(async () => {
    const TicketBlocks = await ethers.getContractFactory("TicketBlocks");
    ticketBlocks = await TicketBlocks.deploy(NAME, SYMBOL);
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      let name = await ticketBlocks.name();
      expect(name).to.equal("TicketBlocks");
    });

    it("Sets the Symbol", async () => {
      let symbol = await ticketBlocks.symbol();

      expect(symbol).to.equal("TB");
    });
  });
});
