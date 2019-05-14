import { navigate } from 'gatsby'

export default (tasks, action) => {
  switch (action.type) {
    case 'Add_NEW_TASK':
      return [...tasks, action.payload]
    case 'FETCH_TASKS':
      return action.payload
    case 'GET_DATA_BY_ID':
      return action.payload
    case 'TOGGLE_TASK':
      navigate('/app/')
      return tasks.map(item =>
        item.id === action.id
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item
      )
    default:
      return tasks
  }
}
