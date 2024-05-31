
## App Web con Laravel Sail - Ofertas y Códigos Promocionales
Este proyecto es una aplicación web desarrollada con Laravel Sail que permite gestionar ofertas y códigos promocionales.

Requisitos Previos
Docker instalado en tu sistema. Puedes descargarlo desde aquí.
Conocimiento básico de Docker y Laravel.
Configuración Inicial
Clona este repositorio en tu máquina local.

bash
Copiar código
git clone https://github.com/Abacop6999/sail-offers-web.git
Navega hasta el directorio del proyecto.

bash
Copiar código
cd sail-offers-web
Copia el archivo .env.example y renómbralo a .env.

bash
Copiar código
cp .env.example .env
Genera una clave de aplicación.

bash
Copiar código
php artisan key:generate
Ejecución del Proyecto
Inicia los contenedores Docker usando Laravel Sail.

bash
Copiar código
./vendor/bin/sail up
Ejecuta las migraciones de la base de datos para crear las tablas necesarias.

bash
Copiar código
./vendor/bin/sail artisan migrate
El proyecto estará disponible en http://localhost.

Detener la Ejecución del Proyecto
Para detener la ejecución del proyecto y los contenedores Docker, simplemente ejecuta ./vendor/bin/sail stop en la terminal donde se está ejecutando Laravel Sail.