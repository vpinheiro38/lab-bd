import { useEffect, useState } from "react";
import Card from "../components/card";
import Icon from "../components/icon";
import '../stylesheets/home.css'
import Multiselect from "multiselect-react-dropdown";
import LinkButton from "../components/linkbutton";
import Dropdown from "../components/dropdown";
import Task from "../components/task";
import { Link } from "react-router-dom";

import { useSession } from "../contexts/useSession";
import useFetchAPI from "../contexts/useFetchAPI";

const taskList = [
  {
    id: 0,
    description: "Descrição da Tarefa",
    completed: false,
    creationDate: "2021-11-18T22:28:00.188Z",
    completedDate: undefined,
    priorityId: 2,
    userId: 1,
    tags: [
    ],
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 1,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 2,
    description: 'Descrição da Tarefa',
    completed: false,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 2,
    description: "Descrição da Tarefa",
    completed: false,
    creationDate: "2021-11-18T22:28:00.188Z",
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 2,
    description: "Descrição da Tarefa",
    completed: false,
    creationDate: "2021-11-18T22:28:00.188Z",
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [{id: 0, description: 'Tag 1'}, {id: 1, description: 'Tag 1'}]
  }
]

const tasksCompleted = [
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 1" },
    ],
  },
  {
    id: 1,
    description: 'Descrição da Tarefa',
    completed: true,
    creationDate: '2021-11-18T22:28:00.188Z',
    completedDate: undefined,
    priorityId: 0,
    userId: 1,
    tags: []
  },
]

const prioritiesList = [
  { id: 0, description: 'Alta', numberPriority: 2 },
  { id: 1, description: 'Média', numberPriority: 1 },
  { id: 2, description: 'Baixa', numberPriority: 0 },
]

function Home() {
  const [fetchPriorities, prioritiesResponse] = useFetchAPI({ url: 'priorities', method: 'get', disableSuccessNotification: true })

  const [renderCompleted, setRenderCompleted] = useState(false)
  const [completedTasks, setCompletedTasks] = useState([])
  const [incompletedTasks, setIncompletedTasks] = useState([])
  const [priorities, setPriorities] = useState([])
  const [categories, setCategories] = useState([])

  const { signOut } = useSession();

  const onExit = () => {
    signOut();
  };

  const resetFilter = () => {
    const priorityOptions = document.getElementById('priority').children
    const categoryOptions = document.getElementById('category').children

    for (let option of priorityOptions) {      
      option.selected = false
    }

    for (let option of categoryOptions) {
      option.selected = false
    }
  }

  const onFilterPriorities = (selectedPriorities) => {
    setIncompletedTasks(taskList)
  }

  const onFilterCategories = (selectedCategories) => {
    setIncompletedTasks(taskList)
  }

  const onFilterNow = (event) => {
    resetFilter()
    setIncompletedTasks(taskList)
  }

  const completeTask = (task) => {
    setIncompletedTasks(taskList)
    setCompletedTasks(tasksCompleted)
  }

  const deleteTask = (task) => {
    const completed = task.completed

    if (completed)
      setCompletedTasks(tasksCompleted)
    else
      setIncompletedTasks(taskList)
  }

  useEffect(() => {
    setCompletedTasks(tasksCompleted)
    setIncompletedTasks(taskList)
  }, [])

  useEffect(() => {
    fetchPriorities({ useAxios: true })
  }, [])

  useEffect(() => {
    if (!prioritiesResponse) return

    if (prioritiesResponse.success) {
      const priorityList = prioritiesResponse.data
      setPriorities(priorityList)
    }
  }, [prioritiesResponse])

  useEffect(() => {
    setCategories([])
  }, [])

  const TaskList = ({ title, completed }) => {
    const tasks = completed ? completedTasks : incompletedTasks

    return (
      <div className='tasks-container'>
        <h2 className='subtitle'>{title}</h2>
        {tasks.length === 0 ? (
          <div className='no-tasks'>
            <h6 className='subtitle is-6'>Nenhuma Tarefa</h6>
          </div>
        ) : (
          tasks.map(task => (
            <Task
              key={task.id}
              task={task}              
              priorities={priorities}
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
            />
          ))
        )}
      </div>
    )
  }

  return (
    <Card className="home-card">
      <div className="header">
        <h1 className="title">Lista de Tarefas</h1>
        <div>
          <LinkButton to="/routine" describe="Rotinas" />
          <LinkButton to="/category" describe="Categorias" />
          <button
            className="button button-header"
            onClick={() => setRenderCompleted(!renderCompleted)}
          >
            Ver {renderCompleted ? "Não Concluídas" : "Concluídas"}
          </button>
          <button className="button is-light" onClick={onExit}>Sair</button>
        </div>
      </div>
      {!renderCompleted && (
        <div className='filters'>
          <Dropdown 
            type='priority'
            title='Filtro de Prioridades'
            options={priorities}
            onFilter={onFilterPriorities}          
          />
          <Dropdown 
            type='category'
            title='Filtro de Categorias'
            options={[]}
            onFilter={onFilterCategories}              
          />
          <button className="button button-header" onClick={onFilterNow}>Ver Tarefas para Agora</button>
          <Link to='/task'>
            <button className="button is-link">Adicionar Tarefa</button>
          </Link>
        </div>
      )}
      {renderCompleted ? (
        <TaskList title="Concluídas" completed={true} />
      ) : (
        <TaskList title="Não Concluídas" completed={false} />
      )}
    </Card>
  );
}

export default Home;
