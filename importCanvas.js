const fs = require('fs');
require('child_process').fork('createJson.js');
var xlsToJSON = require("excel-to-clean-json");
let PlansTypeA = fs.readFileSync('PlansTypeA.json');
let PlansTypeB = fs.readFileSync('PlansTypeB.json');
let PlansTypeC = fs.readFileSync('PlansTypeC.json');
let PlansTypeD = fs.readFileSync('PlansTypeD.json');
let PlansDeTypeA = JSON.parse(PlansTypeA);
let PlansDeTypeB = JSON.parse(PlansTypeB);
let PlansDeTypeC = JSON.parse(PlansTypeC);
let PlansDeTypeD = JSON.parse(PlansTypeD);

var plans = xlsToJSON.json("listeDesPlans.xls", 'plans');
var SousConditionsPlans = xlsToJSON.json("listeDesPlans.xls", 'sousCond');
var Paliers = xlsToJSON.json("listeDesPlans.xls", 'paliers');

// deleteAndCreate()
plans.forEach(element => {
    dispatchPlans(element,SousConditionsPlans,Paliers); 
});

// require('child_process').fork('consolidationCalcul.js');
// require('child_process').fork('jsonconverter.js');   


function dispatchPlans(plan,SousCondition,Paliers){
    
    let nrPalier = plan.paliers;
    let sousCondition= plan.sousCondition;
    // let Customers= plan.allCustomers;
    let myspecCustomers='';
        
    if(!plan.specifiqueCustomers){
        myspecCustomers='';
    }else{
        myspecCustomers=plan.specifiqueCustomers;
    }
    
    // TYPE A
        if(nrPalier=='1' && sousCondition=='0' ){
        
    PlansDeTypeA.push({
CODE:  plan.CODE.toUpperCase() ,
TYPE:  plan.TYPE.toUpperCase() ,
ARTICLES:  plan.ARTICLES ,
OFFRE:  plan.OFFRE.toUpperCase() ,
valueOffre:  plan.valueOffre ,
valeurMinCondition:  plan.valeurMinCondition ,
cumulCommandes: plan.cumulCommandes,
allCustomers:plan.allCustomers ,
specifiqueCustomers: myspecCustomers,
dateDebut:excelDateToJSDate(plan.dateDebut),
dateFin:excelDateToJSDate(plan.dateFin),
mails:plan.mails ,
descriptionPlan:plan.description 


} );


    let data = JSON.stringify(PlansDeTypeA, null, 2);
    fs.writeFileSync('PlansTypeA.json', data);

        }
    // TYPE B
    if(!plan.specifiqueCustomers){
        myspecCustomers='';
    }else{
        myspecCustomers=plan.specifiqueCustomers;
    }

        if(nrPalier=='1' && sousCondition=='1' ){
        let sousCond= SousCondition.find(elem=> elem.CODE ==  plan.CODE);

   let ArticlesSousCond= sousCond.CODEX3;
   let detailsSousCond= sousCond.DETAILS;
   let minToOrderSousCOnd= sousCond.MINNOMBRE;
      
        PlansDeTypeB.push({
    CODE:  plan.CODE.toUpperCase() ,
    TYPE:  plan.TYPE.toUpperCase() ,
    ARTICLES:  plan.ARTICLES ,
    OFFRE:  plan.OFFRE.toUpperCase() ,
    valueOffre:  plan.valueOffre ,
    valeurMinCondition:  plan.valeurMinCondition ,
    ArticlesSousCond : ArticlesSousCond,
    detailsSousCond : detailsSousCond.toUpperCase(),
    minToOrderSousCOnd : minToOrderSousCOnd,
    cumulCommandes: plan.cumulCommandes,
    allCustomers:plan.allCustomers ,
    specifiqueCustomers: myspecCustomers,
    dateDebut:excelDateToJSDate(plan.dateDebut),
    dateFin:excelDateToJSDate(plan.dateFin),
    mails:plan.mails ,
    descriptionPlan:plan.description 
 } );
    
        let data = JSON.stringify(PlansDeTypeB, null, 2);
        fs.writeFileSync('PlansTypeB.json', data);
        
        }
    // TYPE C
    if(!plan.specifiqueCustomers){
        myspecCustomers='';
    }else{
        myspecCustomers=plan.specifiqueCustomers;
    }
        if(nrPalier>1 && sousCondition==0  ){
        
        PlansDeTypeC.push({
    CODE:  plan.CODE.toUpperCase() ,
    TYPE:  plan.TYPE.toUpperCase() ,
    ARTICLES:  plan.ARTICLES ,
    OFFRE:  plan.OFFRE ,
    valueOffre:  plan.valueOffre ,
    valeurMinCondition:  plan.valeurMinCondition ,
    paliers: paliersAdd(Paliers,plan.CODE),
    cumulCommandes: plan.cumulCommandes,
    allCustomers:plan.allCustomers ,
    specifiqueCustomers: myspecCustomers,
    dateDebut:excelDateToJSDate(plan.dateDebut),
    dateFin:excelDateToJSDate(plan.dateFin),
    mails:plan.mails ,
    descriptionPlan:plan.description 
   
 } );

        let data = JSON.stringify(PlansDeTypeC, null, 2);
        fs.writeFileSync('PlansTypeC.json', data);
       
        }
    // TYPE D
    // let myspecCustomers='';
        
        if(!plan.specifiqueCustomers){
            myspecCustomers='';
        }else{
            myspecCustomers=plan.specifiqueCustomers;
        }


        if(nrPalier > 1 && sousCondition == 1 ){
        
            PlansDeTypeD.push({
        // CODE:  plan.CODE ,
        // TYPE:  plan.TYPE ,
        // ARTICLES:  plan.ARTICLES ,
        // OFFRE:  plan.OFFRE ,
        // valueOffre:  plan.valueOffre ,
        // valeurMinCondition:  plan.valeurMinCondition ,
        // paliers: palierAppropriateSousCond(Paliers,SousConditionsPlans,plan.CODE),
        // cumulCommandes:plan.cumulCommandes,
        // dateDebut:excelDateToJSDate(plan.dateDebut),
        // dateFin:excelDateToJSDate(plan.dateFin)
        CODE:  plan.CODE.toUpperCase() ,
        TYPE:  plan.TYPE.toUpperCase() ,
        ARTICLES:  plan.ARTICLES ,
        OFFRE:  plan.OFFRE.toUpperCase() ,
        valueOffre:  plan.valueOffre ,
        valeurMinCondition:  plan.valeurMinCondition ,
        PALIERS: palierAppropriateSousCond(Paliers,SousConditionsPlans,plan.CODE),
        cumulCommandes: plan.cumulCommandes,
        allCustomers:plan.allCustomers ,
        specifiqueCustomers: myspecCustomers,
        dateDebut:excelDateToJSDate(plan.dateDebut),
        dateFin:excelDateToJSDate(plan.dateFin),
        mails:plan.mails ,
        descriptionPlan:plan.description 
     } );
    
            let data = JSON.stringify(PlansDeTypeD, null, 2);
            fs.writeFileSync('PlansTypeD.json', data);
           
        }



// Plans specifiques Customers 

// if(nrPalier=='1' && sousCondition=='0' && Customers==0){
        
//     PlansDeTypeAspec.push({
// CODE:  plan.CODE ,
// TYPE:  plan.TYPE ,
// ARTICLES:  plan.ARTICLES ,
// OFFRE:  plan.OFFRE ,
// valueOffre:  plan.valueOffre ,
// valeurMinCondition:  plan.valeurMinCondition ,
// customers:plan.specifiqueCustomers,
// cumulCommandes:plan.cumulCommandes,
// dateDebut:excelDateToJSDate(plan.dateDebut),
// dateFin:excelDateToJSDate(plan.dateFin)

// } );

//     let data = JSON.stringify(PlansDeTypeAspec, null, 2);
//     fs.writeFileSync('PlansTypeAspec.json', data);

//     }
// if(nrPalier=='1' && sousCondition=='1'  && Customers==0){
//     let sousCond= SousCondition.find(elem=> elem.CODE ==  plan.CODE);

// let ArticlesSousCond= sousCond.CODEX3;
// let detailsSousCond= sousCond.DETAILS;
// let minToOrderSousCOnd= sousCond.MINNOMBRE;
  
//     PlansDeTypeBspec.push({
// CODE:  plan.CODE ,
// TYPE:  plan.TYPE ,
// ARTICLES:  plan.ARTICLES ,
// OFFRE:  plan.OFFRE ,
// valueOffre:  plan.valueOffre ,
// valeurMinCondition:  plan.valeurMinCondition ,
// ArticlesSousCond : ArticlesSousCond,
// detailsSousCond : detailsSousCond,
// minToOrderSousCOnd : minToOrderSousCOnd,
// customers:plan.specifiqueCustomers,
// cumulCommandes:plan.cumulCommandes,
// dateDebut:excelDateToJSDate(plan.dateDebut),
// dateFin:excelDateToJSDate(plan.dateFin)
// } );

//     let data = JSON.stringify(PlansDeTypeBspec, null, 2);
//     fs.writeFileSync('PlansTypeBspec.json', data);
    
//     }
// if(nrPalier>1 && sousCondition==0  && Customers==0){
        
//                 PlansDeTypeCspec.push({
//             CODE:  plan.CODE ,
//             TYPE:  plan.TYPE ,
//             ARTICLES:  plan.ARTICLES ,
//             OFFRE:  plan.OFFRE ,
//             valueOffre:  plan.valueOffre ,
//             valeurMinCondition:  plan.valeurMinCondition ,
//             paliers: paliersAdd(Paliers,plan.CODE),
//             customers:plan.specifiqueCustomers,
//             cumulCommandes:plan.cumulCommandes,
//             dateDebut:excelDateToJSDate(plan.dateDebut),
//             dateFin:excelDateToJSDate(plan.dateFin)
           
//          } );
        
//                 let data = JSON.stringify(PlansDeTypeCspec, null, 2);
//                 fs.writeFileSync('PlansTypeCspec.json', data);
               
//     }
// if(nrPalier > 1 && sousCondition == 1  && Customers==0){
        
//                 PlansDeTypeDspec.push({
//             CODE:  plan.CODE ,
//             TYPE:  plan.TYPE ,
//             ARTICLES:  plan.ARTICLES ,
//             OFFRE:  plan.OFFRE ,
//             valueOffre:  plan.valueOffre ,
//             valeurMinCondition:  plan.valeurMinCondition ,
//             paliers: palierAppropriateSousCond(Paliers,SousConditionsPlans,plan.CODE),
//             customers:plan.specifiqueCustomers,
//             cumulCommandes:plan.cumulCommandes,
//             dateDebut:excelDateToJSDate(plan.dateDebut),
//             dateFin:excelDateToJSDate(plan.dateFin)
//          } );
        
//                 let data = JSON.stringify(PlansDeTypeDspec, null, 2);
//                 fs.writeFileSync('PlansTypeDspec.json', data);
               
//     }


        
    
}


