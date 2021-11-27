import { Link } from "react-router-dom"
import '../stylesheets/components.css'
import Card from "../components/card";
import { useState } from "react";
import DatePicker from "react-datepicker"

function TaskPage({ taskId }) {
  const [description, setDescription] = useState('')

  return (
    <Card className='home-card'>
      <div className='header'>
        <h1 className='title'>Adicionar Tarefa</h1>
        <div>
          <Link to="/">
            <button className="button">Voltar</button>
          </Link>
        </div>
      </div>
      <form className='form'>
        <label className='input-container'>
          <input className="input" type="text" placeholder='Descrição' onChange={e => setDescription(e.target.value)} />
        </label>
    </form>
    </Card>
  )
}

export default TaskPage;
