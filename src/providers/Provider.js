import React, { useReducer } from 'react'
import Context from 'components/common/Context'
import reducer from './taskReducer'
import userReducer from './userReducer'

export default ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, [])
  const [user, dispatchUserAction] = useReducer(userReducer, {})

  return (
    <Context.Provider
      value={{
        tasks,
        dispatch,
        user,
        dispatchUserAction,
      }}
    >
      {children}
    </Context.Provider>
  )
}
