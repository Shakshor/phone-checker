// Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}


// Search Input
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    // clear data
    searchField.value = '';

    if (searchText == '') {
        //console.log('please put a text');
        const noResult = document.getElementById('no-result');
        noResult.style.display = 'block';
    }
    else {
        // display spinner
        toggleSpinner('block');
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
    }

};


const displaySearchResult = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    // clear the content
    searchResult.textContent = '';

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';

    // document.getElementById('no-result').style.display = 'none';

    const valid = phones?.length ? true : false;
    if (valid == false) {
        const noResult = document.getElementById('no-result');
        noResult.style.display = 'block';
    }
    else {
        phones.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 shadow b-none">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto pt-4" alt="...">
                <div class="card-body text-center">
                <h3 class="card-title">${phone.brand}</h3>
                <h4 class="card-title">${phone.phone_name}</h4>
                <a href="#" onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Explore</a>
                </div>
            `;
            searchResult.appendChild(div);
        });
        toggleSpinner('none');
    }

};

const loadPhoneDetail = phoneId => {
    // console.log(phoneId);
    toggleSpinner('block');
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
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
            <p class="card-title"><span class="fw-bold">ReleaseDate:</span> ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
            <p class="card-title"><span class="fw-bold">ChipSet:</span> ${phone.mainFeatures.chipSet}</p>
            <p class="card-text"><span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
            <p class="card-text"><span class="fw-bold">DisplaySize:</span> ${phone.mainFeatures.displaySize}</p>
            <p class="card-title"><span class="fw-bold">Sensors:</span> ${phone.mainFeatures.sensors}</p>
            <p class="card-title"><span class="fw-bold">WLAN:</span> ${phone.others ? phone.others.WLAN : 'not'}</p>
            <p class="card-title"><span class="fw-bold">Bluetooth:</span> ${phone.others ? phone.others.Bluetooth : 'not'}</p>
            <p class="card-title"><span class="fw-bold">GPS:</span> ${phone.others ? phone.others.GPS : 'not'}</p>
            <p class="card-title"><span class="fw-bold">NFC:</span> ${phone.others ? phone.others.NFC : 'not'}</p>
            <p class="card-title"><span class="fw-bold">Radio:</span> ${phone.others ? phone.others.Radio : 'not'}</p>
        </div>
        ` ;

    phoneDetails.appendChild(div);

    toggleSpinner('none');
};