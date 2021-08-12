const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Nome da planilha');


///////////////////////////

const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');






//Converte o xml em json
const parser = new xml2js.Parser();

fs.readFile('example.xml', (err, data) => {
  parser.parseString(data, (err, result) => {
    console.log(util.inspect(result, false, null, true));
  });
});


//converte o json em xlsx

const data = [
  {
    "name": "Teste",
    "email": "teste@email.com",
    "cellphone": "123456789"
  },
  {
    "name": "Pessoa",
    "email": "pessoa@email.com",
    "cellphone": "123456789"
  }
];

const headingColumnNames = [
  "Nome",
  "E-mail",
  "Celular"
];

let headingColumnIndex = 1;
headingColumnNames.forEach(heading => {
  ws.cell(1, headingColumnIndex++).string(heading);
});

let rowIndex = 2;
fs.readFile('example.xml').forEach(record => {
  let columnIndex = 1;
  Object.keys(record).forEach(columnName => {
    ws.cell(rowIndex, columnIndex++).string(record[columnName])
  });
  rowIndex++;
});

wb.write('arquivo.xlsx');