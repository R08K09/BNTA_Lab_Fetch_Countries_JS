let countriesData;

// Function with fetch() request to RESTCountries API, returns response in JSON format
const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
};


// SetUp() function which calls your first function and populates a global variable with the output
const SetUp = async () => {
    // call fetchCountries function for global variable
    countriesData = await fetchCountries();

    // populates with information
    listCountries(); 

    // looking out for form submission
    const searchForm = document.querySelector("form");
    searchForm.addEventListener("submit", filteringCountries);
};


// Function that uses gloabl variable to:
// 1. create new HTML elements
// 2. populate each element with information (e.g. country name and population)
// 3. adding it to the <ul> 
const listCountries = () => {
    const countryList = document.querySelector("#countriesList");
    // clear contents of countryList and set to empty string
    countryList.innerHTML = "";

    // Loop through all of the countries
    countriesData.forEach((country) => {
        // create elements
        const countryItem = document.createElement("li");
        const name = document.createElement("h2");
        const population = document.createElement("p");

        // add in data to element
        name.textContent = country.name.common;
        population.innerText = `Population: ${country.population}`;

        // append the items onto the ul list
        countryItem.appendChild(name);
        countryItem.appendChild(population);
        countryList.appendChild(countryItem);
    });
};


// Function that filters global variable based off input value from the form
const filteringCountries = (event) => {
    event.preventDefault();

    // inputted value
    const input = document.querySelector(".filter").value;
    const filtered = countriesData.filter((country) => 
        country.name.common.toLowerCase().includes(input.toLowerCase())
    );

    // get filtered countries
    countriesData = filtered;
    listCountries();
};

SetUp();