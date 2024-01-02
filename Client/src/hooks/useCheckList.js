import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checklistData } from './../features/userThunk'

const useCheckList = () => {

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(checklistData())
    }, [dispatch])
    
    const checklist = useSelector((state) => state.user.checklist);

  return checklist
}

export default useCheckList