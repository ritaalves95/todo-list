export const generateWarning = (state:string) => {
    if(state === 'new'){ 
        return 'No new tasks to show'
    }
    if(state === 'progress'){ 
        return 'No tasks in progress to show'
    }
    if(state === 'done'){ 
        return 'No completed tasks to show'
    }
    if(state === 'all'){ 
        return 'No tasks to show'
    }
}