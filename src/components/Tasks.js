import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'gatsby'
import Context from 'components/common/Context'
import SEO from 'components/common/Seo'
import TasksLoading from './common/TasksLoading'

export default () => {
  const [loading, setLoading] = useState(true)
  const { tasks, dispatch } = useContext(Context)

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${process.env.API}/post/all`)

      await dispatch({ type: 'FETCH_TASKS', payload: data })
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>
      <SEO title="Tasks" />
      <div className="container">
        <h1>Tasks</h1>
        {loading ? (
          <TasksLoading />
        ) : (
          <>
            {tasks && (
              <ul>
                {tasks.map(({ title, _id, isDone }) => (
                  <li key={_id}>
                    <Link
                      to={`/app/task/${_id}`}
                      style={{
                        textDecoration: isDone ? 'line-through' : 'unset',
                      }}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link to="/app/task/new/">Add new Task</Link>
          </>
        )}
      </div>
    </>
  )
}
