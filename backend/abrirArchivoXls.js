const xlsx = require("xlsx");

const abrirArchivoXls = (path) => {
    const libro = xlsx.readFile(path);
    const primeraHoja = libro.Sheets[libro.SheetNames[0]];
    return xlsx.utils.sheet_to_json(primeraHoja);
}

module.exports = { abrirArchivoXls: abrirArchivoXls };