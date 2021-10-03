import '../styles/Home.css';
import { Link } from 'react-router-dom';
import logoMativi from '../images/logo-mativi.png';

export default function index() {
    return (
        <div className='main'>
            <img src={logoMativi} alt='logo' />

            <div>
                <Link className='btn' to='/admLogin'>
                    Administrador
                </Link>
                <Link className='btn' to='/funcLogin'>
                    Funcionário
                </Link>
            </div>
        </div>
    );
}
