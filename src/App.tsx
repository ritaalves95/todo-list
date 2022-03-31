import React, {FC, useState} from 'react';
import './App.css';
import Labels from './components/Labels';
import NewTask from './components/NewTask';
import TaskItem from './components/TaskItem';
import { ITask } from './utilities/Interfaces';
import { generateWarning } from './utilities/Warning';

const App: FC = () => {
  const [todoList, setTodoList] = useState<ITask[]>([
    {
      taskName: 'Learn Typescript',
      date: '31/3/2022',
      state: 'progress'
    },
    {
      taskName: 'Move to Norway',
      date: '22/3/2022',
      state: 'new'
    },
    {
      taskName: 'Send Cv',
      date: '20/3/2022',
      state: 'done'
    },
  ]);

  const [removed, setremoved] = useState<number>(1);
  const [filter, setFilter] = useState<string>('all');
  const listFiltered = filter !== 'all' ? todoList.filter(task => task.state === filter ) : todoList;

//  add task
  const [addTask, setAddTask] = useState<boolean>(false);

  const addNewTask = (task:string, date:string, state:string):void => {
    const newTask = {taskName: task, date: date, state: state};
    setTodoList([ newTask, ...todoList])
    setAddTask(false);
  }

//  remove task
  const removeTask = (taskToRemove:string):void => {
    let newTodoList = todoList.filter((task) => task.taskName !== taskToRemove);
    setTodoList(newTodoList);
    setremoved(removed + 1)
  }

//  update task
  const updateTask = (taskToUpdate:string, newState:string):void => {
    let newTodoList = todoList.map((task) => task.taskName === taskToUpdate ? {
      ...task,
      state: newState,
    } : task);
    setTodoList(newTodoList);
  }


  return (
    <div className="main">
      <header></header>

      <section className='container'>
        <aside>
          <p>To Do</p>
        </aside>

        <div className='sub-container'>
          <h1>My To Do List</h1>

          <div className='sub-container-row'>
            <Labels tasks={todoList} tasksRemoved={removed} />
            <button onClick={() => setAddTask(true)}>
              <i className="fa-solid fa-plus"></i>
              Add Task
            </button>
          </div>

          <div className='tasks-wrapper'>
            <h3 className='header dropdown'>
              Filter{' '} 
              <i className="fa-solid fa-sort"></i>
                <ul className="dropdown-content">
                  <li className={`${filter === 'all' && 'selected'}`} onClick={() => setFilter('all')}>All</li>
                  <li className={`${filter === 'new' && 'selected'}`} onClick={() => setFilter('new')}>New</li>
                  <li className={`${filter === 'progress' && 'selected'}`} onClick={() => setFilter('progress')}>In Progress</li>
                  <li className={`${filter === 'done' && 'selected'}`} onClick={() => setFilter('done')}>Done</li>
                </ul>
            </h3>
            <h3 className='header'>Title Task</h3>
            <h3 className='header'>Date</h3>

            {addTask && <NewTask newTask={addNewTask} />}

            {listFiltered.length ? 
              listFiltered.map((task: ITask, key: number) => {
                return <TaskItem key={key} task={task} removeTask={removeTask} updateTask={updateTask} />
              })
            :
            <small>{generateWarning(filter)}</small>
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
