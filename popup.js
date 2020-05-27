// Initialize base storage values
chrome.storage.local.set({ "saveFile": null }, function () {
    console.log('saveFile is set to null');
});
chrome.storage.local.set({ "saveNumber": "save1" }, function () {
    console.log('saveNumber is set to save1');
});

// Setup file input event listener to catch the input file, validate it's correct and pull the file data from it
var saveFileInput = document.getElementById('saveFileInput');
saveFileInput.addEventListener("change", () => {
    var saveFileInput = document.getElementById('saveFileInput');
    var file = saveFileInput.files.item(0);

    chrome.storage.local.set({ "saveFile": file }, function () {
        console.log('saveFile has been set!');
    });

    // var reader = new FileReader();

    // reader.onload = () => {
    //     console.log("File Read complete!");
        
    // }

    // reader.onerror = () => {
    //     console.log(reader.error);
    // }

    // reader.readAsArrayBuffer(file);

    runButton.disabled = false;
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
var runButton = document.getElementById('runDecoExtractor');
runButton.disabled = true;
runButton.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: 'autoDecoExtractor.js' });
    });
};