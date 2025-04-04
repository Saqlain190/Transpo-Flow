const loadJsPDF = () => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => console.log("jsPDF loaded");
    document.head.appendChild(script);
};
loadJsPDF();

// Dummy Data for Bus Information

const buses = [
    {
        name: "Express Bus 1",
        departure: "Karachi",
        destination: "Lahore",
        date: "2025-03-01",
        time: "09:00",
        seatsAvailable: 20,
        price: "Rs. 1500"
    },
    {
        name: "Comfort Line",
        departure: "Karachi",
        destination: "Islamabad",
        date: "2025-03-02",
        time: "12:00",
        seatsAvailable: 2, // Fully booked
        price: "Rs. 2000"
    },
    {
        name: "Luxury Travel",
        departure: "Lahore",
        destination: "Islamabad",
        date: "2025-03-03",
        time: "15:00",
        seatsAvailable: 10,
        price: "Rs. 2500"
    }
];
let selectedSeats = [];
// Function to show the booking form modal when "Book Now" is clicked
// Function to show seat selection modal
function showSeatSelection(onDoneCallback) {
    selectedSeats = []; // Reset previous selection
    const modal = document.createElement("div");
    modal.id = "seatSelectionModal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "2000";
    modal.style.color = "black";

    // Create modal content container
    const content = document.createElement("div");
    content.style.backgroundColor = "#fff";
    content.style.padding = "20px";
    content.style.borderRadius = "10px";
    content.style.textAlign = "center";
    content.style.width = "500px";

    // Legend for seat status
    const legend = document.createElement("div");
    legend.style.display = "flex";
    legend.style.justifyContent = "center";
    legend.style.gap = "20px";
    legend.style.marginBottom = "20px";
    legend.innerHTML = `
        <div style="display: flex; align-items: center; gap: 5px;">
          <div style="width: 20px; height: 20px; border-radius: 4px; background-color: #4ce74c;"></div>
          <span>Available</span>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <div style="width: 20px; height: 20px; border-radius: 4px; background-color: #666666;"></div>
          <span>Booked</span>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <div style="width: 20px; height: 20px; border-radius: 4px; background-color: #99ccff;"></div>
          <span>Selected</span>
        </div>
    `;
    content.appendChild(legend);

    // Create seat container
    const seatContainer = document.createElement("div");
    seatContainer.style.display = "grid";
    seatContainer.style.gridTemplateColumns = "repeat(4, 50px)";
    seatContainer.style.gap = "10px";
    seatContainer.style.padding = "20px";
    seatContainer.style.border = "2px solid #333";
    seatContainer.style.backgroundColor = "#fff";
    seatContainer.style.borderRadius = "10px";
    seatContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

    // Generate seats (Some booked, some available)
    const seatStatus = [
        true, false, false, true, // Row 1
        false, true, false, false, // Row 2
        true, false, true, false, // Row 3
        false, false, false, true // Row 4
    ]; // true = Booked, false = Available

    for (let i = 0; i < seatStatus.length; i++) {
        const seat = document.createElement("div");
        seat.textContent = i + 1; // Seat number starts from 1
        seat.style.fontSize = "18px";
        seat.style.textAlign = "center";
        seat.style.padding = "10px";
        seat.style.border = "1px solid #ccc";
        seat.style.borderRadius = "5px";
        seat.style.cursor = "pointer";
        seat.style.userSelect = "none";

        if (seatStatus[i]) {
            // Booked seats (Gray)
            seat.style.backgroundColor = "#666666";
            seat.style.color = "white";
            seat.style.cursor = "not-allowed";
        } else {
            // Available seats (Green)
            seat.style.backgroundColor = "#4ce74c";
            seat.style.color = "green";
            
            // Handle selection logic
            seat.addEventListener("click", () => {
                if (selectedSeats.includes(i + 1)) {
                    selectedSeats = selectedSeats.filter(seatNum => seatNum !== i + 1);
                    seat.style.backgroundColor = "#4ce74c"; // Available color
                    seat.style.color = "green";
                } else {
                    selectedSeats.push(i + 1);
                    seat.style.backgroundColor = "#99ccff"; // Selected color
                    seat.style.color = "blue";
                }
            });
        }

        seatContainer.appendChild(seat);
    }

    content.appendChild(seatContainer);

    // Done Button
    const doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    doneButton.style.backgroundColor = "blue";
    doneButton.style.color = "white";
    doneButton.style.padding = "10px";
    doneButton.style.border = "none";
    doneButton.style.borderRadius = "5px";
    doneButton.style.marginTop = "20px";

    doneButton.addEventListener("click", () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }
        modal.remove();
        onDoneCallback();
    });

    content.appendChild(doneButton);
    modal.appendChild(content);
    document.body.appendChild(modal);
}


