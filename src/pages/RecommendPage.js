import React, {useState, useCallback} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import '../css/RecommendPage.css'
const RecommendPage = () => {
  const [music, setMusic] = useState('')
  const [existData, setExistData] = useState(false)
  const [existRecommendData, setExistRecommendData] = useState(false)
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
  const [trackId, setTrackId] = useState('')
  const [artistId, setArtistId] = useState('')
  const [recommendTitle, setRecommendTitle] = useState('')
  const [recommendArtist, setRecommendArtist] = useState('')
  const [recommendMusicData, setrecommendMusicData] = useState([{
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
  let recommendMusicArray = []
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
    if(response.status === 200){
      console.log(obj)
      setMusicData(musicArray)
      setExistData(true)
      setExistRecommendData(false)
    }else{
        alert('Login fail')
    }
  }
  let recommendMusic = async(e) => {

    let response = await fetch('http://127.0.0.1:8000/spotify/get-recommendation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          "track_id": trackId, 
          "artist_id": artistId, 
          "genre": "pop"
        }])
    })
    let data = await response.json()
    const obj = JSON.parse(data)
    for(let i = 0; i < 5; i++){
      recommendMusicArray.push(obj[i])
    }
    if(response.status === 200){
      console.log(obj)
      setrecommendMusicData(recommendMusicArray)
      setExistRecommendData(true)
    }else{
        alert('Login fail')
    }
  }
  const clicklist = index => {
    setArtistId(musicData[index].artist_id)
    setTrackId(musicData[index].track_id)
    setRecommendArtist(musicData[index].artist)
    setRecommendTitle(musicData[index].title)
    recommendMusic()
    console.log(artistId)
  };
  const onChangeTitle = useCallback((e) => {
    setMusic(e.target.value)
  },[]) 
  return (
    <div>
      <h2 className='recommend-title'>Recommendation Page</h2>
      <Row className='recommend-input'>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Music</InputGroup.Text>
            <Form.Control
              placeholder="Search music title"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={onChangeTitle}
            />
          </InputGroup>
        </Col>
        <Col>
          <Button variant="primary" onClick={searchMusic}>Search</Button>
        </Col>
      </Row>
      <Row>
        {existData && 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                </tr>
              </thead>
              <tbody>
                {musicData.map((data, index) => (
                  <tr 
                    key={index}
                    onClick={()=>clicklist(index)}
                  >
                    <th>{data.title}</th>
                    <th>{data.artist}</th>
                  </tr>
                ))}
              </tbody>
            </Table>
          }
      </Row>
      {existRecommendData &&
      <div>
      <Row>
        <h3 className='recommend-title'>Recommended music</h3>
        {/* <div className='recommend-musicinfo'>
          <h5>Title: </h5>
          <p style={{marginLeft: '10px'}}>{recommendTitle}</p> 
          <h5 style={{marginLeft: '10px'}}>Artist: </h5> 
          <p style={{marginLeft: '10px'}}>{recommendArtist}</p>
        </div> */}
        <Alert variant='primary' className='recommend-musicinfo'>
          <h5>Title: </h5>
          <p style={{marginLeft: '10px'}}>{recommendTitle}</p> 
          <h5 style={{marginLeft: '10px'}}>Artist: </h5> 
          <p style={{marginLeft: '10px'}}>{recommendArtist}</p>
        </Alert>
      </Row>
      <Row style={{marginTop: '30px'}}>
        <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {recommendMusicData.map((data, index) => (
                <tr key={index}>
                  <th>{data.title}</th>
                  <th>{data.artist}</th>
                </tr>
              ))}
            </tbody>
          </Table>
      </Row>
    </div>}
    </div>
  )
}

export default RecommendPage