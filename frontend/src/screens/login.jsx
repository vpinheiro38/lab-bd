import { useState } from 'react';
import { toast } from 'react-toastify';
import 'bulma/css/bulma.min.css';
import './../stylesheets/login.css';
import Card from '../components/card';
import { isStringEmpty } from '../utils/utils';
import { useSession } from "../contexts/useSession";

function Login({ onLogin }) {
  const { register, signIn } = useSession();
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const errorFieldEmpty = () => {
    toast.error('Você deixou algum campo vazio!')
  }

  const onClickToLogin = (event) => {
    event.preventDefault()
    if (isStringEmpty(email) || isStringEmpty(password)) {
      errorFieldEmpty()
      return
    }

    signIn(email, password);
  }

  const onClickToRegister = (event) => {
    event.preventDefault()
    if (isStringEmpty(name) || isStringEmpty(email) || isStringEmpty(password)) {
      errorFieldEmpty()
      return
    }

    register(name, email, password)
  }

  const onPressToChangeForm = () => setIsLogin(!isLogin);

  const LoginUser = () => (
    <form className='form'>
      <label className='input-container'>
        <input className="input" type="text" placeholder='Email' onChange={e => setEmail(e.target.value)} />
      </label>
      <label className='input-container'>
        <input className="input" type="password" placeholder='Senha' onChange={e => setPassword(e.target.value)} />
      </label>
      <div>
        <button className="button is-primary is-fullwidth" type="submit" onClick={onClickToLogin}>Entrar</button>
      </div>
    </form>
  );

  const RegisterUser = () => (
    <form className='form'>
      <label className='input-container'>
        <input className="input" type="text" placeholder='Nome' onChange={e => setName(e.target.value)} />
      </label>
      <label className='input-container'>
        <input className="input" type="text" placeholder='Email' onChange={e => setEmail(e.target.value)} />
      </label>
      <label className='input-container'>
        <input className="input" type="password" placeholder='Senha' onChange={e => setPassword(e.target.value)} />
      </label>
      <div>
        <button className="button is-primary is-fullwidth" type="submit" onClick={onClickToRegister}>Registrar</button>
      </div>
    </form>
  );

  return (
    <Card>
      <h1 class="title">Gerenciador de Tarefas</h1>
      {isLogin ? LoginUser() : RegisterUser()}
      <button className="button is-fullwidth" onClick={onPressToChangeForm}>
        {isLogin ? "Cadastrar Usuário" : "Voltar"}
      </button>
    </Card>
  );
}

export default Login;
