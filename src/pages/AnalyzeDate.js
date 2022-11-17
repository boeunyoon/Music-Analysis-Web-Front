import React, {useState, useEffect} from 'react'
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
import { Barchart3 } from '../components/Barchart3';
const AnalyzeDate = () => {
    const [startDate2, setStartDate2] = useState(new Date());
    const [endDate2, setEndDate2] = useState(null);
    const [startDate1, setStartDate1] = useState(new Date());
    const [endDate1, setEndDate1] = useState(null);
    const [dateValue1, setDateValue1] = useState('')
    const [endDateValue1, setendDateValue1] = useState('')
    const [dateValue2, setDateValue2] = useState('')
    const [endDateValue2, setendDateValue2] = useState('')
    const [SelectDate, setSelectDate] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [SelectDateModal, setSelectDateModal] = useState(false)
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
      },[startDate1, endDate1, startDate2, endDate2])
      let getAverage = async(e) => {
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
        console.log(obj.averge_status)
        setAverage1(obj.averge_status)
        console.log('1',average)
        if(response.status === 200){
            console.log(obj)
            setSelectDate(true)
            setTimeout(function() {
              setLoading(false)
            }, 2000);
        }else{
            alert('Login fail')
        }
      }
      let getAverage1 = async(e) => {
        setLoading(true)
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
        setAverage(obj.averge_status)
        console.log('2',average1)
        if(response.status === 200){
            console.log(obj)
            setSelectDate(true)
            setTimeout(function() {
              setLoading(false)
            }, 2000);
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
        }
      }
      const dateToString2 = (date) => {
        setDateValue2(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
      }
      const dateToStringEnd2 = (date) => {
        if(date != null){
            setendDateValue2(date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'))
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
      console.log(dateValue1)
      console.log(endDateValue1)
      console.log(dateValue2)
      console.log(endDateValue2)
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
      console.log('start',startDate2)
      console.log('end',endDate2)
  return (
    <div>
        <h2 className='a-date-title'>Analysis by date</h2>
        <Row style={{marginBottom: '50px'}}>
            <Col xl={4} md={4}>
              <InputGroup className="mb-3" onClick={handleShow}>
                <InputGroup.Text id="inputGroup-sizing-default">
                  First Date
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Click here to search'
                  value={dateValue2+ '~'+ endDateValue2}
                />
              </InputGroup>
            </Col>
            <Col xl={1} md={1} style={{marginTop:'8px', marginLeft:'80px'}}><p>VS</p></Col>
            <Col xl={4} md={4}>
              <InputGroup className="mb-3" onClick={handleShow1}>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Second Date
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Click here to search'
                  value={dateValue1+ '~'+ endDateValue1}
                />
              </InputGroup>
            </Col>
            <Col xl={2} md={2}>
              <Button onClick={() =>  {
                getAverage() 
                getAverage1()
            }}>Submit</Button>
            </Col>
        </Row>
        {Loading && <div style={{display : 'flex', justifyContent:'center', marginTop:'30%'}}>
           <Spinner animation="border" variant="primary" style={{width:'40px', height: '40px'}}/>
          </div>}
        {!Loading && SelectDate &&
          <div>
            <Row className='chart-row'>
                <Col className='chart-wrapper'>
                    <Barchart averageData={average} averageData1={average1} dateval={dateValue2} dateval1={dateValue1}/>
                    <h4 className='chart-name'>Valence Analysis Chart</h4>
                </Col>
                <Col className='chart-wrapper1'>
                    <Barchart1 averageData={average} averageData1={average1}/>
                    <h4 className='chart-name'>Tempo Analysis Chart</h4>
                </Col>
            </Row>
            <Row className='chart-row'>
                <Col className='chart-wrapper2'>
                    <Barchart2 averageData={average} averageData1={average1} dateval={dateValue2} dateval1={dateValue1}/>
                    <h4 className='chart-name'>Analysis Chart</h4>
                </Col>
                <Col className='chart-wrapper3'>
                    <Barchart3 averageData={average} averageData1={average1}/>
                    <h4 className='chart-name'>Loudness Analysis Chart</h4>
                </Col>
            </Row>
            <Row className='chart-row'>
                <Col className='chart-wrapper4'>
                    <Barchart averageData={average} averageData1={average1}/>
                    <h4 className='chart-name'>Analysis Chart</h4>
                </Col>
                <Col className='chart-wrapper5'>
                    <Barchart averageData={average} averageData1={average1}/>
                    <h4 className='chart-name'>Analysis Chart</h4>
                </Col>
            </Row>
          </div>
        }
        <Modal show={show} onHide={handleClose} className='modal-container' size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
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
                    <Nav.Link eventKey="second">Key word</Nav.Link>
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
                    <div>aaaaaaa</div>
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
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <Row>
            <Col>
            <DatePicker
              className='modal-datepick'
              selected={startDate1}
              onChange={(date) => setStartDate1(date)}
              selectsStart
              startDate={startDate1}
              endDate={endDate1}
              dateFormat="yyyy-MM-dd"
                    dayClassName={date =>
                      getDayName(createDate(date)) === '토' ? "saturday"
                    :
                      getDayName(createDate(date)) === '일' ? "sunday" : undefined
                  }
            />
            </Col>
            <Col>
            <DatePicker
              className='modal-datepick'
              selected={endDate1}
              onChange={(date) => setEndDate1(date)}
              selectsEnd
              startDate={startDate1}
              endDate={endDate1}
              minDate={startDate1}
              dateFormat="yyyy-MM-dd"
                    dayClassName={date =>
                      getDayName(createDate(date)) === '토' ? "saturday"
                    :
                      getDayName(createDate(date)) === '일' ? "sunday" : undefined
                  }
            />
            </Col>
        </Row> */}
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" className='tab-wrraper'>
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item variant="secondary">
                    <Nav.Link eventKey="first">Date</Nav.Link>
                  </Nav.Item>
                  <Nav.Item variant="secondary">
                    <Nav.Link eventKey="second">Key word</Nav.Link>
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
                    <div>aaaaaaa</div>
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