var fs = require("fs");
var parse = require('csv-parse/lib/sync');
var table = require('text-table');

function loadUnlabelledWine(verbose) {
    
    var features = [
    'Alcohol',
    'Malic Acid',
    'Ash',
    'Alcalinity of ash',
    'Magnesium',
    'Total phenols',
    'Flavanoids',
    'Nonflavanoid phenols',
    'Proanthocyanins',
    'Color intensity',
    'Hue',
    'OD280/OD315 of diluted wines',
    'Proline'];

    var raw_csv_string = fs.readFileSync("datasets/wine.data.unlabelled.csv").toString();
    var dataset = parse(raw_csv_string);       
    var format = { align: [ 'c', 'c' ], hsep: ' | ' };
    if (verbose) {       
        console.log("our dataset has", dataset.length, "rows and ", dataset[0].length, "columns")
        var T = table([features], format);
        console.log(T)
        console.log("---------------------------")
        var D = table(dataset.slice(0,5), format);
        console.log(D)
    }
    
    return {
        features, 
        dataset
    }
}

module.exports = {
    loadUnlabelledWine
};