
const sql = require('mssql');
const fs = require('fs');
// const fs = require('fs');
var xl = require('excel4node');
const config = { 
    // server: '192.168.4.2',
    server: '192.168.2.214',
    // database:Societe2,
    authentication: {
        type: 'default',
        options: {
            password: 'FGD@2021',
            userName: 'ws_app' 
            
            
        }
    },
    options: {
        port: Number.parseInt(1433),
        encrypt: false,
        requestTimeout: 0,
        trustedConnection: false,
        rowCollectionOnRequestCompletion: true
    }
}


let PlansTypeA = fs.readFileSync('PlansTypeA.json');
let PlansDeTypeA = JSON.parse(PlansTypeA);
const PlansA=PlansDeTypeA;

let PlansTypeB = fs.readFileSync('PlansTypeB.json');
let PlansDeTypeB = JSON.parse(PlansTypeB);
const PlansB=PlansDeTypeB;

let PlansTypeC = fs.readFileSync('PlansTypeC.json');
let PlansDeTypeC = JSON.parse(PlansTypeC);
const PlansC=PlansDeTypeC;

let PlansTypeD = fs.readFileSync('PlansTypeD.json');
let PlansDeTypeD = JSON.parse(PlansTypeD);
const PlansD=PlansDeTypeD;

let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let fulldate=year + "-" + month + "-" + date;


// PlansD.forEach(element => {
//     if(fulldate>element.dateFin){
//     element.paliers.forEach(myelement => {
//         plansTypeD(element,myelement);
//     })}
// });

PlansC.forEach(element => {
    if(fulldate>element.dateFin){
element.paliers.forEach(myelement => {

    plansTypeC(element,myelement);
})}});

// PlansB.forEach(element => {
//     if(fulldate>element.dateFin){
//     plansTypeB(element);
//     }
// });


// PlansA.forEach(element => {
//     if(fulldate>element.dateFin){
//       console.log('CODE PLAN',element.CODE);
    
//       console.log('dateSYSTEM',fulldate);
//       console.log('dateFile',element.dateFin);

//         plansTypeA(element);
//         // sendMailReussi(element);
//     }
   
// });





    async function plansTypeA(plans) {
      // console.log('hereeee')
    let sommeQuery='';
       let typeConcerne=plans.TYPE;
       let parenthOp='(';
       let parenthCl=')';
       let IN='in ';
       let ARTICLESConcerne=[];
       let articles= plans.ARTICLES.split(',')
        articles.forEach(element => {
            ARTICLESConcerne.push(element);
        });

       let CODEConcerne= plans.CODE;
       let OFFREConcerne= plans.OFFRE;
       let valueOffreConcerne= plans.valueOffre;
       let valeurMinConditionConcerne= plans.valeurMinCondition;
       var inClause = ARTICLESConcerne.map(id=>"'"+id+"'").join();
       inClause=parenthOp.concat(inClause);
       inClause=inClause.concat(parenthCl);
       inClause= IN.concat(inClause);
       let dateDebut=plans.dateDebut.replace(new RegExp('-', 'g'), '');
       let dateFin=plans.dateFin.replace(new RegExp('-', 'g'), '');     

       let foryear = new Date(plans.dateDebut);
       let year =  foryear.getFullYear();  
       let pool = await sql.connect(config);

       let specCustomers=[];
       let specifiqueCustomers= plans.specifiqueCustomers.split(',')
       specifiqueCustomers.forEach(element => {
            specCustomers.push(element);
        });
       var inCustomers = specCustomers.map(id=>"'"+id+"'").join();
       inCustomers=parenthOp.concat(inCustomers);
       inCustomers=inCustomers.concat(parenthCl);
       inCustomers= IN.concat(inCustomers);
      

       if(typeConcerne=="QTE"){
        
        Nature='QTE';
        sommeQuery= 'sum(QTY_0)';
    }

    if(typeConcerne=="CA"){
        
        Nature='CA';
        sommeQuery= 'sum(AMTATILIN_0)';
    }
       let planSujetQte=[];
       let adequateQuery='';

        if(plans.cumulCommandes == 1 && plans.allCustomers == 1 ){
            adequateQuery=`
            SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price 
            from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause} 
            and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS' 
            group by BPCNUM_0,BPCNAM_0  having ${sommeQuery} >= ${[valeurMinConditionConcerne]} `;
            rachetageQuery=`
            SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price 
            from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause} 
            and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS' 
            and BPCNUM_0 not in(SELECT  BPCNUM_0 from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE] 
                     where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  
                     and  TSCCOD_1 like 'GROS' group by BPCNUM_0,BPCNAM_0  
                     having ${sommeQuery} >= ${[valeurMinConditionConcerne]}) 
            group by BPCNUM_0,BPCNAM_0 `;
        
          }
        if(plans.cumulCommandes == 1 && plans.allCustomers == 0){
            adequateQuery=`SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}' and BPCNUM_0 ${inCustomers}  and  TSCCOD_1 like 'GROS' group by BPCNUM_0,BPCNAM_0  having ${sommeQuery} >= ${[valeurMinConditionConcerne]}`;
            rachetageQuery=`SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}' and BPCNUM_0 ${inCustomers}  and  TSCCOD_1 like 'GROS' and BPCNUM_0 not in(SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}' and BPCNUM_0 ${inCustomers}  and  TSCCOD_1 like 'GROS' group by BPCNUM_0,BPCNAM_0  having ${sommeQuery} >= ${[valeurMinConditionConcerne]}) group by BPCNUM_0,BPCNAM_0`;
          }
        if(plans.cumulCommandes == 0 && plans.allCustomers == 0){
            adequateQuery=`SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and BPCNUM_0 ${inCustomers}  and  TSCCOD_1 like 'GROS' group by BPCNUM_0,NUM_0,BPCNAM_0   having ${sommeQuery} >= ${[valeurMinConditionConcerne]} `;
            rachetageQuery=` SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and BPCNUM_0 ${inCustomers}  and  TSCCOD_1 like 'GROS' and BPCNUM_0 not in(SELECT BPCNUM_0  from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and BPCNUM_0 ${inCustomers}  and  TSCCOD_1 like 'GROS' group by BPCNUM_0,NUM_0,BPCNAM_0   having ${sommeQuery} >= ${[valeurMinConditionConcerne]}) group by BPCNUM_0,NUM_0,BPCNAM_0 `;
        }
        if(plans.cumulCommandes == 0 && plans.allCustomers == 1){
            adequateQuery=`
          SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price 
          from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  
          where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  
          and   TSCCOD_1 like 'GROS' group by BPCNUM_0,NUM_0,BPCNAM_0   
          having ${sommeQuery} >= ${[valeurMinConditionConcerne]} `;     
            
            
            rachetageQuery=`
          SELECT  BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte,sum(AMTATILIN_0) as price 
           from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  
              where ITMREF_0 ${inClause} 
              and INVDAT_0 between '${dateDebut}' and '${dateFin}'  
              and   TSCCOD_1 like 'GROS'
              and BPCNUM_0 not in(SELECT BPCNUM_0 from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  
                                   where ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  
                                   and   TSCCOD_1 like 'GROS' 
                                   group by BPCNUM_0,NUM_0,BPCNAM_0   
                                   having ${sommeQuery} >= ${[valeurMinConditionConcerne]}) 
              group by BPCNUM_0,NUM_0,BPCNAM_0 `;
        }
        // console.log(adequateQuery)
     
       let data1 = await pool.request().query(adequateQuery);
       let dataRachetage= await pool.request().query(rachetageQuery); 
      
       for(let i = 0; i < data1.recordset.length; i++){
       if(OFFREConcerne=='REMISE'){  
            
            planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                CodePlan: CODEConcerne , 
                TYPE:typeConcerne,
                IDPALIER: 1,
                CodeClient: data1.recordset[i].CodeClient,
                NOM: data1.recordset[i].NOM,
                CodeX3: plans.ARTICLES,
                Qte:data1.recordset[i].qte,
                Prix:data1.recordset[i].price,
                Offre:OFFREConcerne,
                Valeur:valueOffreConcerne,
                Calcul: (data1.recordset[i].price - ((data1.recordset[i].price * valueOffreConcerne)/100)),
                ecart: data1.recordset[i].price - (data1.recordset[i].price - ((data1.recordset[i].price * valueOffreConcerne)/100)),
                description: plans.descriptionPlan,
                mails: plans.mails
            
            })           
        }

        if(OFFREConcerne=='GRATUITE' || OFFREConcerne=='AVS' || OFFREConcerne=='GIFT'){  

            planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                CodePlan: CODEConcerne , 
                TYPE:typeConcerne,
                IDPALIER: 1,
                CodeClient: data1.recordset[i].CodeClient,
                NOM: data1.recordset[i].NOM,
                CodeX3: plans.ARTICLES,
                Qte:data1.recordset[i].qte,
                Prix:data1.recordset[i].price,
                Offre:OFFREConcerne,
                Valeur:valueOffreConcerne,
                Calcul: '',
                ecart:'',
                description: plans.descriptionPlan,
                mails: plans.mails
            })           
        }

        if(OFFREConcerne=='ECART' ){  

            planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                CodePlan: CODEConcerne , 
                TYPE:typeConcerne,
                IDPALIER: 1,
                CodeClient: data1.recordset[i].CodeClient,
                NOM: data1.recordset[i].NOM,
                CodeX3: plans.ARTICLES,
                Qte:data1.recordset[i].qte,
                Prix:data1.recordset[i].price,
                Offre:OFFREConcerne,
                Valeur:valueOffreConcerne,
                Calcul: (valueOffreConcerne * data1.recordset[i].qte ),
                ecart: data1.recordset[i].price - (valueOffreConcerne * data1.recordset[i].qte ),
                description: plans.descriptionPlan,
                mails: plans.mails
            })           
        }

     

        }



        for(let i = 0; i < dataRachetage.recordset.length; i++){
          if(OFFREConcerne=='REMISE'){  
               
               planSujetQte.push({
                   DateDebut:plans.dateDebut ,
                   DateFin:plans.dateFin ,
                   CodePlan: CODEConcerne , 
                   TYPE:typeConcerne,
                   IDPALIER: 1,
                   CodeClient: dataRachetage.recordset[i].CodeClient,
                   NOM: dataRachetage.recordset[i].NOM,
                   CodeX3: plans.ARTICLES,
                   Qte:dataRachetage.recordset[i].qte,
                   Prix:dataRachetage.recordset[i].price,
                   Offre:OFFREConcerne,
                   Valeur:0,
                   Calcul:0,
                   ecart: 0,
                   description: plans.descriptionPlan,
                   mails: plans.mails
               
               })           
           }
   
           if(OFFREConcerne=='GRATUITE' || OFFREConcerne=='AVS' || OFFREConcerne=='GIFT'){  
   
               planSujetQte.push({
                   DateDebut:plans.dateDebut ,
                   DateFin:plans.dateFin ,
                   CodePlan: CODEConcerne , 
                   TYPE:typeConcerne,
                   IDPALIER: 1,
                   CodeClient: dataRachetage.recordset[i].CodeClient,
                   NOM: dataRachetage.recordset[i].NOM,
                   CodeX3: plans.ARTICLES,
                   Qte:dataRachetage.recordset[i].qte,
                   Prix:dataRachetage.recordset[i].price,
                   Offre:OFFREConcerne,
                   Valeur:0,
                   Calcul:0,
                   ecart: 0,
                   description: plans.descriptionPlan,
                   mails: plans.mails
               })           
           }
   
           if(OFFREConcerne=='ECART' ){  
   
               planSujetQte.push({
                   DateDebut:plans.dateDebut ,
                   DateFin:plans.dateFin ,
                   CodePlan: CODEConcerne , 
                   TYPE:typeConcerne,
                   IDPALIER: 1,
                   CodeClient: dataRachetage.recordset[i].CodeClient,
                   NOM: dataRachetage.recordset[i].NOM,
                   CodeX3: plans.ARTICLES,
                   Qte:dataRachetage.recordset[i].qte,
                   Prix:dataRachetage.recordset[i].price,
                   Offre:OFFREConcerne,
                   Valeur:0,
                   Calcul:0,
                   ecart: 0,
                   description: plans.descriptionPlan,
                   mails: plans.mails
               })           
           }
   
        
   
           }
    //     if(planSujetQte.length!==0){
    //     var jsonContent = JSON.stringify(planSujetQte);
    //     let fileName= "Plan_"+CODEConcerne+"_Type_A_"+Nature+".json";
        
    //     fs.writeFile("PlansJSON/Type A/"+fileName,jsonContent, 'utf8', function (err) {
    //     });
    // }
