function writeDecoDataToDomInput(decoData) {
    var decoDataInput = document.getElementById("decodatainput");
    decoDataInput.value = decoData;

    var rewriteDecoDataButton = document.getElementById("settingsbtnadddecos");
    rewriteDecoDataButton.click();
}

chrome.storage.local.get(['decoData'], function (result) {
    writeDecoDataToDomInput(result.decoData);
});