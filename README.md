## App Web con Laravel Sail - Ofertas y Códigos Promocionales
Este proyecto es una aplicación web desarrollada con Laravel Sail que permite gestionar ofertas y códigos promocionales.

Requisitos Previos
Docker instalado en tu sistema. Puedes descargarlo desde aquí.
Conocimiento básico de Docker y Laravel.
Configuración Inicial
Clona este repositorio en tu máquina local.


git clone https://github.com/Abacop6999/sail-offers-web.git
Navega hasta el directorio del proyecto.


cd sail-offers-web
Copia el archivo .env.example y renómbralo a .env.


cp .env.example .env
Genera una clave de aplicación.


php artisan key:generate
Ejecución del Proyecto
Inicia los contenedores Docker usando Laravel Sail.


./vendor/bin/sail up
Ejecuta las migraciones de la base de datos para crear las tablas necesarias.

./vendor/bin/sail artisan migrate
El proyecto estará disponible en http://localhost.

Detener la Ejecución del Proyecto
Para detener la ejecución del proyecto y los contenedores Docker, simplemente ejecuta ./vendor/bin/sail stop en la terminal donde se está ejecutando Laravel Sail.
