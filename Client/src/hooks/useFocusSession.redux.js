import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sessionThunk } from '../features/sessionThunk'

const useFocusSession_redux = () => {

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(sessionThunk())
    }, [dispatch])
    
    const session = useSelector((state) => state.session);

  return session
}

export default useFocusSession_redux