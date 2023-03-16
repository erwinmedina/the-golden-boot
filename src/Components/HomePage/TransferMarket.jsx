import "./TransferMarket.css"
import data from "./transfer.json"
import TransferMarketCard from "./TransferMarketCard"

export default function TransferMarket() {
    return (
        <div className="container transfer_market_container">
            {data.length > 0 && data.map((player, index) =>
                <TransferMarketCard index={index} player={player}/>
            )}

        </div>
    )
}