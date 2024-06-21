"use strict";

import{messageRenderer} from "./renderers/messages.js";
import{teamValidator} from "./validators/teamValidate.js";
import{teamsAPI_auto} from "./api/_teams.js";

function main() {

    let urlParams = new URLSearchParams(window.location.search);
    let teamId = urlParams.get("teamId");

    if(teamId!=null){
        loadCardInfo(teamId);
        let teamForm = document.getElementById("team-form");
        teamForm.onsubmit = handleUpdateTeam;
    }


    else{
        let teamForm = document.getElementById("team-form");
        teamForm.onsubmit = handleSubmitTeam;
    }
   

}

async function handleUpdateTeam(team) {
    team.preventDefault();
    let form = team.target;
    let formData = new FormData(form);
    let teamId = formData.get("teamId");
    let errors = teamValidator.validateCreateTeam(formData);
    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        updateTeamForm(formData);
    }
}

async function updateTeamForm(formData) {
    let urlParams = new URLSearchParams(window.location.search);
    let teamId = urlParams.get("teamId");
    await teamsAPI_auto.update(formData, teamId);
    window.location.href = "index.html";
}
    

async function loadCardInfo(teamId) {
    let team = await teamsAPI_auto.getById(teamId);

    for (let dato in team) {

        if (document.getElementById(`${dato}`)) {
            document.getElementById(`${dato}`).value = team[dato];
        }
      }
}

function handleSubmitTeam(team) {

    team.preventDefault();
    let form = team.target;
    let formData = new FormData(form);
    console.log(formData);
    let errors = teamValidator.validateCreateTeam(formData);

    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        sendTeamForm(formData);
    }
}

async function sendTeamForm(formData) {
    await teamsAPI_auto.create(formData);
    window.location.href = "index.html";
}
 

document.addEventListener("DOMContentLoaded", main);