function paliersAdd(Paliers,NoPlan){
    let mypaliers=[];
    console.log(Paliers)
    let mespaliers= Paliers.filter(elem=> elem.CODE ==  NoPlan);
            mespaliers.forEach(element => {
                 mypaliers.push({
                    NoPalier: element.NoPalier,
                    De: element.DE,
                    A:element.A,
                    Offre:element.OFFRE.toUpperCase(),
                    DetailsOffre:element.DETOFFRE
                })
            });
            console.log(mypaliers);
            return mypaliers;
}


function palierAppropriateSousCond(Paliers,SousConditionsPlans,NoPlan){
    let mypaliersSouscond=[];
    let mespaliers= Paliers.filter(elem=> elem.CODE ==  NoPlan);
    // console.log(mespaliers)
    let filtredPlan= SousConditionsPlans.filter(elem => elem.CODE == NoPlan);
    // console.log(filtredPlan);
    
            mespaliers.forEach(element => {
                // console.log(element.NoPalier)
                let masoucond=filtredPlan.find(elem=>elem.nrpalier == element.NoPalier);
                  mypaliersSouscond.push({
                    // NoPalier: element.NoPalier,
                    // De: element.DE,
                    // A:element.A,
                    // Offre:element.OFFRE,
                    // DetailsOffre:element.DETOFFRE,
                    // ArticlesSousCond : masoucond.CODEX3,
                    // detailsSousCond : masoucond.DETAILS,
                    // minToOrderSousCOnd : masoucond.MINNOMBRE
                    NoPalier: element.NoPalier,
                    De: element.DE,
                    A:element.A,
                    Offre:element.OFFRE.toUpperCase(),
                    DetailsOffre:element.DETOFFRE,
                    ArticlesSousCond : masoucond.CODEX3,
                    detailsSousCond : masoucond.DETAILS.toUpperCase(),
                    minToOrderSousCOnd : masoucond.MINNOMBRE
                })
            }); 
            return mypaliersSouscond;

}


function excelDateToJSDate(excelDate) {
    var date = new Date(Math.round((excelDate - (25567 +2)) * 86400 * 1000));
    var converted_date = date.toISOString().split('T')[0];
    return converted_date;
}

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

// function PlansTypeCdata(plan,Paliers){
//     // if(nrPalier > 1 && sousCondition== 0){
//         console.log('hani',plan.CODE);
        
   
//         PlansDeTypeC.push({
//         ID : plan.ID ,
//     CODE:  plan.CODE ,
//     TYPE:  plan.TYPE ,
//     ARTICLES:  plan.ARTICLES ,
//     OFFRE:  plan.OFFRE ,
//     valueOffre:  plan.valueOffre ,
//     valeurMinCondition:  plan.valeurMinCondition ,
//     paliers: Paliers
   
//  } );

//     // console.log(PlansDeTypeC)
//         let data = JSON.stringify(PlansDeTypeC, null, 2);
//         fs.writeFileSync('PlansTypeC.json', data);
       
        
// }
