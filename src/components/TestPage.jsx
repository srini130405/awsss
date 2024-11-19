import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import Question from './Question';
import { questions } from '../questions';
import { useNavigate,useParams } from 'react-router-dom';
import { getuser } from '../secret.cjs';
import cors from 'cors';
import './smthn.css';

function TestPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    'script.js': {
      name: 'script.js',
      language: 'javascript',
      value: `console.log('Hello from script.js');\nfunction press() { console.log('Button pressed'); }`,
    },
    'style.css': {
      name: 'style.css',
      language: 'css',
      value: `body { font-family: Arial, sans-serif; color: black;background-color: white }`,
    },
    'index.html': {
      name: 'index.html',
      language: 'html',
      value: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Login Form</h1>
  <button onclick="press()">Press here</button>
  <script src="script.js"></script>
</body>
</html>`,
    },
  });
  const [fileName, setFileName] = useState('index.html');
  const [html, setHtml] = useState(files['index.html'].value);
  const [css, setCss] = useState(files['style.css'].value);
  const [js, setJs] = useState(files['script.js'].value);
  const [score, setScore] = useState(null);

  const questionIndex = parseInt(taskId, 10) - 1;
  const selectedQuestion = questions[questionIndex];

  const handleEditorChange = (value) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileName]: {
        ...prevFiles[fileName],
        value,
      },
    }));
    if (fileName === 'index.html') setHtml(value);
    if (fileName === 'style.css') setCss(value);
    if (fileName === 'script.js') setJs(value);
  };

  const completeTest = async () => {
    try {
      const user_id = getuser();
      const resourcesUsed = JSON.parse(localStorage.getItem('studyMaterials')) || [];
      const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
      
      // Send test data
      const testResponse = await axios.post('http://localhost:5000/run-test', {
        html,
        css,
        js,
        validationScript: selectedQuestion.validationScript.toString(),
      });

      const testMessage = testResponse.data.message;
      const scoreMatch = testMessage.match(/(\d+)\s+points/);
      const scores = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
      setScore(scores);

      // Send feedback
      await axios.post('http://localhost:5000/submit-feedback', {
        user_id,
        test_id: taskId,
        resources_used: resourcesUsed,
        scores,
        ratings,
      });

      // Fetch recommendations
      const url = `http://flask-example-env-1.eba-3k7ftnxz.us-east-1.elasticbeanstalk.com/?test_id=101`;
      const fetchResponse = await fetch(url);
      if (!fetchResponse.ok) throw new Error('Network response was not ok');
      const recommendedData = await fetchResponse.json();

      // Navigate to the result page with data
      console.log(recommendedData,scores);
      navigate('/results', { state: { recommendedData, scores } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updatePreview = () => {
    const previewDiv = document.getElementById('preview-div');
    previewDiv.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    previewDiv.appendChild(iframe);

    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>`
    );
    iframeDocument.close();
  };

  useEffect(() => {
    updatePreview();
  }, [html, css, js]);

  return (
    <div class="bddd">
    <div style={{ display: 'flex', width: '1500px' }}>
      <div style={{ width: '200px', padding: '10px' }}>
        <button disabled={fileName === 'index.html'} onClick={() => setFileName('index.html')}>
          index.html
        </button>
        <button disabled={fileName === 'style.css'} onClick={() => setFileName('style.css')}>
          style.css
        </button>
        <button disabled={fileName === 'script.js'} onClick={() => setFileName('script.js')}>
          script.js
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <Question problem={selectedQuestion.problem} class="dd"/>
        <Editor
          height="70vh"
          theme="vs-dark"
          language={files[fileName].language}
          value={files[fileName].value}
          onChange={handleEditorChange}
        />
      </div>
      <div id="preview-div" style={{ flex: 1, border: '1px solid #ccc', marginLeft: '10px', height: '80vh', overflow: 'auto' }} />
      <br/>
      <div style={{marginTop:'750px',marginRight:'100px'}}>
        <button onClick={completeTest}>Complete Test</button>
      </div>
      {score !== null && <div>Score: {score}</div>}
    </div>
    </div>
  );
}

export default TestPage;