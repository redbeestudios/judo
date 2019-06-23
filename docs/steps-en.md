# Available Steps
(Given, When, Then)

## Given {tableName} is empty

Remove al data from the table.

Runs `DELETE FROM {tableName};`

ie:
```gherkin
Given transaction is empty
```


## Given a table {tableName} [dataTable]
Insert data into a table.

Runs (in a way) `INSERT INTO {tableName} (dataTable.headers) VALUES (dataTable.body)`

ie:
```gherkin
Given a table transactions
  | userId | amount | concept  | createdAt  |
  | 1      | 100    | clothing | 2019-06-10 |
```

## When I execute {storedProcedureName}
Execute a procedure without arguments.

Run `EXEC {storedProcedureName}`

ie:
```gherkin
Given I execute monthly_expenses
```

## I execute {storedProcedureName} with args: """arguments"""
Execute a procedure with arguments.

Runs `EXEC {storedProcedureName} arguments[0], arguments[1], arguments...`

ie:
```gherkin
Given I execute weekly_expenses with args:
"""
month 3
year 2019
"""
```
Arguments are specified per line following the definition:
```
identifier [type] value [OUTPUT]
```
where type and OUTPUT are optional, and type can be any of: NVarChar, Int, Bit, DateTime

## Then {tableName} should have [dataTable]

Select from the table and compare its values against the defined ones.

Runs `SELECT dataTable.headers FROM {tableName}` and compares the values.

ie:
```gherkin
Then summary should have
  | userId | month | total |
  | 1      | 6     | 100   |
```

## Then {tableName} should contain [dataTable]
> **Experimental**: this step is in a experimental stage and could be removed.

Asserts by comparing the dataTable against the return data from the query. 

This query return a partial representation of the data. Intended for use against tables with data in them.

Runs
```sql
SELECT dataTable.headers FROM {tableName}
WHERE
    (dataTable.body[0].a = {tableName}.a AND dataTable.body[0]... = {tableName}...)
    OR 
    (dataTable.body[1].a = {tableName}.a AND dataTable.body[1]... = {tableName}...)
    OR
    ...
```

ie:
```gherkin
Then summary should contain
  | userId | month | total |
  | 1      | 6     | 100   |
```

## Then {tableName} should be empty

Asserts by checking if the returned result is empty.

Runs `SELECT * FROM {tableName}`

ie:
```gherkin
Then summary should be empty
```