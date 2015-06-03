--http://www.w3schools.com/sql/sql_where.asp
USE [thinkitdrinkitData_db]
GO

UPDATE thinkitdrinkitData.Base
Set 
    --Name] = 'Oryzatein Ultra80', 
	--[VendID] = 'b8ca3a65-0166-11e4-fbb5-a71d663b504e',
	--[Image] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitappimagesbase/Protein_Recovery.png',
	[Price] = '21.00'
	--[Label] = 'http://thinkitdrinkit.blob.core.windows.net/thinkitdrinkitlabelsbase/MensBeautyBase.jpg',

	--[Info] = 'http://storeapp.thinkitdrinkit.com/phwhey/',
	--[InfoLite] = 'Partially hydrolyzed instantized whey protein isolate is high in leucine, a bioactive peptides. It is an all-natural, patented ingredient for healthy weight loss and weight management. It has been clinically proven to increase fat loss, retain lean mass and and lower glucose response. It is a complete, high quality protein with a rich amino acid (AA) profile including branched chain amino acids (BCAA). Key features: high in protein low in fat; inhibits fat deposition; increases satiety; improves overall body composition.'
	--[BaseDBbase_id] = '138'
	--[FuncDBfunc_id] = '6'
    --Order] = '42'
WHERE Name = 'Hemp' 
	  --AND id 'blah'
	  --id BETWEEN '14462' and '14608'
