import { useState } from "react";
import Card from "../components/card";
import Icon from "../components/icon";
import Multiselect from 'multiselect-react-dropdown'
import '../stylesheets/home.css'
import Dropdown from "../components/dropdown";

const taskList = [
  {
    id: 0,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  }
]

function Home() {
  const [tasks, setTasks] = useState([...taskList])
  const [renderCompleted, setRenderCompleted] = useState(false)
  const priorities = [
    {id: 0, name: 'Baixa'},
    {id: 1, name: 'Média'},
    {id: 2, name: 'Alta'},
  ]
  const [selectedPriorities, setSelectedPriorities] = useState([])
  
  const onExit = () => {

  }

  const onFilterPriorities = (selectedList, selectedItem) => {
    
  }

  const onUnfilterPriorities = (selectedList, selectedItem) => {

  }

  const TaskList = ({ title, completed }) => (
    <div className='tasks-container'>
      <h2 className='subtitle'>{title}</h2>
      {tasks.length === 0 ? (
        <div className='no-tasks'>
          <h6 className='subtitle is-6'>Nenhuma Tarefa</h6>
        </div>
      ) : (
        tasks.filter(t => t.completed === completed).map(task => (
          <div key={task.id} className='task'>
            <div className='text-container'>
              <div className='tags'>
                {task.tags.map(tag => (
                  <span key={tag.id} className="tag is-primary">Primary</span>
                ))}
              </div>
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
        <div>
          <button className="button button-header" onClick={onExit}>Rotinas</button>
          <button className="button button-header" onClick={onExit}>Categorias</button>
          <button 
            className="button button-header"
            onClick={() => setRenderCompleted(!renderCompleted)}
          >
            Ver {renderCompleted ? 'Não Concluídas' : 'Concluídas'}
          </button>
          <button className="button" onClick={onExit}>Sair</button>
        </div>
      </div>
      {!renderCompleted && (
        <div className='filters'>
          <Dropdown title='Filtro de Prioridades'/>
          <Dropdown title='Filtro de Categorias'/>
          <button className="button" onClick={onExit}>Ver Tarefas para Agora</button>
        </div>
      )}
      {renderCompleted ? (
        <TaskList title='Concluídas' completed={true} />
      ) : (
        <TaskList title='Não Concluídas' completed={false} />
      )}      
    </Card>
  )
}

export default Home;
