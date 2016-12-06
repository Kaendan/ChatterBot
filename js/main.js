function sendEvent(e) {
  if(e.keyCode == 13) {
    var input = document.getElementById("userInputText");
    text = input.value;
    final_transcript = text;
    recognition.stop();
  }
}

(function() {
  var input = document.getElementById("userInputText");
  input.addEventListener("keydown", function(e) {
    sendEvent(e);
  });
})();