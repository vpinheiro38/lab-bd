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

  const [fetchPriorities, prioritiesResponse] = useFetchAPI({ url: 'priorities', method: 'get', disableNotifications: true })
  const [fetchCategories, categoriesResponse] = useFetchAPI({ url: 'categories', method: 'get', disableNotifications: true })
  
  const [fetchGetTask, getTaskResponse] = useFetchAPI({ url: `tasks`, method: 'get', disableSuccessNotification: true })
  const [fetchTask, taskResponse] = useFetchAPI({ url: taskId ? `tasks/${taskId}` : 'tasks', method: taskId ? 'put' : 'post' })
  
  const [fetchGetCategoryTask, getCategoryTaskResponse] = useFetchAPI({ url: 'categories-tasks', method: 'get', disableNotifications: true })
  const [fetchCategoryTask, categoryTaskResponse] = useFetchAPI({ url: 'categories-tasks', method: 'post' })
  const [fetchDeleteCategoryTask, deleteCategoryTaskResponse] = useFetchAPI({ url: 'categories-tasks', method: 'delete', disableSuccessNotification: true })
  
  const [priorities, setPriorities] = useState([])
  const [categories, setCategories] = useState([])
  
  const [editingTask, setEditingTask] = useState({})
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState();
  const [taskPriority, setTaskPriority] = useState({})
  const [taskCategories, setTaskCategories] = useState([])

  const onFilterCategories = (selectedCategories) => {
    setTaskCategories(selectedCategories)
  }

  const onChangePriority = (e) => {
    const selectedOptions = priorities.filter((_, index) => {
      return e.target[index].selected
    })

    if (selectedOptions.length > 0)
      setTaskPriority(selectedOptions[0])
  }

  const onAddTask = (e) => {
    const fixCompletedAt = (value) => {
      if (!value) return null
      return value.slice(0, -1)
    }

    const fixDeadlineTime = (datetime) => {
      const deadline_at = new Date(datetime)
      deadline_at.setHours(deadline_at.getHours() - 3)
      return deadline_at.toJSON().slice(0, -1)
    }

    e.preventDefault()
    if (isStringEmpty(description) || !taskPriority) {
      toast.error("Algum campo está vazio!")
      return
    }

    fetchTask({ 
      data: {
        description: description,
        completed_at: editingTask ? fixCompletedAt(editingTask.completed_at) : null,
        deadline_at: deadline ? fixDeadlineTime(deadline) : null,
        task_priority: taskPriority.id,
        task_user: user.id
      },
      useAxios: true
    })
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
    if (!taskId || priorities.length === 0) return

    fetchGetTask({
      extraPath: `/${taskId}`,
      useAxios: true
    })

    fetchGetCategoryTask({
      queries: [`task=${taskId}`],
      useAxios: true
    })
  }, [taskId, priorities])

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
    if (!getCategoryTaskResponse) return
    if (getCategoryTaskResponse.success) {
      const categoriesFromTask = categories.filter((category) => (
        getCategoryTaskResponse.data.some(categoryTask => categoryTask.category_id === category.id)
      ))
      setTaskCategories(categoriesFromTask)
      setEditingTask(editingTask => ({ ...editingTask, categories: categoriesFromTask, categories_tasks: getCategoryTaskResponse.data }))
    } else {
      setTaskCategories([])
      setEditingTask(editingTask => ({ ...editingTask, categories: [], categories_tasks: [] }))
    }
  }, [getCategoryTaskResponse])
  
  useEffect(() => {
    if (!taskResponse) return
    if (taskResponse.success) {
      const categoriesToAdd = !editingTask.categories ? [] : taskCategories.filter((category => !editingTask.categories.some(editingTaskCategory => editingTaskCategory.id === category.id)))
      categoriesToAdd.forEach((category) => {
        fetchCategoryTask({
          data: {
            category_id: category.id,
            task_id: taskResponse.data.data.id
          },
          useAxios: true
        })
      })
      
      let categoriesToRemove = []

      if (editingTask.categories && editingTask.categories.length > 0) {
        categoriesToRemove = editingTask.categories.filter((editingTaskCategory => !taskCategories.some(category => editingTaskCategory.id === category.id)))
        categoriesToRemove.forEach(category => {
          fetchDeleteCategoryTask({
            extraPath: `/${editingTask.categories_tasks.filter(categoryTask => categoryTask.category_id === category.id)[0].id}`,
            useAxios: true
          })
        })
      }

      if (categoriesToAdd.length === 0 && categoriesToRemove.length === 0) navigate('/')
    }
  }, [taskResponse])

  useEffect(() => {
    if (!categoryTaskResponse) return
    if (categoryTaskResponse.success) navigate('/')
  }, [categoryTaskResponse])


  useEffect(() => {
    if (!getTaskResponse) return

    if (getTaskResponse.success) {
      const editTask = getTaskResponse.data
      setEditingTask(editingTask => ({ ...editingTask, ...editTask }))
      setDescription(editTask.description)
      setDeadline(editTask.deadline_at && new Date(editTask.deadline_at))
      setTaskPriority(priorities.filter(item => item.id === editTask.task_priority)[0])
    }
  }, [getTaskResponse])

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
          <label className='input-container'>
            <div className="field-label">
              <p className="label">Categorias</p>
            </div>
            <Dropdown
              type='category'
              title='Categorias'
              options={categories}
              defaultSelected={taskCategories}
              onFilter={onFilterCategories}
            />
          </label>
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
