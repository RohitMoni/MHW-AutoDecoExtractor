let runButton = document.getElementById('runDecoExtractor');
let saveFileInputEl = document.getElementById('saveFileInput');

// runButton.disabled = true;

// Initialize saveno in storage to be save1
chrome.storage.sync.set({ "saveno": "save1" }, function () {
    console.log('saveno is set to save1');
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

        chrome.storage.sync.set({ "saveno": checkedValue }, function () {
            console.log('saveno is set to ' + checkedValue);
        });
    });
}

// Setup button event listener so that when it's pressed we run the content script to inject our deco data into the HH builder page
runButton.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: 'autoDecoExtractor.js' });
    });
};