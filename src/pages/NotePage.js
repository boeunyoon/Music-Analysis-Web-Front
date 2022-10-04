import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow} from "../assets/chevron-left.svg"
const NotePage = () => {
    const {id}  = useParams();
    let [note, setNote] = useState(null)
    let navigate = useNavigate()
    useEffect(() => {
        getNote()
    }, [id])
    
    let getNote = async () => {
        let response = await fetch(`/api/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async () => {
      fetch(`/api/notes/${id}/update/`, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
      })
  }

    let handleSubmit = (e) => {
      updateNote()
      navigate('/')
    }
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <h3>
            <Arrow onClick={handleSubmit}/>
          </h3>
        </h3>
      </div>
          <textarea onChange={(e)=>{setNote({...note, 'body': e.target.value})}} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage