## ACERCA DE LA PLATAFORMA

Plataforma de listado de todos los videojuegos existentes en donde podrás encontra juegos, leer su descripción y detalles acerca del juego. Finalmente podrás agregarlo a tu propia colección y volver a verlo luego.


## PASOS PARA LEVANTAR EL PROYECTO

REQUISITOS

1. Tener la última versión de Node.js instalado
2. Tener GIT instalado

PASOS

1. git clone https://github.com/LuchoQQ/aerolab-challenge
2. cd aerolab-challenge
3. npm install
4. npm run build
5. npm start
6. acceder a la url “https://localhost:3000”


## CARACTERISTICAS DE LA PLATAFORMA

1. Funcionalidades principales
    1. Busqueda de videojuegos
        1. Busqueda en tiempo real
        2. Busqueda retrasada por accion del teclado
        3. Juegos recomendados antes de la busqueda
    2. Colección de videojuegos
        1. “Empty state” cuando la colección está vacia
        2. Boton para eliminar juego de la colección
        3. Opciones de ordenamiento de juegos, se mantiene fijo cuando se scrolea por debajo. 
        4. Animación al entrar a la página y feedback al poner el mouse encima
        5. Al hacer click al juego en la colección lleva a los detalles 
    3. Pagina de Detalle de videojuego
        1. Mantiene encabezado de busqueda y volver hacia atrás.
        2. Información dinámica según el juego.
        3. Carrusel de imágenes horizontal
        4. Dialog que muestra la captura del juego en pantalla grande al clickear imágen del carrusel.
        5. Sección con juegos similares que al clickear lleva directo al juego.
        6. Feedback al agregar juegos y toast de confirmación al intentar quitarlo de la colección.
2. Diseño y estilo
    1. Interfaz responsiva
        1. Vistas amigables para usuarios de todos los dispositivos
    2. Consistencia visual.
        1. Utilización de Tailwind para estilo modulares y reutilizables
        2. Diseño web fiel al Figma
        3. Utilizacion de variables para la estandarización de colores y evitar la repetición
    3. Experiencia de usuario
        1. Feedback al interactuar y moverse por la plataforma.
3. Optimización y Usabilidad
    1. SEO y usabilidad
        1. Movilidad con teclado en Dialog de carrusel de imagenes (salir con X, moverse con flechas)
        2. Metadatos del proyecto
    2. Optimizacion de imagenes
        1. Imagenes en formato .webp
        2. Imagenes poseen fallbacks
        3. Imagenes optimizadas con el componente de Next.js
    3. Gestion de datos y API:
        1. Uso de zustand para los estados globales
        2. Utilización de almacenamiento local para salvar la colección al cerrar la página
        3. Uso eficiente de la API al limitar la cantidad de consultas y traer unicamente datos necesarios.
    4. Performance
        1. Lazy loading entre páginas
        2. Metricas de carga LCP y FCP por encima de los 95 puntos

TODO:

1. Implementación de acceso con Google Third Party
2. Compartir mi colección con amigos
3. Testing unitario
