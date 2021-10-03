import '../styles/menuHistorico.css';

function MenuHistorico(props) {
    let userEmail = props.userEmail;
    let data = props.data;
    let horario = props.horario;
    let user = props.user;
    let admEmails = props.admEmails;
    let admDatas = props.admDatas;
    let admHorarios = props.admHorarios;

    let rows = [];

    for (let i = 0; i < admEmails.length; i++) {
        rows.push(
            <div key={Math.random()}>
                Atividade alterada por {admEmails[i]} - {admDatas[i]} às {admHorarios[i]}
            </div>
        );
    }

    return (
        <div className='menuHistorico'>
            <h3>Histórico</h3>
            <div id='firstLine'>
                <p>
                    Atividade criada por {user}: {userEmail} - {data} às {horario}
                </p>
            </div>

            <div className='listaHistorico'>{rows}</div>
        </div>
    );
}

export default MenuHistorico;
