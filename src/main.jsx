import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookmarkProvider } from './Context.jsx'
createRoot(document.getElementById('root')).render(
    <BookmarkProvider>
    <App/>
    </BookmarkProvider>
)
