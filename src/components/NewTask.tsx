import React, { ChangeEvent, useState} from 'react'

interface Props {
    newTask: (task:string, date:string, state:string) => void;
}
  
const NewTask = ({newTask}: Props) => {
    const getDate  = () => {
        let date = new Date();
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
        return day + '/' + month + '/' + date.getFullYear()
    }

    const [task, setTask] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
        setTask(e.target.value);
    }

    const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        newTask(task, getDate(), 'new');
        setTask('') 
    }

  return (
    <form className='new-task' onSubmit={submit}>
      <input type="text" name="task-title" id="task-title" placeholder='Insert task here' onChange={handleChange} value={task} autoFocus/>
      <p>{getDate()}</p>
    </form>
  )
}

export default NewTask