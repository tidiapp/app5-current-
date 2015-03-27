USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Boost
Set --[VendID] = 'b8ca3a65-0166-11e4-fbb5-a70304160cf6',
	[Name] = 'Electrolyte Hydration'

WHERE Name = 'Hydration'