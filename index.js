const nodemailer = require("nodemailer");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "lavada.herzog@ethereal.email",
    pass: "MqrGrvMssBtVBUB3kS",
  },
});

let text;

async function AI() {
const MODEL_NAME = "gemini-1.0-pro";
const genAI = new GoogleGenerativeAI('AIzaSyCy_B8Uv9oJ47qpqbi1WtSQcYufbUrzbf4'); // Replace 'your_api_key_here' with your actual API key
const model = genAI.getGenerativeModel({ model: MODEL_NAME });
const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 500,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const conversationHistory = [
  {
    role: "user",
    parts: [{ text: "Pretend you're email and you have to write emails "}],
  },
  {
    role: "model",
    parts: [{ text: "```html\n\n\n\n  \n  \n\n\n  Subject: Your Order Confirmation\n\n  Hi [Customer Name],\n\n  Thank you for your recent order from [Company Name]. We're excited to get your order shipped to you as soon as possible.\n\n  Order Details\n\n  \n    Order Number: [Order Number]\n    Order Date: [Order Date]\n    Shipping Address: [Shipping Address]\n    Billing Address: [Billing Address]\n    Items Ordered:\n    \n      [Item Name] x [Quantity]\n      [Item Name] x [Quantity]\n      [Item Name] x [Quantity]\n    \n  \n\n  The total amount of your order is [Total Amount].\n\n  We expect your order to arrive within [Shipping Time Frame]. You can track your order status at [Tracking URL].\n\n  If you have any questions about your order, please don't hesitate to contact us.\n\n  Thank you for your business!\n\n  Sincerely,\n  [Company Name]\n\n\n```"}],
  },
 ];
 

const chat = model.startChat({
  generationConfig,
  safetySettings,
  history: conversationHistory,
});

const msg = "write me a CV letter to apply for a job";
const result = await chat.sendMessage(msg);
const response = await result.response;
const text = response.text()
console.log("iiiiii",text);
console.log("iiiiii",response);
console.log("iiiiii",response.text());
return text;
    //   messages = JSON.parse(text);
    //   if (messages.messages) {
    //     messages = messages.messages; // ChatGPT is not 100% reliable, sometimes it directly returns an array and sometimes a JSON object with a messages property
    //  }
    //  console.log("uuuu",messages);
}

// const htmlTemplate = `<h1>Hello world?</h1>`
async function main() {
  const text = await AI();
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'lavada.herzog@ethereal.email', // sender address
    to: "goforearnmoney@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: text, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
