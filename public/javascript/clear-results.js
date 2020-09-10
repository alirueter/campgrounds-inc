console.log("clear-results.js is loaded");

function clearResults(){
    console.log("clearResults running....");

    // document.querySelector('.search-results').remove();
    document.getElementById('search-results').innerHTML = "";
}

document.querySelector('#clear-button').addEventListener('click', function(event) {
    event.preventDefault();
    clearResults();
    });