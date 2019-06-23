# Judo

## SQL Stored Procedures Testing Made `SIMPLE`

[ INSERT EPIC INTRODUCTION HERE ]

```gherkin
Scenario: calculate monthly summary for one user with several expenses

    Given a table transactions
      | user  | amount | concept   | createdAt  |
      | john  | 100    | food      | 2019-06-10 |
      | john  | 50     | clothing  | 2019-06-10 |
      | john  | 10     | food      | 2019-06-10 |
      | clair | 200    | transport | 2019-06-10 |
      | clair | 50     | food      | 2019-06-10 |
    
    When I execute monthly_expenses
    
    Then summary should have
      | user  | month | total |
      | john  | 6     | 160   |
      | clair | 6     | 250   |
```

## Supported Engines
| MSSQL | MySQL | Oracle | PostgreSQL |
|------ |------ |------- |----------- |
|  YES  |   NO  |   NO   |     NO     |

Currently Judo can only be used with MSSQL, it's in my intentions to add support for other SQL engines.

## Usage
Judo is based on Cucumber's runtime but all the steps necessary are already implemented. The only thing you need to do is define your [Gherkin Features](https://cucumber.io/docs/gherkin/reference/) (.feature files) using our available steps and execute Judo.

By default Judo runs against a SQL Server's `master` database running on `localhost:1433`

1. Create `.feature` files.
2. Run:
    ```bash
    $ ./bin/judo [features_dir]
    ```

### Configuración
#### SQL Connection
There are several ways to override the config properties: using ENV_VARS, CLI args, or a CommonJS config file.

|          	| default          	| env variables 	| cli args     	| sql.conf.js 	|
|----------	|------------------	|---------------	|--------------	|-------------	|
| user     	| 'sa'             	| SQL_USER      	| sql.user     	| user        	|
| password 	| 'Password01'     	| SQL_PASSWORD  	| sql.password 	| password    	|
| server   	| 'localhost'      	| SQL_SERVER    	| sql.server   	| server      	|
| port     	| 1433             	| SQL_PORT      	| sql.port     	| port        	|
| database 	| 'Configurations' 	| SQL_DATABASE  	| sql.database 	| database    	|

#### Sandbox
By default every scenario is run inside a TRANSACTION, which is rolled back at the end. If we want to persist the changes we can tell Judo that is running against a "sandbox" environment.
```bash
$ judo [features_dir] --judo.sandbox
```

### Available Steps:
 - [English](docs/steps-en.md)
 - [Spanish](docs/steps-es.md)
