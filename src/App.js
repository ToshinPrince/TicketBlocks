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
  const [provider, setProvider] = useState(null);

  const [ticketBlocks, setTicketBlocks] = useState(null);
  const [occasions, setOccasions] = useState([]);

  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);

  const loadBlockchianData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();

    const ticketBlocks = new ethers.Contract(
      config[network.chainId].TicketBlocks.address,
      TicketBlocks,
      provider
    );

    setTicketBlocks(ticketBlocks);

    const totalOccasions = await ticketBlocks.totalOccasions();
    const occasions = [];

    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await ticketBlocks.getOccasion(i);
      occasions.push(occasion);
    }
    setOccasions(occasions);

    console.log(occasions);

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
      <div className="cards">
        {occasions.map((occasion, index) => (
          // <p key={index}>{occasion.name}</p>
          <Card
            occasion={occasion}
            id={index + 1}
            ticketBlocks={ticketBlocks}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
