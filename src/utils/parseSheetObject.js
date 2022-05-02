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
    listOfObjs.push(objc);
    // console.log(ws, "sheetdata");
    // const element = array[index];
  }
  return listOfObjs;
};
