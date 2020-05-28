function writeDecoDataToDomInput(decoData) {
    var decoDataInput = document.getElementById("decodatainput");
    decoDataInput.value = decoData;

    var rewriteDecoDataButton = document.getElementById("settingsbtnadddecos");
    rewriteDecoDataButton.click();
}

chrome.storage.local.get(['decoData', 'saveNumber'], function (result) {
    var decoData = null;
    if (result.saveNumber == "save1") {
        decoData = result.decoData[0];
    }
    else if (result.saveNumber == "save2") {
        decoData = result.decoData[1];
    }
    else if (result.saveNumber == "save3") {
        decoData = result.decoData[2];
    }
    
    if (decoData != null) {
        writeDecoDataToDomInput(decoData);
    }
});