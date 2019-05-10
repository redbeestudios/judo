# Judo

## SQL Stored Procedures Testing Made `SIMPLE`

[ INSERT EPIC INTRODUCTION HERE ]

## Uso

> Por el momento, para correr cualquier step es necesario que el schema pertinente (tablas, sp, etc) de base de datos ya esté creado.

1. Crear un archivo de configuración `sql.conf.js` para la conexión a la base. Los valores por defecto son:
    ```javascript
    module.exports = {
        user: 'sa',
        password: 'Password01',
        server: 'localhost',
        database: 'Configurations',
        pool: {
            max: 1,
            min: 1,
            idleTimeoutMillis: 3000
        }
    };
    ```
1. Crear archivos `.feature`. Y escribír los escenarios utilizando la [sintaxis de gherking](https://cucumber.io/docs/gherkin/reference/) y los [steps disponibles](#steps-disponibles)
2. Correr judo:
    ```bash
    $ ./bin/judo [features_dir]
    ```

Tambien es posible correr cucumber-js con Intellij (instrucciones en el futuro), hay que bajarse el plugin y configurar.

### Configuración

#### Conexión SQL
Por defecto Judo establece una conexión contra una base local de SQL Server. La siguiente tabla indica sus valores y como sobreescribirlos:

|          	| default          	| env variables 	| cli args     	| sql.conf.js 	|
|----------	|------------------	|---------------	|--------------	|-------------	|
| user     	| 'sa'             	| SQL_USER      	| sql.user     	| user        	|
| password 	| 'Password01'     	| SQL_PASSWORD  	| sql.password 	| password    	|
| server   	| 'localhost'      	| SQL_SERVER    	| sql.server   	| server      	|
| port     	| 1433             	| SQL_PORT      	| sql.port     	| port        	|
| database 	| 'Configurations' 	| SQL_DATABASE  	| sql.database 	| database    	|

#### Sandbox
Por defecto cada test se ejecuta dentro de una trasaccion, la cual es rollbackeada al finalizar el test. Si deseamos persistir los cambios podemos informarle a Judo que estamos en un ambiente "sandbox":
```bash
$ judo [features_dir] --judo.sandbox
```
    
## Steps Disponibles
(Given, When, Then)

### Dada {tableName} está vacia
> Given {tableName} is empty

Corre en la base `TRUNCATE TABLE {tableName}`

Ejemplo:
```gherkin
# language: es
Dada cuenta está vacia
```

### Dada la tabla {tableName} [dataTable]
> Given a table {tableName} [dataTable]

Corre en la base `INSERT INTO {tableName} (dataTable.headers) VALUES (dataTable.body)`

Ejemplo:
```gherkin
# language: es
Dada la tabla movimientos_a_conciliar_tmp
  | id_movimiento_mp | id_medio_pago | importe | mask_nro_tarjeta | fecha_movimiento        | cantidad_cuotas | nro_autorizacion | id_codigo_operacion |
  | 1                | 1             | 4245.92 | 37777993         | 2019-04-03 00:00:00.000 | 2               | 120              | 1                   |
```

### Cuando ejecuto el sp {storedProcedureName}
> When I execute {storedProcedureName}

Corre en la base `EXEC {storedProcedureName}`

Ejemplo:
```gherkin
# language: es
Cuando ejecuto el sp Batch_Conciliacion_MatcheoMovimientos_Amex
```

### Cuando ejecuto el sp {storedProcedureName} con los argumentos: """arguments"""
> I execute {storedProcedureName} with args: """arguments"""

Corre en la base `EXEC {storedProcedureName} arguments[0], arguments[1], arguments...`

Ejemplo:
```gherkin
# language: es
Cuando ejecuto el sp Batch_Conciliacion_FiltrarMovimientosDuplicados con los argumentos:
"""
id_log_paso Int 1
"""
```
Los argumentos se debén escribir uno por linea indicando "{identifier} {type} {value}". Separados por espacios.

### Entonces {tableName} debería tener exactamente [dataTable]
> Then {tableName} should have [dataTable]

Ejecuta un assert contra todos los datos de la tabla {tableName}, comparandolos con los datos de la dataTable.

Corre en la base `SELECT dataTable.headers FROM {tableName}` y compara (deep-equals) dataTable.body con el resultado.

Ejemplo:
```gherkin
# language: es
Entonces movimientos_conciliados_tmp debería tener exactamente
  | Id                                   | id_movimiento_mp |
  | e2ab99ca-1602-ac3b-40a1-c6492d47b430 | 1                |
```

### Entonces {tableName} debería contener [dataTable]
> Then {tableName} should contain [dataTable]

Ejecuta un assert seleccionando de la tabla {tableName} solo los datos que se encuentran en la dataTable.

Corre en la base 
```sql
SELECT dataTable.headers FROM {tableName}
WHERE
    (dataTable.body[0].a = {tableName}.a AND dataTable.body[0]... = {tableName}...)
    OR 
    (dataTable.body[1].a = {tableName}.a AND dataTable.body[1]... = {tableName}...)
    OR
    ...
```

Ejemplo:
```gherkin
# language: es
Entonces movimientos_a_conciliar_tmp debería contener
  | id_movimiento_mp | flag_duplicado |
  | 1                | false          |
```

### Entonces {tableName} debería estar vacia
> Then {tableName} should be empty

Ejecuta un assert afirmando que la tabla en la base está vacia.

Corre en la base `SELECT * FROM {tableName}`

Ejemplo:
```gherkin
# language: es
Entonces movimientos_conciliados_tmp debería estar vacia
```