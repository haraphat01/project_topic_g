"use client"
import { useState } from 'react';
import Image from 'next/image'
import Replicate from 'replicate';
import axios from 'axios';

const systemPrompt = `"You are a helpful, respectful, and honest academic assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, false information, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.
If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information."`
const maxToken = 500
export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const PromptConstant = `Generate a comprehensive list of 10 project topics suitable for final-year students in the developing countries who major in ${inputValue}. Ensure that the topics align with students' interests and educational backgrounds. For each topic, provide a description and specify the primary research focus or questions that students should investigate while working on the topic.`

  const handleGenerate = async () => {
    const apiUrl = 'https://api.replicate.com/v1/predictions';
    const apiToken = process.env.REPLICATE_API_TOKEN;
    const modelVersion = 'de18b8b68ef78f4f52c87eb7e3a0244d18b45b3c67affef2d5055ddc9c2fb678';

    const requestBody = {
      version: modelVersion,
      input: {
        prompt: PromptConstant,
      },
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Token ${apiToken}`,
        },
      });

      const predictionId = response.data.id;
      setOutputValue(`Prediction ID: ${predictionId}`);

      // Fetch the prediction status and output
      const predictionUrl = `${apiUrl}/${predictionId}`;
      const predictionResponse = await axios.get(predictionUrl, {
        headers: {
          Authorization: `Token ${apiToken}`,
        },
      });

      const predictionStatus = predictionResponse.data.status;
      const predictionOutput = predictionResponse.data.output;

      setOutputValue(`${predictionOutput}`);
      `console.log(Prediction Output: ${ predictionOutput });`
    } catch (error) {
      console.error(error);
    }
  }
  console.log(outputValue)

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-2xl px-4 py-8 mx-auto">
        <h1 className="text-4xl font-bold text-center">Welcome to the Project Topic Generator!</h1>
        <p className="mt-4 text-lg text-center">Are you a final year student looking for project topic ideas? Look no further!</p>
        <p className="mt-4 text-lg text-center">Simply tell us your area of interest or academic discipline, and we'll generate a list of well-defined project topics tailored to your preferences. </p>
        <div className="mt-8">
          <Image src="/project-idea.png" alt="Project Idea" width={400} height={300} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold">How it works:</h2>
          <ul className="mt-4 list-disc list-inside">
            <li>Enter your area of study or interest</li>
            <li>Click the "Generate" button</li>
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