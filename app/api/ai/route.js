import openai from "../../../lib/openAI";

export async function POST(request) {
  const body = await request.json();
  const { prompt, context, baseCV } = body;
  // console.log("request", prompt, context, baseCV);
  console.log("request", baseCV);

  const promptWithContext = `You will be provided with a cv document and a job description. Your task is to rewrite the document to match the job description and include addition information from the prompt. \n
                              return response in markdown format \n
                              CV document """${baseCV}"""\n
                              Job description """${context}"""\n
                              Prompt:${prompt}`;
  console.log("Start", Date.now().toString());
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: promptWithContext }],
    model: "gpt-3.5-turbo",
  });
  console.log("End", Date.now().toString());

  const theResponse = completion.choices[0].message;

  return Response.json({ output: theResponse }, { status: 200 });
}
