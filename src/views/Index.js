import React, { useState } from 'react'
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap'
import Photos from './examples/Photos'
import Header from 'components/Headers/Header.js'
import { useDataLayerValue } from '../DataLayer'

const Index = (props) => {
  const [{ photos }, dispatch] = useDataLayerValue()
  var i = 1
  const reverseDate = ({ photo }) => {
    let date = photo.uploadDate.split('T')[0]
    // let newDate = date.reverse()
    return date
  }
  var day
  const getSize = ({photo}) => {
    let size = photo.length
    let newSize = size/1000
    return newSize.toFixed(2)
  }
  const splitTime = ({ photo }) => {
    let date = photo.uploadDate.split('T')[1]
    let time = date.split('.')[0]
    let hour = time.split(':')[0]
    let min = time.split(':')[1]
    let array = [hour, min]
    let final = array.join(':')
    
    if(hour >= 12){
      day = true
    }
    else{
      day = false
    }
    return final
  }

  // console.log(photos[0]._id)
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--9' fluid>
        <Row className='mt-5'>
          <div className='col'>
            <Card className='bg-default shadow'>
              <CardHeader className='bg-transparent border-0'>
                <h3 className='text-white mb-0'>All Identified Images</h3>
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
                  {photos.map((photo) => (
                    <tr key={photo._id}>
                      <th scope='row'>
                        <span className='mb-0 text-sm'>{i++}</span>
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
                            {photo.filename}
                          </a>
                        </span>
                      </td>
                      <td>
                        {getSize({photo})} <span style={{color: 'cyan'}}className='mb-0 text-sm'>kb</span>
                      </td>
                      <td>
                      <Badge color='' className='badge-dot mr-4'>
                          <i className='bg-success' />
                          {reverseDate({ photo })}
                        </Badge>
                      </td>
                      <td>
                        <Badge color='' className='badge-dot mr-4'>
                          <i className='bg-warning' />
                          {splitTime({ photo })} {day === true ? "PM" : "AM"}
                        </Badge>
                      </td>
                      <td>
                        <span className='mb-0 text-sm'>
                          {photo.contentType.split('/')[1]}
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
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href='#pablo'
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href='#pablo'
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Index
