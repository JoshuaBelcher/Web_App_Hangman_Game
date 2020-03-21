//fetch API replaces the XMLHttpRequest code and promise creation code
//it is an all-in-one command to send a request and designate its response as a Promise object

const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error ('Unable to get puzzle')
    }
}

export { getPuzzle as default }

// const getPuzzleOld = (wordCount) => {
//     return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error ('Unable to fetch puzzle')
//         }
//     }).then((data) => {
//         return data.puzzle
//     })
// }


// const getCurrentCountry = async () => {
//     const location = await getLocation()
//     return getCountry(location.country) 
// }

// const getCountry = async (countryCode) => {
//     const response = await fetch ('//restcountries.eu/rest/v2/all')

//     if (response.status === 200) {
//         const data = await response.json()
//         return data.find((country) => country.alpha2Code === countryCode)
//     } else {
//         throw new Error ('Unable to fetch country data')
//     }
// }

// const getLocation = async () => {
//     const response = await fetch ('//ipinfo.io/json?token=e3553d75000a5a')

//     if (response.status === 200) {
//         const data = await response.json()
//         return data
//     } else {
//         throw new Error ('Unable to fetch location data')
//     }
// }


// This function retrieves a new country from the API(?), parses the JSON into usable "data"
//then invokes the callback function to pass that data back into app.js, thereby avoiding
// the problem of the time delay required for the request, i.e. getCountry starts the process
// but prevents app.js from "getting ahead of itself" since getCountry as a whole does not
//finish its execution until its child callback function has finished its execution

// const getCountry = (countryCode) => new Promise ((resolve, reject) => {
//     const requestAll = new XMLHttpRequest()

//     requestAll.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data1 = JSON.parse(e.target.responseText)
//             const country = data1.find( (element) => element.alpha2Code === countryCode)
//             resolve(country)
//         } else if (e.target.readyState === 4) {
//             reject('Unable to fetch data')
//         }
//     })

//     requestAll.open('GET', 'http://restcountries.eu/rest/v2/all')
//     requestAll.send()
// })