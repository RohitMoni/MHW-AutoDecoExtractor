// chrome.storage.local.clear(); // Reset for debug

var runButton = document.getElementById('runDecoExtractor');
runButton.disabled = true; // Disable this until we know we can run

var defaultState = {
    "saveFile": null,
    "saveNumber": "save1",
    "decoData": null
}

// Check for saved values or set defaults
chrome.storage.local.get(defaultState, function (result) {
    chrome.storage.local.set(result, function() {
        console.log('Local storage initialized');
    });

    // If we had previous values saved, need to set up other stuff so that we retain that 'state'
    var saveRadioButton = document.getElementById(result.saveNumber);
    saveRadioButton.checked = true;

    var feedbackText = document.getElementById('feedback-text');
    if (result.saveFile != null) {
        feedbackText.innerHTML = "File: " + result.saveFile;
        var runButton = document.getElementById('runDecoExtractor');
        runButton.disabled = false; // We have a previous file, can run with previous data
    }
    else {
        feedbackText.innerHTML = "No file loaded";
    }
});

// Setup file input event listener to catch the input file, validate it's correct and pull the file data from it
var saveFileInput = document.getElementById('saveFileInput');
saveFileInput.addEventListener("change", () => {
    var saveFileInput = document.getElementById('saveFileInput');
    var file = saveFileInput.files.item(0);

    var feedbackText = document.getElementById('feedback-text');
    feedbackText.innerHTML = "Loading " + file.name + "...";

    // Load file and run extractor / validate
    var reader = new FileReader();
    reader.onload = () => {
        console.log("File Read complete!");
        var feedbackText = document.getElementById('feedback-text');
        feedbackText.innerHTML = "File loaded!";

        var fileData = reader.result;
        feedbackText.innerHTML = "Extracting deco data...";
        var decoData = extractDecoDataFromFileData(fileData);

        if (decoData == null) {
            feedbackText.innerHTML = "Failed to extract data from file!";
            return;
        }
        else {
            feedbackText.innerHTML = "Done!";
        }

        var saveState = {
            "saveFile": file.name,
            "decoData": decoData
        }

        chrome.storage.local.set(saveState, function () {
            var feedbackText = document.getElementById('feedback-text');
            feedbackText.innerHTML = "Ready to run...";
            console.log('file data has been set!');
            runButton.disabled = false;
        });
    }

    // IF we fail, reset back to initial state
    reader.onerror = () => {
        console.log(reader.error);
        var feedbackText = document.getElementById('feedback-text');
        feedbackText.innerHTML = "File failed to load!";
        var runButton = document.getElementById('runDecoExtractor');
        runButton.disabled = true; // Disable the run button

        chrome.storage.local.set( { "saveFile": null }, function () {
            console.log('File reset to null');
        });
    }

    reader.readAsArrayBuffer(file);
});

// Setup radio button event listeners so that when a radio button is pressed (For a specific save)
// The corresponding value ("save1", "save2", "save3") is saved to "saveno".
var radioInputs = document.querySelectorAll("input[type=radio]");
for (var i = 0; i < radioInputs.length; i++) {
    radioInputs[i].addEventListener("change", () => {
        var radioInputs = document.querySelectorAll("input[type=radio]");
        var checkedValue = null;
        for (var i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked) {
                checkedValue = radioInputs[i].value;
                break;
            }
        }

        chrome.storage.local.set({ "saveNumber": checkedValue }, function () {
            console.log('saveNumber is set to ' + checkedValue);
        });
    });
}

// Setup button event listener so that when it's pressed we run the content script to inject our deco data into the HH builder page
runButton.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: 'writeDecoData.js' });
    });
};