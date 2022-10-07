import React, { useState} from 'react'
import axios from 'axios'
import { Container, Row, Card, CardHeader, Button, Alert } from 'reactstrap'
import Header from 'components/Headers/Header.js'
import './upload.css'
import './alert.css'

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(true)
  const displayMessage = () => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 4000)
    return () => clearTimeout(timer)
  }

  function onChangeHandler(event) {
    setSelectedFiles(event.target.files)
  }

  function onClickHandler() {
    for (const file of selectedFiles){
      setProgress(0)
    const data = new FormData()
    data.append('file', file)
    axios
      .post('http://localhost:2000/upload', data, {
        onUploadProgress: (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total))
        },
      })
      .then(async (res) => {
        setMessage('File Uploaded Successfully')
        displayMessage()
        setSelectedFiles(undefined)
        const log = await axios.post(
          'http://localhost:2000/log?task=uploaded&color=blue&file=' +
            file.name
        )
        if (!log) return
      })
      .catch(() => {
        setProgress(0)
        setMessage('Could not upload the file!')
        setSelectedFiles(undefined)
        displayMessage()
      })
    }
    
  }

  return (
    <>
      {show && message === 'File Uploaded Successfully' && (
        <div className='div'>
          <Alert color='success' className='alert'>
            <strong>Success!</strong> {message}
          </Alert>
        </div>
      )}

      {show && message === 'Could not upload the file!' && (
        <div className='div'>
          <Alert color='warning' className='alert'>
            <strong>Warning!</strong> {message}
          </Alert>
        </div>
      )}
      <Header />
      <Container className='mt--8' fluid>
        <Row className='mt-5'>
          <div className='col'>
            <Card className='bg-default shadow'>
              <CardHeader className='bg-transparent border-0'>
                <h3 className='text-white mb-0'>Upload File</h3>
              </CardHeader>
              <div className='container'>
                <div className='row justify-content-md-center h-100 '>
                  <div className='col-md-6'>
                    <form method='post' action='#' id='#'>
                      <div className='form-group files'>
                        <label>Upload Your File </label>
                        {selectedFiles && (
                          <div className='progress'>
                            <div
                              className='progress-bar progress-bar-info progress-bar-striped'
                              role='progressbar'
                              aria-valuenow={progress}
                              aria-valuemin='0'
                              aria-valuemax='100'
                              style={{ width: progress + '%' }}
                            >
                              {progress}%
                            </div>
                          </div>
                        )}
                        <input
                          type='file'
                          className='form-control'
                          name='file'
                          onChange={(event) => onChangeHandler(event)}
                          multiple
                        />
                        <br />
                      </div>
                      <Button
                        style={{ width: '100%' }}
                        color='success'
                        type='button'
                        onClick={onClickHandler}
                      >
                        Upload
                      </Button>
                    </form>
                    <br />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Upload
