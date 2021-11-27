import '../stylesheets/components.css'
import Icon from './icon'
import { Link } from "react-router-dom"

function Task({ task, priorities, onCompleteTask, onDeleteTask }) {

  const PriorityTag = ({ priority }) => {
    const colors = ['is-success', 'is-warning', 'is-danger']

    return (
      <span className={`tag ${colors[priority.numberPriority]}`}>
        Prioridade: {priority.description}
      </span>
    )
  }

  return (
    <div key={task.id} className='task'>
      <div className='text-container'>
        <div className='tags'>
          <PriorityTag priority={priorities[task.priorityId]} />
          {task.tags.map(tag => (
            <span key={tag.id} className="tag is-info">{tag.description}</span>
          ))}
        </div>
        <p className='text'>{task.description}</p>
      </div>
      <div className='buttons'>
        <Icon iconName='fa-check' onClick={() => onCompleteTask(task)} />
        <Link to={`/task/${task.id}`}>
          <Icon iconName='fa-edit' />
        </Link>
        <Icon iconName='fa-trash' onClick={() => onDeleteTask(task)} />
      </div>
    </div>
  )
}

export default Task;
