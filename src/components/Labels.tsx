import React from 'react';
import { ITask } from '../utilities/Interfaces'

interface Props {
  tasks: ITask[];
  tasksRemoved: number;
}

const Labels = ({tasks, tasksRemoved}: Props) => {
  const total = tasks.length;
  const tasksDone = tasks.filter(task => task.state === 'done').length;
  const tasksProgress = tasks.filter(task => task.state === 'progress').length;
  const todo = total - tasksDone;

  return (
    <div className='labels-wrapper'>
        <ul>
            <li>{todo} To Do</li>
            <li>{tasksProgress} in Progress</li>
            <li>{tasksDone} Done</li>
            <li>{tasksRemoved} Removed</li>
            <li>{tasksDone}/{total}</li>
        </ul>
    </div>
  )
}

export default Labels