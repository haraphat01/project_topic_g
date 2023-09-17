"use client"
import { useState } from 'react';
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import axios from 'axios';

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const PromptConstant = `Generate a comprehensive list of 10 project topics suitable for final-year students in the developing countries who major in ${inputValue}. Ensure that the topics align with students' interests and educational backgrounds. For each topic, provide a description and specify the primary research focus or questions that students should investigate while working on the topic. You can also provide academic references from google scholar`
  const paragraphs = outputValue.split('\n');

  const handleGenerate = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/openAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: PromptConstant })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOutputValue(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false after the API request is complete
    }
    
  }


  return (
    <main className="flex flex-col items-center justify-center">
      <div className="max-w-2xl px-4 py-8 mx-auto">
        <h1 className="text-4xl font-bold text-center">Project Topics Generator!</h1>
        <p className="mt-4 text-lg text-center">Looking for a research title generator? Try this tool! It can make a research topic or question for your proposal, essay, or any other project. 100% free, no registration required.</p>
        <p className="mt-4 text-lg text-center">Are you a final year student looking for project topic ideas? Look no further!</p>
        <p className="mt-4 text-lg text-center">Simply tell us your area of interest or academic discipline, and we&apos;ll generate a list of well-defined project topics tailored to your preferences. </p>
        <div className="mt-8  text-center">
          <Image src="/project-idea.png" alt="Project Topics Generator - Generate Research Project Topics" width={400} height={300} loading="lazy" />
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold">How it works:</h1>
          <ul className="mt-4 list-disc list-inside">
            <li>Enter your area of study or interest</li>
            <li>Click the &quot;Generate&quot; button</li>
            <li>Get a list of project topic ideas tailored to your field</li>
          </ul>
        </div>
        <div className="mt-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your discipline"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleGenerate}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Generate
          </button>
          {isLoading && <p>Your topics are being generated</p>}
        </div>
        <div className="response-container">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="my-4">
              {paragraph}
              
            </p>
          ))}
        </div>

      </div>
    </main>
  )
}

