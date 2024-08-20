const BASE_URL = 'http://localhost:3000/api';
const NEW_URL = "https://api.football-data.org/v4";

export function getTeams(id, seasonID) {
    return fetch(`${BASE_URL}/competitions/${id}/teams?season=${seasonID}`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getMatches(id, seasonID) {
    return fetch(`${BASE_URL}/competitions/${id}/matches?season=${seasonID}`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getScorers(id, seasonID) {
    return fetch(`${BASE_URL}/competitions/${id}/scorers?season=${seasonID}`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}

export function getStandings(id, seasonID){
    return fetch(`${BASE_URL}/competitions/${id}/standings?season=${seasonID}`, {
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API },
    })
    .then(res => res.json())
    .catch(error => console.log('Error while fetching:', error))
}
