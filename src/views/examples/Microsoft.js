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
} from 'reactstrap'
import Header from 'components/Headers/Header.js'
import Spinner from '../examples/Spinner'
import axios from 'axios'

const Microsoft = (props) => {
  const [microsoftFiles, setMicrosoftFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  var day
  var sizeinMB
  let pageSize = 10
  let pagesCount = Math.ceil(microsoftFiles.length / pageSize)
  const handleClick = (e, index) => {
    e.preventDefault()
    setCurrentPage(index)
  }
  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    setLoading(true)
    const response = await axios.get('http://localhost:2000/docs')
    setLoading(false)
    if (response.data) setMicrosoftFiles(response.data)
  }
  
  const deleteFile = async(id, name) => {
    const stringId = JSON.stringify(id)
    const final = stringId.replace(/"/g, '')
    const DeleteFile = await axios.delete(
      'http://localhost:2000/docs/' + final
    )
    if (!DeleteFile) return
    setMicrosoftFiles(microsoftFiles.filter((microsoftFile) => microsoftFile._id !== id))
    const log = await axios.post(
      'http://localhost:2000/log?task=deleted&color=red&file=' + name
    )
    if (!log) return
  }

  const reverseDate = ({ microsoft }) => {
    let date = microsoft.uploadDate.split('T')[0]
    return date
  }

  const getSize = ({ microsoft }) => {
    let size = microsoft.length
    let newSize = size / 1000
    if (newSize > 1000) {
      sizeinMB = true
    } else {
      sizeinMB = false
    }
    return newSize.toFixed(2)
  }

  const splitTime = ({ microsoft }) => {
    let date = microsoft.uploadDate.split('T')[1]
    let time = date.split('.')[0]
    let hour = time.split(':')[0]
    let min = time.split(':')[1]
    let array = [JSON.stringify(parseInt(hour)+1) , min]
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
      <Header />
      {/* Page content */}
      {loading === true && <Spinner className='my-4' />}
      {loading === false && (
      <Container className='mt--9' fluid>
        <Row className='mt-5'>
          <div className='col'>
            <Card className='bg-default shadow'>
              <CardHeader className='bg-transparent border-0'>
                <h3 className='text-white mb-0'>All Identified microsoftFiles</h3>
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
                  {microsoftFiles.slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                      ).map((microsoft, i) => (
                    <tr key={microsoft._id}>
                      <th scope='row'>
                        <span className='mb-0 text-sm'>{i+1}</span>
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
                            {microsoft.filename}
                          </a>
                        </span>
                      </td>
                      <td>
                        {getSize({ microsoft })}{' '}
                        {sizeinMB === true ? (
                          <span
                            style={{ color: 'cyan' }}
                            className='mb-0 text-sm'
                          >
                            mb
                          </span>
                        ) : (
                          <span
                            style={{ color: 'cyan' }}
                            className='mb-0 text-sm'
                          >
                            kb
                          </span>
                        )}
                      </td>
                      <td>
                        <Badge color='' className='badge-dot mr-4'>
                          <i className='bg-success' />
                          {reverseDate({ microsoft })}
                        </Badge>
                      </td>
                      <td>
                        <Badge color='' className='badge-dot mr-4'>
                          <i className='bg-warning' />
                          {splitTime({ microsoft })} {day === true ? 'PM' : 'AM'}
                        </Badge>
                      </td>
                      <td>
                        <span className='mb-0 text-sm'>
                          {microsoft.contentType.split('/')[1]}
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
                          <DropdownMenu className='dropdown-menu-arrow' right>
                            <DropdownItem
                              href='#pablo'
                              onClick={(e) => e.preventDefault()}
                            >
                              Rename
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => deleteFile(microsoft._id, microsoft.filename)}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href={`http://localhost:2000/download/${microsoft.filename}`}
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
      </Container>
      )}
    </>
  )
}

export default Microsoft
