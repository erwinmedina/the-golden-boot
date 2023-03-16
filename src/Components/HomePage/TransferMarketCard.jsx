import ExpandPlayerCard from "./ExpandPlayerCard"

export default function TransferMarketCard({index, player}) {

    console.log(player);
    let dataToggleTag = "#navbarToggleExternalContent" + index;
    let dataToggleID = "navbarToggleExternalContent" + index;

    return (
        <div className="transferCard navbar-toggler">
            <div className="transferTopCard">
                <div className="player_image">
                    <img src={player.image} alt="" />
                </div>
                <div className="name_position">
                    <img src={player.national_flag} alt="" />
                    <div className="player_name">{player.name}</div>
                    <div className="player_position">{player.position}</div>
                    <div className="btn btn-primary info_btn" data-toggle="collapse" data-target={dataToggleTag}>More Info</div>
                </div>

            </div>
            <div className="transferBotCard">
                <div className="bot_leaving">
                    <div className="bot_leaving_img">
                        <img src={player.leaving_flag} alt="" />
                    </div>
                    {player.leaving_name}
                </div>
                <div className="arrow">
                    <i class='fas fa-arrow-circle-right'></i>
                </div>
                <div className="bot_joined">
                    <div className="bot_joined_img">
                        <img src={player.joined_flag} alt="" />
                    </div>
                    {player.joined_name}
                </div>
            </div>
            <div className="expandable collapse" id={dataToggleID}>
                <ExpandPlayerCard index={index} player={player}/>
            </div>

        </div>
    )
}