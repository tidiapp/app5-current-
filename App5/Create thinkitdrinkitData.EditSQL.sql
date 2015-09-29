--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Flavor
Set 
	--[ecommerceinfolite]='Organic Oryzatein™ is a whole grain brown rice protein concentrate. It is the first and only allergen-friendly plant protein. It is the smoothest form of whole grain rice proteins, available at 80% protein concentration with an excellent amino acid profile.'
--’
	--[Name] = 'GIVOCAL™*',
	--[VendID] = 'b8ca3a65-0166-11e4-fbb5-a7024fa4f6a5',
	--[Image] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesboost/Quercetin_CellularEnergy_SM.png'
	[Price] = '5'
	--[Label] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitlabelsboost/Givocal.jpg'

	--[Info] = 'http://storeapp.thinkitdrinkit.com/givocal/',
	--[InfoLite] = 'Coenzyme Q10 is a substance similar to a vitamin, which helps to increase energy and speed recovery from exercise. Key features: combat depleting energy; experience less fatigue after exercising; speeds recovery from exercise.'
	--[BaseDBbase_id] = '22'
	--[FuncDBfunc_id] = '6'
	--[Order] = '48'
	--[ShopifyID] = '123',
	--[ShopifyImg] = 'httpbbbbbb'
WHERE  
	 Name = 'Pom Acai caloric'	
	  --id='66'
	  --AND id 'blah'
	  --id BETWEEN '14462' and '14608'
