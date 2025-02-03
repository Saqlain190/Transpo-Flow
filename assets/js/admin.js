
let sideMenu = document.querySelectorAll(".nav-link");
sideMenu.forEach((item) => {
  let li = item.parentElement;

  item.addEventListener("click", () => {
    sideMenu.forEach((link) => {
      link.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

let menuBar = document.querySelector(".menu-btn");
let sideBar = document.querySelector(".sidebar");
menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("hide");
});

let switchMode = document.getElementById("switch-mode");
switchMode.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

let searchFrom = document.querySelector(".content nav form");
let searchBtn = document.querySelector(".search-btn");
let searchIcon = document.querySelector(".search-icon");
searchBtn.addEventListener("click", (e) => {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchFrom.classList.toggle("show");
    if (searchFrom.classList.contains("show")) {
      searchIcon.classList.replace("fa-search", "fa-times");
    } else {
      searchIcon.classList.replace("fa-times", "fa-search");
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 576) {
    searchIcon.classList.replace("fa-times", "fa-search");
    searchFrom.classList.remove("show");
  }
  if (window.innerWidth < 768) {
    sideBar.classList.add("hide");
  }
});

if (window.innerWidth < 768) {
  sideBar.classList.add("hide");
}


document.addEventListener('DOMContentLoaded', function() {
  var ctx = document.getElementById('trafficChart').getContext('2d');
  
  var trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Days of the week
    datasets: [{
      label: 'Website Traffic (Visitors)',
      data: [120, 150, 180, 220, 250, 300, 350], // Traffic data (number of visitors)
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  var trafficChart = new Chart(ctx, {
    type: 'line', // Type of chart
    data: trafficData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.raw + ' visitors'; // Add "visitors" label to the tooltip
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 50,
          }
        }
      }
    }
  });
});

// Example data for company info
const companyInfo = {
  name: "Tech Solutions Inc.",
  color: "#3498db", // Hex color
  address: "1234 Elm Street, Suite 567, Tech City",
  phone: "+1 (555) 123-4567"
};

// Function to populate the company info in the HTML elements
document.addEventListener('DOMContentLoaded', function() {
  // Set company name
  document.getElementById('company-name').textContent = companyInfo.name;

  // Set company theme color
  document.getElementById('company-color').textContent = companyInfo.color;
  document.getElementById('company-color').style.backgroundColor = companyInfo.color;

  // Set company address
  document.getElementById('company-address').textContent = companyInfo.address;

  // Set company phone number
  document.getElementById('company-phone').textContent = companyInfo.phone;
});
// JavaScript for handling Edit and Save buttons
document.addEventListener('DOMContentLoaded', function() {
  const editButtons = document.querySelectorAll('.edit-btn');
  const saveButtons = document.querySelectorAll('.save-btn');
  const inputs = document.querySelectorAll('input');

  // Add Event Listener to Edit buttons
  editButtons.forEach((editBtn, index) => {
    editBtn.addEventListener('click', function() {
      // Enable input fields and show the Save button
      const row = editBtn.closest('tr');
      const rowInputs = row.querySelectorAll('input');
      rowInputs.forEach(input => input.disabled = false);

      // Show Save button, Hide Edit button
      editBtn.style.display = 'none';
      row.querySelector('.save-btn').style.display = 'inline-block';
    });
  });

  // Add Event Listener to Save buttons
  saveButtons.forEach((saveBtn, index) => {
    saveBtn.addEventListener('click', function() {
      const row = saveBtn.closest('tr');
      const rowInputs = row.querySelectorAll('input');
      
      // Disable input fields and hide the Save button
      rowInputs.forEach(input => input.disabled = true);

      // Show Edit button, Hide Save button
      row.querySelector('.edit-btn').style.display = 'inline-block';
      saveBtn.style.display = 'none';

      // Optional: You can add code here to save the changes (e.g., make an API call)
      console.log('Changes saved for row:', rowInputs);
    });
  });
});
