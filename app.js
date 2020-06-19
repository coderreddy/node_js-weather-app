const yargs = require('yargs');
const geoCode = require('./utils/geoCode.js')
const chalk = require('chalk')
const weatherService = require('./utils/weather-service.js')

const city = process.argv[2];
const state = process.argv[3];


if (!Boolean(city) || !Boolean(state)) {
        console.log('Please provide City and State')
} else {
        geoCode(process.argv[2], process.argv[3], (error, {latitude, longitude}) => {
                if (error) {
                        console.log('Error from App.js Geocode: ' + error)
                } else {
                        weatherService(latitude, longitude, (error, data) => {
                                if (error) {
                                        console.log('Error from App.js WeatherService: ' + error)
                                } else {
                                        const {name, country} = data.location
                                        console.log(name, country)
                                }
                        })
                }
        })
}
//Command to request the input from User
// yargs.command({
//         command: 'address',
//         builder: {
//                 city: {
//                         describe: 'Enter city Name',
//                         demandOption: true,
//                         type: 'string'
//                 },
//                 state: {
//                         describe: 'Enter State Name',
//                         demandOption: true,
//                         type: 'string'
//                 }
//         },
//         handler(argv) {
//                 geoCode(argv.city,argv.state, (error,data) => {
//                         if(error) {
//                                 console.log('Error from App.js geoCode: '+error)
//                         } else {
//                         weatherService(data.latitude, data.longitude, (error,data) => {
//                                 if(error) {
//                                         console.log('Error from App.js weatherService: '+error);
//                                 }else {
//                                         console.log(chalk.blue.inverse(data.location.name , data.location.country))
//                                 }
//                         })
//                 }
//                 })


//         }

// })
//yargs.parse();