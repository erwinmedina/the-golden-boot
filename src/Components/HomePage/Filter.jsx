import "./Filter.css";

export default function Filter({filter, setFilter}) {

    function handleMatch() {
        setFilter('match');
    }
    function handleTeam() {
        setFilter('team')
    }
    function handleTable() {
        setFilter('table')
    }

    return (
        <div className="filterMatchTeam">                
            <button className={`${filter === 'match' ? 'btn-danger' : 'btn-primary'} btn`} onClick={handleMatch}>Matchday</button>
            <button className={`${filter === 'team' ? 'btn-danger' : 'btn-primary'} btn`} onClick={handleTeam}>Team</button>
            <button className={`${filter === 'table' ? 'btn-danger' : 'btn-primary'} btn`} onClick={handleTable}>Table</button>
        </div>
    )
}