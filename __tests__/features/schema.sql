CREATE TABLE my_test_table
(
    my_letter  VARCHAR,
    my_string  VARCHAR(500),
    my_number  INT,
    my_boolean BIT,
    my_date    DATETIME
);
GO

CREATE PROCEDURE my_procedure
AS
RETURN 1;
GO

CREATE OR ALTER PROCEDURE my_sp(@cant Int,
                                @result Int OUTPUT)
AS
SET @result = @cant;
RETURN @cant;
GO
