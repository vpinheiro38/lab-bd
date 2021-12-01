import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
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

function Home() {
  const { user, signOut } = useSession();
  const navigate = useNavigate();

  const [taskQuery, setTaskQuery] = useState([`user=${user.id}`, 'completed=false', 'priority=[]', 'category=[]'])

  const [fetchPriorities, prioritiesResponse] = useFetchAPI({ url: 'priorities', method: 'get', disableSuccessNotification: true })
  const [fetchCategories, categoriesResponse] = useFetchAPI({ url: 'categories', method: 'get', disableNotifications: true })
  const [fetchCompletedTasks, completedTasksResponse] = useFetchAPI({ url: 'tasks', method: 'get', disableNotifications: true })
  const [fetchIncompletedTasks, incompletedTasksResponse] = useFetchAPI({ url: 'tasks', method: 'get', disableNotifications: true })
  const [fetchDeleteTask, deleteTaskResponse] = useFetchAPI({ url: 'tasks', method: 'delete' })
  const [fetchCompleteTask, completeTaskResponse] = useFetchAPI({ url: 'tasks', method: 'put' })

  const [renderCompleted, setRenderCompleted] = useState(false)
  const [completedTasks, setCompletedTasks] = useState([])
  const [incompletedTasks, setIncompletedTasks] = useState([])
  const [priorities, setPriorities] = useState([])
  const [categories, setCategories] = useState([])

  const onExit = () => {
    signOut();
  };

  const onFilterPriorities = (selectedPriorities) => {
    const ids = selectedPriorities.map((priority) => priority.id).join(',')
    const newTaskQuery = [...taskQuery]
    newTaskQuery[2] = `priority=[${ids}]`

    setTaskQuery(newTaskQuery)

    fetchIncompletedTasks({
      queries: newTaskQuery.filter(query => !query.includes('[]')),
      useAxios: true
    })
  }

  const onFilterCategories = (selectedCategories) => {
    const ids = selectedCategories.map((category) => category.id).join(',')
    const newTaskQuery = [...taskQuery]
    newTaskQuery[3] = `category=[${ids}]`

    setTaskQuery(newTaskQuery)

    fetchIncompletedTasks({
      queries: newTaskQuery.filter(query => !query.includes('[]')),
      useAxios: true
    })
  }

  const completeTask = (task, completed_at) => {
    const fixDeadlineAt = (value) => {
      if (!value) return
      return value.slice(0, -1)
    }

    const { description, deadline_at, task_priority, task_user } = task

    fetchCompleteTask({
      data: {
        description, deadline_at: fixDeadlineAt(deadline_at), completed_at,
        task_priority, task_user
      },
      extraPath: `/${task.id}`, useAxios: true
    })
  }
  const reloadTasks = () => {
    fetchIncompletedTasks({
      queries: taskQuery.filter(query => !query.includes('[]')),
      useAxios: true
    })

    fetchCompletedTasks({
      queries: [`user=${user.id}`, 'completed=true'],
      useAxios: true
    })
  }

  const deleteTask = (task) => fetchDeleteTask({ extraPath: `/${task.id}`, useAxios: true })

  useEffect(() => {
    fetchPriorities({ useAxios: true })

    fetchCategories({
      queries: [`user=${user.id}`],
      useAxios: true
    })

    fetchCompletedTasks({
      queries: [`user=${user.id}`, 'completed=true'],
      useAxios: true
    })

    fetchIncompletedTasks({
      queries: [`user=${user.id}`, 'completed=false'],
      useAxios: true
    })
  }, [user])

  useEffect(() => {
    if (!incompletedTasksResponse) return
    if (incompletedTasksResponse.success) setIncompletedTasks(incompletedTasksResponse.data)
    else setIncompletedTasks([])
  }, [incompletedTasksResponse])

  useEffect(() => {
    if (!completedTasksResponse) return
    if (completedTasksResponse.success) setCompletedTasks(completedTasksResponse.data)
    else setCompletedTasks([])
  }, [completedTasksResponse])

  useEffect(() => {
    if (!prioritiesResponse) return
    if (prioritiesResponse.success) setPriorities(prioritiesResponse.data)
    else setPriorities([])
  }, [prioritiesResponse])

  useEffect(() => {
    if (!categoriesResponse) return
    if (categoriesResponse.success) setCategories(categoriesResponse.data)
    else setCategories([])
  }, [categoriesResponse])

  useEffect(() => {
    if (!completeTaskResponse) return
    if (completeTaskResponse.success) reloadTasks()
  }, [completeTaskResponse])

  useEffect(() => {
    if (!deleteTaskResponse) return
    if (deleteTaskResponse.success) reloadTasks()
  }, [deleteTaskResponse])

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
            options={categories}
            onFilter={onFilterCategories}              
          />
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
