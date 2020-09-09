//var searchBtn = document.querySelector("#state-search-btn");

//var state = document.querySelector("#stateDropDown");

var campgroundStateSearch = function(state) {

    var url = "https://developer.nps.gov/api/v1/campgrounds?stateCode=" + state + "&api_key=MhULk8Ddiq8LChoxjMFP1euW2OvKmzF3lrN2Cu0c";

    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            const cg = data.data;
            
            for (var i = 0; i < cg.length; i++) {

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
campgroundStateSearch(state);