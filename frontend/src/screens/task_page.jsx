import { Link } from "react-router-dom"
import Card from "../components/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import DatePicker, { registerLocale } from "react-datepicker"
import ptBR from 'date-fns/locale/pt-BR';
import '../stylesheets/components.css'
import '../stylesheets/task.css'
import Dropdown from "../components/dropdown";
import { isStringEmpty } from "../utils/utils";
import { toast } from "react-toastify";
import useFetchAPI from "../contexts/useFetchAPI";
import { useSession } from "../contexts/useSession";

registerLocale('ptBR', ptBR)

function TaskPage({ taskId }) {
  const { user } = useSession()
  const navigate = useNavigate();

  const [fetchPriorities, prioritiesResponse] = useFetchAPI({ url: 'priorities', method: 'get', disableSuccessNotification: true })
  const [fetchCategories, categoriesResponse] = useFetchAPI({ url: 'categories', method: 'get', disableSuccessNotification: true })
  const [fetchGetTask, getTaskResponse] = useFetchAPI({ url: `tasks/${taskId}`, method: 'get', disableSuccessNotification: true })
  const [fetchTask, taskResponse] = useFetchAPI({ url: taskId ? `tasks/${taskId}` : 'tasks', method: taskId ? 'put' : 'post' })
  const [fetchCategoryTask, categoryTaskResponse] = useFetchAPI({ url: 'categories-tasks', method: 'post' })
  
  const [priorities, setPriorities] = useState([])
  const [categories, setCategories] = useState([])
  
  const [editingTask, setEditingTask] = useState()
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState();
  const [taskPriority, setTaskPriority] = useState({})
  const [taskCategory, setTaskCategory] = useState({})

  const onFilterCategories = (selectedCategories) => {
    if (selectedCategories.length > 0) setTaskCategory(selectedCategories[0])
    else setTaskCategory({})
  }

  const onChangePriority = (e) => {
    const selectedOptions = priorities.filter((_, index) => {
      return e.target[index].selected
    })

    if (selectedOptions.length > 0)
      setTaskPriority(selectedOptions[0])
  }

  const onAddTask = (e) => {
    const fixDeadlineTime = (datetime) => {
      const deadline_at = new Date(datetime)
      deadline_at.setHours(deadline_at.getHours() - 3)
      return deadline_at.toJSON().slice(0, -1)
    }

    e.preventDefault()
    if (isStringEmpty(description) || !taskPriority || !taskCategory) {
      toast.error("Algum campo está vazio!")
      return
    }
    
    if (deadline) {
    }

    fetchTask({ 
      data: {
        description: description,
        completed_at: editingTask ? editingTask.completed_at : null,
        deadline_at: deadline ? fixDeadlineTime(deadline) : null,
        task_priority: taskPriority.id,
        task_user: user.id
      },
      useAxios: true
    })

    // fetchCategoryTask({
    //   data: {
    //     category_id: taskCategory.id,
    //     task_id: 
    //   },
    //   useAxios: true
    // })
  }

  const Field = ({ label, children }) => (
    <label className='input-container'>
      <div className="field-label">
        <p className="label">{label}</p>
      </div>
      {children}
    </label>
  )

  useEffect(() => {
    fetchPriorities({ useAxios: true })
    
    fetchCategories({
      queries: [`user=${user.id}`],
      useAxios: true
    })
  }, [])

  useEffect(() => {
    if (!prioritiesResponse) return
    if (prioritiesResponse.success) {
      const priorityList = prioritiesResponse.data
      setPriorities(priorityList)
      if (!taskId) setTaskPriority(priorityList[0])
    }
  }, [prioritiesResponse])

  useEffect(() => {
    if (!categoriesResponse) return
    if (categoriesResponse.success) setCategories(categoriesResponse.data)
  }, [categoriesResponse])

  useEffect(() => {
    if (!taskResponse) return
    if (taskResponse.success) navigate('/')
  }, [taskResponse])

  useEffect(() => {
    if (!taskId || priorities.length === 0) return

    fetchGetTask({mockResponse: {
      id: taskId,
      description: 'Descrição da Tarefa',
      completed: false,
      creationDate: '2021-11-18T22:28:00.188Z',
      completedDate: undefined,
      deadline: '2021-11-18T22:28:00.188Z',
      task_priority: 1,
      task_user: 1,
      tags: [
        { id: 0, description: "Tag 1" },
        { id: 1, description: "Tag 1" },
      ],
    }})
  }, [taskId, priorities])

  useEffect(() => {
    if (!getTaskResponse) return

    if (getTaskResponse.success) {
      const editTask = getTaskResponse.data
      setEditingTask(editTask)
      setDescription(editTask.description)
      setDeadline(editTask.deadline && new Date(editTask.deadline))
      setTaskPriority(priorities.filter(item => item.id === editTask.task_priority)[0])
    }
  }, [getTaskResponse])
  console.log(deadline)
  return (
    <Card className='home-card'>
      <div className='header'>
        <h1 className='title'>{taskId ? 'Editar' : 'Adicionar'} Tarefa</h1>
        <div>
          <button className="button button-header is-primary" onClick={onAddTask}>{taskId ? 'Salvar' : 'Adicionar'}</button>
          <Link to="/">
            <button className="button">Voltar</button>
          </Link>
        </div>
      </div>
      <form className='form'>
        <label className='input-container'>
          <div className="field-label">
            <p className="label">Descrição</p>
          </div>
          <input className="input" type="text" placeholder='Descrição' defaultValue={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <div className='row-container'>
          <Field label='Prioridade'>          
            <div className='select'>
              <select onChange={onChangePriority}>
                {priorities.map(option => {
                  return (
                    <option key={option.id} value={option} selected={option.id === taskPriority.id}>
                      {option.description}
                    </option>
                  )
                })}
              </select>
            </div>
          </Field>
          <Field label='Categorias'>
            <Dropdown
              type='category'
              title='Categorias'
              options={categories}
              onFilter={onFilterCategories}
            />
          </Field>
        </div>          
        <Field label='Prazo (opcional)'>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className='input'
            showTimeSelect
            locale="ptBR"
          />
        </Field>
      </form>
    </Card>
  )
}

export default TaskPage;
