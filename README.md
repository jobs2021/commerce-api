# Commerce API
## Infrastructura del proyecto
El siguiente diagrama muestra el flujo de los microservicios conectados entre ellos.

![Alt text](docs/infrastructure.png?raw=true "Infrastructura de Microservicios")

## Endpoints
| Nombre | URL |
| --- | --- |
| API | https://commerce-api.jobs2021.repl.co |
| File Service | https://commerce-file-service.jobs2021.repl.co |
| Email Service | https://commerce-email-service.jobs2021.repl.co |

## Repositorios
El proyecto se divide en tres repositorios separando logica de negocio y balanceando la carga entre si. Este es el repositorio principial el cual hace uso del resto tal cual lo muestra el diagrama anterior.

| Nombre | URL |
| --- | --- |
| API | https://github.com/jobs2021/commerce-api |
| File Service | https://github.com/jobs2021/commerce-file-service |
| Email Service | https://github.com/jobs2021/commerce-email-service |

## Variables de entorno
La mayoria de variables de entorno son compartidas entre Microservicios, puede encontrar informacion sobre las requeridas accediendo al README de cada repositorio.

| Nombre | Example | Descripcion |
| --- | --- | --- |
| PORT | 3001 | Puerto en el que correra la app
| APP_JWT_SECRET_KEY | AABBCCAABBCC | Llave con la que firmara los JWT |
| APP_JWT_ISS | passport.domain.com | Dominio que genera el JWT (auditoria)|
| APP_JWT_AUD | domain.com | Dominio general que puede acceder al JWT  (auditoria)|
| APP_MONGO_URI | mongodb://usr:pass@host | Cadena de conexion de MongoDB|
| APP_X_ACCESS_TOKEN | AABBCCAABBCC | Token secreto para interactuar entre microservicos |
| APP_EMAIL_SERVICE_URL | https://commerce-email-service.jobs2021.repl.co | URL de acceso al Email Microservice |

## Correr el proyecto

- instalar dependencias
```
    npm install
```

- iniciar el proyecto
```
    npm start
```

- construir el proyecto
```
    npm run build
```

## Informacion sobre las collecciones Postman
puedes descargar las colleciones desde los siguientes links.

La coleccion principal es **API**, luego esta **File Service** la cual se utiliza unicamente para subir las imagenes y obtener la URL de ellas.

- [ API ](docs/postman_collections/commerce_api.postman_collection.json)
- [ File Service ](docs/postman_collections/file_service_api.postman_collection.json)
- [ Email Service ](docs/postman_collections/email_service_api.postman_collection.json)

## Autenticacion
Toda la autenticacion entre cliente-servidor utiliza **JWT** y la comunicacion interna que solo se da entre el **API** y **Email Service** utiliza **X-ACCESS-TOKEN**