import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';


import './style.scss';

function MyDropzone({ imageUrl, onFileUploaded }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState(imageUrl);

  useEffect(() => {
    setSelectedFileUrl(imageUrl);
  }, [imageUrl])

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    }
    else {
      alert('Image type not supported.')
    }
  }, [onFileUploaded]);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: '.png, .jpg, .jpeg'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept=".png, .jpg, .jpeg" />
      
      { selectedFileUrl && <img src={selectedFileUrl} alt="Point thumbnail" /> }
      { !selectedFileUrl && <BsFillPersonFill id="standard-photo" /> }
      <div>
        <p>
          <FiUpload />
          Choose a file or drag it here
        </p>
      </div>
    </div>
  ) 
}

export default MyDropzone;