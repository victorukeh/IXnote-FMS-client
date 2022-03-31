/*eslint-disable*/
import { useState, useEffect } from 'react'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'
// nodejs library to set properties for components
import { PropTypes } from 'prop-types'
import {
  Button,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Badge,
} from 'reactstrap'
import { useDataLayerValue } from 'DataLayer'
import axios from 'axios'
import useWindowSize from './useWindowSize'
const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState()
  const [{ file, searchQuery, items }, dispatch] = useDataLayerValue()
  const size = useWindowSize()

  useEffect(() => {
    if (size.width > 784) {
      dispatch({
        type: 'SET_SEARCHQUERY',
        searchQuery: null,
      })
    }
  }, [size.width])

  useEffect(() => {
    if (collapseOpen === false) {
      dispatch({
        type: 'SET_SEARCHQUERY',
        searchQuery: null,
      })
    }
  }, [collapseOpen])
  const setFile = async (name) => {
    const response = await axios.get('http://localhost:2000/' + name)
    if (!response) return
    dispatch({
      type: 'SET_FILE',
      file: response.data[0],
    })
    console.log(file)
    dispatch({
      type: 'SET_ITEMS',
      items: [],
    })
    closeCollapse()
    dispatch({
      type: 'SET_WAIT',
      wait: true,
    })
  }

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data)
  }
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false)
  }
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName='active'
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      )
    })
  }

  const { bgColor, routes, logo } = props
  let navbarBrandProps
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    }
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank',
    }
  }

  return (
    <Navbar
      className='navbar-vertical fixed-left navbar-light bg-white'
      expand='md'
      id='sidenav-main'
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleCollapse}
        >
          <span className='navbar-toggler-icon' />
        </button>

        {/* Brand */}
        {logo ? (
          <NavbarBrand className='pt-0' {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className='navbar-brand-img'
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className='align-items-center d-md-none'>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className='align-items-center'>
                <span className='avatar avatar-sm rounded-circle'>
                  <img
                    alt='...'
                    src={require('../../assets/img/images/149071.png').default}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className='dropdown-menu-arrow' right>
              <DropdownItem className='noti-title' header tag='div'>
                <h6 className='text-overflow m-0'>Welcome!</h6>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className='navbar-collapse-header d-md-none'>
            <Row>
              {logo ? (
                <Col className='collapse-brand' xs='6'>
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className='collapse-close' xs='6'>
                <button
                  className='navbar-toggler'
                  type='button'
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className='mt-4 mb-3 d-md-none'>
            <InputGroup className='input-group-rounded input-group-merge'>
              <Input
                aria-label='Search'
                className='form-control-rounded form-control-prepended'
                placeholder='Search'
                type='search'
                name='s'
                onChange={(e) =>
                  dispatch({
                    type: 'SET_SEARCHQUERY',
                    searchQuery: e.target.value,
                  })
                }
              />
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <span className='fa fa-search' />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          {/* Divider */}
          <hr className='my-3' />
          {/* Heading */}
          {searchQuery === null && (
            <h6 className='navbar-heading text-muted'>Menu</h6>
          )}
          <Nav navbar>
            {size.width < 784 &&
              collapseOpen === true &&
              searchQuery &&
              items.slice(0, 5).map((item) => {
                if (!item) return
                return (
                  <>
                    <NavItem key={item._id}>
                      <NavLink
                        to='/admin/info'
                        tag={NavLinkRRD}
                        onClick={() => {
                          setFile(item.filename)
                          closeCollapse
                        }}
                      >
                        {item.filename}
                      </NavLink>
                    </NavItem>
                  </>
                )
              })}
            {searchQuery === null && createLinks(routes)}
          </Nav>

          {searchQuery === null && (
            <Nav className='mb-md-3' navbar>
              <NavItem>
                <NavLink
                  to='/logs/all'
                  tag={NavLinkRRD}
                  onClick={closeCollapse}
                  activeClassName='active'
                >
                  <i className='ni ni-compass-04 text-blue' />
                  logs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={NavLinkRRD}
                  className='nav-link'
                  id='RouterNavLink'
                  to='/admin/upload'
                >
                  <Button color='primary' type='button'>
                    <span>Upload File</span>
                    <Badge className='badge-white'>
                      <i className='ni ni-bold-up' />
                    </Badge>
                  </Button>
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Container>
    </Navbar>
  )
}

Sidebar.defaultProps = {
  routes: [{}],
}

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
}

export default Sidebar
