require('dotenv').config();
import axios from 'axios';
// const flatted = require('flatted');
//   const generateChatCompletion = async (prompt: any, res: any) => {
    
//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//         body: {
//             model: 'gpt-3.5-turbo',
//             messages: [{ role: 'user', content: prompt }],
//             temperature: 0.7,
//           },
//         });
  
//       const data = await response.json();
//       res.status(200).json(data); // Send the response back to the client
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred' }); // Handle any errors and send an error response
//     }
//   };

  import { NextApiRequest, NextApiResponse } from 'next';                                                                                                                                 
                                                                                                                                                                                           
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {                                                                                                      
    const prompt = req.body.prompt;                                                                                                                                                       
                                                                                                                                                                                          
    const response = await fetch('https://api.openai.com/v1/chat/completions', {                                                                                         
      method: 'POST',                                                                                                                                                                     
      headers: {                                                                                                                                                                          
        'Content-Type': 'application/json',                                                                                                                                               
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`                                                                                                                           
      },                                                                                                                                                                                  
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',                                                                                                                                                            
        messages: [{ role: 'user', content: prompt }],                                                                                                                                                                           
        max_tokens: 1000                                                                                                                                                                    
      })                                                                                                                                                                                  
    });                                                                                                                                                                                   
                                                                                                                                                                                          
    const data = await response.json();                                                                                                                                                   
                                                                                                                                                                                          
    res.status(200).json(data.choices[0].message.content);                                                                                                                                                           
  }                                                                                                                                                                                       
                      
 
  // export default generateChatCompletion