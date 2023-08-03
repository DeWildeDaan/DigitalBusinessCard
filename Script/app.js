"use strict";

//#region ***  DOM references                           ***********
let htmlSaveBtn,
  htmlFn,
  htmlName,
  htmlFunction,
  htmlCompany,
  htmlAbout,
  htmlSocials;
let configData;
//#endregion

//#region ***  Callback-Visualisation - show___         ***********
function showPersonalInfo(responseData) {
  showNameCard(responseData);
  showAbout(responseData);
  showSocials(responseData);
}

function showNameCard(responseData) {
  htmlFn.innerHTML = `${responseData.NameCard.FirstName}`;
  htmlName.innerHTML = `${responseData.NameCard.Name}`;

  htmlFunction.innerHTML = `${responseData.NameCard.Function}`;
  htmlCompany.innerHTML = `${responseData.NameCard.Company}`;
}

function showAbout(responseData) {
  htmlAbout.innerHTML = `${responseData.About.Text}`;
}

function showSocials(responseData) {
  htmlSocials.innerHTML = `
            <a href="${responseData.Socials.LinkedIn}" class="c-social-icon"><i class="fa fa-linkedin" aria-hidden="true"></i></a>

            <a href="mailto:${responseData.Socials.Email}" class="c-social-icon"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>

            <a href="${responseData.Socials.GitHub}" class="c-social-icon"><i class="fa fa-github" aria-hidden="true"></i></a>
  `;
}
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***********
function callbackSaveContact() {
  // create a vcard file
  var vcard =
    "BEGIN:VCARD\nVERSION:4.0\nFN:" +
    configData.Contact.FirstName +
    "\nNAME:" +
    configData.Socials.Name +
    "\nTEL;TYPE=work,voice:" +
    configData.Contact.PhoneNumber +
    "\nEMAIL:" +
    configData.Socials.Email +
    "\nORG:" +
    configData.NameCard.Company +
    "\nURL:" +
    configData.Contact.Website +
    "\nURL:" +
    configData.Socials.LinkedIn +
    "\nEND:VCARD";
  var blob = new Blob([vcard], { type: "text/vcard" });
  var url = URL.createObjectURL(blob);

  const newLink = document.createElement("a");
  newLink.download =
    configData.Contact.FirstName + " " + configData.Contact.Name + ".vcf";
  newLink.textContent =
    configData.Contact.FirstName + " " + configData.Contact.Name;
  newLink.href = url;

  newLink.click();
}
//#endregion

//#region ***  Data Access - get___                     ***********
function getData() {
  fetch("./Script/exampleConfig.json").then((response) => {
    return response.json().then(function (responseData) {
      configData = responseData;
      showPersonalInfo(responseData);
    });
  });
}
//#endregion

//#region ***  Event Listeners - listenTo___            ***********
function listenToSaveContact() {
  htmlSaveBtn.addEventListener("click", function () {
    callbackSaveContact();
  });
}

//#endregion

//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
  console.log("DOM Content loaded");
  htmlSaveBtn = document.querySelector(".js-save-btn");
  htmlFn = document.querySelector(".js-fn");
  htmlName = document.querySelector(".js-name");
  htmlFunction = document.querySelector(".js-function");
  htmlCompany = document.querySelector(".js-company");
  htmlAbout = document.querySelector(".js-about");
  htmlSocials = document.querySelector(".js-socials");

  getData();
  listenToSaveContact();
};

document.addEventListener("DOMContentLoaded", init);
//#endregion
