// Function to generate random coordinates within a specified range
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generating 3 sets of random coordinates
const coords = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

// Initializing the map and setting view to U.S. coordinates
const map = L.map('map').setView([32.5, -95], 5); 

// Map background
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to fetch locality based on coordinates
async function fetchLocality(lat, lng) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || 'Locality not found';
}

// Function to add markers to the map and update the HTML with locality
async function addMarkers() {
    for (let i = 0; i < coords.length; i++) {
        const { lat, lng } = coords[i];
        const marker = L.marker([lat, lng]).addTo(map);
        const locality = await fetchLocality(lat, lng);

        // Update HTML with the marker coordinates and locality
        document.getElementById(`marker${i + 1}`).textContent = `Marker ${i + 1}: Latitude ${lat}, Longitude ${lng}`;
        document.getElementById(`locality${i + 1}`).textContent = `Locality ${i + 1}: ${locality}`;
    }
}

addMarkers();
