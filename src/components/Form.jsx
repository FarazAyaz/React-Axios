import React from 'react'

const Form = () => {
  return (
    <div>
        <form className="form">
            <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
            </div>
            <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea id="body" name="body" required></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
      
    </div>
  )
}

export default Form
