import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Input,
  Button,
} from 'reactstrap'
import { useDataLayerValue } from 'DataLayer'
import RegisterHeader from 'components/Headers/RegisterHeader.js'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Spinner from '../examples/Spinner'
import './alert.css'
import './rename.css'
const FileInfo = () => {
  const [{ file, wait }, dispatch] = useDataLayerValue()
  const [show, setShow] = useState(true)
  const [rename, setRename] = useState(false)
  const [message, setMessage] = useState('')
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [newFilename, setNewFilename] = useState('')
  const history = useHistory()
  var sizeinGB
  var day

  const setRenameOnClick = (id, name) => {
    setRename(true)
    setId(id)
    setName(name)
  }

  const renameFile = async () => {
    const response = await axios.put(
      `http://localhost:2000/edit?id=${id}&name=${newFilename}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (response === null) {
      setMessage('Something went wrong')
      displayMessage()
      return
    }
    setMessage('File updated successfully')
    loadFiles()
    displayMessage()
    setRename(false)
    const log = await axios.post(
      'http://localhost:2000/log?task=updated&color=brown&file=' + name
    )
    if (!log) return
  }

  const displayMessage = () => {
    const timer = setTimeout(() => {
      setShow(false)
      setMessage('')
    }, 4000)
    return () => clearTimeout(timer)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    renameFile()
  }

  const reverseDate = ({ file }) => {
    let date = file.uploadDate.split('T')[0]
    return date
  }

  const getSize = ({ file }) => {
    let size = file.length
    let newSize = size / 1000000
    if (newSize > 1000) {
      newSize = size / 1000000000
      sizeinGB = true
    } else {
      sizeinGB = false
    }
    return newSize.toFixed(2)
  }

  const splitTime = ({ file }) => {
    let date = file.uploadDate.split('T')[1]
    let time = date.split('.')[0]
    let hour = time.split(':')[0]
    let min = time.split(':')[1]
    let array = [JSON.stringify(parseInt(hour) + 1), min]
    let final = array.join(':')
    if (hour >= 12) {
      day = true
    } else {
      day = false
    }
    return final
  }

  const deleteFile = async (id, name) => {
    const stringId = JSON.stringify(id)
    const final = stringId.replace(/"/g, '')
    const DeleteFile = await axios.delete('http://localhost:2000/' + final)
    if (!DeleteFile) return
    history.push('/admin/index')
    const log = await axios.post(
      'http://localhost:2000/log?task=deleted&color=red&file=' + name
    )
    if (!log) return
  }

  const loadFiles = async () => {
    const response = await axios.get('http://localhost:2000/' + file.name)
    if (response.data) dispatch({ type: 'SET_FILE', file: response.data })
  }

  return (
    <>
      {show && message && (
        <div className='div'>
          <Alert color='success' className='alert'>
            <strong>Success!</strong> {message}
          </Alert>
        </div>
      )}
      <RegisterHeader />
      {/* Page content */}
      {wait === false && <Spinner className='my-4' />}
      {wait === true && (
        <Container
          style={{ display: 'flex', justifyContent: 'center' }}
          className='mt--7'
          fluid
        >
          <Col className='order-xl-1' xl='8'>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>File</h3>
                  </Col>
                  <Col className='text-right' xs='4'>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className='btn-icon-only text-light'
                        href='#pablo'
                        role='button'
                        size='sm'
                        color=''
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className='fas fa-ellipsis-v' />
                      </DropdownToggle>
                      <DropdownMenu className='dropdown-menu-arrow' right>
                        <DropdownItem
                          onClick={() =>
                            setRenameOnClick(file._id, file.filename)
                          }
                        >
                          Rename
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => deleteFile(file._id, file.filename)}
                        >
                          Delete
                        </DropdownItem>
                        <DropdownItem
                          href={`http://localhost:2000/download/${file.filename}`}
                        >
                          Download
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className='heading-small text-muted mb-4'>
                    File information
                  </h6>
                  <div className='pl-lg-4'>
                    <Row>
                      <Col lg='6'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-username'
                          >
                            Name
                          </label>
                          {newFilename ? (
                            <p>{newFilename}</p>
                          ) : (
                            <p>{file.filename}</p>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg='6'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-email'
                          >
                            Size
                          </label>
                          <p>
                            {getSize({ file })}{' '}
                            {sizeinGB === true ? (
                              <span className='mb-0 text-sm'>Gb</span>
                            ) : (
                              <span className='mb-0 text-sm'>mb</span>
                            )}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='6'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-first-name'
                          >
                            Upload Date
                          </label>

                          <p>{reverseDate({ file })}</p>
                        </FormGroup>
                      </Col>
                      <Col lg='6'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-last-name'
                          >
                            Upload Time
                          </label>
                          <p>
                            {splitTime({ file })} {day === true ? 'PM' : 'AM'}
                          </p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Container>
      )}
      {rename && (
        <div className='shadow rename'>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md='4'>
                <FormGroup>
                  <Input disabled placeholder={name} type='text' />
                </FormGroup>
              </Col>
              <Col md='4'>
                <FormGroup>
                  <Input
                    placeholder='new name'
                    type='text'
                    onChange={(e) => setNewFilename(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md='4'>
                <Button color='primary' type='submit' className='button'>
                  Rename
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </>
  )
}

export default FileInfo
