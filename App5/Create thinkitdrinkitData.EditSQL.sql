--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Boost
Set 
    --[Name] = 'AminoBlast® Instanized BCAA Powder', 
	--[VendID] = 'b8ca3a65-0166-11e4-fbb5-a6fc14a2f85c'
	--[Image] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesboost/GivoCal_Calcium_SM.png'
	--[Price] = '2.90',
	--[Label] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitlabelsboost/Givocal.jpg'

	--[Info] = 'http://storeapp.thinkitdrinkit.com/givocal/',
	--[InfoLite] = 'Calcium is critical for healthy bone structure and density as well as cellular functions and metabolisms. GivoCal is a “2-in-1” ingredient that brings calcium and phosphorus in a 1.3 ratio necessary for good calcium absorption to support bone tissue and cellular functions, and has a suggested higher bioavailability than calcium carbonate.'
	--[BaseDBbase_id] = '138'
	--[FuncDBfunc_id] = '6'
    [Order] = '46'
	--[ShopifyID] = '123',
	--[ShopifyImg] = 'httpbbbbbb'
WHERE Name = 'Arla Whey Isolate 9213*' 
	  --AND id 'blah'
	  --id BETWEEN '14462' and '14608'
