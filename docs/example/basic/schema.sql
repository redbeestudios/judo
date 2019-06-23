CREATE TABLE transactions
(
  userId    INT,
  amount    DECIMAL(12, 2),
  concept   VARCHAR(200),
  createdAt DATETIME
);


CREATE TABLE summary
(
  userId INT,
  month  INT,
  total  DECIMAL(12, 2)
)


CREATE OR ALTER PROCEDURE monthly_expenses
AS

INSERT INTO summary
SELECT userId, MONTH(createdAt), SUM(amount)
FROM transactions
GROUP BY userId, MONTH(createdAt);
GO
