const API_URL = 'https://crudcrud.com/api/86eed781109647b0983b539ffb3aae21'; 

async function book() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const bus = document.getElementById('bus').value;

    const booking = {
        name,
        email,
        phone,
        bus
    };

    try {
        const response = await fetch(API_URL + '/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        });

        if (!response.ok) {
            throw new Error('Failed to book. Please try again.');
        }

        displayBookings();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function displayBookings() {
    const filter = document.getElementById('filter').value;
    const bookingsContainer = document.getElementById('bookings');
    bookingsContainer.innerHTML = '';

    try {
        const response = await fetch(API_URL + '/bookings');
        const data = await response.json();

        data.forEach((booking, index) => {
            if (filter === 'all' || booking.bus === filter) {
                const item = document.createElement('div');
                item.classList.add('booked-item');
                item.innerHTML = `
                    <span>Name: ${booking.name}</span>
                    <span>Email: ${booking.email}</span>
                    <span>Phone: ${booking.phone}</span>
                    <span>Bus: ${booking.bus}</span>
                    <button onclick="editBooking('${booking._id}')">Edit</button>
                    <button onclick="deleteBooking('${booking._id}')">Delete</button>
                `;
                bookingsContainer.appendChild(item);
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function deleteBooking(id) {
    try {
        const response = await fetch(API_URL + `/bookings/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete booking. Please try again.');
        }

        displayBookings();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function editBooking(id) {
    try {
        const response = await fetch(API_URL + `/bookings/${id}`);
        const booking = await response.json();

        document.getElementById('name').value = booking.name;
        document.getElementById('email').value = booking.email;
        document.getElementById('phone').value = booking.phone;
        document.getElementById('bus').value = booking.bus;

        await deleteBooking(id);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function filter() {
    displayBookings();
}

displayBookings();
