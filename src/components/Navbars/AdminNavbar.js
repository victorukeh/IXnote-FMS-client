import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap'
import { useDataLayerValue } from 'DataLayer'
import axios from 'axios'
const AdminNavbar = (props) => {
  const [{ posts, searchQuery, query }, dispatch] = useDataLayerValue()

  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:2000/search?filename=${query}`
    )
    if (!response)
      return dispatch({
        type: 'SET_POSTS',
        posts: [],
      })
    if (query === '')
      return dispatch({
        type: 'SET_POSTS',
        posts: [],
      })
    dispatch({
      type: 'SET_POSTS',
      posts: response.data.files,
    })
  }, [query])

  useEffect(async() => {
    const response = await axios.get(
      `http://localhost:2000/search?filename=${searchQuery}`
    )
    if (!response)
      return dispatch({
        type: 'SET_ITEMS',
        items: [],
      })
    if (query === '')
      return dispatch({
        type: 'SET_ITEMS',
        items: [],
      })
    dispatch({
      type: 'SET_ITEMS',
      items: response.data,
    })
  }, [searchQuery])

  return (
    <>
      <Navbar className='navbar-top navbar-dark' expand='md' id='navbar-main'>
        <Container fluid>
          <Link
            className='h4 mb-0 text-white text-uppercase d-none d-lg-inline-block'
            to='/'
          >
            {props.brandText ? props.brandText : 'info'}
          </Link>
          <Searchbar />
          <Nav className='align-items-center d-none d-md-flex' navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className='pr-0' nav>
                <Media className='align-items-center'>
                  <span className='avatar avatar-sm rounded-circle'>
                    <img
                      alt='...'
                      src={
                        require('../../assets/img/images/149071.png').default
                      }
                    />
                  </span>
                  <Media className='ml-2 d-none d-lg-block'>
                    <span className='mb-0 text-sm font-weight-bold'>user</span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-arrow' right>
                <DropdownItem className='noti-title' header tag='div'>
                  <h6 className='text-overflow m-0'>Welcome!</h6>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
