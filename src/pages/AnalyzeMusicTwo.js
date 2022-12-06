import React,{ useState, useCallback } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/AnalyzeMusicTwo.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Chart } from '../components/MusicAnalysisChart';
export const AnalyzeMusicTwo = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [music, setMusic] = useState('')
  const [SelectMusic, setSelectMusic] = useState(false)
  const [existData, setExistData] = useState(false)
  const clicklist = index => {
    setMusicAnalsisData({
      title:musicData[index].title,
      artist:musicData[index].artist,
      danceability:musicData[index].danceability,
      energy:musicData[index].energy,
      liveness:musicData[index].liveness,
      loudness:musicData[index].loudness,
      valence:musicData[index].valence,
      acousticness:musicData[index].acousticness,
    })
    console.log('1',musicAnalsisData)
  };
  const clicklist2 = index => {
    setMusicAnalsisData2({
      title:musicData[index].title,
      artist:musicData[index].artist,
      danceability:musicData[index].danceability,
      energy:musicData[index].energy,
      liveness:musicData[index].liveness,
      loudness:musicData[index].loudness,
      valence:musicData[index].valence,
      acousticness:musicData[index].acousticness,
    })
    console.log('2',musicAnalsisData2)
  };
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
  const [musicAnalsisData2, setMusicAnalsisData2] = useState([{
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
  
  let searchMusic = async(e) => {
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
    const obj = JSON.parse(data)
    for(let i = 0; i < 5; i++){
      musicArray.push(obj[i])
    }
    setMusicData(musicArray)
    console.log(musicData)
    if(response.status === 200){
        setExistData(true)
    }else{
        alert('Login fail')
    }
  }
  const onChangeTitle = useCallback((e) => {
    setMusic(e.target.value)
 },[]) 
 const dataset = {
  labels: ['danceability', 'energy', 'liveness', 'valence', 'acousticness'],
  datasets: [
    {
      label: musicAnalsisData.title ,
      data: [musicAnalsisData.danceability, musicAnalsisData.energy, musicAnalsisData.liveness, musicAnalsisData.valence, musicAnalsisData.acousticness],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: musicAnalsisData2.title,
      data: [musicAnalsisData2.danceability, musicAnalsisData2.energy, musicAnalsisData2.liveness, musicAnalsisData2.valence, musicAnalsisData2.acousticness],
      backgroundColor: 'rgba(255, 255, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};
  return (
    <div>
      <Row>
        <h2 className='page-title'>Analysis of Two Music</h2>
      </Row>
      <Row className='inputmusic'>
        <Col>
          <InputGroup className="mb-3" onClick={ () => {
            handleShow()
          }}>
            <InputGroup.Text id="inputGroup-sizing-default">
              frist music
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder='Click here to Search Music'
              onClick={handleShow}
              disabled
              value={musicAnalsisData.title}
            />
          </InputGroup>
        </Col>
        <Col>
        <InputGroup className="mb-3" onClick={ () => {
            handleShow1()
          }}>
            <InputGroup.Text id="inputGroup-sizing-default">
              second music
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder='Click here to Search Music'
              disabled
              value={musicAnalsisData2.title}
            />
          </InputGroup>
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
          <Modal.Title>Search Frist Music</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search Music Name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="music"
                onChange={onChangeTitle}
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
                  <tr key={index} onClick={()=>clicklist(index)}>
                    <th><Form.Check type='checkbox'/></th>
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
          <Button variant="primary" onClick={ () => {
            handleClose()
            setSelectMusic(true)
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Search Second Music</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search Music Name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="music"
                onChange={onChangeTitle}
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
                  <tr key={index} onClick={()=>clicklist2(index)}>
                    <th><Form.Check type='checkbox'/></th>
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
          <Button variant="secondary"  onClick={ () => {
            handleClose1()
            setExistData(false)
        }}>
            Close
          </Button>
          <Button variant="primary" onClick={ () => {
            handleClose1()
            setSelectMusic(true)
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
