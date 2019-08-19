# Judo
[![Build Status](https://travis-ci.org/redbeestudios/judo.svg?branch=master)](https://travis-ci.org/redbeestudios/judo)
![David](https://img.shields.io/david/redbeestudios/judo)
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

## Install
```bash
$ npm install @lt-mayonesa/judo
```
> **Important**: judo will not work as a global package as it depends on cucumber (see [cucumber-js/issues/908](https://github.com/cucumber/cucumber-js/issues/908))

## Usage
Judo is based on Cucumber's runtime but all the steps necessary are already implemented. The only thing you need to do is define your Judo Features (.feature files in [gherkin](https://cucumber.io/docs/gherkin/reference/) syntax) using our available steps and execute Judo.

By default Judo runs against a SQL Server's `master` database running on `localhost:1433`

1. Create `.feature` files.
2. Run:
    ```bash
    $ npx judo [features_dir]
    # OR directly node_modules
    $ ./node_modules/.bin/judo
    ```

### Configuration
#### SQL Connection
There are several ways to override the config properties: using ENV_VARS, CLI args, or a CommonJS config file.

|          	| default          	| env variables 	| cli args     	| sql.conf.js 	|
|----------	|------------------	|---------------	|--------------	|-------------	|
| user     	| 'sa'             	| SQL_USER      	| sql.user     	| user        	|
| password 	| 'Password01'     	| SQL_PASSWORD  	| sql.password 	| password    	|
| server   	| 'localhost'      	| SQL_SERVER    	| sql.server   	| server      	|
| port     	| 1433             	| SQL_PORT      	| sql.port     	| port        	|
| database 	| 'master'       	| SQL_DATABASE  	| sql.database 	| database    	|

#### Sandbox
By default every scenario is run inside a TRANSACTION, which is rolled back at the end. If we want to persist the changes we can tell Judo that is running against a "sandbox" environment.
```bash
$ npx judo [features_dir] --judo.sandbox
```

### Available Steps:
 - [English](docs/steps-en.md)
 - [Spanish](docs/steps-es.md)
