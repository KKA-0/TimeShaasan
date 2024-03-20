import components from './components.module.css'
import { DragDropContext } from "react-beautiful-dnd";
import dashboard from './../../../../Dashboard.module.css'
import Colmn from '../../cards/overview.kanbanboard.colmn'
import useTask from "./../../../../../../hooks/useTask.redux"
import { moveTask } from "../../../../../../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const KarbanBoard = () => {
  const dispatch = useDispatch()
  const user_id = useSelector((state) => state.user.id)
  const taskData = useTask()

  const handleDragEnd = (result) => {
    // console.log(result)
    if(result.destination === null || result.destination === undefined) {
        return 0;
    }else{
        const data = {
            user_id: user_id,
            source: result.source.droppableId,
            destination: result.destination.droppableId,
            index: result.destination.index,
            task_id: result.draggableId
        }
        dispatch(moveTask(data))
    }
};
  return (
      <div className={dashboard.kanbanBoarddiv}>
        <DragDropContext onDragEnd={handleDragEnd}>
              <Colmn title={"TO DO"} tasks={taskData.todo} colmn={"todo"}/>
              <Colmn title={"IN PROGRESS"} tasks={taskData.inProgress} colmn={"inProgress"} />
              <Colmn title={"DONE"} tasks={taskData.done} colmn={"done"} />
        </DragDropContext>
      </div>
  )
}

export default KarbanBoard