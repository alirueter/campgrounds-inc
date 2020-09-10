var campgroundStateSearch = function(event) {
    event.preventDefault();

    const state = document.querySelector('#stateDropDown').value.trim();
    var url = "https://developer.nps.gov/api/v1/campgrounds?stateCode=" + state + "&api_key=MhULk8Ddiq8LChoxjMFP1euW2OvKmzF3lrN2Cu0c";

    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            const cg = data.data;
            
            for (var i = 0; i < cg.length; i++) {

                //saveCampground();
                console.log(cg[i]);

                // these were added to reference back to later 

                /*const phoneNumber = cg[i].contacts.phoneNumbers;
                const emailAddress = cg[i].contacts.emailAddresses;
                const cost = cg[i].fees;
                const costDescription = cg[i].fees;
                const address = cg[i].addresses;
                
                
                console.log(cg[i].name,",", 
                    cg[i].id, ",",
                    cg[i].description, ",",
                    cg[i].reservationInfo, ",",
                    phoneNumber[i].phoneNumber, ",",
                    emailAddress[i].emailAddress, ",",
                    cost[i].cost, ",",
                    costDescription[i].description, ",",
                    address[i].line1, ",",
                    address[i].city, ",",
                    address[i].stateCode, ",",
                    address[i].postalCode);*/
                
            }
        });
}

// add this function to a function that gets the response from select dropdown
// can see the call in action in console log if replace state with a string of stateCode
// example campgroundStateSearch('WI');
//campgroundStateSearch(state);

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

document.querySelector("#cg-state-search-form").addEventListener('submit', campgroundStateSearch)