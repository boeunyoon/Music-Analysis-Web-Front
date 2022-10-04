import React from 'react'
import { useParams } from 'react-router-dom';

const TestPage = () => {
    const {id}  = useParams();
    console.log({id})
  return (
    <div className="test">
      <p>현재 페이지의 파라미터는 { id } 입니다.</p>
    </div>
  )
}

export default TestPage