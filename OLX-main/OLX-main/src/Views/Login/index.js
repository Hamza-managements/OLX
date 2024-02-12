import './style.css'
import { login } from '../../Config/firebase'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const navigate = useNavigate()

    async function loginForm(e) {
        e.preventDefault();
        const result = await login(e.target[0].value, e.target[1].value);
        result == 'user is succesfully login' ? navigate('/') : alert(result);
        e.target[1].value = '';
    }

    return (
        <div>
            <div className='container'>
                <div className="login-container">
                    <br />

                    <span>Login</span>
                    <br />
                    <br />

                    <form onSubmit={loginForm}>
                        <br />
                        <input class="input" type="email" placeholder="Email" required />
                        <br />
                        <input class="input" minlength="8" placeholder="Password" type="password" required />
                        <br />
                        <button type="submit">Login</button>
                    </form>
                    <p style={{ fontSize: 21 }}>You don`t have an account <a style={{ textDecoration: 'none', color: 'rgb(128, 25, 207)', textDecoration:'underline', cursor:'pointer' }} onClick={() => navigate('/signup')}>Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;