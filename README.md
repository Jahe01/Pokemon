# Pokemon
Esta página web usa la api de pókemon.  This website uses the Pokémon API.

## Descripción
Esta aplicación web utiliza la API de Pokémon para mostrar información detallada sobre el Pokémon Kakuna. La página incluye una variedad de características interactivas y visuales, como un gráfico de pastel con estadísticas, un fondo dinámico que cambia cada 20 segundos y animaciones utilizando GSAP. También se muestran detalles sobre las habilidades y movimientos del Pokémon, junto con una funcionalidad de actualización de favicon.

## Características
Imágenes de Fondo Dinámicas: La imagen de fondo cambia automáticamente cada 20 segundos.
Gráfico de Estadísticas: Se muestra un gráfico de pastel con las estadísticas del Pokémon.
Información Interactiva: Información sobre habilidades y movimientos del Pokémon se muestra al pasar el ratón.
Animaciones: Utiliza GSAP para animaciones en la página, como la rotación de la Pokébola y el ícono de Kakuna.
Favicon Dinámico: El favicon se actualiza con la imagen del Pokémon.

## Estructura del Proyecto
index.html: Contiene el marcado HTML para la estructura de la página.
styles.css: Archivo CSS con el estilo de la página.
script.js: Archivo JavaScript que maneja la lógica de la página, incluyendo la actualización de fondo, el gráfico de pastel, y la interacción con la API de Pokémon.

## Estructura del Proyecto
- index.html: Contiene el marcado HTML para la estructura de la página.
- styles.css: Archivo CSS con el estilo de la página.
- script.js: Archivo JavaScript que maneja la lógica de la página, incluyendo la actualización de fondo, el gráfico de pastel, y la interacción con la API de Pokémon.

## Instrucciones de Instalación
Clona el repositorio:
```
git clone <URL-del-repositorio>
```
Abre index.html en tu navegador web para ver la aplicación en acción.

## Detalles del Código
- index.html
    - Estructura: Contiene el marcado HTML para el Pokémon, incluyendo áreas para la imagen, descripción, tipos, debilidades, habilidades, movimientos y estadísticas.
    - Scripts: Incluye referencias a los archivos script.js y styles.css.
      
- styles.css
    - Colores: Define una paleta de colores usando variables CSS.
    - Estilos: Aplica estilos para diferentes elementos, como el fondo, el header, y las tarjetas de información del Pokémon.
      
- script.js
    - Imágenes de Fondo: Configura y cambia la imagen de fondo cada 20 segundos.
    - Gráfico de Estadísticas: Utiliza Chart.js para crear un gráfico de pastel con las estadísticas del Pokémon.
    - Interacción con la API: Obtiene información de habilidades y movimientos de la API de Pokémon y la muestra al pasar el ratón.
    - Animaciones: Usa GSAP para agregar animaciones a elementos en la página.
      
## Uso
- Carga de la Página: Al cargar la página, la información del Pokémon Kakuna se obtiene automáticamente de la API de Pokémon.
- Interacción: Pase el ratón sobre las habilidades y movimientos para ver detalles adicionales.
- Animaciones: El ícono de Kakuna tiene animaciones interactivas que responden a los clics y el movimiento del ratón.

## Agradecimientos
Chart.js - Para la creación de gráficos interactivos.
GSAP - Para animaciones web avanzadas.
API de Pokémon - Para proporcionar datos detallados sobre los Pokémon.
