






import React, { Component, useState } from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import './App.css'

import { addCsvAPI } from './services/allAPI';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}


function App() {
  const [tcData, setTcData] = useState({
    dob:"", admdate:""
  })
  const [dataFile, setDataFile] = useState("")

  


  const exportCSV = async()=>{
    
      const reqBody = new FormData()
      
      reqBody.append("file",dataFile)
      
        const reqHeader = {
          "Content-Type":"multipart/form-data"
        }
        console.log("proceed to API");

        try {
        const result = await addCsvAPI(reqBody, reqHeader)
        console.log(result);
        if(result.status===200){
          alert("added succefully")
        }else{
          alert(result.response.data)
        }
        } catch (error) {
          console.log(error);
        }
      
    
      }



  const formatData = (e)=>{
    let {value, name} = e.target
    var dataArray = value.split('-')
    var dataFormat = dataArray[2]+'-'+dataArray[1]+'-'+dataArray[0]
    setTcData({...tcData, [name]:dataFormat})
  }

  const generateDocument = () => {
    console.log(tcData);
    loadFile(
      '/src/input.docx',
      function (error, content) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          
        });
        doc.render(tcData);


        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); 
        saveAs(out, 'output.docx');

        


      }
    );
  };

  return (
    <>
       <div className="p-2">
        <label htmlFor="">Date of Birth</label>
        <input onChange={e=>formatData(e)} type="date" name="dob" id="" />
        <label htmlFor="">Name</label>
        <input onChange={e=>setTcData({...tcData,name:e.target.value})} type="text" name="" id="" />
        <label htmlFor="">Date of Admission</label>
        <input onChange={e=>formatData(e)} type="date" name="admdate" id="" />
        <button onClick={generateDocument} >Generate document</button>
        <input onChange={e=>setDataFile(e.target.files[0])} className='text-center' type="file" name="" id="" />      
        <button onClick={exportCSV} >Add CSV File</button>
      </div>
    </>
  )
}

export default App
