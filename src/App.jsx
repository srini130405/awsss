import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import Question from './Question';
import { questions } from './questions';

const initialFiles = {
  'script.js': {
    name: 'script.js',
    language: 'javascript',
    value: `console.log('Hello from script.js');
function press() { console.log('Button pressed'); }`,
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
};

function App() {
  const [files, setFiles] = useState(initialFiles);
  const [fileName, setFileName] = useState('index.html');
  const [html, setHtml] = useState(initialFiles['index.html'].value);
  const [css, setCss] = useState(initialFiles['style.css'].value);
  const [js, setJs] = useState(initialFiles['script.js'].value);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);

  const selectedQuestion = questions[currentQuestionIndex];
  const file = files[fileName];

  const handleEditorChange = (value) => {
    setFiles(prevFiles => ({
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
    const response = await axios.post('http://localhost:3000/run-test', {
      html,
      css,
      js,
      validationScript: selectedQuestion.validationScript.toString(),
    });
    
    // Set score based on response message
    const testMessage = response.data.message;
    const scoreMatch = testMessage.match(/(\d+)\s+points/);
    if (scoreMatch) {
      setScore(parseInt(scoreMatch[1], 10)); // Update score
    } else {
      setScore(0); // In case there's an error with the score
    }

    alert(testMessage); // Display message
  };

  // Submit test
  const submitTest = async () => {
    alert("Test Submitted! Please check the results for feedback.");
    // Implement the submit action (e.g., sending the code for final evaluation).
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetFilesForNextQuestion();
    } else {
      alert('No more questions!');
    }
  };

  const resetFilesForNextQuestion = () => {
    setFiles(initialFiles);
    setHtml(initialFiles['index.html'].value);
    setCss(initialFiles['style.css'].value);
    setJs(initialFiles['script.js'].value);
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
        <button disabled={fileName === 'index.html'} onClick={() => {
          setFileName('index.html');
          setHtml(files['index.html'].value);
        }}>
          index.html
        </button>
        <button disabled={fileName === 'style.css'} onClick={() => {
          setFileName('style.css');
          setCss(files['style.css'].value);
        }}>
          style.css
        </button>
        <button disabled={fileName === 'script.js'} onClick={() => {
          setFileName('script.js');
          setJs(files['script.js'].value);
        }}>
          script.js
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <Question problem={selectedQuestion.problem} />
        <Editor
          height="70vh"
          theme="vs-dark"
          language={file.language}
          value={file.value}
          onChange={handleEditorChange}
        />
      </div>
      <div id="preview-div" style={{ flex: 1, border: '1px solid #ccc', marginLeft: '10px', height: '80vh', overflow: 'auto' }} />
      <div>
        <button onClick={completeTest}>Complete Test</button>
        <button onClick={submitTest} style={{ marginLeft: '10px' }}>Submit Test</button>
        <button onClick={nextQuestion} style={{ marginLeft: '10px' }}>Next Question</button>
      </div>
      {score !== null && <div>Score: {score}</div>} {/* Display score */}
    </div>
  );
}

export default App;
