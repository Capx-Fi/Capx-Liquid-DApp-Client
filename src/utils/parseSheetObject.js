export const parseSheetObj = async (ws) => {
  // required condition
  // console.log(ws);

  if (Object.keys(ws).length === 1) return [];

  const regex = new RegExp("[A-Z0-9]", "g");
  const onlyCells = Object.keys(ws).filter((a) => a.match(regex));
  let numberOfRows = parseInt(onlyCells[onlyCells.length - 1].substring(1));
  let listOfObjs = [];
  for (let index = 2; index <= numberOfRows; index++) {
    let objc = {};
    let sA = "A" + index.toString();
    let sB = "B" + index.toString();
    let sC = "C" + index.toString();
    let sD = "D" + index.toString();
    let sE = "E" + index.toString();
    let sF = "F" + index.toString();
    let sG = "G" + index.toString();
    let sH = "H" + index.toString();
    let sI = "I" + index.toString();
    let sJ = "J" + index.toString();

    // check if there are correct value in these

    if (ws[sA] !== undefined && ws["A1"] !== undefined) {
      objc[ws["A1"]["w"]] = ws[sA]["w"];
    } else {
      if (ws["A1"] !== undefined) objc[ws["A1"]["w"]] = undefined;
    }
    if (ws[sB] !== undefined && ws["B1"] !== undefined) {
      objc[ws["B1"]["w"]] = ws[sB]["w"];
    } else {
      if (ws["B1"] !== undefined) objc[ws["B1"]["w"]] = undefined;
    }
    if (ws[sC] !== undefined && ws["C1"] !== undefined) {
      objc[ws["C1"]["w"]] = ws[sC]["w"];
    } else {
      if (ws["C1"] !== undefined) objc[ws["C1"]["w"]] = undefined;
    }
    if (ws[sD] !== undefined && ws["D1"] !== undefined) {
      objc[ws["D1"]["w"]] = ws[sD]["w"];
    } else {
      if (ws["D1"] !== undefined) objc[ws["D1"]["w"]] = undefined;
    }
    if (ws[sE] !== undefined && ws["E1"] !== undefined) {
      objc[ws["E1"]["w"]] = ws[sE]["w"];
    } else {
      if (ws["E1"] !== undefined) objc[ws["E1"]["w"]] = undefined;
    }
    if (ws[sF] !== undefined && ws["F1"] !== undefined) {
      objc[ws["F1"]["w"]] = ws[sF]["w"];
    } else {
      if (ws["F1"] !== undefined) objc[ws["F1"]["w"]] = undefined;
    }
    if (ws[sG] !== undefined && ws["G1"] !== undefined) {
      objc[ws["G1"]["w"]] = ws[sG]["w"];
    } else {
      if (ws["G1"] !== undefined) objc[ws["G1"]["w"]] = undefined;
    }
    if (ws[sH] !== undefined && ws["H1"] !== undefined) {
      objc[ws["H1"]["w"]] = ws[sH]["w"];
    } else {
      if (ws["H1"] !== undefined) objc[ws["H1"]["w"]] = undefined;
    }
    if (ws[sI] !== undefined && ws["I1"] !== undefined) {
      objc[ws["I1"]["w"]] = ws[sI]["w"];
    } else {
      if (ws["I1"] !== undefined) objc[ws["I1"]["w"]] = undefined;
    }
    if (ws[sJ] !== undefined && ws["J1"] !== undefined) {
      objc[ws["J1"]["w"]] = ws[sJ]["w"];
    } else {
      if (ws["J1"] !== undefined) objc[ws["J1"]["w"]] = undefined;
    }
    listOfObjs.push(objc);
    // console.log(ws, "sheetdata");
    // const element = array[index];
  }
  return listOfObjs;
};
