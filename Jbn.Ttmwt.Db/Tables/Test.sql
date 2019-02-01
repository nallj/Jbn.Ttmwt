CREATE TABLE [dbo].[Test]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY,
    [ProctorId] INT NOT NULL,
    [PatientId] INT NOT NULL,
    [TestedOn] DATETIMEOFFSET(7) NOT NULL,
    [DeviceId] INT NULL,
    [ComfortPace1] DECIMAL(4,2) NULL,
    [ComfortPace2] DECIMAL(4,2) NULL,
    [MaxPace1] DECIMAL(4,2) NULL,
    [MaxPace2] DECIMAL(4,2) NULL,
    [AssistLevel] INT NOT NULL,
    [Summary] NVARCHAR(MAX) NULL,
    [CreatedOn] DATETIMEOFFSET(7) NOT NULL DEFAULT SYSDATETIME(),
    [CompletedOn] DATETIMEOFFSET(7) NULL,
    [DeletedOn] DATETIMEOFFSET(7) NULL,
    CONSTRAINT [FK_Test_ProctorId] FOREIGN KEY ([ProctorId]) REFERENCES [Proctor] ([Id]),
    CONSTRAINT [FK_Test_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [Patient] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Test_DeviceId] FOREIGN KEY ([DeviceId]) REFERENCES [Device] ([Id])
)
