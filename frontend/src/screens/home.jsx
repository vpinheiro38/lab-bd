import { useState } from "react";
import Card from "../components/card";
import Icon from "../components/icon";
import '../stylesheets/home.css'

const taskList = [
  {
    id: 0,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
  }
]

function Home() {
  const [tasks, setTasks] = useState([...taskList])
  
  const onExit = () => {

  }

  const sortIncompletedTasks = (tasks) => {
    
  }

  const TaskList = ({ title, completed }) => (
    <div className='task-list'>
      <h2 className='subtitle'>{title}</h2>
      {tasks.length === 0 ? (
        <div className='no-tasks'>
          <h6 className='subtitle is-6'>Nenhuma Tarefa</h6>
        </div>
      ) : (
        tasks.filter(t => t.completed === completed).map(task => (
          <div key={task.id} className='task'>
            <div className='text-container'>
              <p className='text'>{task.description}</p>
            </div>
            <div className='buttons'>
              <Icon iconName='fa-check' />
              <Icon iconName='fa-edit' />
              <Icon iconName='fa-trash' />
            </div>
          </div>
        ))
      )}
    </div>
  )

  return (
    <Card className='home-card'>
      <div className='header'>
        <h1 className='title'>Lista de Tarefas</h1>
        <button className="button" onClick={onExit}>Sair</button>
      </div>
      <TaskList title='Não Concluídas' completed={false} />
      <div className='separator'/>
      <TaskList title='Concluídas' completed={true} />
    </Card>
  )
}

export default Home;
