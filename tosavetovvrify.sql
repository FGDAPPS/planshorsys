
-- THE GOOD ONE TYPE C
SELECT 
BPCNUM_0 as CodeClient ,
 CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte, 
 CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price 
from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE] 
where ITMREF_0 "+inClause+" 
and month(INVDAT_0)  between "+moisDebut+" and "+moisFin+"
and year(INVDAT_0) = "+year+"
and  TSCCOD_1 like 'GROS' 
group by BPCNUM_0 
having (CASE  WHEN INVTYP_0=2 then "+sommeCond+"*(-1) ELSE "+sommeCond+" END) between '" + [DE] + "' and '" + [A] + "'

-- SAME INLINE:
SELECT BPCNUM_0 as CodeClient , CASE  WHEN INVTYP_0=2 then sum(QTY_0)*(-1) ELSE sum(QTY_0) END as qte,  CASE  WHEN INVTYP_0=2 then sum(AMTATILIN_0)*(-1)  ELSE sum(AMTATILIN_0)  END as price  from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]  where ITMREF_0 "+inClause+"  and month(INVDAT_0)  between "+moisDebut+" and "+moisFin+" and year(INVDAT_0) = "+year+" and  TSCCOD_1 like 'GROS'  group by BPCNUM_0  having (CASE  WHEN INVTYP_0=2 then "+sommeCond+"*(-1) ELSE "+sommeCond+" END) between '" + [DE] + "' and '" + [A] + "'










-- OLD ONE 

SELECT BPCNUM_0 as CodeClient ,
sum(QTY_0) as qte,sum(AMTATILIN_0) as price 

from  [192.168.4.250\\X3V11PROD].[dbX3V11PROD].[SBG].[YCOMMERCIALE]
 where ITMREF_0 "+inClause+" 
 and month(INVDAT_0)  between 1 and 7 
 and year(INVDAT_0) = 2021
 and  TSCCOD_1 like 'GROS' 
 group by BPCNUM_0 
 having "+sommeCond+" between '" + [DE] + "' and '" + [A] + "'