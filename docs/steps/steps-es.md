---
layout: default
title: Steps Disponibles
nav_order: 2
parent: Steps
---

# Steps Disponibles
(Dado, Cuando, Entonces)

### Dada {nombreDeTabla} está vacia

Corre en la base `DELETE FROM {nombreDeTabla};`

Ejemplo:
```gherkin
# language: es
Dada cuenta está vacia
```

### Dada la tabla {nombreDeTabla} [tabla]

Corre en la base `INSERT INTO {nombreDeTabla} (tabla.headers) VALUES (tabla.body)`

Ejemplo:
```gherkin
# language: es
Dada la tabla movimientos_a_conciliar_tmp
  | id_movimiento_mp | id_medio_pago | importe | mask_nro_tarjeta | fecha_movimiento        | cantidad_cuotas | nro_autorizacion | id_codigo_operacion |
  | 1                | 1             | 4245.92 | 37777993         | 2019-04-03 00:00:00.000 | 2               | 120              | 1                   |
```

### Dada la tabla {nombreDeTabla} {$alias} [tabla]

Inserta en la base los datos de la tabla y guarda el resultado en {$alias} dentro del contexto del test.


### Cuando ejecuto el sp {storedProcedureName}

Corre en la base `EXEC {storedProcedureName}`

Ejemplo:
```gherkin
# language: es
Cuando ejecuto el sp Batch_Conciliacion_MatcheoMovimientos_Amex
```

### Cuando ejecuto el sp {storedProcedureName} con los argumentos: 
"""arguments"""

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

### Entonces {nombreDeTabla} debería tener exactamente [tabla]

Ejecuta un assert contra todos los datos de la tabla {nombreDeTabla}, comparandolos con los datos de la tabla.

Corre en la base `SELECT tabla.headers FROM {nombreDeTabla}` y compara (deep-equals) tabla.body con el resultado.

Ejemplo:
```gherkin
# language: es
Entonces movimientos_conciliados_tmp debería tener exactamente
  | Id                                   | id_movimiento_mp |
  | e2ab99ca-1602-ac3b-40a1-c6492d47b430 | 1                |
```

### Entonces {nombreDeTabla} debería contener [tabla]

Ejecuta un assert seleccionando de la tabla {nombreDeTabla} solo los datos que se encuentran en la tabla.

Corre en la base 
```sql
SELECT tabla.headers FROM {nombreDeTabla}
WHERE
    (tabla.body[0].a = {nombreDeTabla}.a AND tabla.body[0]... = {nombreDeTabla}...)
    OR 
    (tabla.body[1].a = {nombreDeTabla}.a AND tabla.body[1]... = {nombreDeTabla}...)
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

### Entonces {nombreDeTabla} debería estar vacia

Ejecuta un assert afirmando que la tabla en la base está vacia.

Corre en la base `SELECT * FROM {nombreDeTabla}`

Ejemplo:
```gherkin
# language: es
Entonces movimientos_conciliados_tmp debería estar vacia
```
