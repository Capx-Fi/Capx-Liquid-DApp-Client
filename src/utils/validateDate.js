export const validateDate = (inputText) => {
  // console.log(inputText);
  let dateformat =
    // eslint-disable-next-line
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  // Match the date format through regular expression
  if (inputText.match(dateformat)) {
    let pdate = inputText.split("-");
    let dd = parseInt(pdate[0]);
    let mm = parseInt(pdate[1]);
    let yy = parseInt(pdate[2]);
    // Create list of days of a month [assume there is no leap year by default]
    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm === 1 || mm > 2) {
      if (dd > ListofDays[mm - 1]) {
        // alert('INVALID DATE format!');
        return false;
      }
    }
    if (mm === 2) {
      let lyear = false;
      if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        lyear = true;
      }
      if (lyear === false && dd >= 29) {
        // alert('INVALID DATE format!');
        return false;
      }
      if (lyear === true && dd > 29) {
        // alert('INVALID DATE format!');
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
};
