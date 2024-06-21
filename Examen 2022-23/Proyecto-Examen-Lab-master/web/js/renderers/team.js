"use strict";

import { parseHTML } from '../utils/parseHTML.js';
import { teamsAPI_auto } from '../api/_teams.js';

const teamRenderer = {
   


        



    asTableRow: function (team) {
        let html = `<table><tr>
                        <td><img src="${team.photoURL}" alt="Team Photo" style="width: 100px; height: 100px;"></td>
                        <td>${team.name}</td>
                        <td>${team.president}</td>
                        <td>${team.foundationDate}</td>
                        <td>${team.fieldCapacity} </td>
                    </tr></table>`;
        let row = parseHTML(html).querySelector("tr");

        return row;
    },

 
    asTable: function (teams) {
        let html = `<table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Photo</th>
                                <th scope="col">Name</th>
                                <th scope="col">President</th>
                                <th scope="col">Foundation Date</th>
                                <th scope="col">fieldCapacity</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`;
        let table = parseHTML(html);
        let tableBody = table.querySelector("tbody");

        // Fill in the teams
        for (let emp of teams) {
            let row = this.asTableRow(emp);
            tableBody.appendChild(row);
        }

        return table;
    }
};


export { teamRenderer };