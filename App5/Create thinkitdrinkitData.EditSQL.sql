--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Base
Set 
    --Name] = 'Oryzatein Ultra80', 
	[VendID] = 'b8ca3a65-0166-11e4-fbb5-a71e04272776'
	--[Image] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesboost/Bacognize_SM.png',
	--[Price] = '11.85',
	--[Label] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitlabelsboost/Fat-Burner.jpg',

	--[Info] = 'http://storeapp.thinkitdrinkit.com/fatburner/',
	--[InfoLite] = 'The combination of Sinetrol and Cravingz’Gone acts as a fat burner, and helps to decrease abdominal body fat, waist size and hip size. Key features:increases burning of fat; helps to decrease waist size; increases weight loss.'
	--[BaseDBbase_id] = '138'
	--[FuncDBfunc_id] = '6'
    --[Order] = '5'
WHERE Name = 'ProthyR80' 
	  --AND id 'blah'
	  --id BETWEEN '14462' and '14608'
