// heres that sweet sweet regular expression
// str.match(/(\S+|\s+)/g).join("")
// basically match all substrings that are nonwhitespace and ones that are whitespace and the 'g' means to
// match all of them I think.  Or at least thats what it does

// TODO: implement selection where you look at the nearest word selected and don't just take parts
// of words
function replaceText() {
	console.log("got here buddio");
	var selection = window.getSelection();
	// don't do anything if no text is selected
	if (selection.rangeCount < 1) {
		return;
	}
	// use getRangeAt nodes rather than selection's anchor and focus
	// because getRangeAt nodes are the same regardless of the order
	// the user clicked on them
	var range = selection.getRangeAt(0);
	var startNode = range.startContainer;
	var endNode = range.endContainer;
	var startOffset = range.startOffset;
	var endOffset = range.endOffset;	
	var beginStr = startNode.textContent.substring(0, startOffset);
	var midStr = "";
	var endStr = "";
	console.log(selection);
	console.log(startNode);
	console.log(endNode);
	console.log(startNode == endNode);
	if (startNode == endNode) { // handle case with only one node
		console.log("this should occur");
		midStr = mulliganize(startNode.textContent.substring(startOffset, endOffset));
		endStr = startNode.textContent.substring(endOffset);
	} else {
		endStr = mulliganize(startNode.textContent.substring(startOffset));
	}
	startNode.textContent = beginStr + midStr + endStr;
	
	// TODO: I NEED TO DO TREE TRAVERSAL RATHER THAN JUST NEXT SIBLING!
	
	var curNode = startNode.nextSibling;
	console.log("what is curNode here?");
	console.log(curNode);
	// general case
	console.log("bugger me");
	console.log(curNode.isEqualNode(endNode));
	while (curNode != null && !curNode.isEqualNode(endNode)) {
		curNode.textContent = mulliganize(curNode.textContent);
		curNode = curNode.nextSibling;
	}
	
	console.log("is end yet?");
	console.log(endNode.isEqualNode(curNode));
	console.log(endNode);
	console.log(curNode);
	
	if (endNode.isEqualNode(curNode)) {
		console.log("reached end");
		var beginStr = endNode.textContent.substring(0, endOffset);
		var endStr = endNode.textContent.substring(endOffset);
		endNode.textContent = mulliganize(beginStr) + endStr;
	}
};

function mulliganize(str) {
	// get array of whitespace and non-whitspace substrings
	var tokens = str.match(/(\S+|\s+)/g);
	for (var i = 0; i < tokens.length; i++) {
		if (/\S+/.test(tokens[i])) { // token is non-whitespace
		
			if (!(tokens[i] in COMMON_WORDS) && (tokens[i] in THESAURUS)) {
				// just get the first name
				for (name in THESAURUS[tokens[i]]) {
					tokens[i] =  name;
					break;
				}
			}
			// TODO: LOOK FOR A SYNONYM AND REPLACE THE CURRENT WORD WITH IT
		}
	}
	return tokens.join("");
};


document.addEventListener('keyup', function(e) {
	console.log(e);
	if (e.keyCode == 84) { // 't'
		console.log("changes are go");
		replaceText();
	}
});


document.addEventListener('keyup', function(e) {
	console.log(e);
	if (e.keyCode == 74) { // 'j'
		chrome.storage.local.set({muncie: "indeed"}, function(){console.log("stored!");});
		chrome.storage.local.get("muncie", function(obj){console.log(obj);})
	}
});


var db;
// maybe put in a new page

function newDB() {
	
	var openRequest = indexedDB.open("mincemeat", 1);
	
	openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
		console.log("bumble");
 
        if(!thisDB.objectStoreNames.contains("people")) {
            thisDB.createObjectStore("people");
        }
    }
	
    openRequest.onsuccess = function(e) {
        console.log("running onsuccess");
 
        db = e.target.result;
		
		
		var transaction = db.transaction(["people"],"readwrite");
		var store = transaction.objectStore("people");
		store.add("pease", 1);
		console.log(store.get(1));
        //Listen for add clicks
        //document.querySelector("#addButton").addEventListener("click", addPerson, false);
    }
 
    openRequest.onerror = function(e) {
        //Do something for the error
		console.log("fumble");
    }
}

newDB();

console.log(THESAURUS);

