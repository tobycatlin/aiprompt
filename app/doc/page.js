"use client";
import { useState, useEffect } from "react";

import {
  Divider,
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import TabSet from "../components/TabSet";
import Button from "@mui/material/Button";

export default function Home() {
  const [prompt, setPrompt] = useState(
    "You will be provided with a cv document and a job description. Your task is to rewrite the document to match the job description and include addition information from the prompt."
  );
  const [baseCV, setBaseCV] = useState("");
  const [context, setContext] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    setError(false);
    // console.log(JSON.stringify({ prompt, context, baseCV }));
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, context, baseCV }),
    });

    if (!response.ok) {
      return {
        error: `Something went wrong - ${response.status} ${response.statusText}`,
      };
    }

    return response.json();
  };

  const handleSubmit = async () => {
    const message = await postPrompt();
    if (message.error) {
      setError(message.error);
    } else {
      setMessage(message.output.content);
      setError(false);
      localStorage.setItem("message", message.output.content);
    }

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
          <Typography variant="h5" gutterBottom>
            CV
          </Typography>

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
          <Typography
            variant="h5"
            sx={{
              mt: 2,
            }}
          >
            Prompt
          </Typography>
          <Typography variant="body">
            The prompt provides the LLM instructions as to how it should combine
            the CV and Job description inputs. You can format the prompt as if
            you were instructing a person to do the task.
            <p>
              Examples: <br />
              <i>
                You will be provided with a cv document and a job description.
                Your task is to rewrite the document to match the job
                description
              </i>
            </p>
          </Typography>

          <TextField
            value={prompt}
            multiline
            variant="outlined"
            placeholder="Prompt"
            fullWidth
            sx={textboxStyle}
            onChange={handlePromptChange}
          />
          <Divider />

          <Typography
            variant="h5"
            sx={{
              mt: 2,
            }}
          >
            Job Description
          </Typography>

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
          {!loading && error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <ReactMarkdown>{message}</ReactMarkdown>
          )}
        </>
      ),
    },
  ];

  return <TabSet tabs={tabs} sx={{ height: "90%" }} />;
}
