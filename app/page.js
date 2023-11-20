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
  const page = `
  # Overview
  Junior developers encounter a multitude of challenges as they embark on the journey to
  secure a job in the competitive tech industry. One of the primary hurdles they face is the
  constraint of limited experience. Employers often prioritise candidates with hands-on
  practical experience, creating a substantial barrier for those who are at the nascent stages of
  their careers. This lack of real-world application can impede their ability to stand out in a
  crowded job market.
  Crafting an effective resume and cover letter further compounds the challenges faced by
  junior developers. With limited work history to draw upon, they must skillfully emphasise
  relevant projects, internships, and acquired skills. This process requires a delicate balance
  between showcasing competence and addressing the inevitable gaps in experience, a task
  that demands careful attention to detail.
  
  # Sprint Goal
  This innovation sprint goal is to assess and iterate the potential of using Large Language
  Models to increase the effectiveness of junior developer applications.
`;

  return <ReactMarkdown>{page}</ReactMarkdown>;
}
