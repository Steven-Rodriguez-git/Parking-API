# Parking-API

Componente Práctico

En el archivo Eviroment.txt se encuentran todos los accesos necesarios para probar la aplicación. Al ser la no paga de Azure, posiblemente la  primera consulta tarde dado que la base de datos esta hibernada.

1. Para la resolución del primer problema se utilizó un POST dentro  del  servicio REST el cual almacena los datos del vehiculo nuevo ingresado en la base de datos. 

///// SCRIPT

El Metodo usa JWT por lo que toca poner el  bearer Authorization "La clave que de el JWT"
POST: http://localhost:5135/api/Vehiculo
{
  "placa": "ABC444",
  "tipo": "Carro",
  "horaIngreso": "2024-02-04T14:30:00Z"
}

2. Para el segundo problema se utiliza un metodo POST que nos permite agregar a la base de datos la Hora de Salida y Valor total los cuales son calculados por  el backend dentro de un servicio.
Adicional si al  Body se ingresa el recibo como  parametro se calculará  el descuento y se agregará tambien la factura a la base de datos, en caso de no ingresarse sencillamente  se calcula el valor.

///// SCRIPT
El Metodo usa JWT por lo que toca poner el  bearer Authorization "La clave que de el JWT"
POST: http://localhost:5135/api/vehiculo/calcular-salida/1
{
}

POST: http://localhost:5135/api/vehiculo/calcular-salida/1
{
    "numeroFactura": "FACT12345"
}

3. Por ultimo para filtrar los vehiculos por fecha se hicieron dos soluciones, la primera hacer un metodo GET desde el Backend que se encarge de filtrar los resultados, organizarlos en un DTO. Pero para
facilidad del usuario y funcionamiento de la aplicación se aplicó un filtro desde el front que permite buscar vehiculos por cualquier caracteristica.
///// SCRIPT
El Metodo usa JWT por lo que toca poner el  bearer Authorization "La clave que de el JWT"
GET: http://localhost:5135/api/vehiculo/filtrar-por-fecha?fechaInicio=2024-02-04T00:00:00&fechaFin=2024-02-04T23:59:59
{
}

Componente Teorico 

1.1 

Los patrones de diseño son soluciones que ya han sido probadas y que han resultado utiles para la solución de problemas comunes que se presentan en el desarrollo de Software 

- Singleton: Se usa cuando necesitas una unica instancia de una clase en toda la aplicacion para no crear mas innecesarias, por ejemplo un conexion a una base de datos
- Factory Method:Es cuando necesitas desacoplar los objetos del codigo principal, por ejemplo si quieres crear distintos tipos de notificacion por usuario
- Observer: Es  cuando varios componentes necesitan estar  pendientes de los  cambios en otro objeto.  Por  ejemplo un sistema de monitoreo que necesite notificar de las  fallas.

1.2

S - Single Responsibility Principle :Cada clase debe hacer solo una cosa.

O - Open/Closed Principle:  El código debe ser abierto a extensión pero cerrado a modificación.

L - Liskov Substitution Principle:Los objetos de una clase base deben poder ser reemplazados por sus subclases sin romper el código.

I - Interface Segregation Principle: Es mejor tener múltiples interfaces pequeñas en lugar de una interfaz grande y genérica.

D - Dependency Inversion Principle:El código debe depender de abstracciones, no de implementaciones concretas.

1.3

Async/Await: Se usa para operaciones de entrada y salida, es bastante util para tareas asincronicas y no bloquea el hilo principal. Por ejemplo en una API o una llamada a una base de datos.
Task.Run: Se utiliza para delegar procesamientos pesados  del CPU a un segundo plano. Se usa  para  no bloquear la UI. Un ejemplo seria desepcriptar una contraseña.

1.4

El Hashing es una tecnica que se usa para convertir datos sensibles a valores no legibles y asi poder almacenar estos datos sin el riesgo de que queden expuestos. Recomendaria usar BCrypt al ser el que he usado
Y tener un poco coste de procesamiento manteniendo su seguridad

1.5

Una transacción SQL  es una secuencia de Operaciones en SQL en la cual se ejecutan en su totalidad o no  se  ejecutan ninguna. Es importante en aplicaciones que necesiten llevarse a cabo hasta el final y que permita
cumplir  con los principios ACID, por ejemplo una transacción bancaria, en la cual es importante que la transacción se complete hasta que el dinero  llegue a su destino de lo contrario si la transacción fallase en la mitad
se perderia  el rastro, en el caso de la transacción solo se cancela todo al no poder completarlo.

1.6
Primero revisar las consultas  para evitar  el uso de Select * ya que tiende a ocupar mucha memoria trayendo campos inecesarios.
Segundo Revisar los indices en las consultas, los Join y los Where para que evite traer datos que no son necesarios.
Tercero podria plantearse la implementación de un caché en la base de datos o apliacion que permita reducir la carga de busquedas repetitivas.

1.7
Gitflow  se usa como flujo de trabajo  en el cual permite dividir las versiones donde se  trabaja permitiendo tener ramas  mas estables, los mas comunes son:
Main: Que es la rama de produccion donde esta el codigo estable
Dev: Que es en la rama  donde se efectuan los desarrollos en curso.
Feature: Se usa cuando se agrega una  nueva  funcionalidad desde desarrollo.
Release: Se usa cuando una version esta lista y no se desarrolla sobre esta solo se corrige para la salida.
HotFix: Se usa cuando se tiene que resolver un problema critico en otra rama.