// Function to display available buses in the hero section
function toggleBusInfo() {
    const heroContent = document.getElementById("heroContent");
    heroContent.innerHTML = ""; // Clear existing content

    buses.forEach((bus) => {
        const busCard = document.createElement("div");
        busCard.style.border = "2px solid #333";
            busCard.style.paddingBottom = "40px";
            busCard.style.paddingTop = "5px";
            busCard.style.paddingRight = "40px";
            busCard.style.paddingLeft = "40px";
            busCard.style.margin = "10px 0";
            busCard.style.borderRadius = "5px";
            busCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            busCard.style.textAlign = "left";
            busCard.style.width = "990px";
            busCard.style.height = "310px";
            busCard.style.display = "flex";
            busCard.style.flexDirection = "column";
            busCard.style.justifyContent = "space-between";

        busCard.innerHTML = `
            <h2 style="color: white; margin-bottom: 5px;">${bus.name}</h2>
            <p style="margin: 5px 0;"><strong>Departure:</strong> ${bus.departure}</p>
            <p style="margin: 5px 0;"><strong>Destination:</strong> ${bus.destination}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${bus.date}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${bus.time}</p>
            <p style="margin: 5px 0;"><strong>Seats Available:</strong> ${bus.seatsAvailable}</p>
            <p style="margin: 5px 0;"><strong>Price:</strong> ${bus.price}</p>
        `;

        // Create dynamic "Book Now" button
        const bookButton = document.createElement("button");
        bookButton.textContent = "Book Now";
        bookButton.style.marginTop = "10px";
        bookButton.style.padding = "10px";
        bookButton.style.border = "none";
        bookButton.style.borderRadius = "5px";
        bookButton.style.fontSize = "16px";

        if (bus.seatsAvailable > 0) {
            bookButton.style.backgroundColor = "white";
            bookButton.style.color = "black";
            bookButton.style.cursor = "pointer";
            bookButton.addEventListener("click", () => showBookingForm(bus));
        } else {
            bookButton.disabled = true;
            bookButton.style.backgroundColor = "white";
            bookButton.style.color = "black";
            bookButton.style.cursor = "not-allowed";
        }

        busCard.appendChild(bookButton);
        heroContent.appendChild(busCard);
    });
}
function showBookingForm(bus) {
    selectedSeats = []; // Reset selected seats
    const formContainer = document.createElement("div");
    formContainer.id = "bookingForm";
    formContainer.style = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background-color: #fff; padding: 20px; border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); width: 400px;
        text-align: center; z-index: 1000; color: black;
    `;

    formContainer.innerHTML = `
        <h2>Passenger Details</h2>
        <p><strong>Bus:</strong> ${bus.name}</p>
        <label for="passengerName">Name:</label>
        <input type="text" id="passengerName" required style="width: 100%; margin-bottom: 10px; padding: 5px;" />

        

        <label for="cnic">CNIC:</label>
        <input type="text" id="cnic" required placeholder="12345-6789012-3" style="width: 100%; margin-bottom: 10px; padding: 5px;" />

        <label for="gender">Gender:</label>
        <select id="gender" style="width: 100%; margin-bottom: 10px; padding: 5px;">
            <option value="">--Select Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <br>
        <button id="selectSeats" style="background-color: blue; color: white; padding: 10px;">Select Seats</button>
        <button id="confirmBooking" disabled style="background-color: grey; color: white; padding: 10px;">Confirm Booking</button>
        <button id="closeForm" style="background-color: red; color: white; padding: 10px;">Cancel</button>
    `;

    document.body.appendChild(formContainer);

    document.getElementById("selectSeats").addEventListener("click", () => {
        showSeatSelection(() => {
            document.getElementById("confirmBooking").disabled = false;
            document.getElementById("confirmBooking").style.backgroundColor = "green";
        });
    });

    document.getElementById("confirmBooking").addEventListener("click", () => {
        generatePDF(bus);
        formContainer.remove();
    });

    document.getElementById("closeForm").addEventListener("click", () => {
        formContainer.remove();
    });
}
function generatePDF(bus) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Company Logo (Replace 'company_logo.png' with the actual logo URL or base64)
    const logoURL = "logo.png"; // Replace with actual logo URL
    doc.addImage(logoURL, "PNG", 80, 10, 50, 20); // Adjust position & size

    // Company Name
    doc.setFontSize(20);
    doc.text("Your Perfect Journey Partner", 60, 40); // Company Name

    // Company Details
    doc.setFontSize(12);
    doc.text("Lahore, Pakistan", 60, 50);
    doc.text("Contact: +92332450258 | Email: contact@transpoflow.com", 60, 60);
    doc.text("Website: www.transpoflow.com", 60, 70);

    // Draw a separator line
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    // Ticket Information
    doc.setFontSize(14);
    doc.text("Bus Ticket Details", 80, 85);

    doc.setFontSize(12);
    doc.text(`Passenger Name: ${document.getElementById("passengerName").value}`, 20, 100);
    
    doc.text(`CNIC: ${document.getElementById("cnic").value}`, 20, 120);
    doc.text(`Gender: ${document.getElementById("gender").value}`, 20, 130);
    doc.text(`Bus Name: ${bus.name}`, 20, 140);
    doc.text(`Departure: ${bus.departure}`, 20, 150);
    doc.text(`Destination: ${bus.destination}`, 20, 160);
    doc.text(`Date: ${bus.date}`, 20, 170);
    doc.text(`Time: ${bus.time}`, 20, 180);

    // ✅ Now correctly shows selected seats
    doc.text(`Total Seats: ${selectedSeats.length}`, 20, 190);
    doc.text(`Selected Seat Numbers: ${selectedSeats.join(", ")}`, 20, 200);

    doc.text(`Price: ${bus.price}`, 20, 210);

    // Save the PDF
    doc.save("Bus_Ticket.pdf");
}


// Set up event listener for the "Find Your Bus" button
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", toggleBusInfo);
    }
});



/* Fare Calcutor */
document.getElementById("calculateFareButton").addEventListener("click", function() {
    const fares = {
        "Karachi-Kashmir": 5000,
        "Karachi-Narowal": 4000,
        "Karachi-Sahiwal": 3500,
        "Lahore-Kashmir": 3000,
        "Lahore-Narowal": 2000,
        "Lahore-Sahiwal": 1800,
        "Islamabad-Kashmir": 2500,
        "Islamabad-Narowal": 2200,
        "Islamabad-Sahiwal": 2000
    };
    
    const fromCity = document.getElementById("fare-from").value;
    const toCity = document.getElementById("fare-to").value;
    const seats = parseInt(document.getElementById("fare-seats").value);
    const passengerType = document.getElementById("passenger").value;
    
    if (!fromCity || !toCity || !seats || seats < 1) {
        alert("Please select valid cities and number of seats.");
        return;
    }
    
    const route = `${fromCity}-${toCity}`;
    let farePerSeat = fares[route] || 0;
    
    if (farePerSeat === 0) {
        alert("No fare available for the selected route.");
        return;
    }
    
    let totalFare = farePerSeat * seats;
    
    // Apply discounts based on passenger type
    if (passengerType === "child") {
        totalFare *= 0.5; // 50% discount
    } else if (passengerType === "senior") {
        totalFare *= 0.8; // 20% discount
    }
    
    document.getElementById("totalFare").textContent = `PKR ${totalFare.toFixed(2)}`;
});
