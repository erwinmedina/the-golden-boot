import GetAllMatches from "../../Components/HomePage/GetAllMatches";
import { useEffect, useState } from "react"
import { PulseLoader } from "react-spinners";

export default function MatchesPage({id, seasonID}) {
    const [loading, setLoading] = useState(true);
    const [allTeamInfo, setAllTeamInfo] = useState({})
    const [teamArray, setTeamArray] = useState([]);
    const [allMatches, setAllMatches] = useState([]);
    const [matchday, setMatchday] = useState();
    const [numOfMatchesArray, setNumOfMatchesArray] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([])
    
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
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
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, seasonID]);

    useEffect(() => {
        async function allTeamNames() {
            try {
                const allTeams = allTeamInfo;
                allTeams?.teams?.sort((a, b) => a.shortName > b.shortName ? 1 : -1);
                setTeamArray(allTeams.teams);
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

    if (loading) {
        return (
            <div className="loader">
                <PulseLoader color="#FFFFFF" />
            </div>
        )
    }

    return (
        <div>
            <GetAllMatches 
                id={id} 
                seasonID={seasonID}
                teamArray={teamArray}
                allMatches={allMatches} 
                setAllMatches={setAllMatches}
                matchday={matchday}
                setMatchday={setMatchday}
                filteredMatches={filteredMatches}
                setFilteredMatches={setFilteredMatches}
                numOfMatchesArray={numOfMatchesArray}
            /> 
        </div>
    )
}