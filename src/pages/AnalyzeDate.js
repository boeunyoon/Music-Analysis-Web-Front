import React, {useState, useEffect, useCallback} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker'
import Modal from 'react-bootstrap/Modal';
import {Barchart} from '../components/Barchart'
import { Barchart1 } from '../components/Barchart1';
import { Barchart2 } from '../components/Barchart2';
import '../css/AnalyzeDate.css'
import "react-datepicker/dist/react-datepicker.css"; 
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Select from 'react-select';
import { Barchart3 } from '../components/Barchart3';
import { PopularityChart } from '../components/PopularityChart';
import { EtcChart } from '../components/EtcChart';
import ToggleButton from 'react-bootstrap/ToggleButton';
const AnalyzeDate = () => {
    const keywordData = [
     { value: "2022-10", label: "2022-10" },
     {value:"Before COVID-19", label: "Before COVID-19"},
     {value:"After COVID-19", label: "After COVID-19"},
     {value:"2018-10", label: "2018-10"},
     {value:"2021-04", label: "2021-04"},
     {value:"2021-05", label: "2021-05"},
    ] 
    const [dateinput, setDateInput] = useState('')
    const [dateinput2, setDateInput2] = useState('')
    const [toggleChecked, setToggleChecked] = useState(false);
    const [toggleChecked1, setToggleChecked1] = useState(false);
    const [selectKeyword, setSelectKeyword] = useState(keywordData[0]);
    const [selectKeyword1, setSelectKeyword1] = useState(keywordData[0]);
    const [startDate2, setStartDate2] = useState(new Date());
    const [endDate2, setEndDate2] = useState(null);
    const [startDate1, setStartDate1] = useState(new Date());
    const [endDate1, setEndDate1] = useState(null);
    const [dateValue1, setDateValue1] = useState('')
    const [endDateValue1, setendDateValue1] = useState('')
    const [dateValue2, setDateValue2] = useState('')
    const [endDateValue2, setendDateValue2] = useState('')
    const [SelectDate, setSelectDate] = useState(false)
    const [SelectDate1, setSelectDate1] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [Loading1, setLoading1] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [SelectDateModal, setSelectDateModal] = useState(false)
    const [keyword, setKeyword] = useState()
    const [average, setAverage] = useState({
        acousticness:'',
        danceability:'',
        duration_ms:'',
        energy:'',
        instrumentalness:'',
        liveness:'',
        loudness:'',
        mode:'',
        popularity:'',
        speechiness:'',
        tempo:'',
        valence:''
    })
    const [average1, setAverage1] = useState({
        acousticness:'',
        danceability:'',
        duration_ms:'',
        energy:'',
        instrumentalness:'',
        liveness:'',
        loudness:'',
        mode:'',
        popularity:'',
        speechiness:'',
        tempo:'',
        valence:''
    })
      useEffect(() => {
        dateToString1(startDate1)
        dateToStringEnd1(endDate1)
        dateToString2(startDate2)
        dateToStringEnd2(endDate2)
        setDateInput(dateValue1+"~"+endDateValue1)
      },[startDate1, endDate1, startDate2, endDate2])
      let getAverage = async(e) => {
        //e.preventDefault()
        setLoading(true)
        let response = await fetch('http://127.0.0.1:8000/spotify/get-status-period', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                'start_date': dateValue2,
                'end_date': endDateValue2,
            }])
        })
        let data = await response.json()
        const obj = JSON.parse(data)
        console.log("1 average",obj.averge_status)
        setAverage(obj.averge_status)
        if(response.status === 200){
            console.log('1',average)
            setSelectDate(true)
            setTimeout(function() {
              setLoading(false)
            }, 1000);
        }else{
            alert('Login fail')
        }
      }
      let getAverage1 = async(e) => {
       // e.preventDefault()
        setLoading1(true)
        let response = await fetch('http://127.0.0.1:8000/spotify/get-status-period', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                'start_date': dateValue1,
                'end_date': endDateValue1,
            }])
        })
        let data = await response.json()
        const obj = JSON.parse(data)
        setAverage1(obj.averge_status)
        console.log('2',average1)
        if(response.status === 200){
            setSelectDate1(true)
            setTimeout(function() {
              setLoading1(false)
            }, 1000);
        }else{
            alert('Login fail')
        }
      }
      let getKeywordAverage = async(e) => {
        let response = await fetch('http://127.0.0.1:8000/spotify/get-status-keyword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                'keyword': selectKeyword.value
            }])
        })
        let data = await response.json()
        const obj = JSON.parse(data)
        console.log(obj)
        if(response.status === 200){
            setAverage(obj.averge_status)
            setSelectDate(true)
            //console.log(average)
            console.log('2',average)
            setTimeout(function() {
              setLoading(false)
              setendDateValue2('')
              console.log(selectKeyword.value)
            }, 1000);
        }else{
            alert('Login fail')
        }
      }
      console.log()
      let getKeywordAverage1 = async(e) => {
        let response = await fetch('http://127.0.0.1:8000/spotify/get-status-keyword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{
                'keyword': selectKeyword1.value
            }])
        })
        let data = await response.json()
        const obj = JSON.parse(data)
        console.log(obj)
        if(response.status === 200){
            setAverage1(obj.averge_status)
            setSelectDate1(true)
            console.log(average)
            setTimeout(function() {
              setLoading1(false)
              setendDateValue1('')
            }, 1000);
        }else{
            alert('Login fail')
        }
      }
      const dateToString1 = (date) => {
        setDateValue1(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
      }
      const dateToStringEnd1 = (date) => {
        if(date != null){
          setendDateValue1(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
          setDateInput(dateValue1+"~"+endDateValue1)
          console.log(dateinput)
        }
      }
      const dateToString2 = (date) => {
        setDateValue2(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
      }
      const dateToStringEnd2 = (date) => {
        if(date != null){
            setendDateValue2(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
            setDateInput2(dateValue2+"~"+endDateValue2)
        }
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
      const onChange = (dates) => {
        const [start2, end2] = dates;
        setStartDate2(start2);
        setEndDate2(end2);
      };
      const onChange1 = (dates) => {
        const [start1, end1] = dates;
        setStartDate1(start1);
        setEndDate1(end1);
      };
  return (
    <div>
        <h2 className='a-date-title'>Analysis by date</h2>
        <Row style={{marginBottom: '50px'}}>
            <Col xl={4} md={4}>
              <InputGroup className="mb-3" onClick={()=>{
                handleShow()
                setToggleChecked(false)
              }}>
                <InputGroup.Text id="inputGroup-sizing-default">
                  First Date
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Click here to search'
                  value= {toggleChecked ? selectKeyword.value : dateValue2+"~"+endDateValue2}
                />
              </InputGroup>
            </Col>
            <Col xl={1} md={1} style={{marginTop:'8px', marginLeft:'80px'}}><p>VS</p></Col>
            <Col xl={4} md={4}>
              <InputGroup className="mb-3" onClick={()=>{
                handleShow1()
                setToggleChecked1(false)
              }}>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Second Date
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Click here to search'
                  value={toggleChecked1 ? selectKeyword1.value : dateValue1+"~"+endDateValue1}
                />
              </InputGroup>
            </Col>
            <Col xl={2} md={2}>
              <Button onClick={() =>  {
                if(toggleChecked){
                  getKeywordAverage()
                  //setToggleChecked(false)
                  setDateValue2(selectKeyword.value)
                }else{
                  getAverage() 
                }
                if(toggleChecked1){
                  getKeywordAverage1()
                  //setToggleChecked1(false)
                  setDateValue1(selectKeyword1.value)
                }else{
                  getAverage1() 
                }
                
            }}>Submit</Button>
            </Col>
        </Row>
        {(Loading || Loading1) && <div style={{display : 'flex', justifyContent:'center', marginTop:'20%'}}>
           <Spinner animation="border" variant="primary" style={{width:'40px', height: '40px'}}/>
          </div>}
        {!Loading && !Loading1 && SelectDate && SelectDate1 &&
          <div>
            <Row className='chart-row'>
                <Col className='chart-wrapper'>
                    <Barchart 
                      averageData={average} 
                      averageData1={average1} 
                      dateval={dateValue2} 
                      endDateValue ={endDateValue2}
                      endDateValue1 = {endDateValue1}
                      dateval1={dateValue1} 
                      toggleChecked={toggleChecked}
                      toggleChecked1={toggleChecked1}
                      selectKeyword={selectKeyword}
                      selectKeyword1={selectKeyword1}
                    />
                    <h4 className='chart-name'>Valence Analysis Chart</h4>
                </Col>
                <Col className='chart-wrapper1'>
                    <Barchart1 
                      averageData={average} 
                      averageData1={average1} 
                      endDateValue ={endDateValue2}
                      endDateValue1 = {endDateValue1}
                      dateval={dateValue2} 
                      dateval1={dateValue1}
                      toggleChecked={toggleChecked}
                      toggleChecked1={toggleChecked1}
                      selectKeyword={selectKeyword}
                      selectKeyword1={selectKeyword1}
                    />
                    <h4 className='chart-name'>Tempo Analysis Chart</h4>
                </Col>
            </Row>
            <Row className='chart-row'>
                <Col className='chart-wrapper2'>
                    <Barchart2 
                      averageData={average} 
                      averageData1={average1} 
                      endDateValue ={endDateValue2}
                      endDateValue1 = {endDateValue1}
                      dateval={dateValue2} 
                      dateval1={dateValue1}
                      toggleChecked={toggleChecked}
                      toggleChecked1={toggleChecked1}
                      selectKeyword={selectKeyword}
                      selectKeyword1={selectKeyword1}
                  />
                    <h4 className='chart-name'>Analysis Chart</h4>
                </Col>
                <Col className='chart-wrapper3'>
                    <Barchart3 
                      averageData={average} 
                      averageData1={average1} 
                      endDateValue ={endDateValue2}
                      endDateValue1 = {endDateValue1}
                      dateval={dateValue2} 
                      dateval1={dateValue1}
                      toggleChecked={toggleChecked}
                      toggleChecked1={toggleChecked1}
                      selectKeyword={selectKeyword}
                      selectKeyword1={selectKeyword1}
                  />
                    <h4 className='chart-name'>Mode Analysis Chart</h4>
                </Col>
            </Row>
            <Row className='chart-row'>
                <Col className='chart-wrapper4'>
                    <PopularityChart 
                      averageData={average} 
                      averageData1={average1} 
                      endDateValue ={endDateValue2}
                      endDateValue1 = {endDateValue1}
                      dateval={dateValue2} 
                      dateval1={dateValue1}
                      toggleChecked={toggleChecked}
                      toggleChecked1={toggleChecked1}
                      selectKeyword={selectKeyword}
                      selectKeyword1={selectKeyword1}
                    />
                    <h4 className='chart-name'>Popularity Analysis Chart</h4>
                </Col>
                <Col className='chart-wrapper5'>
                    <EtcChart 
                      averageData={average} 
                      averageData1={average1} 
                      endDateValue ={endDateValue2}
                      endDateValue1 = {endDateValue1}
                      dateval={dateValue2} 
                      dateval1={dateValue1}
                      toggleChecked={toggleChecked}
                      toggleChecked1={toggleChecked1}
                      selectKeyword={selectKeyword}
                      selectKeyword1={selectKeyword1}
                    />
                    <h4 className='chart-name'>Analysis Chart</h4>
                </Col>
            </Row>
          </div>
        }

        {/* -------------------------------------------------------------------------------------------------------- */}


        
        <Modal show={show} onHide={handleClose} className='modal-container' size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Select Date & Keyword</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first" className='tab-wrraper'>
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item variant="secondary">
                    <Nav.Link eventKey="first">Date</Nav.Link>
                  </Nav.Item>
                  <Nav.Item variant="secondary">
                    <Nav.Link eventKey="second">Keyword</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                  <Row>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder={dateValue2}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder={endDateValue2}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='calender'>
                      <DatePicker
                        selected={startDate2}
                        onChange={onChange}
                        startDate={startDate2}
                        endDate={endDate2}
                        selectsRange
                        inline
                        dateFormat="yyyy-MM-dd"
                              dayClassName={date =>
                                getDayName(createDate(date)) === '토' ? "saturday"
                              :
                                getDayName(createDate(date)) === '일' ? "sunday" : undefined
                            }
                      />
                    </Col>
                  </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Row>
                      <Col lg='8'>
                        <Select options={keywordData}
                         onChange={setSelectKeyword}
                         isClearable
                         defaultValue={keywordData[0]} />
                      </Col>
                      <Col>
                        <ToggleButton
                          className="mb-2"
                          id="toggle-check"
                          type="checkbox"
                          variant="outline-primary"
                          checked={toggleChecked}
                          value="1"
                          onChange={(e) => setToggleChecked(e.currentTarget.checked)}
                        >
                          Select
                        </ToggleButton>
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ () => {
            handleClose()
            setSelectDateModal(true)
            setDateInput({dateValue2}+'~'+{endDateValue2})
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>




{/* -------------------------------------------------------------------------------------- */}




      <Modal show={show1} onHide={handleClose1} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Select Date & Keyword</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" className='tab-wrraper'>
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item variant="secondary">
                    <Nav.Link eventKey="first">Date</Nav.Link>
                  </Nav.Item>
                  <Nav.Item variant="secondary">
                    <Nav.Link eventKey="second">Keyword</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                  <Row>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder={dateValue1}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder={endDateValue1}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='calender'>
                      <DatePicker
                        selected={startDate1}
                        onChange={onChange1}
                        startDate={startDate1}
                        endDate={endDate1}
                        selectsRange
                        inline
                        dateFormat="yyyy-MM-dd"
                              dayClassName={date =>
                                getDayName(createDate(date)) === '토' ? "saturday"
                              :
                                getDayName(createDate(date)) === '일' ? "sunday" : undefined
                            }
                      />
                    </Col>
                  </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Row>
                      <Col lg='8'>
                        <Select options={keywordData}
                         onChange={setSelectKeyword1}
                         isClearable
                         defaultValue={keywordData[0]} />
                      </Col>
                      <Col>
                        <ToggleButton
                          className="mb-2"
                          id="toggle-check"
                          type="checkbox"
                          variant="outline-primary"
                          checked={toggleChecked1}
                          value="1"
                          onChange={(e) => setToggleChecked1(e.currentTarget.checked)}
                        >
                          Select
                        </ToggleButton>
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={ () => {
            handleClose1()
            setSelectDateModal(true)
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AnalyzeDate