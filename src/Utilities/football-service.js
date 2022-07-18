const BASE_URL = "https://api.football-data.org/v2";

export function getTeams(id, seasonID) {
    return fetch(`${BASE_URL}/competitions/${id}/teams?season=${seasonID}`, {
        headers: { 
            'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getMatches(id, seasonID) {
    return fetch(`${BASE_URL}/competitions/${id}/matches?season=${seasonID}`, {
        headers: { 
            'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getScorers(id, seasonID) {
    return fetch(`${BASE_URL}/competitions/${id}/scorers?season=${seasonID}`, {
        headers: { 
            'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getStandings(id, seasonID){
    return fetch(`${BASE_URL}/competitions/${id}/standings?season=${seasonID}`, {
        headers: { 
            'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}