// 1. Data Initialization
const slotsContainer = document.getElementById('slots-container');
const bookingModal = document.getElementById('booking-modal');
const closeBtn = document.querySelector('.close-btn');
const bookingForm = document.getElementById('booking-form');
const adminBookingList = document.getElementById('admin-booking-list');
const resetBtn = document.getElementById('reset-btn');

let selectedSlotId = null;

// Define available hours (6 AM to 9 PM)
const timeSlots = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", 
    "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", 
    "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

// Load bookings from LocalStorage or initialize empty object
let bookings = JSON.parse(localStorage.getItem('tceTurfBookings')) || {};

// 2. Function to Render Slots
function renderSlots() {
    slotsContainer.innerHTML = '';
    
    timeSlots.forEach((time) => {
        const isBooked = bookings[time];
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('slot');
        slotDiv.classList.add(isBooked ? 'booked' : 'available');
        
        slotDiv.innerHTML = `
            <div>${time}</div>
            <small>${isBooked ? 'Booked by ' + isBooked.roll : 'Available'}</small>
        `;

        if (!isBooked) {
            slotDiv.onclick = () => openBookingModal(time);
        }
        
        slotsContainer.appendChild(slotDiv);
    });

    updateAdminView();
}

// 3. Modal Controls
function openBookingModal(time) {
    selectedSlotId = time;
    document.getElementById('selected-slot-details').innerText = `Time Slot: ${time}`;
    bookingModal.style.display = 'block';
}

closeBtn.onclick = () => {
    bookingModal.style.display = 'none';
};

// 4. Handle Form Submission
bookingForm.onsubmit = (e) => {
    e.preventDefault();
    
    const name = document.getElementById('student-name').value;
    const roll = document.getElementById('roll-number').value;

    // Save to the local data object
    bookings[selectedSlotId] = { name, roll, date: new Date().toLocaleDateString() };

    // Save to LocalStorage
    localStorage.setItem('tceTurfBookings', JSON.stringify(bookings));

    // UI Updates
    alert(`Booking Successful for ${selectedSlotId}!`);
    bookingModal.style.display = 'none';
    bookingForm.reset();
    renderSlots();
};

// 5. Admin Functionality
function updateAdminView() {
    adminBookingList.innerHTML = '<h4>Active Bookings:</h4>';
    for (const time in bookings) {
        const b = bookings[time];
        adminBookingList.innerHTML += `<p><strong>${time}:</strong> ${b.name} (${b.roll})</p>`;
    }
}

resetBtn.onclick = () => {
    if(confirm("Clear all bookings for today?")) {
        bookings = {};
        localStorage.removeItem('tceTurfBookings');
        renderSlots();
    }
};

// 6. Initialize App
window.onclick = (event) => {
    if (event.target == bookingModal) bookingModal.style.display = 'none';
};

renderSlots();