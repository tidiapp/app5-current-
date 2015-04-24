USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Boost
Set 
	--[Name] = 'Fat Burner' 
	[VendID] = 'b8ca3a65-0166-11e4-fbb5-a71027a53b09',
	--[Image] = '',
	--[Label] = '',
	[Price] = '0.47',
	[Info] = 'http://storeapp.thinkitdrinkit.com/teacrine/',
	[InfoLite] = 'TeaCrine works with the body’s natural metabolic processes to deliver energy, increase mental clarity, and improve motivation, and mood.'

WHERE Name = 'TeaCrine'
