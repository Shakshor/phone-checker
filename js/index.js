
// Search Input
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    // clear data
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
};

const displaySearchResult = phones => {
    console.log(phones);
    const divContainer = document.getElementById('search-result');
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body text-center">
            <h4 class="${phone.phone_name}">Card title</h4>
            <h5 class="${phone.brand}">Card title</h5>
            <a href="#" onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Explore</a>
            </div>
        `;
        divContainer.appendChild(div);
    });
};

const loadPhoneDetail = phoneId => {
    console.log(phoneId);
    const url = 'https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089';
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
};

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-75 mx-auto img-fluid" alt="...">
        <div class="card-body">
           <h5 class="card-title"><span class="fs-3">Model:</span> ${phone.name}</h5>
            <p class="card-title"><span class="fw-bold">ChipSet:</span> ${phone.mainFeatures.chipSet}</p>
            <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
            <p class="card-text">DisplaySize: ${phone.mainFeatures.displaySize}</p>
        </div>
        ` ;
    phoneDetails.appendChild(div);
};