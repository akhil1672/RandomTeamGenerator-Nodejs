const fs = require('fs')
const prompt=require('prompt')
prompt.start()
var json = require('C:\\Users\\Akhil\\Desktop\\Aspirants.json')
function shuffle(array) {
    var i = array.length,j = 0,temp;
    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
json=shuffle(json)
var teamSize = prompt.get(['TeamSize'],function(err,result)
{
    var size=result.TeamSize
    if(size<1)
    {
        console.log("Size cannot be 0 or negative or "+err)
        process.exit(1);
    }
    var jsonlength= json.length
    console.log("No of students:"+jsonlength)
    if(size>jsonlength)
    {
        console.log("Size cannot be greater than no of students" + err)
        process.exit(1);
    }
    var noofteams = Math.ceil(jsonlength/size)
    if(isNaN(noofteams))
    {
        console.log("Invalid entry!")
        process.exit(1)
    }
    console.log("No of teams:"+noofteams)
    var extra = jsonlength%size
    if(extra!=0)
    {
        console.log("Unequal teams! Continue(Y/N):")
        prompt.get(['Enter'],function(err,result)
        {
            var input = result.Enter
            if(input=="Y"||input=='y')
            {   
              createteams(jsonlength,size)
            }
            else if(input=="N"||input=='n')
                {
                    console.log("Have a good day!")
                }
            else
                console.log(err)

        })
}
    else
    {
        console.log("Equal teams")
        createteams(jsonlength,size)
    }
}) 
function createteams(jsonlength,size) {
    var j = 1, k = 0;
    console.log("CREATING TEAMS!");
    console.log("Team " + j);
    fs.writeFileSync('C:\\Users\\Akhil\\Desktop\\teams.txt', 'Team ' + j +'\r\n',(err)=>{
        if(err)
            throw err
    })
    for (var i = 0; i < jsonlength; i++ , k++) {
        if (k >= size) {
            j++
            console.log("Team " + j)
            fs.appendFileSync('C:\\Users\\Akhil\\Desktop\\teams.txt', "\r\nTeam " + j +'\r\n', (err) => {
                if (err)
                    throw err
            })
            k = 0
        }
        console.log(json[i].name)
        fs.appendFileSync('C:\\Users\\Akhil\\Desktop\\teams.txt', json[i].name+'\r\n' , (err) => {
            if (err)
                throw err
        })
    }
}