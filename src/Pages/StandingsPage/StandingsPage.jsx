import { useEffect, useState } from "react"
import GetStandings from "../../Components/HomePage/GetStandings";

export default function StandingsPage({id, seasonID}) {
    const [standings, setStandings] = useState({});
    const [goalScorers, setGoalScorers] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch standings
                const standingsResponse = await fetch(`/api/standings?id=${id}&seasonID=${seasonID}`);
                const standingsData = await standingsResponse.json();
                setStandings(standingsData);

                // Fetch goal scorers
                const scorersResponse = await fetch(`/api/scorers?id=${id}&seasonID=${seasonID}`);
                const scorersData = await scorersResponse.json();
                setGoalScorers(scorersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id, seasonID]);

    return (
        <div>
            <GetStandings 
                standings={standings} 
                goalScorers={goalScorers}
            />
        </div>
    )
}