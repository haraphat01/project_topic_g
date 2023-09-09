import Replicate from 'replicate';

// Bind fetch to the window object
window.fetch = window.fetch.bind(window);

const systemPrompt = `"You are a helpful, respectful, and honest academic assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, false information, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.
If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information."`
const maxToken = 500

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  
export const runModel = async (prompt: string) => {
  const output = await replicate.run(
    'meta/llama-2-13b-chat:de18b8b68ef78f4f52c87eb7e3a0244d18b45b3c67affef2d5055ddc9c2fb678',
    {
      input: {
        prompt: prompt,
      },
    }
  );

  return output;
};