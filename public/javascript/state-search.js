// fetch national park api
var campgroundStateSearch = function(event) {
    event.preventDefault();

    const state = document.querySelector('#stateDropDown').value.trim();
    var url = "https://developer.nps.gov/api/v1/campgrounds?stateCode=" + state + "&api_key=MhULk8Ddiq8LChoxjMFP1euW2OvKmzF3lrN2Cu0c";

    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            const cg = data.data;

            generateSearch(cg);

            //saveCampground();                
        });
};

function generateSearch(campgrounds) {

    const campgroundsArray = campgrounds;

    for (var i = 0; i < campgroundsArray.length; i++) {

        const searchResultsList = document.querySelector('#search-results');
        const address = campgroundsArray[i].addresses[0];
        const email = campgroundsArray[i].contacts.emailAddresses[0];
        const number = campgroundsArray[i].contacts.phoneNumbers[0];
        const picture = campgroundsArray[i].images[0];

        // append camp name
        var campName = document.createElement("li");
        campName.innerHTML = '<h6>' + campgroundsArray[i].name + '</h6>';
        searchResultsList.appendChild(campName);

        console.log(campgroundsArray[i].images[0]);

        // append image
        if (picture == null || picture.url == "") {
            console.log('No picture!');
        } else {
           var campImage = document.createElement("p");
           campImage.innerHTML = '<img src="' + picture.url +'" credit="'
            + picture.credit + '" alt="'
            + picture.altText + '">';
            
            searchResultsList.appendChild(campImage)
        }

        // append address
        if (address == null || address.line1 == "") {
            var noAddress = document.createElement("li");
            noAddress.innerHTML = "No address available";
            searchResultsList.appendChild(noAddress);
        } else {
            var validAddress = document.createElement("li");

            validAddress.innerHTML = '<p>• ' + address.line1 +
            '</p><p>• ' + address.city + ', ' + address.stateCode + ', '
            + address.postalCode + '</p>';
            searchResultsList.appendChild(validAddress);
        }

        // append number
        if (number == null || number.phoneNumber == "") {
            var noNumber = document.createElement("li");
            noNumber.innerHTML = "<b>Number: N/A</b>";
            searchResultsList.appendChild(noNumber);
        } else {
            var validNumber = document.createElement("li");

            validNumber.innerHTML = '<b>Number:</b> ' + number.phoneNumber;
            searchResultsList.appendChild(validNumber);
        }

        // append email
        if (email == null || email.emailAddress == "") {
            var noEmail = document.createElement("li");
            noEmail.innerHTML = "<b>Email: N/A</b>";
            searchResultsList.appendChild(noEmail);
        } else {
            var validEmail = document.createElement("li");

            validEmail.innerHTML = '<b>Email:</b> ' + email.emailAddress + '</br></br>';
            searchResultsList.appendChild(validEmail);
        }
    }
};

async function saveCampground(event) {
    event.preventDefault();

    const campground_name = document.querySelector('#campground-name').value.trim();
    const location = document.querySelector('#campground-location').value.trim();

    if (campground_name && location) {
        const response = await fetch('/api/campgrounds', {
            method: 'post',
            body: JSON.stringify({
                campground_name,
                location
            }),
            headers: {'Content-Type': 'application/json'}
        });
        
        // check response status
        if (response.ok) {
            //what to put here
        }
        else {
            alert(response.statusText);
        }
    }
};

//document.querySelector('.campground-list-item').addEventListener('submit', saveCampground);

document.querySelector("#cg-state-search-form").addEventListener('submit', campgroundStateSearch);