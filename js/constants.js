//index.js
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) { 
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span><img src="img/user.png" class="avatar">`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "img/gavel.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "...";
  botDiv.appendChild(botImg);
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 350
  )

}




// constants.js
const prompts = [
  ["ian"],
  ["hi", "hey", "hello", "good morning", "good afternoon"],
  ["my landlord is kicking me out"],
  ["how are you", "how is life", "how are things"],
  ["what are you doing", "what is going on", "what is up"],
  ["who are you", 
    "are you human", 
    "are you bot", 
    "are you human or bot", 
    "who created you", 
    "who made you", 
    "your name please", 
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["help me", "tell me what to do"],
  ["ah", "yes", "ok", "okay", "nice"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["no","not sure","maybe","no thanks"],
  [""],
  ["haha","ha","lol","hehe","funny","joke"]
]

// Bot responses, in order

const replies = [
  ["i love you!"],
  ["Hello! What can I help you with today?", "Hi! What can I help you with?", "Hey! What can I help you with?", "Hi there! What can I help you with?"],
  ["This sounds like a housing problem. We can find you help with that."],
  ["Excellent, thanks! What can I help you with?", "Fantastic! What can I help you with?"],
  ["Ready to help you with your question! What can I help you with?"],
  ["I am a bot created for the Small Claims Advisory Service to help you with your legal inquiry. What can I help you with?"],
  ["insert answers here"],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["Bye", "Goodbye", "See you later"],
  ["Sushi", "Pizza"],
  ["Bro!"],
  ["Great question"],
  ["That's ok","I understand","What do you want to talk about?"],
  ["Please say something :("],
  ["Haha!","Good one!"]
]


function sendMsg(from, content) {
    currentGridRow++;
    let newMsg = `<div class="message ${from}" style="grid-row-start:${currentGridRow}">${content}</div>`;
    display.innerHTML += newMsg;
}

sendMsg('from-scasbot', `${getRandArrItem(greetingVocab)}! I'm the Harvard SCAS Chatbot, a resource directory of small claims information.`);

sendMsg('from-scasbot', `What can I help you with today?`);

window.addEventListener('keydown', function() {
    if (event.code === 13) runApp();
})
