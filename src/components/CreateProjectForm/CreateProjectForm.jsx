import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateProjectForm() {
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({type: 'ADD_PROJECT', payload: {projectName, user}})
    setProjectName('') 
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="projectName">Project Name: </label>
      <input
        id="projectName"
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}
