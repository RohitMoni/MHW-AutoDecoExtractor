function extractDecoDataFromSavefile() {

}

function writeDecoDataToDomInput(decoData) {
    var decoDataInput = document.getElementById("decodatainput");
    decoDataInput.value = decoData;

    var rewriteDecoDataButton = document.getElementById("settingsbtnadddecos");
    rewriteDecoDataButton.click();
}

// writeDecoDataToDomInput("0, 0, 0, 0");

chrome.storage.local.get(['saveFile', 'saveNumber'], function (result) {
    console.log(result.saveNumber);
});