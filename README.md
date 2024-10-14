# App Web con Laravel Sail - Ofertas y Códigos Promocionales

Este proyecto es una aplicación web desarrollada con Laravel Sail que permite gestionar ofertas y códigos promocionales.

## Requisitos Previos

- Docker con la opción WSL2 activada. Puedes descargar Docker desde [aquí](https://www.docker.com/get-started).
- Visual Studio Code (VSCode) para ver o editar el código. descargar [aquí](https://code.visualstudio.com/)

## Instalación y Configuración

## Instalación de una Distro Linux en Windows

Si aún no tienes una distro de Linux instalada en WSL, sigue estos pasos:

# Abrir PowerShell como Administrador e instalar una distro Linux:

```bash
wsl --install -d Ubuntu
# O bien, para una versión específica:
wsl --install -d Ubuntu-22.04
```

## Buscar en el menú de Windows "Ubuntu" y ejecutar como administrador.
Actualizar dependencias:

```bash
sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php
```

## Instalar PHP, Node.js, NPM y otras dependencias:

```bash
sudo apt install -y git php8.2 php8.2-cli php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip unzip nodejs npm
```

## instalar compose

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
php -r "unlink('composer-setup.php');"
```

## Instalar VSCode (para ver el codigo):

```bash
sudo snap install code --classic
```

## Clonar y Configurar el Proyecto Laravel

Clona este repositorio en tu máquina local.

```bash
git clone https://github.com/Abacop6999/sail-offers-web.git
```

## Navega hasta el directorio del proyecto.
```bash
cd sail-offers-web
```
## Copia el archivo .env.example y renómbralo a .env.

```bash
cp .env.example .env
```
## Instalar dependencias de Composer:

```bash
composer install
```

## Configurar y Ejecutar Laravel Sail

Construir la imagen Docker:

```bash
./vendor/bin/sail build --no-cache
```

## Levantar los contenedores de Docker:

```bash
./vendor/bin/sail up -d
```

## Genera una clave de aplicación.
```bash
./vendor/bin/sail php artisan key:generate
```

## Ejecuta las migraciones de la base de datos para crear las tablas necesarias y seeders.
```bash
./vendor/bin/sail php artisan migrate --seed
```

## Instalar dependencias y ejecutar el frontend con React:

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run build
./vendor/bin/sail npm run dev
```

El proyecto estará disponible en http://localhost:8081.

## detener apache si en localhost aparece la pagina de apache2 en lugar de la app de react y laravel
```bash
sudo systemctl stop apache2
```

## Ejecutar tests
Para ejecutar tests unitarios y de integración
```bash
./vendor/bin/sail php artisan test
```

## Detener la Ejecución del Proyecto
Para detener la ejecución del proyecto y los contenedores Docker, simplemente ejecuta este comando en la terminal donde se está ejecutando Laravel Sail.
```bash
./vendor/bin/sail stop 
```

## Video de instalación
Aquí puedes ver un video detallado con los pasos de instalación:

video [aquí](https://youtu.be/8mMRKeGS9Pg).
