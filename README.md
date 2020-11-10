# Secure api with NodeJS and JWT
<p align="center">
  <img src="https://img.shields.io/npm/v/3?color=red&label=npm&logo=npm&style=for-the-badge">
  <img src="https://img.shields.io/github/release/pablojavierjimenez/node_jwt_api?color=red&style=for-the-badge">
  <img src="https://img.shields.io/github/issues/pablojavierjimenez/node_jwt_api?color=violet&style=for-the-badge">
  <img src="https://img.shields.io/github/forks/pablojavierjimenez/node_jwt_api?color=teal&style=for-the-badge">
  <img src="https://img.shields.io/github/stars/pablojavierjimenez/node_jwt_api?style=for-the-badge">
</p>

### Run project
to run project you can use the next commands
```bash
# for the last version
:~$ npm start
# for V2
:~$ npm run api:v2
# for v1
:~$ npm run api:v1
```

**Nota:** esto esta basado en este [tutorial JWT on NodeJS](https://www.youtube.com/watch?v=0g0Of8jlhN8&ab_channel=TutorialEdge)

## Como crear archivos pen en ubuntu con openssl
[crear archivos pen tutorial completo](https://blog.eamexicano.com/ssl/certificado-openssl/)

**Como lo hice yo:**

_Nota:_ por seguridad el texto que esta dentro del archivo `private.pem` fue generado en realidad con [minionsipsum.com/](http://www.minionsipsum.com/)
```bash
# creo la carpeta donde alojare los certificados
:~$ mkdir certs
:~$ cd certs

# corro el comando para crear ekl archivo key sin contraseñas
# NOTA: le puse 2048 en vez de 1024 porque otras veces eso ya me dio problemas
:~$ openssl genrsa -out server.key 2048

# Al generar la petición de firma del certificado
# se nos preguntan datos como país, estado / provincia
# localidad, nombre de la organización, correo, etc.
:~$ openssl req -new -key server.key -out server.pem

# generar el archivo private.pem
:~$ openssl x509 -inform DER -outform PEM -in server.csr -out private.pem
```
----

## About JWT
[https://jwt.io/#debugger-io](https://jwt.io/#debugger-io)
