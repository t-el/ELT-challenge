import React from 'react'
import ReactDOM from 'react-dom/client'
import DragDropFiles from './components/DropableInputFile'
import FilesList from './components/FilesList'
import FileDet from './components/FileDet'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children  : [
      {
        path: "/upload",
        element: <DragDropFiles></DragDropFiles>
      },
      {
        path: "/files",
        element: <FilesList></FilesList>
      },

      {
        path: "/files/:id",
        element: <FileDet></FileDet>
      },
    ]
  },


]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <RouterProvider router={router} >
      
    </RouterProvider>
  </React.StrictMode>,
)
