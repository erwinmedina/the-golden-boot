import { useEffect, useState } from "react"
import GetTeamMatches from "../../Components/HomePage/GetTeamMatches";

export default function TeamsPage({id, seasonID}) {
    const [allTeamInfo, setAllTeamInfo] = useState({})
    const [teamArray, setTeamArray] = useState([]);
    const [allMatches, setAllMatches] = useState([]);
    const [matchday, setMatchday] = useState();
    const [numOfMatchesArray, setNumOfMatchesArray] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [team, setTeam] = useState();
    

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
            <GetTeamMatches
                id={id}
                teamArray={teamArray}
                allMatches={allMatches}
                filteredMatches={filteredMatches}
                setFilteredMatches={setFilteredMatches}
                team={team}
                setTeam={setTeam}
                matchday={matchday}
            />
        </div>
    )
}