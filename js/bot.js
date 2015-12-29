var recognition = new window.webkitSpeechRecognition();
var synthesis = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance();
var userInputText = document.getElementById('userInputText');
var conversationWindow = document.getElementById('conversationWindow');
var final_transcript = "";
var name = "";

utterance.lang = 'fr-FR';
utterance.pitch = .4;
utterance.rate = 1;
recognition.continuous = false;
recognition.interimResults = true;

say("Bonjour.");

recognition.onresult = function(event) {
  var transcript = "";

  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript = event.results[i][0].transcript;
    } else {
      transcript += event.results[i][0].transcript;
      userInputText.value = transcript;
    }
  }
};

recognition.onend = function() {
  if (final_transcript && !synthesis.speaking) {

    sendMessage(final_transcript);
  } else {
    recognition.start();
  }
}

utterance.onend = function(e) {
  recognition.start();
};

function answerTo(text) {
  var cleanedText = clean(text);
  if(contains(cleanedText, ["bonjour", "salut", "coucou"])) {
    say("Comment allez-vous ?");
  } else if(contains(cleanedText, ["au revoir", "à bientôt", "à la prochaine fois"])) {
    say("Au revoir. Revennez vite !");
  } else if(contains(cleanedText, ["ça va ", "tu vas bien "])) {
    say("Je crois que oui.");
  } else if(contains(cleanedText, ["ça va", "ça va bien", "je vais bien", "super", "super bien"])) {
    say("Tant mieux alors !");
  } else if(contains(cleanedText, ["bof", "ça va mal", "ça va pas", "pas super", "pas terrible"])) {
    say("Oh quel dommage !");
  } else if(contains(cleanedText, ["tu fais quoi"])) {
    say("Je te parle.");
  } else if(contains(cleanedText, ["ah bon", "ah bon "])) {
    say("Oui.");
  } else {
    say(text);
  }
};

function sendMessage(text) {
  clearInput();
  displayMessage(text, "You", "user-message" );
  answerTo(text);
};

function say(text) {
  utterance.text = text;
  synthesis.speak(utterance);
  displayMessage(text, "Bot", "bot-message");
};

function displayMessage(text, sender, type) {
  var message = document.createElement("p");
  message.className = "message " + type;
  message.innerHTML = sender + ": " + text;
  conversationWindow.appendChild(message);
  conversationWindow.scrollTop = conversationWindow.scrollHeight;
};

function clearInput() {
  userInputText.value = "";
  final_transcript = "";
};

function clean(text) {
  var cleanedText = text;
  cleanedText = cleanedText.replace(/[`~!@#$%^&*()§_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  cleanedText = cleanedText.toLowerCase();
  console.log("Cleaned: " + cleanedText);
  return cleanedText;
};

function contains(text, tab) {
  if(tab.indexOf(text) > -1) {
      return true;
  }
  return false;
};