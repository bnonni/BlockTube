window.DONE = false;
var one = () =>
  $(
    "#row-container > div:nth-child(8) > ytcp-video-list-cell-actions > div > ytcp-button.edit-draft-button.style-scope.ytcp-video-list-cell-actions > div"
  ).click();
var two = () => $("#next-button").click();
var three = () => $("#next-button").click();
var four = () => $("#next-button").click();
var five = () => $("#done-button").click();
var six = () => {
  $("#close-button > div").click();

  return true;
};

const automate = () => {
  one();
  setTimeout(() => two(), 2000);
  setTimeout(() => three(), 2000);
  setTimeout(() => four(), 2000);
  setTimeout(() => five(), 2000);
  window.DONE = setTimeout(() => {
    return six();
  }, 2000);
};

while (!window.DONE) automate();

// $(
//   "#row-container > div:nth-child(8) > ytcp-video-list-cell-actions > div > ytcp-button.edit-draft-button.style-scope.ytcp-video-list-cell-actions > div"
// ).click();
// $("#next-button").click();
// $("#next-button").click();
// $("#next-button").click();
// $("#done-button").click();
// $("#close-button > div").click();
