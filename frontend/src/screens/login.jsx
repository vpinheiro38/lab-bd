import { useState } from 'react';
import 'bulma/css/bulma.min.css';
import './../stylesheets/login.css';
import Card from '../components/card';

function Login() {
  const [isLogin, setIsLogin] = useState(true)

  const onLogin = () => {

  }

  const onRegister = () => {

  }

  const onPressToChangeForm = () => setIsLogin(!isLogin)

  const LoginUser = () => (
    <form className='form'>
      <label className='input-container'>
        <input className="input" type="text" placeholder='Email' />
      </label>
      <label className='input-container'>
        <input className="input" type="password" placeholder='Senha' />
      </label>
      <div>
        <button className="button is-primary is-fullwidth" type="submit" onClick={onLogin}>Entrar</button>
      </div>
    </form>
  )

  const RegisterUser = () => (
    <form className='form'>
      <label className='input-container'>
        <input className="input" type="text" placeholder='Email' />
      </label>
      <label className='input-container'>
        <input className="input" type="password" placeholder='Senha' />
      </label>
      <div>
        <button className="button is-primary is-fullwidth" type="submit" onClick={onRegister}>Registrar</button>
      </div>
    </form>
  )

  return (
    <Card>
      <h1 class="title">Gerenciador de Tarefas</h1>
      {isLogin ? LoginUser() : RegisterUser()}
      <button className='button is-fullwidth' onClick={onPressToChangeForm}>
        {isLogin ? 'Cadastrar Usuário' : 'Voltar'}
      </button>
    </Card>
  )
}

export default Login;
