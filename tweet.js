var oldMessage = "";
var maxCharacterLimit = 140;

function getContainer() {
	var newDiv = document.createElement('div');
	newDiv.id = 'dispalyMessage';
	newDiv.className = 'modifiedMessage col-md-8 col-sm-10 col-lg-8 col-sm-offset-1 col-md-offset-2 col-lg-offset-2';
  return newDiv;
}

function copyTweet() {
var vlaue = this.innerHTML;
window.prompt("Copy to clipboard: Ctrl+C, Enter", vlaue);
}

function getMessages(tweetsArray) {
if (tweetsArray) {
var isSingleTweet = tweetsArray.length == 1;
if(isSingleTweet) {
	var tweetContainer = getContainer();
	tweetContainer.innerHTML = tweetsArray[0];
  tweetContainer.addEventListener('click', copyTweet);
	$('#dispalyMessageContainer').append(tweetContainer);
} else {
for (var i= 0; i <tweetsArray.length; i++) {
	var tweetContainer = getContainer();
	tweetContainer.innerHTML = `${tweetsArray[i]}(${(i+1)}/${tweetsArray.length})`;
  tweetContainer.addEventListener('click', copyTweet);
	$('#dispalyMessageContainer').append(tweetContainer);
}
}
}
}

function getSplittedTweets(message) {
if (message.length <= maxCharacterLimit) {
	return message.match(new RegExp('.{1,' + maxCharacterLimit + '}', 'g'));
} else {
return message.match(new RegExp('.{1,' + (maxCharacterLimit-5) + '}', 'g'));
}
}

function displayCopyMessage(message) {
if(message.length) {
  document.getElementById("copyMessage").style.display = "block";
} else {
  document.getElementById("copyMessage").style.display = "none";
}
}

function updateMessage(message) {
$(".modifiedMessage").remove();
displayCopyMessage(message);
$('#messageLength').text("Total Characters : " + message.length);
var tweetsArray = getSplittedTweets(message);
getMessages(tweetsArray);
}

function textAreaAdjust(o) {
o.style.height = "1px";
o.style.height = (25+o.scrollHeight)+"px";
}


$("#message").on("change keyup paste", function() {
  var currentMessage = $(this).val();
  textAreaAdjust(this);
  if(currentMessage == oldMessage) {
      return;
  } else {
      oldMessage = currentMessage;
  updateMessage(oldMessage);
  }
});
