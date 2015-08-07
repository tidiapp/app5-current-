--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Boost
Set 
    [Name] = 'Bioenergy Ribose®', 
	--[VendID] = 'b8ca3a65-0166-11e4-fbb5-a6fc14a2f85c'
	--[Image] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesboost/GivoCal_Calcium_SM.png'
	--[Price] = '2.90',
	--[Label] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitlabelsboost/Givocal.jpg'

	--[Info] = 'http://storeapp.thinkitdrinkit.com/givocal/',
	[InfoLite] = 'Bioenergy Ribose® helps to reduce the loss of energy during exercise,and accelerates energy and muscle tissue recovery. The body does not store Bioenergy Ribose® and cannot create sufficient amounts quickly enough for exercise and recovery, boosting Ribose levels improves muscle recovery and energy levels. '
	--[BaseDBbase_id] = '138'
	--[FuncDBfunc_id] = '6'
   --[Order] = NULL
	--[ShopifyID] = '123',
	--[ShopifyImg] = 'httpbbbbbb'
WHERE Name = 'D Ribose (performance / workout)'
	  --AND id 'blah'
	  --id BETWEEN '14462' and '14608'
