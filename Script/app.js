"use strict";

//#region ***  DOM references                           ***********

//#endregion

//#region ***  Callback-Visualisation - show___         ***********
function showData(respondeData) {
  console.log(respondeData);
}
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***********
//#endregion

//#region ***  Data Access - get___                     ***********
function getData() {
  fetch("./Script/config.json").then((response) => {
    return response.json().then(function (respondeData) {
      showData(respondeData);
    });
  });
}
//#endregion

//#region ***  Event Listeners - listenTo___            ***********
//#endregion

//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
  console.log("DOM Content loaded");

  getData();
};

document.addEventListener("DOMContentLoaded", init);
//#endregion
