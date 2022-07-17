"use strict";

const vehicles = [
  {
    id: 1,
    vrm: "LT68KUD",
    mileage: 1000,
    description: "Oil Service",
    cost: 10.99,
  },
  {
    id: 2,
    vrm: "KS68FVG",
    mileage: 2000,
    description: "Oil Service",
    cost: 30.99,
  },
  {
    id: 3,
    vrm: "CF16DFU",
    mileage: 4350,
    description: "Engine Service",
    cost: 1023.99,
  },
];

let chosenVehicleId = null; //Update functional purpose!

function closeVehicleModal(){ //This function is to enable hide function of the Modal after creating!   
    const modalElement = document.getElementById("vehicleModal"); 
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
//Below line is to clear the form after creation.
    document.getElementById("vrm").value = ""; //This line is to clear the form after creation.
    document.getElementById("mileage").value = "";
    document.getElementById("description").value = "";
    document.getElementById("cost").value = "";

    document.getElementById('submitButton').innerHTML = "Save";
    chosenVehicleId = null;
}

function submitForm(){

  if (!chosenVehicleId) return createService(); //onclick will initiate update function;
  else updateVehicle();


}

function writeServiceRow(vehicle) {
  const vehicleUpdate = encodeURIComponent(JSON.stringify(vehicle)); //Coding the data for the Update payload;
  return `
  <tr id="row-${vehicle.id}">
    <td>${vehicle.id}</td>  
    <td>${vehicle.vrm}</td>
    <td>${vehicle.mileage}</td>
    <td>${vehicle.description}</td>
    <td>${vehicle.cost}</td>
    <td class="w-25">
      <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#vehicleModal"
      onclick="fillFormForUpdate('${vehicleUpdate}')">Update</button>
      <button class="btn btn-danger" onclick="deleteVehicle('${vehicle.id}')">Delete</button>
    </td>
  </tr>
`;
}

function fillFormForUpdate(vehiclePayload) {
  document.getElementById('submitButton').innerHTML = "Update";

  const vehicle = JSON.parse(decodeURIComponent(vehiclePayload)); //Decoding the data for update pre-filled Modal;
  // Below lines will payload the Modal when update button is clicked! Makes it easier to update desired fields!

  document.getElementById('vrm').value = vehicle.vrm;
  document.getElementById('mileage').value = vehicle.mileage;
  document.getElementById('description').value = vehicle.description;
  document.getElementById('cost').value = vehicle.cost;

  chosenVehicleId = vehicle.id;
}



function createService() {
  const vrm = document.getElementById("vrm").value;
  const mileage = document.getElementById("mileage").value;
  const description = document.getElementById("description").value;
  const cost = document.getElementById("cost").value;

  const vehicle = { id: vehicles.length +1, vrm, mileage, description, cost };

  const appendData = writeServiceRow(vehicle);

  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML += appendData;

  closeVehicleModal();
}

function updateVehicle() {
const vrm = document.getElementById('vrm').value;
const mileage = document.getElementById('mileage').value;
const description = document.getElementById('description').value;
const cost = document.getElementById('cost').value;

const vrmField = document.querySelector( '#row-' + chosenVehicleId + " td:nth-child(2)" ); //Selecting the child <tr> elements after the id>
const mileagefield = document.querySelector( '#row-' + chosenVehicleId + " td:nth-child(3)" );
const descriptionField = document.querySelector( '#row-' + chosenVehicleId + " td:nth-child(4)" );
const costField = document.querySelector( '#row-' + chosenVehicleId + " td:nth-child(5)" );
const updateButtonField = document.querySelector("#row-" + chosenVehicleId + " td:nth-child(6) button:nth-child(1)");

const vehicleUpdate = encodeURIComponent(JSON.stringify({id: chosenVehicleId, vrm, mileage, description, cost}));

updateButtonField.setAttribute('onclick', 'fillFormForUpdate("' + vehicleUpdate + '")');

vrmField.innerHTML = vrm;
mileagefield.innerHTML = mileage;
descriptionField.innerHTML = description;
costField.innerHTML = cost;

closeVehicleModal();
}

function deleteVehicle(vehicleId) {

const userElement =  document.getElementById("row-" + vehicleId);
userElement.remove();

}



function loadvehicles() {
  let tableBodyContent = "";

  vehicles.forEach(vehicles => (tableBodyContent += writeServiceRow(vehicles)));

  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = tableBodyContent;
}

loadvehicles();
