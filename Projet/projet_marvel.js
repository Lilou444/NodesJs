#!/usr/bin/env node


##Lilou444
##18-11-2018


const axios = require('axios');
const inquirer = require('inquirer');
const program = require('commander');


// Configuration des paramètres attendus
program
.version('1.0.0')
.option('-m, --Marvel', 'Show hello world')
.option('-a, --all', 'Show hello all')
// On parse (convertit en format utilisable) les options // fonction synchrone
program.parse(process.argv)
// Maintenant on peut les utiliser
if (program.Marvel) { console.log('Bienvenu dans le monde de marvel')
} else if (program.all) { console.log('Hello all!')
} else { program.help()
}


inquirer.prompt([{
    type: 'input',
    message: 'Salut , Entres ton prénom',
    name: 'username'
        }, {
    name:'connaissance',
    type: 'confirm',
    message: 'Connais-tu d\'autres personnages ayant pour initial Sp ou H?'

},{
    name:'initial',
    type: 'list',
    message: 'choisis parmi ces initials et on te donneras  3 personnages',
    choices: ['Sp','H'],

},{
    name:'event1',
    type: 'list',
    message: 'Quel personnage ne fait pas parti de l\'event Civil war ?',
    choices: ['Avenger','Blood','Bishop'],

},{
    name:'event2',
    type: 'list',
    message: ' Parmis ces  3 personnages lequel est présent dans l\'event Planet hulk?',
    choices: ['Spider man','Korg','Arnim Zola'],

}
]).then((answers) => {

    console.log(`\n Hey ${answers.username}, nous allons regarder ensemble tes réponses.\n`)
    console.log(`\n Pour l'event Civil war Voici ta réponse "${answers.event1}"😋. Voyon voir si tu as répondu juste.\n`)
    
    if (answers.event1 == "Blood") {
        console.log("Bien joué Blood ne fait pas parti de l'event Civil War")
    }
    else {
        console.log("Hey non raté ")
    }
    
    console.log(`\nPour l'event planet hulk ,Voici ta réponse "${answers.event2}"😋\. As-tu la bonne réponse?.\n`)
    
    if (answers.event2 == "Korg") {
        console.log("Bien joué")
    }
    else{
        console.log("hey non raté")
    }

    console.log(`\ntu as choisi cet initial  "${answers.initial}"😋\.\n`)
    if (answers.initial == 'Sp') {
        axios.get('https://gateway.marvel.com/v1/public/characters?nameStartsWith=sp&limit=5&ts=1&apikey=0c7f40c2d652d10d7d2f246feeae2f23&hash=b5ae63f04a7e491fa938eeeebdac2174')
        .then(function (data) {
            console.log("Voici trois personnages avec l'initial  Sp :")
            console.log(data.data.data.results[0].name)
            console.log(data.data.data.results[1].name)
            console.log(data.data.data.results[2].name)
        }).catch(function (error) {
            console.log(error);
        })
    }
    else { 
        axios.get('https://gateway.marvel.com/v1/public/characters?nameStartsWith=H&limit=5&ts=1&apikey=0c7f40c2d652d10d7d2f246feeae2f23&hash=b5ae63f04a7e491fa938eeeebdac2174')
         .then(function (data) {
             console.log("voici trois personnages avec l'initial H :")
             console.log(data.data.data.results[0].name)
             console.log(data.data.data.results[1].name)
             console.log(data.data.data.results[2].name)
            }).catch(function (error) {
                console.log(error);
             })
            }
        })

        
