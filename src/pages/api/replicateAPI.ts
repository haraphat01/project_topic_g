import Replicate from 'replicate';

if (typeof window !== 'undefined') {
  window.fetch = window.fetch.bind(window);
}

const systemPrompt = `"You are a helpful, respectful, and honest academic assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, false information, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.
If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information."`
const maxToken = 500

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN || 'default_token',
});

export const runModel = async (prompt: string) => {
  const output = await replicate.run(
    'meta/llama-2-13b-chat:de18b8b68ef78f4f52c87eb7e3a0244d18b45b3c67affef2d5055ddc9c2fb678',
    {
      input: {
        prompt: prompt,
        system_prompt: systemPrompt,
        max_new_tokens: maxToken
      },
    }
  );

  return output;
};

// };

// Inserted code starts here

// export const generatePrediction = async (prompt: string) => {
//   const REPLICATE_API_TOKEN = process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
//   const apiUrl = 'https://api.replicate.com/v1/predictions';
//   const version = 'f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d';

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Token ${REPLICATE_API_TOKEN}`
//     },
//     body: JSON.stringify({
//       version: version,
//       input: {
//         prompt: prompt
//       }
//     })
//   };

//   const response = await fetch(apiUrl, requestOptions);
//   const prediction = await response.json();

//   return prediction;
// };

// Inserted code ends here
export default runModel


