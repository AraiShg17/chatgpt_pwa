const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
type chatType = { role: string; content: string };

export const chatgpt = async (chat: chatType[]) => {
  console.log(chat);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chat,
  });

  return completion.data.choices[0].message.content;
};
