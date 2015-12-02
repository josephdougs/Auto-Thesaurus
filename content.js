console.log("well aren't you just a little turd?");

// heres that sweet sweet regular expression
// str.match(/(\S+|\s+)/g).join("")
// basically match all substrings that are nonwhitespace and ones that are whitespace and the 'g' means to
// match all of them I think.  Or at least thats what it does

function replaceText() {
	console.log("got here buddio");
	var selection = window.getSelection();
	if (selection.rangeCount < 1) {
		return;
	}
	var range = selection.getRangeAt(0);
	var startNode = range.startContainer;
	var endNode = range.endContainer;
	var startOffset = range.startOffset;
	var endOffset = range.endOffset;
	var curNode = startNode;
	while (curNode != null) {
		curNode.textContent = mulliganize(curNode.textContent);
		curNode = curNode.nextSibling;
	}
};

function mulliganize(str) {
	var tokens = str.match(/(\S+|\s+)/g);
	for (var i = 0; i < tokens.length; i++) {
		if (/\S+/.test(tokens[i])) { // token is non-whitespace
			tokens[i] = "mulligan";
			// TODO: LOOK FOR A SYNONYM AND REPLACE THE CURRENT WORD WITH IT
		}
	}
	return tokens.join("");
};

document.addEventListener('keyup', function(e) {
	console.log(e);
	if (e.keyCode == 84) {
		console.log("changes are go");
		replaceText();
	}
});