function clearResults(){
    // document.querySelector('.search-results').remove();
    document.getElementById('search-results').innerHTML = "";
}

document.querySelector('#clear-button').addEventListener('submit', clearResults);