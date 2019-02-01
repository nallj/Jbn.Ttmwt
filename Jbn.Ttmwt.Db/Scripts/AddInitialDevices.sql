
DECLARE @devicesCte TABLE(
	Name NVARCHAR(128)
);

INSERT INTO @devicesCte
VALUES
	('Standard Walker'),
    ('Rolling Walker (2 wheels)'),
    ('Rollator (4 wheels)'),
    ('Hemi-walker'),
    ('Quad Cane'),
    ('Single Point Cane');

MERGE INTO [Device] AS tgt
USING
	(SELECT * FROM @devicesCte) AS src
	ON src.Name = tgt.Name
WHEN NOT MATCHED THEN
	INSERT (Name)
	VALUES (Name)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;