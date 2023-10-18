import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cvTable } from '../../database.config';
import { useSelector } from 'react-redux';

const FileUploadAndPdf = ({ children, screen }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { location } = useSelector((state) => state.common);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    try {
      const file = e.target.files[0];
      if (file && file.type === 'application/pdf') {
        setSelectedFile(file);
        storeFileInIndexedDB(file);
      } else {
        alert('Please select a valid PDF file.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const storeFileInIndexedDB = async (file) => {
    try {
      const pdfData = await readPdfAsArrayBuffer(file);
      if (pdfData) {
        await savePdfToDatabase(file.name, pdfData);
      }
    } catch (error) {
      console.error('Error storing PDF in IndexedDB:', error);
    }
  };

  const readPdfAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const savePdfToDatabase = async (name, pdfData) => {
    try {
      const id = await cvTable.add({ name, data: pdfData });
      console.log(`PDF with ID ${id} stored successfully in IndexedDB`);
      navigate(`/${location}/jobs-match`);
      window.location.reload();
    } catch (error) {
      console.error('Failed to store PDF in IndexedDB:', error);
    }
  };

  const visibilities = () => {
    if (screen === 'sm-home') {
      return 'hidden sm:flex justify-center items-center absolute left-0 right-0 bottom-[348px] z-20';
    } else if(screen === 'all-home') {
      return 'flex sm:hidden';
    }else{
      return 'flex';
    }
  };

  useEffect(() => {
    if (selectedFile) {
      localStorage.setItem('pdfName', selectedFile.name);
    }
    return () => {
      setSelectedFile(null);
    };
  }, [selectedFile]);

  return (
    <div>
      <div className={visibilities()}>
        <label className="bg-none w-none h-none">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          {children}
        </label>
      </div>
    </div>
  );
};

export default FileUploadAndPdf;
