import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Link,Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

   
          <nav class="nav p-1">
            <a href=""><h1 className='p-1' Style="border-right:1px solid black;">ETL</h1></a>
            <Link to="/files">Files</Link>
            <Link to="/upload">Upload csv</Link>
           
          </nav>

          <div>
          <Outlet />
          </div>
          </QueryClientProvider>
    
     
  );
  

}

export default App
