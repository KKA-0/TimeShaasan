// useCheckList.js
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checklistData } from '../features/userThunk'

const useCheckList = () => {
  const dispatch = useDispatch()
  const checklist = useSelector((state) => state.user.checklist);

  useEffect(() => {
    if (checklist.length === 0) {
      dispatch(checklistData())
    }
  }, [dispatch, checklist.length])

  return checklist;
}

export default useCheckList;
