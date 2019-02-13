﻿CREATE TABLE [dbo].[Remarks]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY,
    [TestId] INT NOT NULL,
    [Content] NVARCHAR(MAX) NOT NULL,
    CONSTRAINT [UQ_Remarks_TestId] UNIQUE ([TestId]),
    CONSTRAINT [FK_Remarks_TestId] FOREIGN KEY ([TestId]) REFERENCES [Test] ([Id]) ON DELETE CASCADE
)
