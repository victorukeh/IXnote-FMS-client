import Index from 'views/Index.js'
import Videos from 'views/examples/Videos.js'
import Audio from 'views/examples/Audio.js'
import Others from 'views/examples/Others.js'
import JS from 'views/examples/JsEcma.js'
import Pdf from 'views/examples/Pdfs'
import Microsoft from 'views/examples/Microsoft.js'

var routes = [
  {
    path: '/index',
    name: 'Images',
    icon: 'ni ni-album-2 text-blue',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/videos',
    name: 'Videos',
    icon: 'ni ni-tv-2  text-blue',
    component: Videos,
    layout: '/admin',
  },
  {
    path: '/audio',
    name: 'Audio',
    icon: 'ni ni-button-play text-blue',
    component: Audio,
    layout: '/admin',
  },
  {
    path: '/pdfs',
    name: 'PDFs',
    icon: 'ni ni-folder-17 text-blue',
    component: Pdf,
    layout: '/admin',
  },
  {
    path: '/docs',
    name: 'Microsoft Docs',
    icon: 'ni ni-books text-blue',
    component: Microsoft,
    layout: '/admin',
  },
  {
    path: '/jsecma',
    name: 'JS/Ecmascript',
    icon: 'ni ni-collection text-blue',
    component: JS,
    layout: '/admin',
  },
  {
    path: '/others',
    name: 'Others',
    icon: 'ni ni-ungroup text-blue',
    component: Others,
    layout: '/admin',
  },
]
export default routes
// ni ni-bag-17
