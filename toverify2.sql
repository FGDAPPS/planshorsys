SELECT  BPCNUM_0 as CodeClient, 
CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte, 
CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price   
from [192.168.4.250\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]    

where 
month(INVDAT_0) >=  6 
and month(INVDAT_0) <= 6  
and year(INVDAT_0) = 2021  
and  TSCCOD_1 like 'GROS'  
and ITMREF_0 in ('CPFPANPAPIE0714','CPFPANPAPIE1180','CPFPANPAPIE0378','CPFPANPAPIE0713')
and BPCNUM_0 in (
     
     SELECT BPCNUM_0    
     from [192.168.4.250\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   
     where ITMREF_0 in ('CPFPANPAPIE0378','CPFPANPAPIE0718')
     and month(INVDAT_0) >= 6
     and month(INVDAT_0) <= 6 
     and year(INVDAT_0) = 2021 
     and  TSCCOD_1 like 'GROS'  group by BPCNUM_0  having sum(QTY_0) > 40) 
     
     
group by BPCNUM_0 , INVTYP_0 
having (CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END) between 5000 and  14999";
  