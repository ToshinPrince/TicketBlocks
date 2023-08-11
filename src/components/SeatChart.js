import { useEffect, useState } from "react";

// Import Components
import Seat from "./Seat";

// Import Assets
import close from "../assets/close.svg";

const SeatChart = ({ occasion, ticketBlocks, provider, setToggle }) => {
  const [seatsTaken, setSeatsTaken] = useState(false);
  const [hasSold, setHasSold] = useState(false);

  const buyHandler = async () => {
    console.log("buying");
  };

  return (
    <div className="occasion">
      <div className="occasion__seating">
        <h1>{occasion.name} Seating Map</h1>

        <button onClick={() => setToggle(false)} className="occasion__close">
          <img src={close} alt="Close" />
        </button>

        <div className="occasion__stage">
          <strong>STAGE</strong>
        </div>

        {seatsTaken &&
          Array(25)
            .fill(1)
            .map((e, i) => (
              <Seat
                i={i}
                step={1}
                columnStart={0}
                maxColumns={5}
                rowStart={2}
                maxRows={5}
                seatsTaken={seatsTaken}
                buyHandler={buyHandler}
                key={i}
              />
            ))}

        <div className="occasion__spacer--1">
          <strong>WALKWAY</strong>
        </div>

        {/* {seatsTaken &&
          Array(Number(occasion.maxTickets) - 50)
            .fill(1)
            .map((e, i) => <seat></seat>)} */}
      </div>
    </div>
  );
};

export default SeatChart;
