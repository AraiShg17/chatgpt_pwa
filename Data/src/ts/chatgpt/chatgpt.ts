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
    // { role: "assistant", content: "2." },
    // { role: "user", content: "もう一回言って" },
  });

  return completion.data.choices[0].message.content;
};
