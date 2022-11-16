#!/usr/bin/env node
import axios from "axios";
import ora from 'ora';
import chalk from "chalk";
import figlet from "figlet";






figlet('HOLIDAYS <:D  ', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});



let code;
let country = process.argv[2].toLowerCase();


// console.log(country);

async function countryCode(){
    return await axios.get('https://date.nager.at/api/v3/AvailableCountries' )
    // console.log(response)
    .then(response=>{
        let data = response.data;
        return data;
    })

    
    
};

async function checkcode(response){
    let data = await countryCode();
    // console.log(data)
    for(let i=0;data.length;i++){

        if (data[i]?.name?.toLowerCase() === country){
            code = data[i].countryCode;
            // console.log(code);
            return code;
        }
    }
}


async function countryHolidays(response){
    let code = await checkcode();
    const currentYear = new Date().getFullYear();
    let promise = await axios.get("https://date.nager.at/api/v3/PublicHolidays/" + currentYear +"/"+ code)
    let object= promise["data"];
    object.forEach(element => {
        console.log("\n"+chalk.blue(element["date"].padEnd(20)) + " "+chalk.redBright(element["localName"].padEnd(30))+" "+chalk.bgMagenta(element["name"]).padEnd(30) ) ;
       // console.log(chalk.redBright(element["localName"]));
       // console.log(chalk.bgMagenta(element["name"]));
    });

    // console.log(object["date"]);
    // console.log(promise["LocalName"]);
    // console.log(promise["name"]);
   
}





countryCode();
checkcode();
countryHolidays();


const spinner = ora('').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading Holidays';
    spinner.stop();
}, 1000);
