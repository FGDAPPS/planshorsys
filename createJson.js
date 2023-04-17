var fs = require('fs');

deleteAndCreate();

function deleteAndCreate(){
    fs.unlinkSync('PlansTypeA.json');
    fs.unlinkSync('PlansTypeB.json');
    fs.unlinkSync('PlansTypeC.json');
    fs.unlinkSync('PlansTypeD.json');
var data =  []
fs.writeFile ("PlansTypeA.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    // console.log('complete A');
    }
);
fs.writeFile ("PlansTypeB.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    // console.log('complete B');
    }
);
fs.writeFile ("PlansTypeC.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    // console.log('complete C');
    }
);
fs.writeFile ("PlansTypeD.json", JSON.stringify(data), function(err) {
    if (err) throw err;
    // console.log('complete D');
    }
);
}