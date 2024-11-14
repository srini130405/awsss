import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import Question from './Question';
import { questions } from './questions';
import { useParams } from 'react-router-dom';
import { getuser } from './secret.cjs';



function TestPage() {
  const { taskId } = useParams();
  const [files, setFiles] = useState({
    'script.js': {
      name: 'script.js',
      language: 'javascript',
      value: `console.log('Hello from script.js');\nfunction press() { console.log('Button pressed'); }`,
    },
    'style.css': {
      name: 'style.css',
      language: 'css',
      value: `body { font-family: Arial, sans-serif; color: #333; }`,
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

  // Get the question based on the taskId
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

  // Run test and calculate score
  const completeTest = async () => {
    const response = await axios.post('http://localhost:5000/run-test', {
      html,
      css,
      js,
      validationScript: selectedQuestion.validationScript.toString(),
    });
    
    const testMessage = response.data.message;
    const scoreMatch = testMessage.match(/(\d+)\s+points/);
    const fsc=scoreMatch[1];
    if (scoreMatch) {
      setScore(parseInt(scoreMatch[1], 10));
    } else {
      setScore(0);
    }

    
    const user_id=getuser();
    // Retrieve resources used from local storage
    const resourcesUsed = JSON.parse(localStorage.getItem('studyMaterials')) || [];
    const ratings=JSON.parse(localStorage.getItem('ratings')) || [];
    // Assuming user_id and ratings are known or collected elsewhere

    console.log(resourcesUsed);
    console.log(ratings)
    console.log(fsc);
    console.log(taskId);
    console.log(user_id);
    const resp =await axios.post('http://localhost:5000/submit-feedback',{
        user_id,
        taskId,
        resourcesUsed,
        fsc,
        ratings

    });
    console.log(resp);
  };
  
  useEffect(() => {
    updatePreview();
  }, [html, css, js]);

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
      </html>
    `);
    iframeDocument.close();
  };

  return (
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
        <Question problem={selectedQuestion.problem} />
        <Editor
          height="70vh"
          theme="vs-dark"
          language={files[fileName].language}
          value={files[fileName].value}
          onChange={handleEditorChange}
        />
      </div>
      <div id="preview-div" style={{ flex: 1, border: '1px solid #ccc', marginLeft: '10px', height: '80vh', overflow: 'auto' }} />
      <div>
        <button onClick={completeTest}>Complete Test</button>
      </div>
      {score !== null && <div>Score: {score}</div>}
    </div>
  );
}

export default TestPage;
