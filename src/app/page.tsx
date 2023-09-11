"use client"
import { useState } from 'react';
import Image from 'next/image'
import { runModel } from './api/replicateAPI';
import axios from 'axios';


export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const PromptConstant = `Generate a comprehensive list of 10 project topics suitable for final-year students in the developing countries who major in ${inputValue}. Ensure that the topics align with students' interests and educational backgrounds. For each topic, provide a description and specify the primary research focus or questions that students should investigate while working on the topic.`

  const handleGenerate = async () => {
    try {
      const output = await runModel(PromptConstant);
      setOutputValue(JSON.stringify(output));
      console.log(`Prediction Output: ${JSON.stringify(output)}`);
    } catch (error) {
      console.error(error);
    }

  }
 
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-2xl px-4 py-8 mx-auto">
        <h1 className="text-4xl font-bold text-center">Welcome to the Project Topic Generator!</h1>
        <p className="mt-4 text-lg text-center">Are you a final year student looking for project topic ideas? Look no further!</p>
        <p className="mt-4 text-lg text-center">Simply tell us your area of interest or academic discipline, and we&apos;ll generate a list of well-defined project topics tailored to your preferences. </p>
        <div className="mt-8">
          <Image src="/project-idea.png" alt="Project Idea" width={400} height={300} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold">How it works:</h2>
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
        </div>
        {outputValue && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Generated Output:</h2>
            <p>{outputValue}</p>
          </div>
        )}

      </div>
    </main>
  )
}