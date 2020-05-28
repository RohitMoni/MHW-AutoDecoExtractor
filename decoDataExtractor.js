const magicNumbers = {
    "minJewedId": 727,
    "maxJewelId": 2272,
    "numDecos": 2272 - 727,
    "decoInventorySize": 50 * 10,
    "numBytesPerDeco": 8,
    "saveSlotDecosOffsets": [4302696, 6439464, 8576232],
}

function extractDecoDataFromFileData(data, saveNumber) {
    var decoDataRv = [
        "0, 0, 0, 0", 
        "1, 1, 1, 1", 
        "2, 2, 2, 2"
    ];
    // var decryptedData = decryptSaveData(data);

    // for (var i = 0; i < 3; ++i) {
    //     var decorationCounts = getJewelCounts(decryptedData, magicNumbers.saveSlotDecosOffsets[i]);
    //     if (decorationCounts == null) {
    //         return false;
    //     }

    //     var currentSaveDecoData = outputHoneyHunter(decorationCounts);
    //     decoDataRv[i] = currentSaveDecoData;
    // }

    return decoDataRv;
}