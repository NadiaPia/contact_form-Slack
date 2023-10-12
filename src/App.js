import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import secrets from './secrets.json';

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  async function submitForm(e) {
    e.preventDefault();
    const webHookURL = secrets.SECRET_URL;
    const data = {
      "text": `Name: ${name}; Email: ${email}; Message: ${message}`
    }
    
    //!!!!!!!!!!!!axios.post didn't work as my adBlock blocked this request. I inactivated this extantion!!!!!!!!!!!!!!!!!!!

    let res = await axios.post(webHookURL, JSON.stringify(data), {
      withCredentials: false,
      transformRequest: [(data, headers) => { //as axios has headers in default, we need delete it
        console.log("headers", headers)
        delete headers["Content-Type"] //delete headers.post["Content-Type"] doesn't work
        return data
      }]
    });

    if(res.status === 200) {
      alert("Message sent!");
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert("Error sending message.Try again!")
    };


  }
  return (
    <div className='flex'>
      <div className='w-1' />
      <div className='container mex-auto mt-5'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 self-center'>
          <label htmlFor='name' className='bloc text-gray-700 text-sm font-bold mt-2'>
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="message"
            type="message"
            placeholder="Write your message here"
            value={message}
            onChange={(e) => { setMessage(e.target.value) }}
          />

          <button
            className="mt-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={(e) => submitForm(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  );
}

export default App;
