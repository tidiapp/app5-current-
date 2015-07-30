--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Boost
Set 
    [Name] = ' ACTIValoe® ', 
	--[VendID] = 'b8ca3a65-0166-11e4-fbb5-a6fc14a2f85c'
	--[Image] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesboost/GivoCal_Calcium_SM.png'
	--[Price] = '2.90',
	--[Label] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitlabelsboost/Givocal.jpg'

	--[Info] = 'http://storeapp.thinkitdrinkit.com/givocal/',
	[InfoLite] = 'ACTIValoe®  contains bioactive component of aloe vera. It supports overall health for athletes by boosting the immune system, preserving digestive health and speeding up cellular recovery. Key features: supports immune health by eliminating bacteria in the body; speeds up healing of wounds and injuries; sustain workouts with immune and digestive defense.'
	--[BaseDBbase_id] = '138'
	--[FuncDBfunc_id] = '6'
    --[Order] = '46'
	--[ShopifyID] = '123',
	--[ShopifyImg] = 'httpbbbbbb'
WHERE Name = 'ACTIValoe' 
	  --AND id 'blah'
	  --id BETWEEN '14462' and '14608'
