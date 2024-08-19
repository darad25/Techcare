document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.coalitiontechnologies.com/patientdata'; // Example URL, replace with actual API endpoint

    // Function to fetch and display patient data
    async function fetchPatientData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayPatientData(data);
            createBloodPressureChart(data.bloodPressure);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    }

    // Function to display patient data
    function displayPatientData(data) {
        const patientList = document.getElementById('patient-list');
        data.patients.forEach(patient => {
            const li = document.createElement('li');
            li.textContent = `${patient.name}, ${patient.age}`;
            patientList.appendChild(li);
        });

        document.getElementById('patient-name').textContent = data.patientDetails.name;
        document.getElementById('dob').textContent = data.patientDetails.dob;
        document.getElementById('gender').textContent = data.patientDetails.gender;
        document.getElementById('contact').textContent = data.patientDetails.contact;
        document.getElementById('emergency').textContent = data.patientDetails.emergency;
        document.getElementById('systolic').textContent = data.bloodPressure.systolic;
        document.getElementById('diastolic').textContent = data.bloodPressure.diastolic;
    }

    // Function to create blood pressure chart
    function createBloodPressureChart(bpData) {
        const ctx = document.getElementById('bpChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: bpData.years,
                datasets: [{
                    label: 'Systolic',
                    data: bpData.systolic,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                }, {
                    label: 'Diastolic',
                    data: bpData.diastolic,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Fetch and display data on page load
    fetchPatientData();
});
