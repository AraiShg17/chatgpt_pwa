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
