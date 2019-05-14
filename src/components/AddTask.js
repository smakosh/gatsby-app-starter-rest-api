import React, { useState, useContext } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'
import Context from 'components/common/Context'
import SEO from 'components/common/Seo'

export default () => {
  const { dispatch } = useContext(Context)
  const [task, setTask] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = e => {
    setTask(e.target.value)
  }

  const handleBlur = e => {
    if (!e.target.value) {
      setError('Insert a task!')
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (!task) {
        setError('Field is required')
      } else {
        const { data } = await axios.post(`${process.env.API}/post/`, {
          title: task,
        })
        dispatch({ type: 'Add_NEW_TASK', payload: data })
        navigate('/app/tasks/')
        setSubmitting(false)
      }
    } catch (err) {
      setError(err.response.data)
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO title="Tasks" />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-field black-input">
            <span className="task-icon" />
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter your task"
              name="task"
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
          </div>
          <button
            type="submit"
            className="btn btn-rounded gradient-green"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
