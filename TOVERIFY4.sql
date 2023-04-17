SELECT  BPCNUM_0 as CodeClient, 
CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte, 
CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price  
 from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]   
  where  month(INVDAT_0) =7   
  and year(INVDAT_0) = 2021 
   and  TSCCOD_1 like 'GROS'  
   and ITMREF_0 in ('CPFSANESSUI0691') 
   and BPCNUM_0 in 
   (SELECT BPCNUM_0    from [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  
    where ITMREF_0 in ('CPFDALMOUCH0189','CPFDALMOUCH0184')
    and month(INVDAT_0) =7
    and year(INVDAT_0) = 2021 
     and  TSCCOD_1 like 'GROS'  
     group by BPCNUM_0  
     having sum(QTY_0) > 1500) 
     
     group by BPCNUM_0 , INVTYP_0 
     having (CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1)  ELSE sum(QTY_0)  END) > 3000 



     in ('CPFSANESSUI0691')
in ('CPFDALMOUCH0189','CPFDALMOUCH0184')