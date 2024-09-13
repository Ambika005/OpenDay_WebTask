let allData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 100;
function fetchData() {
    fetch('https://openday.kumaraguru.in/api/v1/departments/')
        .then(response => response.json())
        .then(data => {
            allData = data;
            filteredData = allData; 
            renderPage(currentPage);
        })
        .catch(error => console.error('Error fetching data:', error));
}
function renderPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = filteredData.slice(startIndex, endIndex);

    displayData(dataToDisplay);

    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = endIndex >= filteredData.length;
}
function displayData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    data.forEach(item => {
        const randomImageId = Math.floor(Math.random() * 1000) + 1;
        const backgroundImageUrl = `https://picsum.photos/id/${randomImageId}/300/200`;

        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.style.backgroundImage = `url(${backgroundImageUrl})`;
        itemElement.onclick = () => onPress(item.id);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('item-content');
        contentDiv.innerHTML = `<h2>${item.name}</h2>`;
        itemElement.appendChild(contentDiv);

        container.appendChild(itemElement);
    });
}
function onPress(id) {
    const url = `https://openday.kumaraguru.in/api/v1/department/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(result => {
            const img = `<img src="https://picsum.photos/id/${id-1}/1600/600" alt="Department Image">`;
            const dname = `<h2>Department Name: ${result.name}</h2>`;
            const desc = `<h2>Description: ${result.description}</h2>`;
            const link = ` <h2 ><a href="${result.link}" target="_blank">${result.link}</a></h2>`;
            const block = `<h2>Block: ${result.block}</h2>`;
            localStorage.setItem("result0", img);
            localStorage.setItem("result1", dname);
            localStorage.setItem("result2", desc);
            localStorage.setItem("result3", link);
            localStorage.setItem("result4", block);

            window.location.href = "details.html";
        })
        .catch(error => console.error('Error fetching department details:', error));
}
function filterData(query) {
    query = query.toLowerCase();
    filteredData = allData.filter(item => item.name.toLowerCase().includes(query));
    currentPage = 1; 
    renderPage(currentPage);
}
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});
document.getElementById('next-btn').addEventListener('click', () => {
    if ((currentPage * itemsPerPage) < filteredData.length) {
        currentPage++;
        renderPage(currentPage);
    }
});
document.getElementById('search-input').addEventListener('input', (event) => {
    filterData(event.target.value);
});
document.addEventListener('DOMContentLoaded', () => {
    loadBannerImage();
    fetchData();
});
function loadBannerImage() {
    function generateRandomId() {
        return Math.floor(Math.random() * 1000);
    }
function loadImage() {
        const randomId = generateRandomId();
        const imageUrl = `https://picsum.photos/id/${randomId}/800/300`;
        document.getElementById('bannerImage').src = imageUrl;
    }
    loadImage(); 
    setInterval(loadImage, 3000); 
}
