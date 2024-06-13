import GetAllMatches from "../../Components/HomePage/GetAllMatches"
import GetTeamMatches from "../../Components/HomePage/GetTeamMatches";
import GetStandings from "../../Components/HomePage/GetStandings";
import Navbar from "../../Components/Navbar/Navbar";
import "./HomePage.css";
// import { getTeams } from "controllers/teamsController";

import { useEffect, useState } from "react"
import TransferMarket from "../../Components/HomePage/TransferMarket";

export default function Home() {
    const [filter, setFilter] = useState('match');
    const [allTeamInfo, setAllTeamInfo] = useState({})
    const [teamArray, setTeamArray] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([])
    const [allMatches, setAllMatches] = useState([]);
    const [matchday, setMatchday] = useState();
    const [numOfMatchesArray, setNumOfMatchesArray] = useState([]);
    const [team, setTeam] = useState();
    const [standings, setStandings] = useState({});
    const [goalScorers, setGoalScorers] = useState([]);
    const [id, setId] = useState(2021);
    const [seasonID, setSeasonID] = useState(2023);
    // const [playerInfo, setPlayerInfo] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch team info
                const teamsResponse = await fetch(`/api/teams?id=${id}&seasonID=${seasonID}`);
                const teamsData = await teamsResponse.json();
                setAllTeamInfo(teamsData);

                // Fetch matches
                const matchesResponse = await fetch(`/api/matches?id=${id}&seasonID=${seasonID}`);
                const matchesData = await matchesResponse.json();
                setAllMatches([matchesData]);

                // Fetch standings
                const standingsResponse = await fetch(`/api/standings?id=${id}&seasonID=${seasonID}`);
                const standingsData = await standingsResponse.json();
                setStandings(standingsData);

                // Fetch goal scorers
                const scorersResponse = await fetch(`/api/scorers?id=${id}&seasonID=${seasonID}`);
                const scorersData = await scorersResponse.json();
                setGoalScorers([scorersData]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id, seasonID]);

    useEffect(() => {
        async function allTeamNames() {
            try {
                const allTeams = allTeamInfo;
                allTeams.teams.sort((a, b) => a.shortName > b.shortName ? 1 : -1);
                setTeamArray(allTeams.teams);
                setTeam(allTeams.teams[0].name);
                setNumOfMatchesArray([]);
                setMatchday(allTeams.season.currentMatchday);
                for (let i = 1; i <= allTeams.count * 2 - 2; i++) {
                    setNumOfMatchesArray(numOfMatchesArray => [...numOfMatchesArray, i]);
                }
            } catch (error) {
                console.error('Error processing team names:', error);
            }
        }
        allTeamNames();
    }, [allTeamInfo]);

    return (
        <div>
            {/* <div className="sticky-top">
                <Navbar setId={setId} setFilter={setFilter} setSeasonID={setSeasonID}/>
            </div> */}

                {filter === 'match' ?
                    <GetAllMatches 
                    id={id} 
                    setSeasonID={setSeasonID}
                    teamArray={teamArray}
                    allMatches={allMatches} 
                    setAllMatches={setAllMatches}
                    matchday={matchday}
                    setMatchday={setMatchday}
                    filteredMatches={filteredMatches}
                    setFilteredMatches={setFilteredMatches}
                    numOfMatchesArray={numOfMatchesArray}
                    filter={filter}
                    /> 
                    :
                    ""
                }
                {filter === 'team' ? 
                    <GetTeamMatches
                    id={id}
                    teamArray={teamArray}
                    allMatches={allMatches}
                    setAllMatches={setAllMatches}
                    filteredMatches={filteredMatches}
                    setFilteredMatches={setFilteredMatches}
                    team={team}
                    setTeam={setTeam}
                    matchday={matchday}
                    filter={filter}
                    />
                    :
                    ""
                }
                {filter === 'table' ? 
                    <GetStandings 
                        id={id} 
                        standings={standings} 
                        setStandings={setStandings}
                        setMatchday={setMatchday}
                        goalScorers={goalScorers}
                    />
                    :
                    ""
                }
                {filter === "transfer" ?
                    <TransferMarket/>:""
                }
                
        </div>
    )
}