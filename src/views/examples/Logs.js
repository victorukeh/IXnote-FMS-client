import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row } from 'reactstrap'
import './logs.css'
const Logs = () => {
  const [logs, setLogs] = useState([])
  useEffect(() => {
    getAllLogs()
  }, [])

  const getAllLogs = async() => {
    const response = await axios.get('http://localhost:2000/logs')
    if (!response) return
    setLogs(response.data.logs)
  }

  return (
    <>
      <Container className='log'>
        {logs.map((log) => {
          if (!log) return <h2> No Logs Yet</h2>
          return (
            <Row key={log._id} className='log__content'>
              <small style={{color: `${log.color}`}}>
                {log.createdAt}
              </small>
              <small style={{color: `${log.color}`}}>
                {log.Ip} {log.task} {log.file}
              </small>
            </Row>
          )
        })}
      </Container>
    </>
  )
}

export default Logs
