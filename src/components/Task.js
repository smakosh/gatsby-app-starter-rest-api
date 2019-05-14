import React, { useContext, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import axios from 'axios'
import Context from 'components/common/Context'
import SEO from 'components/common/Seo'

export default ({ id }) => {
  const { tasks, dispatch } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setSubmitting] = useState(false)

  const fetchTask = async () => {
    try {
      const { data } = await axios.get(`${process.env.API}/post/${id}`)
      dispatch({ type: 'GET_DATA_BY_ID', payload: data })
      setLoading(false)
    } catch (err) {
      navigate('/404/')
    }
  }

  const setDone = async () => {
    try {
      setSubmitting(true)
      await axios.patch(`${process.env.API}/post/${id}`, {
        isDone: !tasks.isDone,
      })
      navigate('/app/tasks/')
      setSubmitting(false)
    } catch (error) {
      // TODO: use react-toastify
      alert('something went wrong')
      setSubmitting(false)
    }
  }

  const deleteTask = async () => {
    try {
      setSubmitting(true)
      await axios.delete(`${process.env.API}/post/${id}`)
      navigate('/app/tasks/')
      setSubmitting(false)
    } catch (error) {
      // TODO: use react-toastify
      alert('something went wrong')
      setSubmitting(false)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])

  return (
    <>
      <SEO title={loading ? 'Loading...' : tasks.title} />
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div className="container">
          <h1
            style={{ textDecoration: tasks.isDone ? 'line-through' : 'unset' }}
          >
            {tasks.title}
          </h1>
          <button type="button" disabled={isSubmitting} onClick={setDone}>
            Set to Done
          </button>
          <button type="button" disabled={isSubmitting} onClick={deleteTask}>
            Delete
          </button>
        </div>
      )}
    </>
  )
}
