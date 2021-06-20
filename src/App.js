
import Axios from 'axios';
import React,{useState,useEffect} from 'react';
import Tesseract from 'tesseract.js';
import './App.css';
import ImageWrapper from './components/ImageWrapper';
import TextWrapper from './components/TextWrapper';


// const loadData=async()=>{
//   const res=await Tesseract.recognize(
//     'https://tesseract.projectnaptha.com/img/eng_bw.png',
//     'eng',
//     { logger: m => console.log(m) }
//   );
//   console.log(res);
// }
// loadData();

export default function App() {

  const [imageUrl,setImageUrl]=useState();
  const [loading,setLoading]=useState(false);
  const [text, setText] = useState(null);

  const convertImageToText=async e =>{
    const res=await Tesseract.recognize(
     imageUrl,
      'eng',
      { logger: m => console.log(m) }
    );
    setText(res.data.text);
    setLoading(false);
  }

  const uploadFile= async e=>{
          setLoading(true);

          console.log(e.target.files[0]);
        
          const formData = new FormData();
          formData.append("image",
            e.target.files[0]
          );
          
          const config = {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          }
        
          const res=await Axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=c1d253ec927bded219f7079d4bb5fed1`, formData, config);
          console.log(res);
          setImageUrl(res.data.data.url);
        
        }

        useEffect(()=>{
          if(imageUrl != null){
            convertImageToText();
          }
        },[imageUrl])

  return (
    <div className="App">
           <img src="https://i.ibb.co/LpxDvR1/logo.png" className="logo" alt="" />
           <div className="container">
         {loading && <div className="loader"></div>}
                {text == null ? (
                <ImageWrapper loading={loading} uploadFile={uploadFile} />
                ) : (
                <TextWrapper text={text} />
                
                )}
       </div>
        </div>
  )
}
