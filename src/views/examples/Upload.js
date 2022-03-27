import React, { useState } from 'react'
import axios from 'axios'
import { Container, Row, Card, CardHeader, Button } from 'reactstrap'
import Header from 'components/Headers/Header.js'
import './upload.css'

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  console.log(message)

  function onChangeHandler(event) {
    setSelectedFile(event.target.files[0])
  }

  function onClickHandler() {
    setProgress(0)
    const data = new FormData()
    data.append('file', selectedFile)
    axios
      .post('http://localhost:2000/upload', data, {
        onUploadProgress: (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total))
        },
      })
      .then(async (res) => {
        console.log(selectedFile)
        setMessage('File Uploaded Successfully')
        const log = await axios.post(
          'http://localhost:2000/log?task=uploaded&color=blue&file=' +
            selectedFile.name
        )
        if (!log) return
      })
      .catch(() => {
        setProgress(0)
        setMessage('Could not upload the file!')
        setSelectedFile(undefined)
      })
  }

  return (
    <>
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
                        {selectedFile && (
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
