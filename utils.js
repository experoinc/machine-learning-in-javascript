var fs = require("fs");
var parse = require('csv-parse/lib/sync');
var table = require('text-table');

function loadUnlabelledWine(options) {
    return loadWine("datasets/wine.data.unlabelled.csv", options);
}
    
function loadLabelledWine(options) {
    return loadWine("datasets/wine.data.csv", options);
}
    
function loadWine(filename, options) {
    
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
    'Proline',
    'Class'];

    var raw_csv_string = fs.readFileSync(filename).toString();
    var dataset = parse(raw_csv_string, {auto_parse: true});       
    var format = { align: [ 'c', 'c' ], hsep: ' | ' };
    if (options && options.verbose) {       
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

function grid2(range=[-1,1], step=0.01) {
    var X = [];

    // build a 2d array of coordinates
    for (var i = range[0]; i <= range[1]; i += step) {
        var x = [];
        for (var j = range[0]; j <= range[1]; j += step) {
            x.push([i, j])
        }
        X.push(x)
    }
}

module.exports = {
    loadUnlabelledWine,
    loadLabelledWine,
    grid2
};