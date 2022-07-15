import GetAllMatches from "../../Components/HomePage/GetAllMatches"
import GetTeamMatches from "../../Components/HomePage/GetTeamMatches";
import GetStandings from "../../Components/HomePage/GetStandings";
import Navbar from "../../Components/Navbar/Navbar";
import * as footballService from "../../Utilities/football-service"
import "./HomePage.css";

import { useEffect, useState } from "react"

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
    const [id, setId] = useState(2021);
    const [seasonID, setSeasonID] = useState(2022);


    useEffect(function() {
        async function getTeamInfo() {
            const allTeams = await footballService.getTeams(id, seasonID);
            setAllTeamInfo(allTeams)
        } getTeamInfo();
        
        async function getAllMatches() {
            const match = await footballService.getMatches(id, seasonID);
            for (let i = 0; i < match.matches.length; i++) {
                match.matches[i].homeTeam.homeTeamSearch = match.matches[i].homeTeam.name.split(" ").join("_")
                match.matches[i].awayTeam.awayTeamSearch = match.matches[i].awayTeam.name.split(" ").join("_")
            }
            setAllMatches([match])
        } getAllMatches();

        async function getStanding() {
            const standing = await footballService.getStandings(id);
            setStandings(standing);
        }
        getStanding();

    }, [id, seasonID])

    useEffect(function() {
        async function allTeamNames() {
            const allTeams = allTeamInfo;
            allTeams.teams.sort((a,b) => a.shortName > b.shortName ? 1:-1);
            setTeamArray(allTeams.teams);
            setTeam(allTeams.teams[0].name);
            setNumOfMatchesArray([]);
            setMatchday(allTeams.season.currentMatchday);
            for (let i = 1; i <= (allTeams.count * 2 - 2); i++) {
                setNumOfMatchesArray(numOfMatchesArray => [...numOfMatchesArray, i])
            }
        } allTeamNames()
    }, [allTeamInfo])

    return (
        <div>
            <div className="sticky-top">
                <Navbar setId={setId} setFilter={setFilter}/>
            </div>

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
                    />
                    :
                    ""
                }
                
        </div>
    )
}