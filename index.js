var fs = require('fs');
var addkey = require('jsonaddkey');

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var inputs = process.argv;

var newKey;

process.stdout.write("inputs are: "  + inputs.toString());



var fipath = inputs[2];

fs.readFile(fipath, 'utf8', function(err, data){
    if(err){
        console.error('Something went wrong reading the data');
        process.stdout.write(err);

    }

    var data = JSON.parse(data);

    if( inputs[3] ){
        newKey = inputs[3];
        process.stdout.write('should be adding the new key');

        data = addkey(data, newKey);

        process.stdout.write('data with key commd given ' + data.toString());

        addVals(data, 0);

        console.log('and revided data should be: ', data);

    //    fs.close();
    }
    else {
        process.stdout.write('No new key identifier given. Please add this after the path to the file');
        process.stdout.write('Please enter a new key now')

        rl.question('Enter a new key to use: ', function(inkey) {

            rl.pause();


            process.stdout.write('new key to be used is :' + inkey + '\n');

            newKey = inkey;

            data = addkey(data, newKey);

            var something = addVals(data, 0);

            //console.log('and revised data should be: ', data);

        })

    }



})


function addVals(data, inval){
    var datkeys = Object.keys(data);
    var data = data;
  //  console.log(datkeys)


        var onob = data[datkeys[inval]];

      //  process.stdout.write(' need to Add value to: ' + onob + '\n') ;

        rl.question("New value for " + newKey + ":  ", function(inputval){

            var hottanany = inputval;

            onob[newKey] = inputval;

            data[datkeys[inval]] = onob;


            rl.pause();

            console.log(datkeys.length +' and the i is ' + inval)

// now need to decide what to do with the changed data
            if(inval >= datkeys.length -1){
              rl.close();
              console.log(data);
              return data;
            }
            else{
              var indgo = inval + 1;
              return addVals(data, indgo);
            }

       })


}
