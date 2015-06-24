--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Boost
Set 
    --Name] = 'Oryzatein Ultra80', 
	--[VendID] = 'a0369f1f-9066-11e4-f68e-dc618677dc51',
	--[Image] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesboost/GivoCal_Calcium_SM.png'
	--[Price] = '2.90',
	--[Label] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitlabelsboost/Givocal.jpg'

	--[Info] = 'http://storeapp.thinkitdrinkit.com/givocal/',
	--[InfoLite] = 'Calcium is critical for healthy bone structure and density as well as cellular functions and metabolisms. GivoCal is a “2-in-1” ingredient that brings calcium and phosphorus in a 1.3 ratio necessary for good calcium absorption to support bone tissue and cellular functions, and has a suggested higher bioavailability than calcium carbonate.'
	--[BaseDBbase_id] = '138'
	--[FuncDBfunc_id] = '6'
    --[Order] = '5'
	[ShopifyID] = '123',
	[ShopifyImg] = 'httpbbbbbb'
WHERE Name = 'Spirulina' 
	  --AND id 'blah'
	  --id BETWEEN '14462' and '14608'