// console.log(planSujetQte);
    if(planSujetQte.length!==0){
        let fileName= "Plan_"+CODEConcerne+".json";
        let myPath= "PlansJSON/Type A/"+fileName;
        let fileNameExcel= "Plan_"+CODEConcerne+".xlsx";
        let myExcelPath= "PlansJSON/Type A/"+fileNameExcel;
       

       
        
        if (fs.existsSync(myPath)) {
           let PlansTypeA = fs.readFileSync(myPath);
           let PlansDeTypeA = JSON.parse(PlansTypeA);
           planSujetQte=PlansDeTypeA.concat(planSujetQte);
           var jsonContent = JSON.stringify(planSujetQte);
        //   fs.writeFileSync("PlansJSON/Type C/"+fileName, jsonContent);
        
        // fs.writeFileSync(myPath, jsonContent);
        
        // setTimeout(() => {convertToFormat(myPath,myExcelPath)}, 8000);
        // setTimeout(() => {sendMailReussi(plans,myExcelPath)}, 9000);
        // console.log(jsonContent)
        modifyFile(myPath,jsonContent,myExcelPath);
            console.log(myPath);
            //console.log(jsonContent);
            console.log(myExcelPath);
    }else{
        var jsonContent = JSON.stringify(planSujetQte);
        
        //   writeFil(myPath,jsonContent);
        writeFil(myPath,jsonContent,myExcelPath);
            console.log(myPath);
            //console.log(jsonContent);
            console.log(myExcelPath);
        
          
         }
         
       
       }





        pool.close;
        sql.close;      
     };



    async function plansTypeB(plans) {
        let sommeCond='';
        let sommeSousCond='';
        let typeConcerne=plans.TYPE;
        let parenthOp='(';
        let parenthCl=')';
        let IN='in ';
        let ARTICLESConcerne=[];
        let articles= plans.ARTICLES.split(',')
        articles.forEach(element => {
            ARTICLESConcerne.push(element);
        });
        // console.log(ARTICLESConcerne)
        let ARTICLESConcerneSousCOnd=[];
        let articlescond= plans.ArticlesSousCond.split(',')
        articlescond.forEach(element => {
            ARTICLESConcerneSousCOnd.push(element);
        });
    
        // let ARTICLESConcerneSousCOnd= plans.ARTICLESSOUSCOND;
        
        let CODEConcerne= plans.CODE;
        let OFFREConcerne= plans.OFFRE;
        let valueOffreConcerne= plans.valueOffre;
        let valeurMinConditionConcerne= plans.valeurMinCondition;
        var inClause = ARTICLESConcerne.map(id=>"'"+id+"'").join();
        inClause=parenthOp.concat(inClause);
        inClause=inClause.concat(parenthCl);
        inClause= IN.concat(inClause);
        let dateDebut=plans.dateDebut.replace(new RegExp('-', 'g'), '');
           let dateFin=plans.dateFin.replace(new RegExp('-', 'g'), '');     
    
        //    let foryear = new Date(plans.dateDebut);
        //    let year =  foryear.getFullYear();  
      
        var ARTICLESSOUSCOND = ARTICLESConcerneSousCOnd.map(id=>"'"+id+"'").join();
        ARTICLESSOUSCOND=parenthOp.concat(ARTICLESSOUSCOND);
        ARTICLESSOUSCOND=ARTICLESSOUSCOND.concat(parenthCl);
        ARTICLESSOUSCOND= IN.concat(ARTICLESSOUSCOND);
        let TYPESOUSCOND = plans.detailsSousCond;
        let valeurSousCondition = plans.minToOrderSousCond;
        // console.log('this is the fuckin value',valeurSousCondition)
    
        let pool = await sql.connect(config);
    
        let specCustomers=[];
           let specifiqueCustomers= plans.specifiqueCustomers.split(',')
           specifiqueCustomers.forEach(element => {
                specCustomers.push(element);
            });
           var inCustomers = specCustomers.map(id=>"'"+id+"'").join();
           inCustomers=parenthOp.concat(inCustomers);
           inCustomers=inCustomers.concat(parenthCl);
           inCustomers= IN.concat(inCustomers);
    
    
        if(typeConcerne=="QTE"){
            sommeCond='sum(QTY_0)';
            Nature='QTE';
        }
    
        if(typeConcerne=="CA"){
            sommeCond='sum(AMTATILIN_0)';
            Nature='CA';
        }
         
        if(TYPESOUSCOND=="QTE"){
            sommeSousCond='sum(QTY_0)';
        }
    
        if(TYPESOUSCOND=="CA"){
            sommeSousCond='sum(AMTATILIN_0)';
        }
         let planSujetQte=[];
         let adequateQueryB = '';
        //  console.log(dateDebut,dateFin,ARTICLESSOUSCOND,inClause,valeurSousCondition,valeurMinConditionConcerne)
    if(plans.cumulCommandes == 1 && plans.allCustomers == 1 ){
        adequateQueryB=`SELECT BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte, sum(AMTATILIN_0) as price  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where  BPCNUM_0 in (SELECT distinct BPCNUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]       where ITMREF_0 ${ARTICLESSOUSCOND} and INVDAT_0  between '${dateDebut}' and '${dateFin}' and  TSCCOD_1 like 'GROS' and   BPCNUM_0 in ( SELECT distinct BPCNUM_0 from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where ITMREF_0 ${inClause} group by BPCNUM_0  having ${sommeCond} >= ${[valeurMinConditionConcerne]})   group by  BPCNUM_0 having ${sommeSousCond}  >= ${[valeurSousCondition]}) and ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  group by BPCNUM_0 ,BPCNAM_0   having ${sommeCond} >= ${[valeurMinConditionConcerne]} `;
        adequateQueryRachtageB=`
        SELECT BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte, sum(AMTATILIN_0) as price  
        from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   
        where  BPCNUM_0 in (SELECT distinct BPCNUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]       
                            where ITMREF_0 ${ARTICLESSOUSCOND} 
                            and INVDAT_0  between '${dateDebut}' and '${dateFin}' 
                            and  TSCCOD_1 like 'GROS' 
                            and   BPCNUM_0 in ( SELECT distinct BPCNUM_0 from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    
                                                where ITMREF_0 ${inClause} 
                                                group by BPCNUM_0  
                                               )   
                            group by  BPCNUM_0 ) 
        and ITMREF_0 ${inClause} 
        and INVDAT_0  between '${dateDebut}' and '${dateFin}' 
        and   BPCNUM_0   not in (SELECT BPCNUM_0  
                                  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   
                                   where  BPCNUM_0 in (SELECT distinct BPCNUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]       
                            where ITMREF_0 ${ARTICLESSOUSCOND} 
                            and INVDAT_0  between '${dateDebut}' and '${dateFin}' 
                            and  TSCCOD_1 like 'GROS' 
                            and   BPCNUM_0 in ( SELECT distinct BPCNUM_0 from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    
                                                where ITMREF_0 ${inClause} 
                                                group by BPCNUM_0  
                                                having ${sommeCond} >= ${[valeurMinConditionConcerne]})   
                            group by  BPCNUM_0 having ${sommeSousCond}  >= ${[valeurSousCondition]}) 
        and ITMREF_0 ${inClause} 
        and INVDAT_0  between '${dateDebut}' and '${dateFin}' 
        group by BPCNUM_0   
        having ${sommeCond} >= ${[valeurMinConditionConcerne]})
        group by BPCNUM_0 ,BPCNAM_0   

         `;
   
      }
    if(plans.cumulCommandes == 1 && plans.allCustomers == 0){
        adequateQueryB=`SELECT BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte, sum(AMTATILIN_0) as price  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where  BPCNUM_0 in (SELECT distinct BPCNUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]       where ITMREF_0 ${ARTICLESSOUSCOND} and INVDAT_0  between '${dateDebut}' and '${dateFin}' and  TSCCOD_1 like 'GROS' and   BPCNUM_0 in ( SELECT distinct BPCNUM_0 from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where ITMREF_0 ${inClause} group by BPCNUM_0  having ${sommeCond} >= ${[valeurMinConditionConcerne]})   group by  BPCNUM_0 having ${sommeSousCond}  >= ${[valeurSousCondition]}) and ITMREF_0 ${inClause} and BPCNUM_0 ${inCustomers} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  group by BPCNUM_0 ,BPCNAM_0   having ${sommeCond} >= ${[valeurMinConditionConcerne]} `;
    }
    if(plans.cumulCommandes == 0 && plans.allCustomers == 0){
        adequateQueryB=`SELECT BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte, sum(AMTATILIN_0) as price  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where  NUM_0 in (SELECT distinct NUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]       where ITMREF_0 ${ARTICLESSOUSCOND} and INVDAT_0  between '${dateDebut}' and '${dateFin}' and  TSCCOD_1 like 'GROS' and   NUM_0 in ( SELECT distinct NUM_0 from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where ITMREF_0 ${inClause} group by NUM_0  having ${sommeCond} >= ${[valeurMinConditionConcerne]})   group by  NUM_0 having ${sommeSousCond}  >= ${[valeurSousCondition]}) and ITMREF_0 ${inClause} and BPCNUM_0 ${inCustomers} and  INVDAT_0  between '${dateDebut}' and '${dateFin}'  group by BPCNUM_0 ,BPCNAM_0   having ${sommeCond} >= ${[valeurMinConditionConcerne]} `;
    }
    if(plans.cumulCommandes == 0 && plans.allCustomers == 1){
       adequateQueryB=`SELECT BPCNAM_0 as NOM, BPCNUM_0 as CodeClient ,sum(QTY_0) as qte, sum(AMTATILIN_0) as price  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where  NUM_0 in (SELECT distinct NUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]       where ITMREF_0 ${ARTICLESSOUSCOND} and INVDAT_0  between '${dateDebut}' and '${dateFin}' and  TSCCOD_1 like 'GROS' and   NUM_0 in ( SELECT distinct NUM_0 from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where ITMREF_0 ${inClause} group by NUM_0  having ${sommeCond} >= ${[valeurMinConditionConcerne]})   group by  NUM_0 having ${sommeSousCond}  >= ${[valeurSousCondition]}) and ITMREF_0 ${inClause} and INVDAT_0  between '${dateDebut}' and '${dateFin}'  group by BPCNUM_0 ,BPCNAM_0   having ${sommeCond} >= ${[valeurMinConditionConcerne]} `;
    }
        
    console.log(adequateQueryRachtageB);
         let data1 = await pool.request().query(adequateQueryB);
        
        for(let i = 0; i < data1.recordset.length; i++){
         
        if(OFFREConcerne=='REMISE'){  
          
                planSujetQte.push({
                    DateDebut:plans.dateDebut ,
                    DateFin:plans.dateFin ,
                    CodePlan: CODEConcerne , 
                 TYPE:typeConcerne,
                //  IDPALIER: 1,
                 CodeClient: data1.recordset[i].CodeClient,
                 NOM: data1.recordset[i].NOM,
                 CodeX3: plans.ARTICLES,
                 Qte:data1.recordset[i].qte,
                 Prix:data1.recordset[i].price,
                 Offre:OFFREConcerne,
                 Valeur:valueOffreConcerne,
                 calcul: (data1.recordset[i].price - ((data1.recordset[i].price * valueOffreConcerne)/100)),
                 ecart: data1.recordset[i].price - (data1.recordset[i].price - ((data1.recordset[i].price * valueOffreConcerne)/100)),
                 description: plans.descriptionPlan,
                 mails: plans.mails
             })           
         }
    
         if(OFFREConcerne=='GRATUITE' || OFFREConcerne=='AVS' || OFFREConcerne=='GIFT'){  
    
             planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                 CodePlan: CODEConcerne , 
                 TYPE:typeConcerne,
                //  IDPALIER: 1,
                 CodeClient: data1.recordset[i].CodeClient,
                 NOM: data1.recordset[i].NOM,
                 CodeX3: plans.ARTICLES,
                 Qte:data1.recordset[i].qte,
                 Prix:data1.recordset[i].price,
                 Offre:OFFREConcerne,
                 Valeur:valueOffreConcerne,
                 Calcul: '',
                 ecart:'',
                 description: plans.descriptionPlan,
                 mails: plans.mails
             })           
         }
    
         if(OFFREConcerne=='ECART' ){  
    
             planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                 CodePlan: CODEConcerne , 
                 TYPE:typeConcerne,
                //  IDPALIER: 1,
                 CodeClient: data1.recordset[i].CodeClient,
                 NOM: data1.recordset[i].NOM,
                 CodeX3: plans.ARTICLES,
                 Qte:data1.recordset[i].qte,
                 Prix:data1.recordset[i].price,
                 Offre:OFFREConcerne,
                 Valeur:valueOffreConcerne,
                 Calcul: (valueOffreConcerne * data1.recordset[i].qte ),
                 ecart: data1.recordset[i].price - (valueOffreConcerne * data1.recordset[i].qte ),
                 description: plans.descriptionPlan,
                 mails: plans.mails
             })           
         }
    
      
    
         }
        //  if(planSujetQte.length!==0){
        //      var jsonContent = JSON.stringify(planSujetQte);
        //      let fileName= "Plan_"+CODEConcerne+"_Type_B_"+Nature+".json";
             
        //      fs.writeFile("PlansJSON/Type B/"+fileName,jsonContent, 'utf8', function (err) {
        //      });
        // }
        let data2 = await pool.request().query(adequateQueryRachtageB);
        for(let i = 0; i < data2.recordset.length; i++){
          
          if(OFFREConcerne=='REMISE'){  
        
                  planSujetQte.push({
                      DateDebut:plans.dateDebut ,
                      DateFin:plans.dateFin ,
                      CodePlan: CODEConcerne , 
                   TYPE:typeConcerne,
                  //  IDPALIER: 1,
                   CodeClient: data2.recordset[i].CodeClient,
                   NOM: data2.recordset[i].NOM,
                   CodeX3: plans.ARTICLES,
                   Qte:data2.recordset[i].qte,
                   Prix:data2.recordset[i].price,
                   Offre:OFFREConcerne,
                   Valeur:0,
                   Calcul:0,
                   ecart: 0,
                    description: plans.descriptionPlan,
                   mails: plans.mails
                 
               })           
           }
        
           if(OFFREConcerne=='GRATUITE' || OFFREConcerne=='AVS' || OFFREConcerne=='GIFT'){  
        
               planSujetQte.push({
                  DateDebut:plans.dateDebut ,
                  DateFin:plans.dateFin ,
                   CodePlan: CODEConcerne , 
                   TYPE:typeConcerne,
                  //  IDPALIER: 1,
                   CodeClient: data2.recordset[i].CodeClient,
                   NOM: data2.recordset[i].NOM,
                   CodeX3: plans.ARTICLES,
                   Qte:data2.recordset[i].qte,
                   Prix:data2.recordset[i].price,
                   Offre:OFFREConcerne,
                   Valeur:0,
                   Calcul:0,
                   ecart: 0,
                   description: plans.descriptionPlan,
                   mails: plans.mails
               })           
           }
        
           if(OFFREConcerne=='ECART' ){  
        
               planSujetQte.push({
                  DateDebut:plans.dateDebut ,
                  DateFin:plans.dateFin ,
                   CodePlan: CODEConcerne , 
                   TYPE:typeConcerne,
                  //  IDPALIER: 1,
                   CodeClient: data2.recordset[i].CodeClient,
                   NOM: data2.recordset[i].NOM,
                   CodeX3: plans.ARTICLES,
                   Qte:data2.recordset[i].qte,
                   Prix:data2.recordset[i].price,
                   Offre:OFFREConcerne,
                   Valeur:0,
                   Calcul:0,
                   ecart: 0,
                   description: plans.descriptionPlan,
                   mails: plans.mails
               })           
           }
        
        
        
           }



        if(planSujetQte.length!==0){
            let fileName= "Plan_"+CODEConcerne+".json";
            let myPath= "PlansJSON/Type B/"+fileName;
            
            let fileNameExcel= "Plan_"+CODEConcerne+".xlsx";
            let myExcelPath= "PlansJSON/Type B/"+fileNameExcel;
           
    
           
            
            if (fs.existsSync(myPath)) {
               let PlansTypeB = fs.readFileSync(myPath);
               let PlansDeTypeB = JSON.parse(PlansTypeB);
               planSujetQte=PlansDeTypeB.concat(planSujetQte);
               var jsonContent = JSON.stringify(planSujetQte);
            //   fs.writeFileSync("PlansJSON/Type C/"+fileName, jsonContent);
            
            // fs.writeFileSync(myPath, jsonContent);
            
            // setTimeout(() => {convertToFormat(myPath,myExcelPath)}, 8000);
            // setTimeout(() => {sendMailReussi(plans,myExcelPath)}, 9000);
            modifyFile(myPath,jsonContent,myExcelPath);
            console.log(myPath);
            //console.log(jsonContent);
            console.log(myExcelPath);
        }else{
            var jsonContent = JSON.stringify(planSujetQte);
            
            //   writeFil(myPath,jsonContent);
            writeFil(myPath,jsonContent,myExcelPath);
            console.log(myPath);
            //console.log(jsonContent);
            console.log(myExcelPath);
            
              
             }
             
           
           }
    
        
    
    
         pool.close;
         sql.close;
         
     };
    async function plansTypeC(plans,paliers) {
        let queryTypeC='';
        let typeConcerne=plans.TYPE;
        let parenthOp='(';
        let parenthCl=')';
        let acoladOp = '[';
        let acoladCl = ']';
        let IN='in ';
        let ARTICLESConcerne=[];
               let articles= plans.ARTICLES.split(',')
                articles.forEach(element => {
                    ARTICLESConcerne.push(element);
                });
        // let ARTICLESConcerneSousCOnd= plans.ARTICLESSOUSCOND;
        // let IDconcerne = plans.ID ;
        let CODEConcerne= plans.CODE;
        let OFFREConcerne= plans.OFFRE;
        let valueOffreConcerne= plans.valueOffre;
        let valeurMinConditionConcerne= plans.valeurMinCondition;
        var inClause = ARTICLESConcerne.map(id=>"'"+id+"'").join();
        inClause=parenthOp.concat(inClause);
        inClause=inClause.concat(parenthCl);
        inClause= IN.concat(inClause);
        
        
        // var CodeX3Tab = ARTICLESConcerne.map(id=>"'"+id+"'").join();
        // CodeX3Tab=acoladOp.concat(CodeX3Tab);
        // CodeX3Tab=CodeX3Tab.concat(acoladCl);
        // CodeX3Tab= IN.concat(CodeX3Tab);
        
        // var ARTICLESSOUSCOND = ARTICLESConcerneSousCOnd.map(id=>"'"+id+"'").join();
        // ARTICLESSOUSCOND=parenthOp.concat(ARTICLESSOUSCOND);
        // ARTICLESSOUSCOND=ARTICLESSOUSCOND.concat(parenthCl);
        // ARTICLESSOUSCOND= IN.concat(ARTICLESSOUSCOND);
        // let TYPESOUSCOND = plans.TYPESOUSCOND;  
        
        // let valeurSousCondition = plans.valeurSousCondition;
        
        let NoPalier = paliers.NoPalier;
        let DE = paliers.De;
        let A = paliers.A;
        let OFFRE = paliers.Offre;
        let DETOFFRE = paliers.DetailsOffre;
        
        let dateDebut=plans.dateDebut.replace(new RegExp('-', 'g'), '');
        let dateFin=plans.dateFin.replace(new RegExp('-', 'g'), '');     
        
        // console.log(dateDebut)
            let cumulCommandes=plans.cumulCommandes;
            let allCustomers=plans.allCustomers;
        
            let specifiqueCustomers=[];
            let customers= plans.specifiqueCustomers.split(',')
            customers.forEach(element => {
                specifiqueCustomers.push(element);
            });
            var customersIn = specifiqueCustomers.map(id=>"'"+id+"'").join();
            customersIn=parenthOp.concat(customersIn);
            customersIn=customersIn.concat(parenthCl);
            customersIn= IN.concat(customersIn);
            
        
        
        // console.log(typeConcerne);
        // console.log('Palier: '+NoPalier+' De: '+DE+'  A: '+A);
        // console.log(valeurSousCondition);
        
        
        
        
        let pool = await sql.connect(config);
        if(typeConcerne=="QTE"){
            sommeCond='sum(QTY_0)';
            Nature='QTE';
        }
        
        if(typeConcerne=="CA"){
            sommeCond='sum(AMTATILIN_0)';
            Nature='CA';
        }
         
        
        
        
         let planSujetQte=[];
        if(cumulCommandes == 1 && allCustomers==1 ){   
        queryTypeC=  `SELECT BPCNAM_0 as NOM,  BPCNUM_0 as CodeClient , CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price  from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause}  and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS'  group by BPCNUM_0,INVTYP_0 ,BPCNAM_0  having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1) ELSE ${sommeCond} END) between ${[DE]} and ${[A]} `;
                                                    }
        if(cumulCommandes == 0 && allCustomers==1 ){   
         queryTypeC=  `SELECT BPCNAM_0 as NOM,  BPCNUM_0 as CodeClient , CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price  from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause}   and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS'  group by BPCNUM_0 ,INVTYP_0,NUM_0 ,BPCNAM_0   having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1) ELSE ${sommeCond} END) between  ${[DE]} and ${[A]} `;
                                                   }
        if(cumulCommandes == 1 && allCustomers==0 ){   
         queryTypeC=  `SELECT BPCNAM_0 as NOM,  BPCNUM_0 as CodeClient , CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price  from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 ${inClause}   and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS' and BPCNUM_0 ${customersIn}   group by BPCNUM_0,INVTYP_0  ,BPCNAM_0 having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1) ELSE ${sommeCond} END) between ${[DE]} and ${[A]} `;
                                                    }
        if(cumulCommandes == 0 && allCustomers==0 ){   
         queryTypeC=  `SELECT BPCNAM_0 as NOM,  BPCNUM_0 as CodeClient , CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price  from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0  ${inClause}   and INVDAT_0  between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS' and BPCNUM_0 ${customersIn}   group by BPCNUM_0 ,INVTYP_0,NUM_0 ,BPCNAM_0   having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1) ELSE ${sommeCond} END) between ${[DE]} and ${[A]} `;
                                                    }
                                                    
        console.log(queryTypeC)
        let data1 = await pool.request().query(queryTypeC);
        for(let i = 0; i < data1.recordset.length; i++){
        // if(OFFREConcerne=='REMISE'){  
        
            // planSujetQte.push({
            //      TYPE:typeConcerne,
            //      IDPALIER: NoPalier,
            //      CodePlan: CODEConcerne , 
            //      CodeClient: data1.recordset[i].CodeClient,
            //     CodeX3: ARTICLESConcerne,
            //      Qte:data1.recordset[i].qte,
            //      Prix:data1.recordset[i].price,
            //      Offre:OFFRE,
            //      Valeur:DETOFFRE,
            //      calcul: (data1.recordset[i].price - ((data1.recordset[i].price * DETOFFRE)/100)),
            //      ecart: data1.recordset[i].price - (data1.recordset[i].price - ((data1.recordset[i].price * DETOFFRE)/100))
             
            //  })           
        //  } 
        // console.log(Nature);
        if(OFFRE=='REMISE'){  
        // console.log(plans.descriptionPlan);
            planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                CodePlan: CODEConcerne , 
                TYPE:typeConcerne,
                IDPALIER: NoPalier,
                CodeClient: data1.recordset[i].CodeClient,
                NOM: data1.recordset[i].NOM,
                CodeX3: ARTICLESConcerne,
                Qte:data1.recordset[i].qte,
                Prix:data1.recordset[i].price,
                Offre:OFFRE,
                Valeur:DETOFFRE,
                calcul: (data1.recordset[i].price - ((data1.recordset[i].price * DETOFFRE)/100)),
                ecart: data1.recordset[i].price - (data1.recordset[i].price - ((data1.recordset[i].price * DETOFFRE)/100)),
                description: plans.descriptionPlan,
                mails: plans.mails
            
            })      
         }
        
         if(OFFRE=='GRATUITE' || OFFRE=='AVS' || OFFRE=='GIFT'){  
        
             planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                CodePlan: CODEConcerne , 
                TYPE:typeConcerne,
                IDPALIER: NoPalier,
                CodeClient: data1.recordset[i].CodeClient,
                NOM: data1.recordset[i].NOM,
                CodeX3: ARTICLESConcerne,
                Qte:data1.recordset[i].qte,
                Prix:data1.recordset[i].price,
                Offre:OFFRE,
                Valeur:DETOFFRE,
                 Calcul: '',
                 ecart:'',
                 description: plans.descriptionPlan,
                 mails: plans.mails
             })           
         }
        
         if(OFFRE=='ECART' ){  
        
             planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                CodePlan: CODEConcerne , 
            TYPE:typeConcerne,
            IDPALIER: NoPalier,
            CodeClient: data1.recordset[i].CodeClient,
            NOM: data1.recordset[i].NOM,
            CodeX3: ARTICLESConcerne,
            Qte:data1.recordset[i].qte,
            Prix:data1.recordset[i].price,
            Offre:OFFRE,
            Valeur:DETOFFRE,
            Calcul: (DETOFFRE * data1.recordset[i].qte ),
            ecart: data1.recordset[i].price - (DETOFFRE * data1.recordset[i].qte ),
            description: plans.descriptionPlan,
            mails: plans.mails
             })           
         }
        }
        // if(planSujetQte.length!==0){
        //  var jsonContent = JSON.stringify(planSujetQte);
        //  let fileName= "Plan_"+CODEConcerne+"_Palier_N°_"+NoPalier+".json";
        //  fs.writeFile("PlansJSON/Type C/"+fileName,jsonContent, 'utf8', function (err) {
        //  });
        // }
        if(planSujetQte.length!==0){
            let fileName= "Plan_"+CODEConcerne+".json";
            let myPathC= "PlansJSON/Type C/"+fileName;
            let fileNameExcel= "Plan_"+CODEConcerne+".xlsx";
            let myExcelPathC= "PlansJSON/Type C/"+fileNameExcel;
           

           
            
            if (fs.existsSync(myPathC)) {
               let PlansTypeC = fs.readFileSync(myPathC);
               let PlansDeTypeC = JSON.parse(PlansTypeC);
               planSujetQte=PlansDeTypeC.concat(planSujetQte);
               var jsonContentC = JSON.stringify(planSujetQte);
            //   fs.writeFileSync("PlansJSON/Type C/"+fileName, jsonContent);
            
            // fs.writeFileSync(myPath, jsonContent);
            
            // setTimeout(() => {convertToFormat(myPath,myExcelPath)}, 8000);
            // setTimeout(() => {sendMailReussi(plans,myExcelPath)}, 9000);
            modifyFile(myPathC,jsonContentC,myExcelPathC);
            console.log(myPathC);
            //console.log(jsonContent);
            console.log(myExcelPathC);
        }else{
            var jsonContentC = JSON.stringify(planSujetQte);
            
            //   writeFil(myPath,jsonContent);
            writeFil(myPathC,jsonContentC,myExcelPathC);
            console.log(myPathC);
            //console.log(jsonContent);
            console.log(myExcelPathC);
            
              
             }
             
           
           }
        
    
        
         pool.close;
         sql.close;
         
     };
    async function plansTypeD(plans,paliers) {
            let queryConcerned ='';
            let typeConcerne=plans.TYPE;
            let parenthOp='(';
            let parenthCl=')';
            let IN='in ';
            let ARTICLESConcerne=[];
            let articles= plans.ARTICLES.split(',')
            articles.forEach(element => {
                ARTICLESConcerne.push(element);
            });
            let CODEConcerne= plans.CODE;
            var inClause = ARTICLESConcerne.map(id=>"'"+id+"'").join();
            inClause=parenthOp.concat(inClause);
            inClause=inClause.concat(parenthCl);
            inClause= IN.concat(inClause);
        
            let ARTICLESConcerneSousCOnd=[];
            let articlesC= paliers.ArticlesSousCond.split(',')
            articlesC.forEach(element => {
                ARTICLESConcerneSousCOnd.push(element);
            });
            var ARTICLESSOUSCOND = ARTICLESConcerneSousCOnd.map(id=>"'"+id+"'").join();
            ARTICLESSOUSCOND=parenthOp.concat(ARTICLESSOUSCOND);
            ARTICLESSOUSCOND=ARTICLESSOUSCOND.concat(parenthCl);
            ARTICLESSOUSCOND= IN.concat(ARTICLESSOUSCOND);
            let TYPESOUSCOND = paliers.detailsSousCond;
            let valeurSousCondition = paliers.minToOrderSousCOnd;
            let NoPalier = paliers.NoPalier;
            let DE = paliers.De;
            let A = paliers.A;
            let OFFRE = paliers.Offre;
            let DETOFFRE = paliers.DetailsOffre;
            let cumulCommandes=plans.cumulCommandes;
            let allCustomers=plans.allCustomers;
        
            
            let dateDebut=plans.dateDebut.replace(new RegExp('-', 'g'), '');
            let dateFin=plans.dateFin.replace(new RegExp('-', 'g'), '');    
            // console.log(year);
        
         
        
            let specifiqueCustomers=[];
            let customers= plans.specifiqueCustomers.split(',')
            customers.forEach(element => {
                specifiqueCustomers.push(element);
            });
            var customersIn = specifiqueCustomers.map(id=>"'"+id+"'").join();
            customersIn=parenthOp.concat(customersIn);
            customersIn=customersIn.concat(parenthCl);
            customersIn= IN.concat(customersIn);
            
        
            let pool = await sql.connect(config);
            if(typeConcerne=="QTE"){
                sommeCond='sum(QTY_0)';
                Nature='QTE';
            }
        
            if(typeConcerne=="CA"){
                sommeCond='sum(AMTATILIN_0)';
                Nature='CA';
            }
             
            if(TYPESOUSCOND=="QTE"){
                sommeSousCond='sum(QTY_0)';
            }
            
            if(TYPESOUSCOND=="CA"){
                sommeSousCond='sum(AMTATILIN_0)';
            }
            let planSujetQte=[];
            console.log(OFFRE);
        console.log(dateDebut,dateFin, ARTICLESSOUSCOND,inClause,valeurSousCondition,DE,A)
            if(cumulCommandes==1 && allCustomers==1){
                // console.log(DE);
        // queryConcerned ="SELECT  BPCNUM_0 as CodeClient, CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price    from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]     where  month(INVDAT_0) >= "+moisDebut+" and   month(INVDAT_0) <= "+moisFin+" and year(INVDAT_0) =  "+year+" and  TSCCOD_1 like 'GROS'   and ITMREF_0 "+inClause+"  and BPCNUM_0 in (SELECT BPCNUM_0     from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where ITMREF_0 "+ARTICLESSOUSCOND+"  and  month(INVDAT_0) >= "+moisDebut+" and   month(INVDAT_0) <= "+moisFin+" and year(INVDAT_0) =  "+year+"  and  TSCCOD_1 like 'GROS'   group by BPCNUM_0   having '"+sommeSousCond+"' > '" + [valeurSousCondition] + "')  group by BPCNUM_0 , INVTYP_0  having (CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END) between '" + [DE] + "' and  '" + [A] + "'";
                // console.log('hnaya asahbi');
                queryConcerned=`SELECT BPCNAM_0 as NOM,  BPCNUM_0 as CodeClient, CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price    from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]     where  INVDAT_0 between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS'   and ITMREF_0 ${inClause}  and BPCNUM_0 in (SELECT BPCNUM_0     from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where ITMREF_0 ${ARTICLESSOUSCOND}  and  INVDAT_0 between '${dateDebut}' and '${dateFin}'    and  TSCCOD_1 like 'GROS'   group by BPCNUM_0   having  ${sommeSousCond} >= ${[valeurSousCondition]})  group by BPCNUM_0 , INVTYP_0,BPCNAM_0  having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1)  ELSE ${sommeCond}  END) between ${[DE]} and ${[A]} `
        //    console.log(dateDebut,    dateFin,    inClause,    ARTICLESSOUSCOND,    sommeSousCond,    valeurSousCondition    ,DE,    A)
            }
            if(cumulCommandes==0 && allCustomers==1){
                queryConcerned= `SELECT BPCNAM_0 as NOM,  BPCNUM_0 as CodeClient, CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where  INVDAT_0 between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS'   and  NUM_0 in  (SELECT distinct NUM_0   from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]      where INVDAT_0 between '${dateDebut}' and '${dateFin}'     and  TSCCOD_1 like 'GROS'   and  ITMREF_0 ${ARTICLESSOUSCOND}  and  NUM_0  in  (SELECT distinct NUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where INVDAT_0 between '${dateDebut}' and '${dateFin}'    and  TSCCOD_1 like 'GROS'   and  ITMREF_0 ${inClause}  group by NUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1)  ELSE ${sommeCond}  END) between ${[DE]} and ${[A]})   group by  NUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then ${sommeSousCond}*(-1) ELSE ${sommeSousCond} END) >= ${[valeurSousCondition]})  and ITMREF_0 ${inClause}  group by BPCNUM_0 ,INVTYP_0,BPCNAM_0 having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1)  ELSE ${sommeCond}  END) between ${[DE]} and ${[A]} `;
                // console.log(sommeSousCond);
        // queryConcerned ="SELECT  BPCNUM_0 as CodeClient, CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where  month(INVDAT_0) >=  "+moisDebut+" and month(INVDAT_0) <= "+moisFin+"    and year(INVDAT_0) = "+year+"   and  TSCCOD_1 like 'GROS'   and  NUM_0 in  (SELECT distinct NUM_0   from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]      where month(INVDAT_0) >="+moisDebut+" and month(INVDAT_0) <="+moisFin+"    and year(INVDAT_0) = "+year+"   and  TSCCOD_1 like 'GROS'   and  ITMREF_0 "+ARTICLESSOUSCOND+"  and  NUM_0  in  (SELECT distinct NUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where  month(INVDAT_0)> = "+moisDebut+" and month(INVDAT_0) <= "+moisFin+"    and year(INVDAT_0) = "+year+"   and  TSCCOD_1 like 'GROS'   and  ITMREF_0 "+inClause+"  group by NUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then "+sommeCond+"*(-1)  ELSE "+sommeCond+"  END) between '" + [DE] + "' and '" + [A] + "')   group by  NUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then '"+sommeSousCond+"'*(-1) ELSE '"+sommeSousCond+"' END) > '" + [valeurSousCondition] + "')  and ITMREF_0 "+inClause+"  group by BPCNUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then "+sommeCond+"*(-1)  ELSE "+sommeCond+"  END) between '" + [DE] + "' and '" + [A] + "'";
            }
            if(cumulCommandes==1 && allCustomers==0){
        // queryConcerned ="SELECT  BPCNUM_0 as CodeClient, CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte, CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price   from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where  month(INVDAT_0)> = "+moisDebut+" and month(INVDAT_0) <= "+moisFin+"   and year(INVDAT_0) = "+year+"  and  TSCCOD_1 like 'GROS' and BPCNUM_0 "+customersIn+"  and  ITMREF_0 "+inClause+" and BPCNUM_0 in (SELECT BPCNUM_0    from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where ITMREF_0 "+ARTICLESSOUSCOND+" and month(INVDAT_0) >="+moisDebut+" and month(INVDAT_0) <="+moisFin+"  and year(INVDAT_0) = "+year+"  and  TSCCOD_1 like 'GROS'  group by BPCNUM_0  having '"+sommeSousCond+"' > '" + [valeurSousCondition] + "') group by BPCNUM_0 , INVTYP_0 having (CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END) between '" + [DE] + "' and  '" + [A] + "'";
        queryConcerned=`SELECT BPCNAM_0 as NOM,  BPCNUM_0 as CodeClient, CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price    from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]     where  INVDAT_0 between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS'   and ITMREF_0 ${inClause}  and BPCNUM_0 in (SELECT BPCNUM_0     from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where ITMREF_0 ${ARTICLESSOUSCOND}  and  INVDAT_0 between '${dateDebut}' and '${dateFin}'    and  TSCCOD_1 like 'GROS' and BPCNUM_0 ${customersIn}   group by BPCNUM_0   having  ${sommeSousCond} >= ${[valeurSousCondition]})  group by BPCNUM_0 , INVTYP_0 ,BPCNAM_0 having (CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END) between ${[DE]} and ${[A]} `
             
        }
             if(cumulCommandes==0 && allCustomers==0){
        // queryConcerned ="SELECT  BPCNUM_0 as CodeClient, CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where  month(INVDAT_0) >=  "+moisDebut+" and month(INVDAT_0) <= "+moisFin+"    and year(INVDAT_0) = "+year+"   and  TSCCOD_1 like 'GROS'   and  NUM_0 in  (SELECT distinct NUM_0   from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]      where month(INVDAT_0) >="+moisDebut+" and month(INVDAT_0) <="+moisFin+"     and year(INVDAT_0) = "+year+"   and  TSCCOD_1 like 'GROS'   and  ITMREF_0 "+ARTICLESSOUSCOND+"  and  NUM_0  in  (SELECT distinct NUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where month(INVDAT_0)> = "+moisDebut+" and month(INVDAT_0) <= "+moisFin+"    and year(INVDAT_0) = "+year+"   and  TSCCOD_1 like 'GROS'   and  ITMREF_0 "+inClause+"  group by NUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then "+sommeCond+"*(-1)  ELSE "+sommeCond+"  END) between '" + [DE] + "' and '" + [A] + "')   group by  NUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then '"+sommeSousCond+"'*(-1) ELSE '"+sommeSousCond+"' END) > '" + [valeurSousCondition] + "')  and ITMREF_0 "+inClause+" and BPCNUM_0 "+customersIn+" group by BPCNUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then "+sommeCond+"*(-1)  ELSE "+sommeCond+"  END) between '" + [DE] + "' and '" + [A] + "'";
        queryConcerned= `SELECT BPCNAM_0 as NOM,  BPCNUM_0 as CodeClient, CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   where  INVDAT_0 between '${dateDebut}' and '${dateFin}'  and  TSCCOD_1 like 'GROS'   and  NUM_0 in  (SELECT distinct NUM_0   from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]      where INVDAT_0 between '${dateDebut}' and '${dateFin}'     and  TSCCOD_1 like 'GROS'   and  ITMREF_0 ${ARTICLESSOUSCOND}  and  NUM_0  in  (SELECT distinct NUM_0  from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    where INVDAT_0 between '${dateDebut}' and '${dateFin}'    and  TSCCOD_1 like 'GROS'   and  ITMREF_0 ${inClause}  group by NUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1)  ELSE ${sommeCond}  END) between ${[DE]} and ${[A]})   group by  NUM_0 ,INVTYP_0 having (CASE  WHEN INVTYP_0=2 then ${sommeSousCond}*(-1) ELSE ${sommeSousCond} END) >= ${[valeurSousCondition]})  and BPCNUM_0 ${customersIn}  and ITMREF_0 ${inClause}  group by BPCNUM_0 ,INVTYP_0,BPCNAM_0 having (CASE  WHEN INVTYP_0=2 then ${sommeCond}*(-1)  ELSE ${sommeCond}  END) between ${[DE]} and ${[A]} `;
                      
        }
        
        
            
            let data1 = await pool.request().query(queryConcerned);
            // console.log(data1)
            for(let i = 0; i < data1.recordset.length; i++){
                
            if(OFFRE=='REMISE'){  
        
                planSujetQte.push({
                    DateDebut:plans.dateDebut ,
                    DateFin:plans.dateFin ,
                    CodePlan: CODEConcerne , 
                    TYPE:typeConcerne,
                    IDPALIER: NoPalier,
                    CodeClient: data1.recordset[i].CodeClient,
                    NOM: data1.recordset[i].NOM,
                    CodeX3: ARTICLESConcerne,
                    Qte:data1.recordset[i].qte,
                    Prix:data1.recordset[i].price,
                    Offre:OFFRE,
                    Valeur:DETOFFRE,
                    calcul: (data1.recordset[i].price - ((data1.recordset[i].price * DETOFFRE)/100)),
                    ecart: data1.recordset[i].price - (data1.recordset[i].price - ((data1.recordset[i].price * DETOFFRE)/100)),
                    description: plans.descriptionPlan,
                    mails: plans.mails
                
                })      
             }
        
             if(OFFRE=='GRATUITE' || OFFRE=='AVS' || OFFRE=='GIFT'){  
        
                 planSujetQte.push({
                    DateDebut:plans.dateDebut ,
                    DateFin:plans.dateFin ,
                    CodePlan: CODEConcerne , 
                    TYPE:typeConcerne,
                    IDPALIER: NoPalier,
                    CodeClient: data1.recordset[i].CodeClient,
                    NOM: data1.recordset[i].NOM,
                    CodeX3: ARTICLESConcerne,
                    Qte:data1.recordset[i].qte,
                    Prix:data1.recordset[i].price,
                    Offre:OFFRE,
                    Valeur:DETOFFRE,
                     Calcul: '',
                     ecart:'',
                     description: plans.descriptionPlan,
                     mails: plans.mails
                 })           
             }
        
             if(OFFRE=='ECART' ){  
        
                 planSujetQte.push({
                DateDebut:plans.dateDebut ,
                DateFin:plans.dateFin ,
                CodePlan: CODEConcerne , 
                TYPE:typeConcerne,
                IDPALIER: NoPalier,
                CodeClient: data1.recordset[i].CodeClient,
                NOM: data1.recordset[i].NOM,
                CodeX3: ARTICLESConcerne,
                Qte:data1.recordset[i].qte,
                Prix:data1.recordset[i].price,
                Offre:OFFRE,
                Valeur:DETOFFRE,
                Calcul: (DETOFFRE * data1.recordset[i].qte ),
                ecart: data1.recordset[i].price - (DETOFFRE * data1.recordset[i].qte ),
                description: plans.descriptionPlan,
                mails: plans.mails
                 })           
             }
        
          
        
             }
        //      if(planSujetQte.length!==0){
        //     var jsonContent = JSON.stringify(planSujetQte);
        //     let fileName= "Plan_"+CODEConcerne+"_Palier_N°_"+NoPalier+".json";
        //     fs.writeFile("PlansJSON/Type D/"+fileName,jsonContent, 'utf8', function (err) {
        //     });
        //    }

        if(planSujetQte.length!==0){
            let fileName= "Plan_"+CODEConcerne+".json";
            let myPath= "PlansJSON/Type D/"+fileName;

            let fileNameExcel= "Plan_"+CODEConcerne+".xlsx";
            let myExcelPath= "PlansJSON/Type D/"+fileNameExcel;
           
            // console.log('DABA hnaya asahbi');
            if (fs.existsSync(myPath)) {
               let PlansTypeD = fs.readFileSync(myPath);
               let PlansDeTypeD = JSON.parse(PlansTypeD);
               planSujetQte=PlansDeTypeD.concat(planSujetQte);
               var jsonContent = JSON.stringify(planSujetQte);
            //   fs.writeFileSync("PlansJSON/Type D/"+fileName, jsonContent);
              modifyFile(myPath,jsonContent,myExcelPath);
              console.log(myPath);
            // //console.log(jsonContent);
            console.log(myExcelPath);
            //   setTimeout(() => {convertToFormat(myPath,myExcelPath)}, 8000);
            //   setTimeout(() => {sendMailReussi(plans,myExcelPath)}, 9000);
             }else{
               var jsonContent = JSON.stringify(planSujetQte);
            //   fs.writeFile("PlansJSON/Type D/"+fileName,jsonContent, 'utf8', function (err) {
            // });  
            writeFil(myPath,jsonContent,myExcelPath);
            console.log(myPath);
            // //console.log(jsonContent);
            console.log(myExcelPath);
            // setTimeout(() => {convertToFormat(myPath,myExcelPath)}, 8000);
            // setTimeout(() => {sendMailReussi(plans,myExcelPath)}, 9000);
             }
             
           
           }
             pool.close;
             sql.close; 
     };
        
     
     function sendMailReussi(plan,mypath) {
        var nodemailer = require('nodemailer');
        let emailAdresses = fs.readFileSync('signataire.json');
            emailAdresses = JSON.parse(emailAdresses);
        // const Lemois = dateFormat('mmmm');
        // const ste = 'CMG';
        let dest= plan.mails.split(',')
        let essent=  ','+emailAdresses.SOPemail+','+emailAdresses.FBPMemail+','+emailAdresses.FBPDemail+','+emailAdresses.GMemail+','+emailAdresses.WSMemail;
        var listDest = dest.map(id=>""+id+"").join();
        listDest=listDest.concat(essent);
        // console.log(listDest)
        let apos="'";
        listDest=apos.concat(listDest);
        listDest=listDest.concat("'");
        // inClause= IN.concat(inClause);
        // console.log(listDest);
       
        // let tosend= essent+dest;
      
          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'walidnadifi@gmail.com',
                  pass: 'nadifi02101997'
              }
          });
      
          var mailOptions = {
              from: 'CC@gmail.com',
              to: listDest,
              subject: 'Plans hors système',
            text: 'Bonjour, \n    Le calcul du plan'+plan.CODE+' a été effectué avec succès. Ci-joint la synthèse.\n \n Cordialement,',
              attachments: [
                // { path: upload },
                 { path: mypath}
              ]
          };
      
          // transporter.sendMail(mailOptions, function (error, info) {
          //     if (error) {
          //         console.log(error);
          //     } else {
          //         console.log('Email sent: ' + info.response);
          //     }
          // });
      
      
        
      }
    

        function writeFil(path,jsonContent,myExcelPath){
            fs.writeFile(path,jsonContent, 'utf8', function (err) {
            });
            // convertToFormat(path,myExcelPath)
            console.log('the path:',myExcelPath)
            setTimeout(() => {convertToFormat(path,myExcelPath)}, 8000);
            // setTimeout(() => {sendMailReussi(plans,myExcelPath)}, 9000);
        }

        function   modifyFile(path,jsonContent,myExcelPath){
            fs.writeFileSync(path, jsonContent);
            // convertToFormat(path,myExcelPath)
            console.log('the path:',myExcelPath)

            setTimeout(() => {convertToFormat(path,myExcelPath)}, 8000);
        }
      
        function convertToFormat(path,myExcelPath){
            var wb = new xl.Workbook();
            
            // Add Worksheets to the workbook
            var ws = wb.addWorksheet('Sheet 1');
            // var ws2 = wb.addWorksheet('Sheet 2');
            
            // Create a reusable style
            var style = wb.createStyle({
              font: {
                color: '#FF0800',
                size: 12,
              },
              alignment: {
                wrapText: true,
                horizontal: 'center',
              },
              numberFormat: '#,##0.00; (#,##0.00); -',
            });
            
            var styletitle = wb.createStyle({
                font: {
                  color: 'black',
                  size: 15,
                  bold: true,
                },
                alignment: {
                  wrapText: true,
                  horizontal: 'center',
                },
                border: {
                    left: {
                        style: 'medium',
                        color: 'black',
                    },
                    right: {
                        style: 'medium',
                        color: 'black',
                    },
                    top: {
                        style: 'medium',
                        color: 'black',
                    },
                    bottom: {
                        style: 'medium',
                        color: 'black',
                    },
                    outline: false,
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -',
              });
            
            
              var smalltitle = wb.createStyle({
                font: {
                  color: 'black',
                  size: 12,
                //   bold: true,
                  underline: true,
                  italics: true,
                },
                alignment: {
                  wrapText: true,
                  horizontal: 'center',
                  shrinkToFit: true, 
                },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -',
              });
            
              var secondCol = wb.createStyle({
                font: {
                  color: 'black',
                  size: 12,
                  bold: true,
                //   underline: true,
                //   italics: true,
                },
                alignment: {
                  wrapText: true,
                  horizontal: 'center',
                  shrinkToFit: true, 
                },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -',
              });
            
            
              var headers = wb.createStyle({
                font: {
                  color: 'black',
                  size: 12,
                  bold: true,
                  //   underline: true,
                  //   italics: true,
                },
                
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    bgColor:'#FFF2CC',
                    fgColor: '#FFF2CC',
                  },
                alignment: {
                  wrapText: true,
                  horizontal: 'center',
                  vertical: 'center',
                  shrinkToFit: true, 
                },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -',
              });
            
              var stData = wb.createStyle({
                font: {
                  color: 'black',
                  size: 12,
                  // bold: true,
                  //   underline: true,
                  //   italics: true,
                },
                
               
                alignment: {
                  wrapText: true,
                  horizontal: 'center',
                  vertical: 'center',
                  shrinkToFit: true, 
                },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
                numberFormat: '#,##0.00; (#,##0.00); -',
              });
              
              var signature = wb.createStyle({
                font: {
                  color: 'black',
                  size: 12,
                  // bold: true,
                  //   underline: true,
                  //   italics: true,
                },
                
               
                alignment: {
                  wrapText: true,
                  horizontal: 'center',
                  vertical: 'center',
                  shrinkToFit: true, 
                },
                border: {
                    left: {
                        style: 'medium',
                        color: 'black',
                    },
                    right: {
                        style: 'medium',
                        color: 'black',
                    },
                    top: {
                        style: 'medium',
                        color: 'black',
                    },
                    bottom: {
                        style: 'medium',
                        color: 'black',
                    },
                    outline: false,
                },
                numberFormat: '#,##0.00; (#,##0.00); -',
              });
            
              var signTitle = wb.createStyle({
                font: {
                  color: 'black',
                  size: 12,
                  bold: true,
                //   underline: true,
                //   italics: true,
                },
                alignment: {
                  wrapText: true,
                  horizontal: 'center',
                  vertical: 'center',
                  shrinkToFit: true, 
                }
              });
            
              ws.column(1).setWidth(15);
              ws.column(2).setWidth(20);
              ws.column(3).setWidth(10);
              ws.column(4).setWidth(8);
              ws.column(5).setWidth(15);
              ws.column(6).setWidth(20);
              ws.column(10).setWidth(15);
              ws.column(10).setWidth(15);
              ws.row(10).setHeight(30);
        
              let signatures = fs.readFileSync('signataire.json');
              signatures = JSON.parse(signatures);
              // console.log(signatures.SOP)

            
            let plansAQTE = fs.readFileSync(path);
            plansAQTE = JSON.parse(plansAQTE);
            let forhead=plansAQTE[0];            
            ws.cell(1,1,1,10,true)
              .string('')
              .style(style);
            //   title
            ws.cell(2,1,2,10,true)
              .string('Compensation Plans Hors Système')
              .style(styletitle);
            //   VIDE
            ws.cell(3,1)
              .string('Numéro :')
              .style(smalltitle);

              ws.cell(3,2,3,10,true)
              .string(forhead.CodePlan)
              .style(secondCol)
            
            ws.cell(4,1)
              .string('Période :')
              .style(smalltitle)
            // DATA CODE PLAN

            ws.cell(4,2,4,10,true)
            .string('De :'+forhead.DateDebut+' A :'+forhead.DateFin)
            .style(secondCol)
            
            
            ws.cell(5,1)
              .string('Produits :')
              .style(smalltitle)
            //   DATA PRODUCT
            ws.cell(5,2,5,10,true)
            .string('ARTICLES CONDITION')
            .style(secondCol)
            
            
            ws.cell(6,1)
              .string('Mécanisme :')
              .style(smalltitle)
            //   Data phrase 
            ws.cell(6,2,6,10,true)
            .string(forhead.description)
            .style(secondCol)
            
            
            ws.cell(7,1)
              .string('Remarques :')
              .style(smalltitle)
            
              ws.cell(7,2,7,10,true)
              .string('Note de crédit')
              .style(secondCol)
            
              ws.cell(8,1)
              .string('Imputation :')
              .style(smalltitle)
              ws.cell(8,2,8,10,true)
              .string('')
              .style(secondCol)
            
            
            
              //   VIDE
            ws.cell(9,1,9,10,true)
            .string('')
            .style(style);
            
            
            
            
            let  headingColumnNames =[]
           
            const data = plansAQTE;
            console.log('Lets print the offre ',forhead)
            if(forhead.Offre == 'REMISE'){
                let CategoryMan;
                if( forhead.mails){
                    let signCateman=forhead.mails.split(',')
                    CategoryMan= signCateman[0].split('@')[0]                 
              }
           
             if(forhead.IDPALIER){
              ws.column(8).setWidth(2);
              headingColumnNames = [
              "Code client",
              "NOM",
              "CA",
              "QTE",
              "GIFT",
              "No palier",
              "Taux de remise",
              "-",
              "Remarques",
              "Commentaire",
              
                  ]
                   //Write Column Title in Excel file
              let headingColumnIndex = 1;
              headingColumnNames.forEach(heading => {
                  ws.cell(10, headingColumnIndex++)
                      .string(heading)
                      .style(headers)
              });
              //Write Data in Excel file
              let rowIndex = 11;
              data.forEach( record => {
                  let columnIndex = 1;
                  Object.keys(record ).forEach(columnName =>{
            
                    ws.cell(rowIndex,1)
                    .string(record.CodeClient.toString())
                    // .style(stData)
                    
                    
                      ws.cell(rowIndex,2)
                         .string(record.NOM.toString())
                         .style(stData)
                         ws.cell(rowIndex,3)
                         .number(record.Prix)
                         .style(stData)
                         ws.cell(rowIndex,4)
                         .string(record.Qte.toString())
                         .style(stData)
                         ws.cell(rowIndex,5)
                         .number(record.ecart)
                         .style(stData)
                         ws.cell(rowIndex,6)
                         .string(record.IDPALIER.toString())
                         .style(stData)
                         ws.cell(rowIndex,7)
                         .string(record.Valeur.toString())
                         .style(stData)
                         ws.cell(rowIndex,8)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,9)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,10)
                         .string('')
                         .style(stData)
                      
                  });
                  
                  rowIndex++;
              }); 
              ws.row(rowIndex+3).setHeight(40);
              ws.row(rowIndex+5).setHeight(40);
              ws.row(rowIndex+7).setHeight(40);

              // console.log(forhead.mails)
             
            // Title signature
              ws.cell(rowIndex+3,1)
              .string('Préparé par Sales Operations: '+signatures.SOP)
              .style(signTitle)
              // Case signature
              ws.cell(rowIndex+3,2)
              .string('')
              .style(signature)
            // Title signature
              ws.cell(rowIndex+3,5)
              .string('Approuvé par Category Manager :'+CategoryMan)
              .style(signTitle)
              // Case signature
              ws.cell(rowIndex+3,6)
              .string('')
              .style(signature)
            
            
            // Title signature
              ws.cell(rowIndex+5,1)
              .string('Approuvé par WS Manager:'+signatures.WSM)
              .style(signTitle)
              // Case signature
              ws.cell(rowIndex+5,2)
              .string('')
              .style(signature)
            // Title signature
              ws.cell(rowIndex+5,5)
              .string('Approuvé par FBP Manager : '+signatures.FBPM)
              .style(signTitle)
              // Case signature
              ws.cell(rowIndex+5,6)
              .string('')
              .style(signature)
            
            // Title signature
              ws.cell(rowIndex+7,1)
              .string('Approuvé par Finance Director  :'+signatures.FBPD)
              .style(signTitle)
              // Case signature
              ws.cell(rowIndex+7,2)
              .string('') 
              .style(signature)
              // Title signature
              ws.cell(rowIndex+7,5)
              .string('Validé par :'+signatures.GM)
              .style(signTitle)
              // Case signature
              ws.cell(rowIndex+7,6)
              .string('')
              .style(signature)
            }
            
            if(!forhead.IDPALIER){
              ws.column(7).setWidth(2);
              ws.column(8).setWidth(2);
              headingColumnNames = [
              "Code client",
              "NOM",
              "CA",
              "QTE",
              "GIFT",
              "Taux de remise",
              "-",
              "-",
              "Remarques",
              "Commentaire",
              
                  ]
                   //Write Column Title in Excel file
              let headingColumnIndex = 1;
              headingColumnNames.forEach(heading => {
                  ws.cell(10, headingColumnIndex++)
                      .string(heading)
                      .style(headers)
              });
              //Write Data in Excel file
              let rowIndex = 11;
              ws.column(6).setWidth(20);
              data.forEach( record => {
                  let columnIndex = 1;
                  Object.keys(record ).forEach(columnName =>{
            
                    ws.cell(rowIndex,1)
                    .string(record.CodeClient.toString())
                    .style(stData)
                      ws.cell(rowIndex,2)
                         .string(record.NOM.toString())
                         .style(stData)
                         ws.cell(rowIndex,3)
                        //  .string(record.Prix.toString())
                         .number(record.Prix)
                         .style(stData)
                         ws.cell(rowIndex,4)
                         .string(record.Qte.toString())
                         .style(stData)
                         ws.cell(rowIndex,5)
                        //  .string(record.ecart.toString())
                         .number(record.ecart)
                         .style(stData)
                         ws.cell(rowIndex,6)
                         .string(record.Valeur.toString())
                         .style(stData)
                         ws.cell(rowIndex,7)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,8)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,9)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,10)
                         .string('')
                         .style(stData)
                      
                  });
                  
                  rowIndex++;
              }); 
            
              ws.row(rowIndex+3).setHeight(40);
              ws.row(rowIndex+5).setHeight(40);
              ws.row(rowIndex+7).setHeight(40);
            
            
            
             // Title signature
             ws.cell(rowIndex+3,1)
             .string('Préparé par Sales Operations: '+signatures.SOP)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+3,2)
             .string('')
             .style(signature)
           // Title signature
             ws.cell(rowIndex+3,5)
             .string('Approuvé par Category Manager :'+CategoryMan)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+3,6)
             .string('')
             .style(signature)
           
           
           // Title signature
             ws.cell(rowIndex+5,1)
             .string('Approuvé par WS Manager:'+signatures.WSM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+5,2)
             .string('')
             .style(signature)
           // Title signature
             ws.cell(rowIndex+5,5)
             .string('Approuvé par FBP Manager : '+signatures.FBPM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+5,6)
             .string('')
             .style(signature)
           
           // Title signature
             ws.cell(rowIndex+7,1)
             .string('Approuvé par Finance Director  :'+signatures.FBPD)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+7,2)
             .string('') 
             .style(signature)
             // Title signature
             ws.cell(rowIndex+7,5)
             .string('Validé par :'+signatures.GM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+7,6)
             .string('')
             .style(signature)
           }
            
            }
            
            if(forhead.Offre == 'ECART'){
              let CategoryMan;
                if( forhead.mails){
                    let signCateman=forhead.mails.split(',')
                    CategoryMan= signCateman[0].split('@')[0]                 
              }
              if(forhead.IDPALIER){
             
               headingColumnNames = [
               "Code client",
               "NOM",
               "CA",
               "QTE",
               "GIFT",
               "No palier",
               "PTT NET",
               "PTT CIBLE",
               "Remarques",
               "Commentaire",
               
                   ]
                    //Write Column Title in Excel file
               let headingColumnIndex = 1;
               headingColumnNames.forEach(heading => {
                   ws.cell(10, headingColumnIndex++)
                       .string(heading)
                       .style(headers)
               });
               //Write Data in Excel file
               let rowIndex = 11;
               data.forEach( record => {
                   let columnIndex = 1;
                   Object.keys(record ).forEach(columnName =>{
             
                     ws.cell(rowIndex,1)
                     .string(record.CodeClient.toString())
                     .style(stData)
                       ws.cell(rowIndex,2)
                          .string(record.NOM.toString())
                          .style(stData)
                          ws.cell(rowIndex,3)
                          .number(record.Prix)
                          .style(stData)
                          ws.cell(rowIndex,4)
                          .string(record.Qte.toString())
                          .style(stData)
                          ws.cell(rowIndex,5)
                          .number(record.ecart)
                          .style(stData)
                          ws.cell(rowIndex,6)
                          .string(record.IDPALIER.toString())
                          .style(stData)
                          ws.cell(rowIndex,7)
                          .number((record.Prix/record.Qte))
                          .style(stData)
                          ws.cell(rowIndex,8)
                          .string(record.Valeur.toString())
                          .style(stData)
                          ws.cell(rowIndex,9)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,10)
                          .string('')
                          .style(stData)
                       
                   });
                   
                   rowIndex++;
               }); 
              
              
              ws.row(rowIndex+3).setHeight(40);
              ws.row(rowIndex+5).setHeight(40);
              ws.row(rowIndex+7).setHeight(40);
           
           
           
         // Title signature
         ws.cell(rowIndex+3,1)
         .string('Préparé par Sales Operations: '+signatures.SOP)
         .style(signTitle)
         // Case signature
         ws.cell(rowIndex+3,2)
         .string('')
         .style(signature)
       // Title signature
         ws.cell(rowIndex+3,5)
         .string('Approuvé par Category Manager :'+CategoryMan)
         .style(signTitle)
         // Case signature
         ws.cell(rowIndex+3,6)
         .string('')
         .style(signature)
       
       
       // Title signature
         ws.cell(rowIndex+5,1)
         .string('Approuvé par WS Manager:'+signatures.WSM)
         .style(signTitle)
         // Case signature
         ws.cell(rowIndex+5,2)
         .string('')
         .style(signature)
       // Title signature
         ws.cell(rowIndex+5,5)
         .string('Approuvé par FBP Manager : '+signatures.FBPM)
         .style(signTitle)
         // Case signature
         ws.cell(rowIndex+5,6)
         .string('')
         .style(signature)
       
       // Title signature
         ws.cell(rowIndex+7,1)
         .string('Approuvé par Finance Director  :'+signatures.FBPD)
         .style(signTitle)
         // Case signature
         ws.cell(rowIndex+7,2)
         .string('') 
         .style(signature)
         // Title signature
         ws.cell(rowIndex+7,5)
         .string('Validé par :'+signatures.GM)
         .style(signTitle)
         // Case signature
         ws.cell(rowIndex+7,6)
         .string('')
         .style(signature)
       }
             
             if(!forhead.IDPALIER){
              ws.column(8).setWidth(2);
              ws.column(7).setWidth(8);
               headingColumnNames = [
               "Code client",
               "NOM",
               "CA",
               "QTE",
               "GIFT",
               "PTT NET",
               "PTT CIBLE",
               "-",
               "Remarques",
               "Commentaire",
               
                   ]
                    //Write Column Title in Excel file
               let headingColumnIndex = 1;
               headingColumnNames.forEach(heading => {
                   ws.cell(10, headingColumnIndex++)
                       .string(heading)
                       .style(headers)
               });
               //Write Data in Excel file
               let rowIndex = 11;
               data.forEach( record => {
                   let columnIndex = 1;
                   Object.keys(record ).forEach(columnName =>{
             
                    ws.cell(rowIndex,1)
                    .string(record.CodeClient.toString())
                    .style(stData)
                      ws.cell(rowIndex,2)
                         .string(record.NOM.toString())
                         .style(stData)
                         ws.cell(rowIndex,3)
                         .number(record.Prix)
                         .style(stData)
                         ws.cell(rowIndex,4)
                         .string(record.Qte.toString())
                         .style(stData)
                         ws.cell(rowIndex,5)
                         .number(record.ecart)
                         .style(stData)
                         ws.cell(rowIndex,6)
                         .number((record.Prix/record.Qte))
                         .style(stData)
                         ws.cell(rowIndex,7)
                         .string(record.Valeur.toString())
                         .style(stData)
                         ws.cell(rowIndex,8)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,9)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,10)
                         .string('')
                         .style(stData)
                       
                   });
                   
                   rowIndex++;
               }); 
               ws.row(rowIndex+3).setHeight(40);
              ws.row(rowIndex+5).setHeight(40);
              ws.row(rowIndex+7).setHeight(40);
            // Title signature
            ws.cell(rowIndex+3,1)
            .string('Préparé par Sales Operations: '+signatures.SOP)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+3,2)
            .string('')
            .style(signature)
          // Title signature
            ws.cell(rowIndex+3,5)
            .string('Approuvé par Category Manager :'+CategoryMan)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+3,6)
            .string('')
            .style(signature)
          
          
          // Title signature
            ws.cell(rowIndex+5,1)
            .string('Approuvé par WS Manager:'+signatures.WSM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+5,2)
            .string('')
            .style(signature)
          // Title signature
            ws.cell(rowIndex+5,5)
            .string('Approuvé par FBP Manager : '+signatures.FBPM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+5,6)
            .string('')
            .style(signature)
          
          // Title signature
            ws.cell(rowIndex+7,1)
            .string('Approuvé par Finance Director  :'+signatures.FBPD)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+7,2)
            .string('') 
            .style(signature)
            // Title signature
            ws.cell(rowIndex+7,5)
            .string('Validé par :'+signatures.GM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+7,6)
            .string('')
            .style(signature)
          }
             
             
             }
            
             if(forhead.Offre == 'AVS'){
              let CategoryMan;
                if( forhead.mails){
                    let signCateman=forhead.mails.split(',')
                    CategoryMan= signCateman[0].split('@')[0]                 
              }
              if(forhead.IDPALIER){
               ws.column(8).setWidth(2);
               ws.column(7).setWidth(2);
               headingColumnNames = [
               "Code client",
               "NOM",
               "CA",
               "QTE",
               "No palier",
               "Valeur AVS",
               "-",
               "-",
               "Remarques",
               "Commentaire",
               
                   ]
                    //Write Column Title in Excel file
               let headingColumnIndex = 1;
               headingColumnNames.forEach(heading => {
                   ws.cell(10, headingColumnIndex++)
                       .string(heading)
                       .style(headers)
               });
               //Write Data in Excel file
               let rowIndex = 11;
               data.forEach( record => {
                   let columnIndex = 1;
                   Object.keys(record ).forEach(columnName =>{
             
                     ws.cell(rowIndex,1)
                     .string(record.CodeClient.toString())
                     .style(stData)
                     ws.cell(rowIndex,2)
                     .string(record.NOM.toString())
                      .style(stData)
                          ws.cell(rowIndex,3)
                          .number(record.Prix)
                          .style(stData)
                          ws.cell(rowIndex,4)
                          .string(record.Qte.toString())
                          .style(stData)
                          ws.cell(rowIndex,5)
                          .string(record.IDPALIER.toString())
                          .style(stData)
                          ws.cell(rowIndex,6)
                          .string(record.Valeur.toString())
                          .style(stData)
                          ws.cell(rowIndex,7)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,8)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,9)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,10)
                          .string('')
                          .style(stData)
                       
                   });
                   
                   rowIndex++;
               }); 
               ws.row(rowIndex+3).setHeight(40);
               ws.row(rowIndex+5).setHeight(40);
               ws.row(rowIndex+7).setHeight(40);
             // Title signature
             ws.cell(rowIndex+3,1)
             .string('Préparé par Sales Operations: '+signatures.SOP)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+3,2)
             .string('')
             .style(signature)
           // Title signature
             ws.cell(rowIndex+3,5)
             .string('Approuvé par Category Manager :'+CategoryMan)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+3,6)
             .string('')
             .style(signature)
           
           
           // Title signature
             ws.cell(rowIndex+5,1)
             .string('Approuvé par WS Manager:'+signatures.WSM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+5,2)
             .string('')
             .style(signature)
           // Title signature
             ws.cell(rowIndex+5,5)
             .string('Approuvé par FBP Manager : '+signatures.FBPM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+5,6)
             .string('')
             .style(signature)
           
           // Title signature
             ws.cell(rowIndex+7,1)
             .string('Approuvé par Finance Director  :'+signatures.FBPD)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+7,2)
             .string('') 
             .style(signature)
             // Title signature
             ws.cell(rowIndex+7,5)
             .string('Validé par :'+signatures.GM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+7,6)
             .string('')
             .style(signature)
           }
             
             if(!forhead.IDPALIER){
               ws.column(7).setWidth(2);
               ws.column(8).setWidth(2);
               headingColumnNames = [
               "Code client",
               "NOM",
               "CA",
               "QTE",
               "Valeur AVS",
               "-",
               "-",
               "-",
               "Remarques",
               "Commentaire",
               
                   ]
                    //Write Column Title in Excel file
               let headingColumnIndex = 1;
               headingColumnNames.forEach(heading => {
                   ws.cell(10, headingColumnIndex++)
                       .string(heading)
                       .style(headers)
               });
               //Write Data in Excel file
               let rowIndex = 11;
               ws.column(6).setWidth(20);
               data.forEach( record => {
                   let columnIndex = 1;
                   Object.keys(record ).forEach(columnName =>{
             
                     ws.cell(rowIndex,1)
                     .string(record.CodeClient.toString())
                     .style(stData)
                       ws.cell(rowIndex,2)
                          .string(record.NOM.toString())
                          .style(stData)
                          ws.cell(rowIndex,3)
                          .number(record.Prix)
                          .style(stData)
                          ws.cell(rowIndex,4)
                          .string(record.Qte.toString())
                          .style(stData)
                          ws.cell(rowIndex,5)
                          .string(record.Valeur.toString())
                          .style(stData)
                          ws.cell(rowIndex,6)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,7)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,8)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,9)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,10)
                          .string('')
                          .style(stData)
                       
                   });
                   
                   rowIndex++;
               }); 
             
               ws.row(rowIndex+3).setHeight(40);
               ws.row(rowIndex+5).setHeight(40);
               ws.row(rowIndex+7).setHeight(40);
             // Title signature
             ws.cell(rowIndex+3,1)
             .string('Préparé par Sales Operations: '+signatures.SOP)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+3,2)
             .string('')
             .style(signature)
           // Title signature
             ws.cell(rowIndex+3,5)
             .string('Approuvé par Category Manager :'+CategoryMan)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+3,6)
             .string('')
             .style(signature)
           
           
           // Title signature
             ws.cell(rowIndex+5,1)
             .string('Approuvé par WS Manager:'+signatures.WSM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+5,2)
             .string('')
             .style(signature)
           // Title signature
             ws.cell(rowIndex+5,5)
             .string('Approuvé par FBP Manager : '+signatures.FBPM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+5,6)
             .string('')
             .style(signature)
           
           // Title signature
             ws.cell(rowIndex+7,1)
             .string('Approuvé par Finance Director  :'+signatures.FBPD)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+7,2)
             .string('') 
             .style(signature)
             // Title signature
             ws.cell(rowIndex+7,5)
             .string('Validé par :'+signatures.GM)
             .style(signTitle)
             // Case signature
             ws.cell(rowIndex+7,6)
             .string('')
             .style(signature)
           }
             
             }
            
             if(forhead.Offre == 'GRATUITE' || forhead.Offre == 'GIFT'){
            
              let CategoryMan;
              if( forhead.mails){
                  let signCateman=forhead.mails.split(',')
                  CategoryMan= signCateman[0].split('@')[0]                 
            }
            
              if(forhead.IDPALIER){
                ws.column(8).setWidth(2);
               headingColumnNames = [
               "Code client",
               "NOM",
               "CA",
               "QTE",
               "No palier",
               "QTE Gratuité",
               "Code X3",
               "-",
               "Remarques",
               "Commentaire",
               
                   ]
                    //Write Column Title in Excel file
               let headingColumnIndex = 1;
               headingColumnNames.forEach(heading => {
                   ws.cell(10, headingColumnIndex++)
                       .string(heading)
                       .style(headers)
               });
               //Write Data in Excel file
               let rowIndex = 11;
               data.forEach( record => {
                   let columnIndex = 1;
                   Object.keys(record ).forEach(columnName =>{
            
                    let splited=record.Valeur.split(',')
                    let articles = [];
                    let qtes=[];
                    splited.forEach(element => {
                      const splits = element.split('*')
                      articles.push(splits[0])
                      qtes.push(splits[1])
                    });
                    articles.map(id=>""+id+"").join();
                    qtes.map(id=>""+id+"").join();
             
                     ws.cell(rowIndex,1)
                     .string(record.CodeClient.toString())
                     .style(stData)
                       ws.cell(rowIndex,2)
                          .string(record.NOM.toString())
                          .style(stData)
                          ws.cell(rowIndex,3)
                          .number(record.Prix)
                          .style(stData)
                          ws.cell(rowIndex,4)
                          .string(record.Qte.toString())
                          .style(stData)
                          ws.cell(rowIndex,5)
                          .string(record.IDPALIER.toString())
                          .style(stData)
                          ws.cell(rowIndex,6)
                          .string(qtes.toString())
                          .style(stData)
                          ws.cell(rowIndex,7)
                          .string(articles.toString())
                          .style(stData)
                          ws.cell(rowIndex,8)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,9)
                          .string('')
                          .style(stData)
                          ws.cell(rowIndex,10)
                          .string('')
                          .style(stData)
                       
                   });
                   
                   rowIndex++;
               }); 
               ws.row(rowIndex+3).setHeight(40);
              ws.row(rowIndex+5).setHeight(40);
              ws.row(rowIndex+7).setHeight(40);
            // Title signature
            ws.cell(rowIndex+3,1)
            .string('Préparé par Sales Operations: '+signatures.SOP)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+3,2)
            .string('')
            .style(signature)
          // Title signature
            ws.cell(rowIndex+3,5)
            .string('Approuvé par Category Manager :'+CategoryMan)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+3,6)
            .string('')
            .style(signature)
          
          
          // Title signature
            ws.cell(rowIndex+5,1)
            .string('Approuvé par WS Manager:'+signatures.WSM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+5,2)
            .string('')
            .style(signature)
          // Title signature
            ws.cell(rowIndex+5,5)
            .string('Approuvé par FBP Manager : '+signatures.FBPM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+5,6)
            .string('')
            .style(signature)
          
          // Title signature
            ws.cell(rowIndex+7,1)
            .string('Approuvé par Finance Director  :'+signatures.FBPD)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+7,2)
            .string('') 
            .style(signature)
            // Title signature
            ws.cell(rowIndex+7,5)
            .string('Validé par :'+signatures.GM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+7,6)
            .string('')
            .style(signature)
          }
             
             if(!forhead.IDPALIER){
              ws.column(8).setWidth(2);
              ws.column(7).setWidth(2);
               headingColumnNames = [
               "Code client",
               "NOM",
               "CA",
               "QTE",
               "QTE Gratuité",
               "Code X3",
               "-",
               "-",
               "Remarques",
               "Commentaire",
               
                   ]
                    //Write Column Title in Excel file
               let headingColumnIndex = 1;
               headingColumnNames.forEach(heading => {
                   ws.cell(10, headingColumnIndex++)
                       .string(heading)
                       .style(headers)
               });
               //Write Data in Excel file
               let rowIndex = 11;
               data.forEach( record => {
                   let columnIndex = 1;
                   Object.keys(record ).forEach(columnName =>{
             
                    let splited=record.Valeur.split(',')
                    let articles = [];
                    let qtes=[];
                    splited.forEach(element => {
                      const splits = element.split('*')
                      articles.push(splits[0])
                      qtes.push(splits[1])
                    });
                    articles.map(id=>""+id+"").join();
                    qtes.map(id=>""+id+"").join();
            
                    ws.cell(rowIndex,1)
                    .string(record.CodeClient.toString())
                    .style(stData)
                      ws.cell(rowIndex,2)
                         .string(record.NOM.toString())
                         .style(stData)
                         ws.cell(rowIndex,3)
                         .number(record.Prix)
                         .style(stData)
                         ws.cell(rowIndex,4)
                         .string(record.Qte.toString())
                         .style(stData)
                         ws.cell(rowIndex,5)
                         .string(qtes.toString())
                         .style(stData)
                         ws.cell(rowIndex,6)
                         .string(articles.toString())
                         .style(stData)
                         ws.cell(rowIndex,7)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,8)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,9)
                         .string('')
                         .style(stData)
                         ws.cell(rowIndex,10)
                         .string('')
                         .style(stData)
                       
                   });
                   
                   rowIndex++;
               }); 
               ws.row(rowIndex+3).setHeight(40);
              ws.row(rowIndex+5).setHeight(40);
              ws.row(rowIndex+7).setHeight(40);
            // Title signature
            ws.cell(rowIndex+3,1)
            .string('Préparé par Sales Operations: '+signatures.SOP)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+3,2)
            .string('')
            .style(signature)
          // Title signature
            ws.cell(rowIndex+3,5)
            .string('Approuvé par Category Manager :'+CategoryMan)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+3,6)
            .string('')
            .style(signature)
          
          
          // Title signature
            ws.cell(rowIndex+5,1)
            .string('Approuvé par WS Manager:'+signatures.WSM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+5,2)
            .string('')
            .style(signature)
          // Title signature
            ws.cell(rowIndex+5,5)
            .string('Approuvé par FBP Manager : '+signatures.FBPM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+5,6)
            .string('')
            .style(signature)
          
          // Title signature
            ws.cell(rowIndex+7,1)
            .string('Approuvé par Finance Director  :'+signatures.FBPD)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+7,2)
            .string('') 
            .style(signature)
            // Title signature
            ws.cell(rowIndex+7,5)
            .string('Validé par :'+signatures.GM)
            .style(signTitle)
            // Case signature
            ws.cell(rowIndex+7,6)
            .string('')
            .style(signature)
          }
             
             }
                    
            
               
            // wb.write('ExcelNew.xlsx');
            wb.write(myExcelPath);
            
            }