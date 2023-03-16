const BASE_URL = "https://api.football-data.org/v2";
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

// export function getPlayers(id, seasonID){
//     return fetch(`${NEW_URL}/persons/44`, {
//         method: "GET",
//         mode: "cors",
//         headers: { 
//             'X-Auth-Token': process.env.REACT_APP_REVISED_KEY },
//             "Content-Type": "application/json",
//     })
//     .then(res => res.json())
//     .catch(error => console.log('Error while fetching:', error))
// }