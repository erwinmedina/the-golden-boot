import { useEffect, useState } from "react"
import "./ExpandMatchCard.css";
import StadiumMap from "./StadiumMap";


export default function ExpandMatchCard({index, match, teamArray, filter}) {
    const [stadium, setStadium] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [wiki, setWiki] = useState([
        {
            name: "home",
            wiki: "https://en.wikipedia.org/wiki/" + match.homeTeam.homeTeamSearch,
            active: false,
            dataTarget: "#homeTeam" + index,
            dataID: "homeTeam" + index,
        },
        {
            name: "away",
            wiki: "https://en.wikipedia.org/wiki/" + match.awayTeam.awayTeamSearch,
            active: false,
            dataTarget: "#awayTeam" + index,
            dataID: "awayTeam" + index,
        }
    ])

    function handleWikiHome() {
        let tempWiki = [...wiki];
        if (tempWiki[1].active) {tempWiki[1].active = false}
        if (tempWiki[0].active) {tempWiki[0].active = false}
        else {tempWiki[0].active = true}
        setWiki(tempWiki);
    }

    function handleWikiAway() {
        let tempWiki = [...wiki];
        if (tempWiki[0].active) {tempWiki[0].active = false}
        if (tempWiki[1].active) {tempWiki[1].active = false}
        else {tempWiki[1].active = true}
        setWiki(tempWiki);
    }

    useEffect(function() {
        async function getDate() {
            const dateInfo = new Date(match.utcDate);
            const dateArray = dateInfo.toLocaleString().split(",")
            setDate(dateInfo.toDateString());
            setTime(dateArray[1]);
        } getDate();

        async function updateWiki() {
            let tempWiki = [...wiki];
            let newHome = match.homeTeam.homeTeamSearch;
            let newAway = match.awayTeam.awayTeamSearch;
            tempWiki[0].wiki = "https://en.wikipedia.org/wiki/" + newHome;
            tempWiki[1].wiki = "https://en.wikipedia.org/wiki/" + newAway;
            setWiki(tempWiki);
        } updateWiki();


        async function stadiumName() {
            for (let i = 0; i < teamArray.length; i++) {
                if (match.homeTeam.id === teamArray[i].id) {
                    return (setStadium(teamArray[i].venue));
                }
            }
        } stadiumName();

    }, [match, filter])

    return(
        <div>
            <div className="ExpandCard">
                <div className="ExpandCardLeft btn-group-vertical">
                    <div>
                        <button className="btnArena btn btn-primary" onClick={handleWikiHome} data-toggle="collapse" data-target={wiki[0].dataTarget}>Wiki <br/>{match.homeTeam.name}</button>
                    </div>
                    <div>
                        <button className="btnArena btn btn-primary" onClick={handleWikiAway} data-toggle="collapse" data-target={wiki[1].dataTarget}>Wiki <br/>{match.awayTeam.name}</button>
                    </div>
                </div>

                <div className="ExpandCardRight">
                    <table className="table table-hov">
                        <tbody>
                            <tr>
                                <td>Date:</td>
                                <td>{date}</td>
                            </tr>
                            <tr>
                                <td>Local Time:</td>
                                <td>{time}</td>
                            </tr>
                            <tr>
                                <td>Stadium:</td>
                                <td>{stadium}</td>
                            </tr>
                            <tr>
                                <td>Referee:</td>
                                <td>{match.referees.length >= 1 && match.referees[0].name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="page" id="accordion">
                <div class="stadiumMapShow collapse" data-parent="#accordion" id={wiki[0].dataID}>
                    <div class="embed-responsive embed-responsive-1by1">
                        <iframe class="embed-responsive-item" src={wiki[0].wiki} allowfullscreen></iframe>
                    </div>
                </div>
                <div class="stadiumMapShow collapse" data-parent="#accordion" id={wiki[1].dataID}>
                    <div class="embed-responsive embed-responsive-1by1">
                        <iframe class="embed-responsive-item" src={wiki[1].wiki} allowfullscreen></iframe>
                    </div>
                </div>
            </div>

            
        </div>
    )
}