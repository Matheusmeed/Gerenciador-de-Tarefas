import '../../styles/AdmArea.css';
import '../../styles/Atividade.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotLoggedAdm } from '../../actions/LoginLogoutAction';
import { useSelector } from 'react-redux';
import MenuAtualizarAtividade from '../../components/MenuAtualizarAtividade';
import MenuHistorico from '../../components/MenuHistorico';
import Api from '../../Api';

export default function AdmArea() {
    const dispatch = useDispatch();

    const history = useHistory();

    function logout() {
        dispatch(NotLoggedAdm);
        history.push('/');
    }

    const isloggedIn = useSelector((state) => state.LoginLogoutAdm);

    useEffect(() => {
        if (!isloggedIn) {
            history.push('/admLogin');
        }
    }, [isloggedIn, history]);

    //Atualizar atividades

    const [checked, setChecked] = useState('tudo');

    const [atividades, setAtividades] = useState();

    useEffect(() => {
        Api.getAtividades(checked).then((res) => setAtividades(res));
    }, [checked]);

    //Menu para atualizar Atividades
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState('');

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [desc, setDesc] = useState('');
    const [user, setUser] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [data, setdata] = useState('');
    const [horario, setHorario] = useState('');
    const [admEmails, setAdmEmails] = useState([]);
    const [admDatas, setAdmDatas] = useState([]);
    const [admHorarios, setAdmHorarios] = useState([]);

    function handleMenuClick(id, title, status, desc, user, userEmail, data, horario, admEmails, admDatas, admHorarios) {
        setId(id);
        setTitle(title);
        setStatus(status);
        setDesc(desc);
        setUser(user);
        setUserEmail(userEmail);
        setdata(data);
        setHorario(horario);
        setAdmEmails(admEmails);
        setAdmDatas(admDatas);
        setAdmHorarios(admHorarios);
        setMenu(true);
    }

    useEffect(() => {
        menu
            ? setModal(
                  <div
                      className='fundo'
                      onClick={(el) => {
                          if (el.target.className === 'fundo') {
                              setMenu(false);
                          }
                      }}
                  >
                      <MenuAtualizarAtividade id={id} title={title} status={status} atualizarListaAtv={atualizarListaAtv} desc={desc} user={user} setMenu={setMenu} />
                      <MenuHistorico userEmail={userEmail} data={data} horario={horario} user={user} admEmails={admEmails} admDatas={admDatas} admHorarios={admHorarios} />
                  </div>
              )
            : setModal('');
    }, [menu, id, title, user, desc, status, admDatas, admHorarios, admEmails, userEmail, data, horario]);

    function atualizarListaAtv() {
        setChecked('tudo');
        Api.getAtividades('tudo').then((res) => setAtividades(res));
    }

    //Filtragem
    function handleStatusClick(statusName) {
        setChecked(statusName);
        Api.getAtividades(statusName).then((res) => setAtividades(res));
    }

    //Filtragem por título/descrição

    const [keyword, setKeyword] = useState('');

    function handleSearchBtn() {
        if (!keyword) {
            alert('Você deve inserir algo');
        } else {
            setChecked(keyword);
            Api.getAtividades(keyword).then((res) => setAtividades(res));
        }
    }
    return (
        <div className='mainAdm'>
            <button className='sair' onClick={() => logout()}>
                Sair
            </button>
            <div className='filterHeader'>
                <div className='filter'>
                    <input
                        type='radio'
                        id='tudo'
                        name='status'
                        value='tudo'
                        onClick={() => {
                            handleStatusClick('tudo');
                        }}
                    />
                    <label htmlFor='tudo'>Mostrar Tudo</label>
                    <input
                        type='radio'
                        id='pendente'
                        name='status'
                        value='pendente'
                        onClick={() => {
                            handleStatusClick('pendente');
                        }}
                    />
                    <label htmlFor='pendente'>Pendente</label>
                    <input
                        type='radio'
                        id='andamento'
                        name='status'
                        value='andamento'
                        onClick={() => {
                            handleStatusClick('andamento');
                        }}
                    />
                    <label htmlFor='andamento'>Em andamento</label>
                    <input
                        type='radio'
                        id='finalizada'
                        name='status'
                        value='finalizada'
                        onClick={() => {
                            handleStatusClick('finalizada');
                        }}
                    />
                    <label htmlFor='finalizada'>Finalizada</label>
                    <input
                        type='radio'
                        id='cancelada'
                        name='status'
                        value='cancelada'
                        onClick={() => {
                            handleStatusClick('cancelada');
                        }}
                    />
                    <label htmlFor='cancelada'>Cancelada</label>
                </div>
                <div>
                    <input type='text' onChange={(text) => setKeyword(text.target.value)}></input>
                    <button id='btnBuscar' onClick={() => handleSearchBtn()}>
                        Buscar
                    </button>
                </div>
            </div>
            <div alt='header' className='header'>
                <div className='status pd'>Status</div>
                <div className='title pd'>Título</div>
                <div className='desc pd'>Descrição</div>
                <div className='user pd'> Usuário Responsável</div>
            </div>

            <div className='listaAtividades'>
                {atividades
                    ? atividades.map((atv) => (
                          <div
                              className='atividade pd'
                              key={atv.id}
                              onClick={() => handleMenuClick(atv.id, atv.title, atv.status, atv.desc, atv.user, atv.userEmail, atv.data, atv.horario, atv.admEmails, atv.admDatas, atv.admHorarios)}
                          >
                              <div className={'status pd ' + atv.status}>{atv.status}</div>
                              <div className='title pd'>{atv.title}</div>
                              <div className='desc pd'>{atv.desc}</div>
                              <div className='user pd'>{atv.user}</div>
                          </div>
                      ))
                    : ''}
            </div>
            {modal}
        </div>
    );
}
