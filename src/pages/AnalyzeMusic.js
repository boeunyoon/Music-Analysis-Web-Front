import React, { useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import '../css/AnalyzeMusic.css'
import { Chart } from '../components/MusicSearchTable';
import Modals from '../components/Modals';
const AnalyzeMusic = (props) => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [checked, setChecked] = useState(false);
  const [music, setMusic] = useState('')
  const [selectTable, setSelectTable] = useState(false)
  const [musicAnalsisData, setMusicAnalsisData] = useState({
    title:'',
    artist:'',
    danceability:'',
    energy:'',
    liveness:'',
    loudness:'',
    valence:'',
    acousticness:'',
  })
  const [musicData, setMusicData] = useState([{
    key:'',
    title:'',
    artist:'',
    danceability:'',
    energy:'',
    liveness:'',
    loudness:'',
    valence:'',
    acousticness:'',
  }])
  let musicArray = []
  
  const [SelectMusic, setSelectMusic] = useState(false)
  const [existData, setExistData] = useState(false)
  const [SelectList, setSelectList] = useState(false)
  let searchMusic = async(e) => {
    console.log(musicData)
    e.preventDefault()
    let response = await fetch('http://127.0.0.1:8000/spotify/search-song', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
            'search': music,
        }])
    })
    let data = await response.json()
    console.log(data)
    const obj = JSON.parse(data)
    for(let i = 0; i < 5; i++){
      musicArray.push(obj[i])
    }
    console.log(musicArray)
    setMusicData(musicArray)
    console.log(musicData)
    if(response.status === 200){
        setExistData(true)
    }else{
        alert('Login fail')
    }
  }
  const clicklist = (index, e) => {
    setChecked(!checked)
    console.log(checked)
    setMusicAnalsisData({
      title:musicData[index].title,
      artist:musicData[index].artist,
      danceability:musicData[index].danceability * 10,
      energy:musicData[index].energy * 10,
      liveness:musicData[index].liveness * 10,
      loudness:musicData[index].loudness * 10,
      valence:musicData[index].valence * 10,
      acousticness:musicData[index].acousticness * 10,
    })
    setSelectTable(true)
  };


  const onChangePasswordCheck = useCallback((e) => {
     setMusic(e.target.value)
  },[]) 

  const dataset = {
    labels: ['danceability', 'energy', 'liveness', 'valence', 'acousticness'],
    datasets: [
      {
        label: musicAnalsisData.title,
        data: [musicAnalsisData.danceability, 
          musicAnalsisData.energy, 
          musicAnalsisData.liveness, 
          musicAnalsisData.valence, 
          musicAnalsisData.acousticness
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  const [ClickModal, setClickModal] = useState(false)
  const clickmodal = useCallback(()=>{
    setClickModal(true)
  })
  const ClickModalChange = () => {
    setClickModal(false)
  };
  return (
    <div>
      {/* <button onClick={clickmodal}>Click</button>
      {ClickModal && <Modals ClickModal= {ClickModal} ClickModalChange={ClickModalChange}/>} */}
      <h2 className='title-onemusic'>Analysis of One Music</h2>
      <Row className='search-group'>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Music
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              disabled
              placeholder= {musicAnalsisData.title}
            />
          </InputGroup>
        </Col>
        <Col>
          <Button variant="primary" onClick={() => {
            handleShow()
            setSelectMusic(false)
          }}>
            Search your Music
          </Button>
          <Button variant="primary" style={{marginLeft:'20px'}} onClick={() => {
            handleShow1()
          }}>
            <i>?</i>
          </Button>
        </Col>
      </Row>
      <Row>
        {SelectMusic &&
          <div className="chart-style">
            <Chart data={dataset}/>
          </div>
        }
      </Row>
  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Music</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Music Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            name="music"
            onChange={onChangePasswordCheck}
          />
        <Button variant="outline-secondary" id="button-addon2" onClick={searchMusic}>
          Search
        </Button>
      </InputGroup>
        <div>
          {existData && 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Artist</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <th>{musicData[0].title}</th>
                  <th>{musicData[0].artist}</th>
                </tr> */}
                {musicData.map((data, index) => (
                  <tr 
                    key={index} 
                  >
                    <th>
                      <Form.Check id={index} type='checkbox' onChange={(e)=>{
                        clicklist(index,e)
                        }
                      }/>
                    </th>
                    <th>{data.title}</th>
                    <th>{data.artist}</th>
                  </tr>
                ))}
              </tbody>
            </Table>
          }
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => {
            handleClose()
            setExistData(false)
          }}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            handleClose()
            setSelectMusic(true)
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div>
           <p>danceability : ??? ????????? ????????????? 0.0 - 1.0 ???????????? ?????? ??? ?????? ????????? ??????.</p>
           <p>energy : ???????????? ???????????? ???????????? ??????????????? ??? ??? ????????????. 0.0 - 1.0 ???????????? ????????? ???????????? ???????????? ?????? ??????????????? ?????? ?????????.</p>
           <p>instrumentlness : ????????? ????????? ?????? ???????????????.(0.0 - 1.0)</p>
           <p>liveness : ????????? ????????? ????????? ???????????????. ????????? ??????????????? ?????? ?????????????</p>
           <p>loudness : ????????? ?????????/??? ????????? ???????????????.(????????? ????????? ??????????????? ?????????.)</p>
           <p>speechiness : ????????? ????????? ???????????????. ???????????????????????? ??????????????? ?????? ???????????? ???????????? ?????? ??????????????? ????????? ???????????? ?????? ?????????????</p>
           <p>tempo : ??????, beats per minute(BPM) ?????????.</p>
           <p>valence : ????????? ?????? ????????? ??????????????????.</p>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => {
            handleClose1()
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AnalyzeMusic