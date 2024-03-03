import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { taskData } from '../features/taskThunk'

const useTask = () => {
  const dispatch = useDispatch()
  const todo = useSelector((state) => state.tasks.todo);
  const inProgress = useSelector((state) => state.tasks.inProgress);
  const done = useSelector((state) => state.tasks.done);
  useEffect(() => {
    console.log("Task check")
      if(todo.length === 0 && inProgress.length === 0 && done.length === 0){
        console.log("Task not found")
        dispatch(taskData())
      }
  }, [dispatch]);

  return {todo, inProgress, done};
}

export default useTask;