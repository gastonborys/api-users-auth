# API de Gestión y Autenticación de Usuarios

API para la gestión y autenticación de usuarios, basada en Node.js, TypeScript y MongoDB.

## Scripts Disponibles

### `npm run dev`

Ejecuta la aplicación en modo de desarrollo.

El endpoint es: [http://localhost:3001/api/users](http://localhost:3001/api/users).

El servicio utiliza nodemon, por lo tanto, no es necesario reiniciar tras realizar cambios en el código.

### `npm run build`

Genera la versión definitiva para producción que quedará alojada en la carpeta `/build`.

## Configuraciones

### URLs de la API

Se deben configurar las variables de entorno en el archivo `.env`. Se proporciona un archivo de ejemplo llamado `env`.

NOTA: No modificar el archivo `env` a menos que sea necesario. Copie el archivo `env` como `.env`.

Para copiar el archivo, ingrese mediante la consola al directorio del proyecto y ejecute el siguiente comando:

En Windows: `copy env .env`

En Linux / Mac: `cp env .env`

### Git

Se proporciona un archivo de configuración de git llamado `gitignore`, que debe copiarse como `.gitignore`.

NOTA: No modificar el archivo `.gitignore` a menos que sea necesario. Copie el archivo `gitignore` como `.gitignore`.

Para copiar el archivo, ingrese mediante la consola al directorio del proyecto y ejecute el siguiente comando:

En Windows: `copy gitignore .gitignore`

En Linux / Mac: `cp gitignore .gitignore`

### Docker

Para generar una imagen basada en volúmenes puede ejecutar el siguiente comando:

```
$ docker build -t api-users .
```

Para crear el contenedor puede utilizar el comando:

```
$ docker run -p 3001:3001 -v $(pwd):/usr/src/app -d --name api-users api-users
```

De esta manera puede subir cambios de la api sin tener que volver a generar una nueva imagen de la API.

Si no cuenta con un servidor de mongodb puede instalar mongodb en un contenedor y utilizarlo desde ahí utilizando el siguiente comando:

```
$ docker pull mongo
```

```
$ docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Donde mongodb va a ser el nombre del contenedor de mongo. Puede utilizar cualquiera.
