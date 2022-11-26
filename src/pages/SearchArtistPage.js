import React, { useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import {Artistchart} from '../components/Artistchart'
import '../css/SearchArtist.css'
const SearchArtistPage = () => {
    const [searchArtist, setSearchArtist] = useState('')
    const [save, setSave] = useState(false)
    const [artistList, setArtistList] = useState([{
        name: '',
        followers: '',
        popularity: '',
        images: [],
        genre: []
    }])
    const [topTrackList, setTopTrackList] = useState([{
      title: '',
      danceability:'',
      energy:'',
      liveness:'',
      loudness:'',
      valence:'',
      speechiness : '',
      instrumentalness : '',
      tempo: '',
      duration_ms: '',
      popularity: '',
      acousticness:'',
    }])
    const [selectTopTrackList, setSelectTopTrackList] = useState([{
      title: '',
      danceability:'',
      energy:'',
      liveness:'',
      loudness:'',
      valence:'',
      speechiness : '',
      instrumentalness : '',
      tempo: '',
      duration_ms: '',
      popularity: '',
      acousticness:'',
    }])
    const [averageState, setAverageState] = useState([{
      danceability:'',
      energy:'',
      liveness:'',
      loudness:'',
      valence:'',
      speechiness : '',
      instrumentalness : '',
      tempo: '',
      duration_ms: '',
      popularity: '',
      acousticness:'',
    }])
    const [relatedArtists, setRelatedArtists] = useState([{
      name : '',
    }])
    const [artistg, setArtistg] = useState()
    const [artistImage, setArtistImage] = useState({})
    const [artistGenre, setArtistGenre] = useState()
    const [SelectRelation, setSelectRelation] = useState()
    const [SelectAverage,setSelectAverage] = useState([{
      danceability:'',
      energy:'',
      liveness:'',
      loudness:'',
      valence:'',
      speechiness : '',
      instrumentalness : '',
      tempo: '',
      duration_ms: '',
      popularity: '',
      acousticness:'',
    }])
    const [artistAnalysis, setArtistAnalysis] = useState({
        name: '',
        followers: '',
        popularity: '',
        genre: []
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let musicArray = []
    let musicArrayGenre =[]
    let musicArrayRelated = []
    let topTrackArray = []
    let selectArray = []
    let averageArray = []
    let searchArtistfunc = async(e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/spotify/search-artist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                'search': searchArtist,
            }])
        })
        let data = await response.json()
        const obj = JSON.parse(data)
        console.log(obj)
        for(let i = 0; i < 5; i++){
          musicArray.push(obj[i].artists)
          musicArrayGenre.push(obj[i].artists.genres)
          musicArrayRelated.push(obj[i].related_artists)
          topTrackArray.push(obj[i].top_tracks.items)
          averageArray.push(obj[i].top_tracks.average_status)
        }
        setRelatedArtists(musicArrayRelated)
        setArtistList(musicArray)
        setArtistg(musicArrayGenre)
        setTopTrackList(topTrackArray)
        setAverageState(averageArray)
        console.log(relatedArtists)
        console.log('art',artistList)
        console.log(topTrackList)
        console.log(obj)
        console.log(obj[0].top_tracks.average_status)
        console.log(averageState)
        if(response.status === 200){

        }else{
            alert('Login fail')
        }
      }
      const onChangeArtist = useCallback((e) => {
        setSearchArtist(e.target.value)
     },[]) 
     const clicklist = index => {
        setArtistAnalysis({
            name: artistList[index].name,
            followers: artistList[index].followers,
            popularity: artistList[index].popularity,
        })
        setArtistImage(artistList[index].images[0])
        setArtistGenre(artistg[index])
        setSelectRelation(relatedArtists[index])
        setSelectAverage(averageState[index])
        for(let i = 0; i < 5; i++){
          selectArray.push(topTrackList[index][i])
        }
        setSelectTopTrackList(selectArray)
        console.log(selectTopTrackList)
        console.log(SelectRelation)
        console.log(SelectAverage)
      };
      const labels = [
        'danceability',
        'energy',
        'liveness',
        'valence',
        'speechiness',
        'instrumentalness',
        //'tempo',
        //'duration_ms',
        //'popularity',
        'acousticness'
      ];
      const data = {
        labels,
        datasets: [
          {
            label: artistAnalysis.name,
            data: [
              SelectAverage.danceability*10,
              SelectAverage.energy*10,
              SelectAverage.liveness*10,
              SelectAverage.valence*10,
              SelectAverage.speechiness*10,
              SelectAverage.instrumentalness*10,
              SelectAverage.acousticness*10,
            ],
            backgroundColor: 'rgba(200, 205, 250, 0.5)',
            borderWidth: 1,
            barThickness: 80
          },
        ],
      };
  return (
    <div>
        <h2 className='artist-title'>Analysis Artist</h2>
        <Row className='artist-input'>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Artist</InputGroup.Text>
                <Form.Control
                  placeholder={artistAnalysis.name}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  disabled
                />
              </InputGroup>
            </Col>
            <Col>
              <Button onClick={ () => {
                handleShow()
                setSave(false)
              }}>Search</Button>
            </Col>
        </Row>
        {save &&
            <div>
              <Row className='artist-analysis'>
                <Col lg='3' md='12' sm='12' className='artist-card'>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={artistImage.url}/>
                    <Card.Body>
                      <Card.Title className='card-text'>{artistAnalysis.name}</Card.Title>
                      <Card.Text>
                        Popularity : {artistAnalysis.popularity}
                        <br/>
                        Followers : {artistAnalysis.followers}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg='8' md='12' sm='12'>
                    <Alert variant='primary' className='genre-style'>
                      <h4>Genre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                      {artistGenre.map((data, index) => (
                        <p key={index}>{data}&nbsp;&nbsp;&nbsp;</p>
                      ))}
                    </Alert>
                  <h4 className='artisttoptrack-title'>Artist top tracks</h4>
                  <Table striped bordered hover className='toptrack-table'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Artist name</th>
                        <th>Popularity</th>
                        <th>Tempo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectTopTrackList.map((data, index) => (
                         <tr 
                           key={index} 
                         >
                           <th>{index +1}</th>
                           <th>{data.title}</th>
                           <th>{data.popularity}</th>
                           <th>{parseInt(data.tempo)}</th>
                         </tr>
                       ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <h4 className='artistchart-title' style={{marginTop: '20px'}}>Artist average features</h4>
                <Artistchart dataset= {data}/>
              </Row>
              <Row className="relationartist-wrapper">
                <h4>Related Artists</h4>
              </Row>
              <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Artist name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SelectRelation.map((data, index) => (
                       <tr 
                         key={index} 
                       >
                         <th>{index +1}</th>
                         <th>{data.name}</th>
                       </tr>
                     ))}
                  </tbody>
                </Table>
              </Row>
            </div>
        }


        {/* ------------------------------------------------------------ */}


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg='9'>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Artist</InputGroup.Text>
                  <Form.Control
                    placeholder="Search Artist"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={onChangeArtist}
                  />
                </InputGroup>
              </Col>
              <Col lg='3'>
                <Button onClick={searchArtistfunc}>Search</Button>
              </Col>
            </Row>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Artist name</th>
                  </tr>
                </thead>
                <tbody>
                  {artistList.map((data, index) => (
                     <tr 
                       key={index} 
                       onClick={()=>clicklist(index)}
                     >
                       <th>{index +1}</th>
                       <th>{data.name}</th>
                     </tr>
                   ))}
                </tbody>
              </Table>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" 
              onClick = { ()=> {
                handleClose()
                setSave(true)
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default SearchArtistPage