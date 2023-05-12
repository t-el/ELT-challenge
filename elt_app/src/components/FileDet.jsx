import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function FileDet() {

const [transformedfile,setTransformedFile] = useState(null)

  const { id } = useParams();

  const handleDragOver = (event) => {
        event.preventDefault();
    };

  const handleDrop =  async (event) => {
    event.preventDefault();
    let func = `df.sort_values(by='${document.getElementById('columns').value}', ascending=${document.getElementById('type').value == 'ascending'?'True':'False'})`
    const response = await axios.get('http://127.0.0.1:8000/csv-files/?func ='+func+'&id='+id);
    setTransformedFile(response.data) 
    };

  const  fetchCsvFile = async () => {
    const response = await axios.get('http://127.0.0.1:8000/csv-files/?id='+id);
    return response.data;
  }

  const  trasformFile = async (func) => {
    const response = await axios.get('http://127.0.0.1:8000/csv-files/?func ='+func+'&id='+id);
    return response.data;
  }

  const { data: file, isLoading, error, refetch } =  useQuery('csvfiles',  fetchCsvFile);
   

  if (isLoading) {
    return <div>Loading...</div>;
  }

  else if (error) {
    return <div>Error: {error.message}</div>;
  }
 else if (file){
  return (
    <>

       
        <h1>{file.file.name }</h1>

        <button draggable >Sort <select  id="columns">
        
            {file.columns.map((col) => (
               <option key={col} value={col}>{col}</option>
             ))}
            </select>
.
            <select  id="type">
                <option value="ascending">ascending</option>
                <option value="descending">descending</option>
            </select>
        </button>

        

        <div    onDragOver={handleDragOver}
                onDrop={handleDrop} 
                dangerouslySetInnerHTML={{ __html: file.csv }} />

<button disabled>OUTPUT</button>
{transformedfile?(<>
         
         <div    
                 dangerouslySetInnerHTML={{ __html: transformedfile.csv }} />
 
          </>):(<>
           ...
          </>)}
    
    </>
     
  );
}
  

}

export default FileDet
