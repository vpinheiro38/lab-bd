import '../stylesheets/components.css'
import Icon from './icon'
import { Link } from "react-router-dom"
import useFetchAPI from '../contexts/useFetchAPI'
import { useEffect, useState } from 'react'

function Task({ task, onCompleteTask, onDeleteTask }) {
  const [fetchCategoriesTask, categoriesTaskResponse] = useFetchAPI({ url: 'categories-tasks', method: 'get', disableNotifications: true })
  const [categoriesTask, setCategoriesTask] = useState([])

  useEffect(() => {
    fetchCategoriesTask({
      queries: [`task=${task.id}`],
      useAxios: true
    })
  }, [task.id])

  useEffect(() => {
    if (!categoriesTaskResponse) return
    if (categoriesTaskResponse.success) setCategoriesTask(categoriesTaskResponse.data)
    else setCategoriesTask([])
  }, [categoriesTaskResponse])

  const PriorityTag = () => {
    const colors = ['is-success', 'is-warning', 'is-danger']

    return (
      <span className={`tag ${task.priority_number && colors[task.priority_number-1]}`}>
        Prioridade: {task.priority_description}
      </span>
    )
  }

  const Deadline = () => {
    if (!task.deadline_at) return <div />

    const deadlineDate = new Date(task.deadline_at)
    deadlineDate.setSeconds(0)

    return (
      <span className="tag is-info">Prazo: {deadlineDate.toLocaleString()}</span>
    )
  }

  return (
    <div key={task.id} className='task'>
      <div className='text-container'>
        <div className='tags'>
          <PriorityTag />
          <Deadline />
          {categoriesTask.map((categoryTask) => (
            <span className="tag is-info">{categoryTask.category_description}</span>
          ))}
        </div>
        <p className='text'>{task.description}</p>
      </div>
      <div className='buttons'>
        <Icon
          iconType={task.completed_at ? 'fa' : 'far'}
          iconName='fa-check-square'
          onClick={() => onCompleteTask(task, task.completed_at ? null : (new Date()).toJSON().slice(0, -1))}
        />
        <Link to={`/task/${task.id}`}>
          <Icon iconName='fa-edit' />
        </Link>
        <Icon iconName='fa-trash' onClick={() => onDeleteTask(task)} />
      </div>
    </div>
  )
}

export default Task;
