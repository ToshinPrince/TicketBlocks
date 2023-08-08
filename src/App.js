import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Sort from "./components/Sort";
import Card from "./components/Card";
import SeatChart from "./components/SeatChart";

// ABIs
import TicketBlocks from "./abis/TicketBlocks.json";

// Config
import config from "./config.json";

function App() {
  const [account, setAccount] = useState(null);

  const loadBlockchianData = async () => {
    //Fetching Account - placed this in Navigation
    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    // const account = ethers.utils.getAddress(accounts[0]);
    // setAccount(account);

    //Refresh Account
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadBlockchianData();
  }, []);

  return (
    <div>
      <header>
        <Navigation account={account} setAccount={setAccount} />
        <h2 className="header__title">
          <strong>Ticket</strong>Blocks
        </h2>
      </header>
      <p>{account}</p>
    </div>
  );
}

export default App;
