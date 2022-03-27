import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row } from 'reactstrap'
const Logs = () => {
  const [logs, setLogs] = useState([])
  console.log(logs)

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
      <Container style={{paddingTop: '4vh'}}>
        {/* <div style={{marginTop: '14%'}}></div> */}
        <br></br>
        {logs.map((log) => {
          if (!log) return <h2> No Logs Yet</h2>
          return (
            <Row key={log._id} style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '3%', marginRight: '3%'}}>
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
