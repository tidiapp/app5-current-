--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Boost
Set 
    --Name] = 'Oryzatein Ultra80', 
	[VendID] = 'dc85058a-a666-11e4-ef46-e8fea10d4aca',
	--[Image] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesboost/Bacognize_SM.png',
	[Price] = '11.85',
	[Label] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitlabelsboost/Fat-Burner.jpg',

	[Info] = 'http://storeapp.thinkitdrinkit.com/fatburner/',
	[InfoLite] = 'The combination of Sinetrol and Cravingz’Gone acts as a fat burner, and helps to decrease abdominal body fat, waist size and hip size. Key features:increases burning of fat; helps to decrease waist size; increases weight loss.'
	--[BaseDBbase_id] = '138'
	--[FuncDBfunc_id] = '6'
    --[Order] = '5'
WHERE Name = 'Fat Burner' 
	  --AND id 'blah'
	  --id BETWEEN '14462' and '14608'
