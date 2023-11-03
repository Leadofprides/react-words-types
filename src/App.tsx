import React, { useState } from 'react';
import axios from "axios";
import './App.css';

const API_URL = 'https://aapb8bse0c.execute-api.us-east-1.amazonaws.com/prod/words-types';

function App() {
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState('');
  const [cache, setCache] = useState('');

  const inputHandler = (e: any) => {
      setInputData(e.target.value);
  };

  const submitHandler = async () => {
      if (inputData !== cache) {
          setCache(inputData);
          try {
              const response = await axios.post(API_URL, {text: inputData}, {headers: {"Content-Type": "application/json"}});
              let formattedString = '';
              for (const key in response.data) {
                  formattedString += `${key}: ${response.data[key]}\n`;
              }
              setResult(formattedString);
          } catch (err) {
              console.log(err);
          }
      }
  };

  return (
    <div className="App">
        <h1>Input text</h1>
        <textarea onChange={inputHandler}></textarea>
        <h1>Results</h1>
        <textarea value={result} disabled={true}></textarea>
        <button onClick={submitHandler} className="button-27">Submit</button>
    </div>
  );
}

export default App;
