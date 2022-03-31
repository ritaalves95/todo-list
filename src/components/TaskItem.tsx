import { ChangeEvent} from 'react'
import { ITask } from '../utilities/Interfaces'

interface Props {
  task: ITask;
  removeTask: (taskToRemove:string) =>void;
  updateTask: (taskToUpdate:string, newState:string) =>void;
}

const TaskItem = ({task, removeTask, updateTask}: Props) => {

  const handleRemove = (e: ChangeEvent<HTMLInputElement>):void => {
    removeTask(e.target.value)
  }

  const handleComplete = (e: ChangeEvent<HTMLInputElement>):void => {
    if(e.target.name === 'task-done'){
      let newState = e.target.checked ? 'done' : 'new';
      updateTask(e.target.value, newState)
    }else{
      let newState = e.target.checked ? 'progress' : 'new';
      updateTask(e.target.value, newState)
    }
  }

  return (
    <div className={`task-item state-${task.state}`}>
      <p>{task.taskName}</p>
      <p>{task.date}</p>
      <article className='actions-wrapper'>
        <input type="checkbox" className="task-progress" name="task-progress" value={task.taskName} onChange={handleComplete} checked={task.state === 'progress'} />
        <input type="checkbox" className="task-done" name="task-done" value={task.taskName} onChange={handleComplete} checked={task.state === 'done'} />
        <input type="checkbox" className="remove-task" name="remove-task" value={task.taskName} onChange={handleRemove} />
      </article>
    </div>
  )
}

export default TaskItem