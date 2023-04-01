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
