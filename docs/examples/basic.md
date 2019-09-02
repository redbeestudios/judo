---
layout: default
title: SQL Server Basic Example
nav_order: 2
parent: Examples
---

# SQL Server basic example

1. Have [Node.js](https://nodejs.org/en/) installed (8 or higher)
2. Install Judo `npm i @redbee/judo`
2. Have an instance of sql-server running
    > with docker you can do: 
    > ```bash
    > docker run -d -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Password01' -p 1433:1433 microsoft/mssql-server-linux:2017-CU1
    > ```
3. Configure Judo sql connection creating a `sql.conf.js` file (see other options in readme). ie:
    ```javascript
    module.exports = {
        user: '[user]', // defaults to 'sa'
        password: '[my secure password]', // defaults to ''
        server: 'localhost', // defaults to this
        port: 1433, // defaults to this
        database: 'master' // defaults to this
    }
    ```
5. Create database schema. ie:
    ```tsql
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
    ```
4. Create `features/` directory.
6. Write Judo features inside `features/`. ie:
    ```gherkin
    Feature: generate monthly summary of expenses
    
      Background: setup tables
        Given transactions is empty
        And summary is empty
    
      Scenario: calculate monthly summary for one user with one expense
    
        Given a table transactions
          | userId | amount | concept  | createdAt  |
          | 1      | 100    | clothing | 2019-06-10 |
    
        When I execute monthly_expenses
    
        Then summary should have
          | userId | month | total |
          | 1      | 6     | 100   |
    
    
      Scenario: calculate monthly summary for one user with several expenses
    
        Given a table transactions
          | userId | amount | concept   | createdAt  |
          | 1      | 100    | food      | 2019-06-10 |
          | 1      | 50     | clothing  | 2019-06-10 |
          | 1      | 10     | food      | 2019-06-10 |
          | 1      | 200    | transport | 2019-06-10 |
          | 1      | 50     | food      | 2019-06-10 |
    
        When I execute monthly_expenses
    
        Then summary should have
          | userId | month | total |
          | 1      | 6     | 410   |
    
    
      Scenario: calculate monthly summary for several users with several expenses in different months
    
        Given a table transactions
          | userId | amount | concept  | createdAt  |
          | 1      | 100    | clothing | 2019-06-10 |
          | 1      | 50     | clothing | 2019-07-10 |
          | 2      | 100.23 | clothing | 2019-06-10 |
          | 3      | 200    | clothing | 2019-01-10 |
          | 4      | 1000   | food     | 2019-06-10 |
          | 4      | 190    | drinks   | 2019-06-10 |
          | 4      | 10     | clothing | 2019-08-10 |
    
        When I execute monthly_expenses
    
        Then summary should have
          | userId {ASC} | month {ASC} | total  |
          | 1            | 6           | 100    |
          | 1            | 7           | 50     |
          | 2            | 6           | 100.23 |
          | 3            | 1           | 200    |
          | 4            | 6           | 1190   |
          | 4            | 8           | 10     |
    ```

7. run Judo:
    ```bash
    $ npx judo features/ --judo.engine mssql
    ```
8. Profit.
