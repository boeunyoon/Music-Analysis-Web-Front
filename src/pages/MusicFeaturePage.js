import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, FormGroup, Input, Label } from 'reactstrap'
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FeatureRadarChart } from '../components/SearchFeatureChart/FeatureRadarChart';
import { FeatureBarChart } from '../components/SearchFeatureChart/FeatureBarChart';
import '../css/MusicFeaturePage.css'
const MusicFeaturePage = () => {
    const [acousticnessValue, setAcousticnessValue] = useState(50)
    const [danceabilityValue, setDanceabilityValue] = useState(50)
    const [energyValue, setEnergyValue] = useState(50)
    const [livenessValue, setLivenessValue] = useState(50)
    const [valenceValue, setValenceValue] = useState(50)
    const [speechinessValue, setSpeechinessValue] = useState(50)
    const [popularityValue, setPopularityValue] = useState(50)
    const [search, setSearch] = useState(false)
    const [searchData, setSearchData] = useState([{
      title:'',
      artist:'',
      acousticness:'',
      danceability:'',
      energy:'',
      liveness:'',
      loudness:'',
      valence:'',
      mode:'',
      speechiness:'',
      tempo:'',
      duration_ms:'',
      popularity:'',
    }])
    console.log('dance',danceabilityValue);
    console.log('energy', energyValue)
    let searchDataArray = []
    let searchfeature = async(e) => {
      setSearch(false)
      e.preventDefault()
      let response = await fetch('http://127.0.0.1:8000/spotify/get-approximation', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify([{
              "name": "acousticness", "input": acousticnessValue*0.01,
              "name": "danceability", "input":danceabilityValue*0.01 ,
              "name": "energy", "input": energyValue*0.01,
              "name": "liveness", "input": livenessValue*0.01,
              "name": "valence", "input": valenceValue*0.01,
              "name": "speechiness", "input": speechinessValue*0.01,
              //"name": "popularity", "input": popularityValue,
          }])
      })
      let data = await response.json()
      const obj = JSON.parse(data)
      for(let i = 0; i < 10; i++){
        searchDataArray.push(obj[i].fields)
      }
      if(response.status === 200){
        setSearchData(searchDataArray)
        console.log(searchData[0].valence)
        setSearch(true)
      }else{
          alert('Login fail')
      }
    }
  return (
    <div>
        <h2 className='feature-title'>Search Music by Feature</h2>
        <div className='search-wrapper'>
          <Row>
            <Col>
              <Label for='default-range'>acousticness</Label>
            </Col>
            <Col>
              <Input type='range' name='acousticness-range' id='acousticness-range' 
                value={acousticnessValue} 
                onChange={(e)=> setAcousticnessValue(e.target.value)} 
              />
            </Col>
            <Col>
              <Label>{acousticnessValue}</Label>
            </Col>
            <Col>
              <Label for='default-range'>danceability</Label>
            </Col>
            <Col>
              <Input type='range' name='danceability-range' id='danceability-range'                   
                value={danceabilityValue} 
                onChange={(e)=> setDanceabilityValue(e.target.value)} 
              />
            </Col>
            <Col>
              <Label>{danceabilityValue}</Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label for='default-range'>energy</Label>
            </Col>
            <Col>
              <Input type='range' name='energy-range' id='energy-range'                    
                value={energyValue} 
                onChange={(e)=> setEnergyValue(e.target.value)} 
              />
            </Col>
            <Col>
              <Label>{energyValue}</Label>
            </Col>
            <Col>
              <Label for='default-range'>liveness</Label>
            </Col>
            <Col>
              <Input type='range' name='liveness-range' id='liveness-range'                    
                value={livenessValue} 
                onChange={(e)=> setLivenessValue(e.target.value)} 
              />
            </Col>
            <Col>
              <Label>{livenessValue}</Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label for='default-range'>valence</Label>
            </Col>
            <Col>
              <Input type='range' name='valence-range' id='valence-range'                     
                value={valenceValue} 
                onChange={(e)=> setValenceValue(e.target.value)} 
              />
            </Col>
            <Col>
              <Label>{valenceValue}</Label>
            </Col>
            <Col>
              <Label for='default-range'>speechiness</Label>
            </Col>
            <Col>
              <Input type='range' name='speechiness-range' id='speechiness-range'                    
                value={speechinessValue} 
                onChange={(e)=> setSpeechinessValue(e.target.value)} 
              />
            </Col>
            <Col>
              <Label>{speechinessValue}</Label>
            </Col>
          </Row>
          <Row className="search-btn">
              <Button onClick={searchfeature}>Search</Button>
          </Row>
        </div>
        {search &&
          <div className='search-result'>
            <Accordion defaultActiveKey="0">
              {searchData.map((data, index) => (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>{data.title} - {data.artist}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col>
                        <FeatureRadarChart searchData={searchData} i={index}/>
                      </Col>
                      <Col>
                        <FeatureBarChart searchData={searchData} i = {index}/>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        }
    </div>
  )
}

export default MusicFeaturePage