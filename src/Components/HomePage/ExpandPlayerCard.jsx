

export default function ExpandPlayerCard({index, player}) {
    return (
        <div className="expand_player_card">
            <table className="table table-hov">
                <tbody>
                    <tr>
                        <td>Age:</td>
                        <td>{player.age}</td>
                    </tr>
                    <tr>
                        <td>Nationality:</td>
                        <td>{player.nationality}</td>
                    </tr>
                    <tr>
                        <td>Fee:</td>
                        <td>{player.fee}</td>
                    </tr>
                    <tr>
                        <td>Transfer Markt:</td>
                        <td><a href={player.url}>TransferMarkt</a></td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}