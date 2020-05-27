function extractDecoDataFromSavefile() {

}

function writeDecoDataToDomInput(decoData) {
    var decoDataInput = document.getElementById("decodatainput");
    decoDataInput.value = decoData;

    var rewriteDecoDataButton = document.getElementById("settingsbtnadddecos");
    rewriteDecoDataButton.click();
}

// writeDecoDataToDomInput("0, 0, 0, 0");

// chrome.storage.sync.get(['saveno'], function (result) {
//     alert(result.saveno);
// });

// alert("Save number: " + config.saveno);