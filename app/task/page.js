"use client";
import { useState, useEffect } from "react";

import { Box, Typography, TextField, Grid, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";
import TabSet from "../components/TabSet";
import Button from "@mui/material/Button";

export default function Task() {
  const [prompt, setPrompt] = useState("");
  const [baseCV, setBaseCV] = useState("");
  const [context, setContext] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect();
  useEffect(() => {
    const storedContext = localStorage.getItem("context");
    const storedPrompt = localStorage.getItem("prompt");
    const storedBaseCV = localStorage.getItem("baseCV");
    // const storedMessage = localStorage.getItem("message");

    if (storedContext) setContext(storedContext);
    if (storedPrompt) setPrompt(storedPrompt);
    if (storedBaseCV) setBaseCV(storedBaseCV);
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
    // console.log(JSON.stringify({ prompt, context, baseCV }));
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, context, baseCV }),
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
    setBaseCV(e.target.value);
    localStorage.setItem("baseCV", e.target.value);
  };
  const handleContextChange = (e) => {
    setContext(e.target.value);
    localStorage.setItem("context", e.target.value);
  };
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    localStorage.setItem("prompt", e.target.value);
  };

  const tabs = [
    {
      label: "CV",
      component: (
        <>
          <TextField
            value={baseCV}
            multiline
            variant="outlined"
            placeholder="Paste CV"
            fullWidth
            sx={textboxStyle}
            onChange={handleDocumentChange}
          />
        </>
      ),
    },
    {
      label: "Job Description",
      component: (
        <>
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
          <Typography>Description</Typography>
          <TextField
            value={context}
            multiline
            variant="outlined"
            placeholder="Paste Job description"
            fullWidth
            sx={textboxStyle}
            onChange={handleContextChange}
          />
        </>
      ),
    },
    {
      label: "Result",
      component: (
        <>
          <Box p={2}>
            {loading ? <Typography>Loading...</Typography> : null}
            {loading ? null : (
              <Button variant="contained" onClick={handleSubmit}>
                Generate
              </Button>
            )}
          </Box>
          <ReactMarkdown>{message}</ReactMarkdown>
        </>
      ),
    },
  ];

  return <TabSet tabs={tabs} sx={{ height: "90%" }} />;
}
