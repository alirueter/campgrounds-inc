function clearResults(){
    document.getElementById('search-results').innerHTML = "";
}

document.querySelector('#clear-button').addEventListener('click', function(event) {
    event.preventDefault();
    clearResults();
    });