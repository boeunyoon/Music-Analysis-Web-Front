import React, {useContext, useState, useEffect, useCallback} from 'react'
import Table from 'react-bootstrap/Table';
import AuthContext from '../context/AuthContext'
import jwt from 'jwt-decode'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import DatePicker from 'react-datepicker'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner';
import "react-datepicker/dist/react-datepicker.css"; 
import '../css/Home.css'
const Home = (props) => {
    let {user, logoutUser} = useContext(AuthContext)
    let [top100MusicRank, setTop100MusicRank] = useState([])
    let {authTokens} = useContext(AuthContext)
    const [Username, setName] = useState(null)
    const [music, setMusic] = useState('')
    const [dateValue, setDateValue] = useState('')
    const userinfo = jwt(authTokens.access)
    const [top100, setTop100] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const [Loading, setLoading] = useState(false)
    useEffect(()=>{
        if(user){
            localStorage.setItem('userInfo', userinfo.username)
            setName(localStorage.getItem('userInfo'))
        }else{
            setName(null)
        }
        dateToString(startDate)
    },[startDate])
    // useEffect(()=> {
    //     getNotes()
    // }, [])
    // let getNotes = async() => {
    //     let response = await fetch('http://127.0.0.1:8000/api/notes/', {
    //         method:'GET',
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer' + String(authTokens.access)
    //         }
    //     })
    //     let data = await response.json()
    //     if(response.status === 200){
    //         setNote(data)
    //     }else if(response.statusText === 'Unauthorized'){
    //         logoutUser()
    //     }
    // }
    let getTop100 = async(e) => {
        e.preventDefault()
        setLoading(true)
        console.log(music)
        let response = await fetch('http://127.0.0.1:8000/spotify/get-top-100', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                'date': dateValue,
            }])
        })
        let data = await response.json()
        const obj = JSON.parse(data)
        setTop100MusicRank(obj.rank)
        console.log(obj.rank)
        if(response.status === 200){
            console.log(top100)
            setTimeout(function() {
              setLoading(false)
            }, 2000);
        }else{
            alert('Login fail')
        }
      }
  const onChangeTitle = useCallback((e) => {
    setMusic(e.target.value)
  },[]) 
  const dateToString = (date) => {
    setDateValue(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
    console.log(dateValue)
  }
  const getDayName = (date) => {
    return date.toLocaleDateString('ko-KR', {
      weekday: 'long',
    }).substr(0, 1);
  }
  const createDate = (date) => {
    return new Date(new Date(date.getFullYear()
      , date.getMonth()
      , date.getDate()
      , 0
      , 0
      , 0));
  }
  return (
    <div>
        <h2 className='home-title'>Top 100 Songs</h2>
          {/* <Form.Control
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={onChangeTitle}
          /> */}
          <div className='date-input'>
            <DatePicker 
              className='datepicker' 
              selected={startDate} 
              onChange={(date) => setStartDate(date) } 
              dateFormat="yyyy-MM-dd"
              popperPlacement="auto"
              dayClassName={date =>
                getDayName(createDate(date)) === '토' ? "saturday"
              :
                getDayName(createDate(date)) === '일' ? "sunday" : undefined
            }
            />
            <Button onClick={getTop100}>Submit</Button>
          </div>
        {/* {
            user && <h3>Hello {Username}</h3>
        }
        <ul>
        {notes.map(note => (
                    <li key={note.id} >{note.body}</li>
                ))}
        </ul> */}
       <div style={{marginTop:'30px'}}>
        {Loading && <div style={{display : 'flex', justifyContent:'center', marginTop:'20%'}}>
           <Spinner animation="border" variant="primary" style={{width:'40px', height: '40px'}}/>
          </div>}
        {!Loading && 
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
            {top100MusicRank && top100MusicRank.map((data,index)=>(
              <tr key={index}>
                 <th className='image-table'>
                   <div style={{marginLeft: '20px'}}>{index+1}</div>
                   <Image 
                     src={data.images[2].url}
                     rounded
                     style={{marginLeft: '30px', marginRight:'-30px'}}
                   />
                 </th>
                 <th>{data.title}</th>
                 <th>{data.artist}</th>
             </tr>
            ))}
        </tbody>
      </Table>
        }
       </div>
    </div>
  )
}

export default Home