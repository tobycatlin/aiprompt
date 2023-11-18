"use client";
import { useState, useEffect } from "react";

import { Typography, TextField, Grid, Paper } from "@mui/material";
import { useMutation } from "react-query";
import ReactMarkdown from "react-markdown";
import TabSet from "./components/TabSet";

// create a new page with a list of links
// promt eng in 8 mins
// https://www.youtube.com/watch?v=jC4v5AS4RIM&t=41s&ab_channel=JeffSu
// openai guide
// https://platform.openai.com/docs/guides/prompt-engineering
// const prompt = "write a haiku about a tree";
// const context = "in the style of Bart Simpson";

// codebase
// shakespeare - https://vercel.com/templates/next.js/shooketh
// nextjs router
// https://sdk.vercel.ai/docs/guides/frameworks/nextjs-app
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [document, setDocument] = useState("");
  const [context, setContext] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect();
  useEffect(() => {
    const storedContext = localStorage.getItem("context");
    const storedPrompt = localStorage.getItem("prompt");
    const storedDocument = localStorage.getItem("document");
    // const storedMessage = localStorage.getItem("message");
    console.log(storedDocument);
    if (storedContext) setContext(storedContext);
    if (storedPrompt) setPrompt(storedPrompt);
    if (storedDocument) setDocument(storedDocument);
    // if (storedMessage) setMessage(storedMessage);
  }, []);

  const textboxStyle = {
    height: "100%",
    // "& .MuiInputBase-root": {
    //   height: "100%",
    // },
  };

  // Handle posting text to api
  const postPrompt = async () => {
    setLoading(true);
    console.log(JSON.stringify({ prompt, context, document }));
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, context, document }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const handleSubmit = async () => {
    const message = await postPrompt();
    setMessage(message.output.content);
    localStorage.setItem("message", message.output.content);
    setLoading(false);
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.value);
    localStorage.setItem("document", e.target.value);
  };
  const handleContextChange = (e) => {
    setContext(e.target.value);
    localStorage.setItem("context", e.target.value);
  };
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    localStorage.setItem("prompt", e.target.value);
  };

  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      {/* First Column */}
      <Grid item xs={12} sm={6}>
        {loading ? <Typography>Loading...</Typography> : null}
        {loading ? null : <button onClick={handleSubmit}>Submit</button>}

        <Paper style={{ height: "50%", overflow: "auto" }}>
          <Typography>Result</Typography>
          <ReactMarkdown>{message}</ReactMarkdown>
        </Paper>
        <Paper style={{ height: "50%", overflow: "auto" }}>
          <Typography>CV Document</Typography>
          <TextField
            multiline
            variant="outlined"
            placeholder="Paste CV"
            fullWidth
            sx={textboxStyle}
            onChange={handleDocumentChange}
          />
        </Paper>
      </Grid>

      {/* Second Column */}
      <Grid item xs={12} sm={6}>
        <Paper style={{ height: "50%", overflow: "auto" }}>
          <Typography>Job Description</Typography>
          <TextField
            value={context}
            multiline
            variant="outlined"
            placeholder="Paste Job description"
            fullWidth
            sx={textboxStyle}
            onChange={handleContextChange}
          />
        </Paper>
        <Paper style={{ height: "50%" }}>
          <Typography>Prompt</Typography>
          <TextField
            value={prompt}
            multiline
            variant="outlined"
            placeholder="Prompt"
            fullWidth
            sx={textboxStyle}
            onChange={handlePromptChange}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
