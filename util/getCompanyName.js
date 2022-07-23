function getCompanyName(symbol) {
    let companyname = "";
    fetch(`http://localhost:8000/stocks/${symbol}`)
    .then(response => response.json())
    .then(data => companyname = data.name);
    return companyname;
}

export default getCompanyName;