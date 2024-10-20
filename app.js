// Fetch and display cruises
function fetchCruises() {
    const cruisesSection = document.getElementById('cruises');
    db.collection('cruises').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const cruise = doc.data();
            const cruiseElement = document.createElement('div');
            cruiseElement.innerHTML = `<h2>${cruise.name}</h2><p>${cruise.description}</p>`;
            cruisesSection.appendChild(cruiseElement);
        });
    });
}

// Call fetchCruises on page load
document.addEventListener('DOMContentLoaded', fetchCruises);
// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cruise = document.getElementById('cruise').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    db.collection('bookings').add({
        cruise: cruise,
        name: name,
        email: email
    }).then(() => {
        alert('Booking successful!');
    }).catch((error) => {
        console.error('Error adding booking: ', error);
        alert('There was an error with your booking. Please try again.');
    });
});