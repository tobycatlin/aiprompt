import openai from "../../../lib/openAI";

export async function POST(request) {
  const body = await request.json();
  const { prompt, context, baseCV } = body;
  // console.log("request", prompt, context, baseCV);
  const promptWithContext = `Prompt:${prompt} \n
                              CV document """${baseCV}"""\n
                              Job description """${context}"""\n
                              return response in markdown format \n
                              `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: promptWithContext }],
    model: "gpt-3.5-turbo-1106",
  });

  const theResponse = completion.choices[0].message;

  return Response.json({ output: theResponse }, { status: 200 });
}

// export const config = {
//   type: "experimental-background",
// };
