import { MoonLoader } from "react-spinners";

export default function PreviousWinners({goalScorers, filterComp}) {
    function AmericanDate_Fix(string) {
        let arrayOfString = string.split("-")
        var revisedString = arrayOfString[1] + "/" + arrayOfString[2] + "/" + arrayOfString[0];
        return revisedString;
    }

    return (
        <div className="homePageStandingsContainer previousWinners">
            <h2>Previous League Winners</h2>
            <h3>
                {goalScorers?.competition?.name}
            </h3>
            <h3>
                Multiple Seasons
            </h3>
            <hr />
            {filterComp?.length ?
                <div className="previousWinnersTable tableContainer table-responsive">
                    <table className="table table-hover table-dark table-striped table-sm">
                        <thead className="header">
                            <tr className="previousWinnersHeaderRow">
                                <th className="firstHeaderRow tableCSS" scope="col">Start Date</th>
                                <th className="tableCSS" scope="col">End Date</th>
                                <th className="lastHeaderRow headerWinner tableCSS" scope="col">League Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterComp?.map((comp, index) =>
                                <tr className="tableRow">
                                    <td className="tableCSS">{AmericanDate_Fix(comp.startDate)}</td>
                                    <td className="tableCSS">{AmericanDate_Fix(comp.endDate)}</td>
                                    <td className="winnerTableValue tableCSS">
                                        <div className="previousWinnerCrestDiv">
                                            <img title={comp.winner.name} className="previousWinnerCrest" src={comp.winner.crest} alt="" />
                                        </div>
                                        <div className="previousWinnerTextDiv">
                                            <p className="previousWinnerText">{comp.winner.shortName}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                :
                <div className="emptyScorers">
                    <MoonLoader color="#000000" />
                </div>
            }
        </div>
    )
}