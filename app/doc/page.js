import ReactMarkdown from "react-markdown";

export default function Docs() {
  const page = `
  # The 6 components of a LLM prompt
  * Task
  * Context
  * Exemplar
  * Persona
  * Format
  * Tone
  
  ## Task
  The task is the main goal of the prompt. It is the primary objective that the model is trying to achieve. 
  The task should be as specific as possible to guide the model towards the desired output. 
  However, it should not be so specific that it limits the model’s ability to generate novel text.

  A Task is **mandatory**, because if you just pasted a CV document and didn't specifiy what should be done then the model would just return the CV document.

  ## Context
  The context is the information that the model uses to generate the output. In our experiments the CV document and Job description form the context

  Context is important but not mandatory. It can really help the model to get closer to what you want.

  ## Exemplar
  The exemplar is an example of the desired output. It is used to guide the model towards the desired output.
  Exemplar is also not mandatory but can tell the model how you want the output to look.
  Example:
  *"Use the STAR answer framework: Situation, Task, Action, Result"*

  You can also tell the model to reference an existing document. 
  For example:
  *"Please draft the CV document using known good CVs as a reference."*

  ## Persona
  The persona is the identity of the model, ie who do you want the model to be when asking it questions. 
  An example might be:
  *"You are a CTO at a tech company that wants to hire junior developers"*

  This builds on the context and allows the model to have a pespective on the task.
  You can reference real world people or fictional characters. 
  For example:
  * Write in the style of Shakespeare
  * You are Bill Gates and you want to hire a junior developer
  * You are Donald Trump reviewing my CV
  * As Batman suggest changes to my CV

  ## Format
  The format can help change how the output is returned. A common format is to return the output as markdown which will add headings and paragraphs.

  ## Tone
  The tone is the style of the prompt.

  Examples would be: 
  * use a formal tone of voice
  * use a casual tone
  * show enthusiasm for the role
  
  
  If its hard to think of suitable tone words to use a prompt to help with this. 
  Try running: 
  *"I am applying for my first developer job. I want to show enthusiasm for the role. Can you list 5 tone keywords to using in a prompt"*
  
  ### Result
  When showcasing enthusiasm for a developer job, these tone keywords can help convey your passion and eagerness:

  * **Passionate**: Emphasize your love for coding and how it's not just a job but a genuine interest and passion.
  * **Eager**: Show excitement and eagerness to contribute, learn, and grow within the role and the company.
  * **Enthusiastic**: Convey your enthusiasm for the specific technologies, projects, or challenges the role offers.
  * **Motivated**: Highlight your drive to make a meaningful impact, solve problems, and contribute positively to the team and projects.
  * **Inspired**: Share what inspires you about the company's mission, values, or the potential to innovate and create with the team.

  # Useful Links
  * A summary of the 6 important components of a LLM prompt [YouTube](https://www.youtube.com/watch?v=jC4v5AS4RIM)
  * [OpenAI Guide to Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
  * [What is a LLM by IBM 5 mins](https://www.youtube.com/watch?v=5sLYAQS9sWQ)
  * [FreeCodeCamp - Prompt Engineering Tutorial ~40 mins](https://www.youtube.com/watch?v=_ZvnD73m40o)
  
 
`;

  return <ReactMarkdown>{page}</ReactMarkdown>;
}
