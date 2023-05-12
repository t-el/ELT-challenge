import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';


function FilesList() {

  const  fetchCsvFiles = async () => {
    const response = await axios.get('http://127.0.0.1:8000/csv-files/');
    return response.data;
  }

  const { data: files, isLoading, error, refetch } = useQuery('csvfiles', fetchCsvFiles);

  if(files){
    
    return (
        <>
            
             <h1>Files List </h1>
      
             {files.map((file) => (
               <li key={file.id}>
                 
                 <Link to={`/files/${file.id}`}>{file.name}</Link>
                 
               </li>
             ))}
             
          </>
          )
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



}

export default FilesList
