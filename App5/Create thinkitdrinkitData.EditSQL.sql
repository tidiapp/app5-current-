--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Boost
Set 
	[Name] = 'Clarinol*' 
	--[VendID] = '',
	--[Image] = '',
	--[Label] = '',
	--[Price] = '',
	--[InfoLite] = ''

WHERE Name = 'Weight management*' 
		--AND 
	  --id = 12775
