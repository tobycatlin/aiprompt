import openai from "../../../lib/openAI";

export async function GET(request) {
  const promptString = `A cute baby sea otter`;

  const aiResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  const imageUrl = aiResponse.data[0].url;
  return Response.json({ url: imageUrl }, { status: 200 });
}
