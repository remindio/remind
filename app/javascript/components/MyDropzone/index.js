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
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      
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