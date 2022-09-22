import {
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
} from 'reactstrap'
import { useDataLayerValue } from 'DataLayer'
import { NavLink as NavLinkRRD } from 'react-router-dom'
import axios from 'axios'
import './searchbar.css'
const SearchBar = () => {
  const [{ posts, file }, dispatch] = useDataLayerValue()
  const setFile = async (name) => {
    const response = await axios.get('http://localhost:2000?filename=' + name)
    console.log(response)
    if (!response) return
    dispatch({
      type: 'SET_FILE',
      file: response.data.file[0],
    })
    console.log(file)
    dispatch({
      type: 'SET_POSTS',
      posts: [],
    })
    dispatch({
      type: 'SET_WAIT',
      wait: true,
    })
  }
  return (
    <div className='container__hold'>
      <Form className='navbar-search navbar-search-dark d-none d-md-flex w-100'>
        <FormGroup className='mb-0 form__group'>
          <InputGroup className='input-group-alternative'>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-search' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder='Search'
              type='text'
              name='s'
              onChange={(e) =>
                dispatch({
                  type: 'SET_QUERY',
                  query: e.target.value,
                })
              }
            />
          </InputGroup>
        </FormGroup>
      </Form>

      <Nav className='result__container bg-gradient-primary d-none d-md-flex'>
        <NavItem className='result'>
          {posts.slice(0, 7).map((post) => {
            return (
              <NavLink
                to='/admin/info'
                className='result__lists'
                tag={NavLinkRRD}
                onClick={() => setFile(post.filename)}
                key={post._id}
              >
                {post.filename}
              </NavLink>
            )
          })}
        </NavItem>
      </Nav>
    </div>
  )
}

export default SearchBar
