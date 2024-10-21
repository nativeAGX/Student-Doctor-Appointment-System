// script.js

// Array to hold booked appointments
const bookedAppointments = [];

// Function to save the profile information
function saveProfile() {
    const formElements = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        weight: document.getElementById("weight").value,
        height: document.getElementById("height").value,
        temperature: document.getElementById("temperature").value,
        symptoms: document.getElementById("symptoms").value
    };

    // Display the saved profile information
    updateProfileDisplay(formElements);

    // Show the profile display section
    document.getElementById("profileDisplay").style.display = "block";

    // Clear the form fields
    document.getElementById("healthForm").reset();
}

// Function to update profile display
function updateProfileDisplay(profileData) {
    for (const [key, value] of Object.entries(profileData)) {
        document.getElementById(`display${capitalizeFirstLetter(key)}`).textContent = value;
    }
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to update available time slots based on selected doctor and date
function updateTimeSlots() {
    const doctor = document.getElementById("doctor").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const timeSlots = document.getElementById("timeSlots");

    timeSlots.innerHTML = ""; // Clear previous time slots

    // Example time slots (this logic can be modified based on real data)
    const availableSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"];
    
    availableSlots.forEach(slot => {
        const row = createTimeSlotRow(slot, doctor, appointmentDate);
        timeSlots.appendChild(row);
    });
}

// Function to create a time slot row
function createTimeSlotRow(slot, doctor, date) {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    const availabilityCell = document.createElement("td");

    timeCell.textContent = slot;
    availabilityCell.innerHTML = `<button onclick="bookAppointment('${doctor}', '${date}', '${slot}')">Book</button>`;

    row.appendChild(timeCell);
    row.appendChild(availabilityCell);
    return row;
}

// Function to book an appointment and update local storage
function bookAppointment(doctor, date, time) {
    const appointment = { doctor, date, time };
    
    // Store the appointment in local storage
    const storedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];
    storedAppointments.push(appointment);
    localStorage.setItem('bookedAppointments', JSON.stringify(storedAppointments));
    
    // Alert the user and update the appointment list
    alert(`Appointment booked with ${doctor} on ${date} at ${time}.`);
    updateAppointmentList();
}

// Function to update the booked appointments list display
function updateAppointmentList() {
    const appointmentList = document.getElementById("appointmentList");
    const storedAppointments = JSON.parse(localStorage.getItem('bookedAppointments')) || [];
    appointmentList.innerHTML = ""; // Clear previous appointments

    if (storedAppointments.length === 0) {
        appointmentList.innerHTML = "<p>No appointments booked yet.</p>";
    } else {
        storedAppointments.forEach(appointment => {
            const listItem = document.createElement("p");
            listItem.textContent = `${appointment.doctor} - ${appointment.date} at ${appointment.time}`;
            appointmentList.appendChild(listItem);
        });
    }
}

// Call this function on page load to display previously booked appointments
window.onload = updateAppointmentList;
