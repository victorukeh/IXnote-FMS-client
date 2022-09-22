import React, { useState, useEffect } from 'react'
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Alert,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap'
import Header from 'components/Headers/Header.js'
import Spinner from '../examples/Spinner'
import axios from 'axios'
import './alert.css'

const Audio = (props) => {
  const [audios, setAudios] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(true)
  const [rename, setRename] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [newFilename, setNewFilename] = useState('')
  var day
  var sizeinGB
  let pageSize = 10
  let pagesCount = Math.ceil(audios.length / pageSize)

  const setRenameOnClick = (id, name) => {
    setRename(true)
    setId(id)
    setName(name)
  }

  const renameFile = async () => {
    const response = await axios.put(
      `http://localhost:2000/edit?oldFilename=${name}&newFilename=${newFilename}`,
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
    loadFiles()
    setMessage('Audio updated successfully')
    displayMessage()
    setRename(false)
    const log = await axios.post(
      'http://localhost:2000/log?task=updated&color=brown&file=' + name
    )
    if (!log) return
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    renameFile()
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const displayMessage = () => {
    const timer = setTimeout(() => {
      setShow(false)
      setMessage('')
    }, 2500)
    return () => clearTimeout(timer)
  }

  const handleClick = (e, index) => {
    e.preventDefault()
    setCurrentPage(index)
  }

  const loadFiles = async () => {
    setLoading(true)
    const response = await axios.get('http://localhost:2000/audio')
    setLoading(false)
    if (response.data) setAudios(response.data.files)
  }

  const deleteFile = async (id, name) => {
    const DeleteFile = await axios.delete(
      `http://localhost:2000/delete?filename=${name}`
    )
    if (!DeleteFile) return
    setAudios(audios.filter((audio) => audio._id !== id))
    setMessage('Audio File has been deleted')
    const log = await axios.post(
      'http://localhost:2000/log?task=deleted&color=red&file=' + name
    )
    if (!log) return
  }

  const reverseDate = ({ audio }) => {
    let date = audio.createdAt.split('T')[0]
    return date
  }

  const getSize = ({ audio }) => {
    let size = audio.size
    let newSize = size / 1000000
    if (newSize > 1000) {
      newSize = size / 1000000000
      sizeinGB = true
    } else {
      sizeinGB = false
    }
    return newSize.toFixed(2)
  }

  const splitTime = ({ audio }) => {
    let date = audio.createdAt.split('T')[1]
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

  return (
    <>
      {show && message === 'Audio has been deleted' && (
        <div className='div'>
          <Alert color='success' className='alert'>
            <strong>Success!</strong> {message}
          </Alert>
        </div>
      )}
      {show && message === 'Audio updated successfully' && (
        <div className='div'>
          <Alert color='success' className='alert'>
            <strong>Success!</strong> {message}
          </Alert>
        </div>
      )}

      {show && message === 'Something went wrong' && (
        <div className='div'>
          <Alert color='warning' className='alert'>
            <strong>Warning!</strong> {message}
          </Alert>
        </div>
      )}
      <Header />
      {/* Page content */}
      {loading === true && <Spinner className='my-4' />}
      {loading === false && (
        <Container className='mt--9' fluid>
          <Row className='mt-5'>
            <div className='col'>
              <Card className='bg-default shadow'>
                <CardHeader className='bg-transparent border-0'>
                  <h3 className='text-white mb-0'>Music, Recordings and ...</h3>
                </CardHeader>
                <Table
                  className='align-items-center table-dark table-flush'
                  responsive
                >
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>S/N</th>
                      <th scope='col'>Image</th>
                      <th scope='col'>Size</th>
                      <th scope='col'>Date Uploaded</th>
                      <th scope='col'>Time Uploaded</th>
                      <th scope='col'>Type</th>
                      <th scope='col' />
                    </tr>
                  </thead>
                  <tbody>
                    {audios
                      .slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                      )
                      .map((audio, i) => (
                        <tr key={audio._id}>
                          <th scope='row'>
                            <span className='mb-0 text-sm'>{i + 1}</span>
                          </th>
                          <td>
                            <span
                              className='mb-0 text-sm'
                              style={{ cursor: 'pointer' }}
                            >
                              <a
                                style={{ color: 'white' }}
                                className=''
                                href='#pablo'
                                id='tooltip742438047'
                                onClick={(e) => e.preventDefault()}
                              >
                                {audio.filename}
                              </a>
                            </span>
                          </td>
                          <td>
                            {getSize({ audio })}{' '}
                            {sizeinGB === true ? (
                              <span
                                style={{ color: 'cyan' }}
                                className='mb-0 text-sm'
                              >
                                Gb
                              </span>
                            ) : (
                              <span
                                style={{ color: 'cyan' }}
                                className='mb-0 text-sm'
                              >
                                mb
                              </span>
                            )}
                          </td>
                          <td>
                            <Badge color='' className='badge-dot mr-4'>
                              <i className='bg-success' />
                              {reverseDate({ audio })}
                            </Badge>
                          </td>
                          <td>
                            <Badge color='' className='badge-dot mr-4'>
                              <i className='bg-warning' />
                              {splitTime({ audio })}{' '}
                              {day === true ? 'PM' : 'AM'}
                            </Badge>
                          </td>
                          <td>
                            <span className='mb-0 text-sm'>
                              {audio.type.split('/')[1]}
                            </span>
                          </td>
                          <td className='text-right'>
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
                              <DropdownMenu
                                className='dropdown-menu-arrow'
                                right
                              >
                                <DropdownItem
                                  href='#pablo'
                                  onClick={() =>
                                    setRenameOnClick(audio._id, audio.filename)
                                  }
                                >
                                  Rename
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    deleteFile(audio._id, audio.filename)
                                  }
                                >
                                  Delete
                                </DropdownItem>
                                <DropdownItem
                                  href={`http://localhost:2000/download/${audio.filename}`}
                                >
                                  Download
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <CardFooter className='bg-default py-4'>
                  <nav aria-label='...'>
                    <Pagination
                      className='pagination justify-content-end mb-0'
                      listClassName='justify-content-end mb-0'
                    >
                      <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink
                          href='#pablo'
                          onClick={(e) => handleClick(e, currentPage - 1)}
                        >
                          <i className='fas fa-angle-left' />
                          <span className='sr-only'>Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {[...Array(pagesCount)].map((page, i) => (
                        <PaginationItem active={i === currentPage} key={i}>
                          <PaginationLink
                            onClick={(e) => handleClick(e, i)}
                            href='#'
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem disabled={currentPage >= pagesCount - 1}>
                        <PaginationLink
                          href='#pablo'
                          onClick={(e) => handleClick(e, currentPage + 1)}
                        >
                          <i className='fas fa-angle-right' />
                          <span className='sr-only'>Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          {rename && (
            <div className='bg-default shadow rename'>
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
        </Container>
      )}
    </>
  )
}

export default Audio
