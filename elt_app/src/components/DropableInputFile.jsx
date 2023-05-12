import { useState, useRef } from "react"
import axios from "axios"
import {useMutation} from 'react-query'
import {useNavigate } from 'react-router-dom'

const DragDropFiles = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const inputRef = useRef();


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop =  (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0])
  };


 

  const CreateCsv =  async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }; 

    const response = await axios.post('http://127.0.0.1:8000/csv-files/',formData,config);
  
    return response.data;
  };


  const createCsvMutation = useMutation(CreateCsv, {
    onSuccess: () => {
      navigate('/files');
    },
});
  
  // send files to the server // learn from my other video
  const handleUpload =  async () => {
      createCsvMutation.mutate(file)
  };

  if (file) return (
    <div className="uploads card shadow">
        <h2>{file.name}</h2>
       
        <div className="actions">
            <button onClick={() => setFile(null)}>Cancel</button>
            
            <button onClick={handleUpload} type="submit" disabled={createCsvMutation.isLoading}>
              {createCsvMutation.isLoading ? 'Uplaoding...' : 'Uplaod'}
            </button>
        {createCsvMutation.isError && (
          <div>Error: {createCsvMutation.error.message}</div>
        )}
        </div>
        
    </div>
  )

  return (
    <>
        <div 
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
          <h1 Style="border:2px dotted grey ; padding :10px;" >Drag and Drop CSV to Upload</h1>
          <h1>Or</h1>
          <input 
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
            hidden
            accept=".csv"
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Select CSV</button>
        </div>
    </>
  );
};

export default DragDropFiles;