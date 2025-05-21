

export default function LeagueTitleAndYear({allMatches, seasonID}) {
    return (
        <div>
            <h1 className="seasonTitle">
                {allMatches.length >= 1 && allMatches[0].competition.name}
            </h1>
            <h2 className="seasonYears">
                Season {seasonID} - {seasonID+1}
            </h2>
        </div>
    )
}