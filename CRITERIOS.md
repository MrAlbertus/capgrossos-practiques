# Criterios de aceptación: web de prácticas de los Capgrossos de Mataró

> **Proyecto de prácticas.** No es la web oficial de la Colla Castellera Capgrossos de Mataró (la oficial es [capgrossos.cat](https://capgrossos.cat/)). No hemos contactado con la colla y no publicamos datos personales de nadie.

Escritos el 11 de noviembre de 2026, antes de escribir código. La web se da por terminada cuando cumple todos los criterios marcados como **obligatorios**. Al final rellenamos la columna de resultado punto por punto, con la fecha y cómo lo comprobamos.

## Punto de partida

Miramos la web oficial el 11/11/2026 para saber qué contenido tiene una colla castellera:

- Secciones: Inici, Actualitat, Calendari, Qui som (la colla e historia), CAPG30SSOS (los 30 años), Galeria, Castells, Col·laboracions, Uneix-te (Enfaixa't) y Contacte.
- Está hecha con WordPress y Elementor.
- El calendario está al día, pero la última entrada de Actualitat es de junio de 2024. Publicar noticias parece costarles más que actualizar el calendario, y eso es justo lo que tiene que resolver el editor.

## Quién va a editar

Pensamos en una persona voluntaria de la junta o de comunicación de la colla: sabe usar el móvil y las redes sociales, no programa y no tiene cuenta de GitHub. Publica sobre todo en temporada (de abril a noviembre), casi cada semana: la crónica de la última diada y los próximos ensayos y actuaciones.

## Criterios

### A. Aviso y privacidad

| Id | Criterio | Cómo lo comprobamos | Tipo | Resultado |
| --- | --- | --- | --- | --- |
| A1 | Todas las páginas muestran un aviso visible de proyecto de prácticas que enlaza a la web oficial. | Revisión de todas las páginas del sitemap con un script, buscando el texto del aviso. | Obligatorio | |
| A2 | Todas las páginas, también las vistas previas, llevan `noindex` en la etiqueta meta y en la cabecera `X-Robots-Tag`. | `curl -I` a la portada, a una página interior y a una vista previa. Script sobre todas las páginas para la etiqueta meta. | Obligatorio | |
| A3 | No aparece ningún nombre, foto ni dato de miembros de la colla. Las imágenes son ilustraciones o fotos sin personas reconocibles. | Revisión manual de todo el contenido y de la biblioteca de imágenes. | Obligatorio | |
| A4 | No se publica el teléfono, el correo ni la dirección de la colla. Para contactar se enlaza a la web oficial. | Búsqueda del teléfono, el correo y la dirección en el HTML generado. | Obligatorio | |
| A5 | El formulario de contacto es de demostración: está desactivado, lo dice y no envía nada. | Probar a enviarlo y mirar las peticiones de red. | Obligatorio | |
| A6 | La web no carga analítica ni cookies de terceros, así que no necesita banner de cookies. | Pestaña de red y de almacenamiento del navegador en la portada. | Obligatorio | |

### B. Contenido

| Id | Criterio | Cómo lo comprobamos | Tipo | Resultado |
| --- | --- | --- | --- | --- |
| B1 | Hay como mínimo estas secciones: Inici, Actualitat, Calendari, La colla, Castells, Uneix-te y Contacte. | Navegación completa en escritorio y móvil. | Obligatorio | |
| B2 | El contenido de la web está en catalán, con `lang="ca"`. | Revisión del HTML. | Obligatorio | |
| B3 | Actualitat tiene al menos 5 noticias de ejemplo, cada una con imagen y texto alternativo. | Contar las noticias y revisar los `alt`. | Obligatorio | |
| B4 | El calendario separa las próximas actuaciones y ensayos de los pasados, y lo hace solo, sin que nadie mueva nada. | Crear un evento con fecha de ayer y comprobar que aparece en "pasados" después de la reconstrucción diaria. | Obligatorio | |
| B5 | La página Castells explica las construcciones básicas (pilar, torre, tres, quatre…) y la notación (por ejemplo, 3d7). | Revisión manual. | Obligatorio | |
| B6 | Ningún enlace interno está roto y no hay enlaces que apunten a `#`. | Script de enlaces sobre todas las páginas. | Obligatorio | |
| B7 | Hay una página 404 propia. | Abrir una dirección que no existe. | Deseable | |

### C. Edición

| Id | Criterio | Cómo lo comprobamos | Tipo | Resultado |
| --- | --- | --- | --- | --- |
| C1 | La persona editora entra al editor sin necesitar una cuenta de GitHub ni saber qué es. | Prueba con la persona ajena (criterio F1). | Obligatorio | |
| C2 | Desde el editor se puede crear una noticia con imagen y texto alternativo, que es obligatorio. | Probarlo y comprobar que no deja guardar sin el texto alternativo. | Obligatorio | |
| C3 | Desde el editor se puede crear y modificar un evento del calendario. | Probarlo. | Obligatorio | |
| C4 | Antes de publicar se puede ver cómo quedará el cambio. | Probarlo y anotar cuánto tarda la vista previa. | Obligatorio | |
| C5 | Un cambio publicado aparece en la web en menos de 5 minutos. | Medir el tiempo desde que se pulsa Publicar hasta que se ve en la web. | Obligatorio | |
| C6 | Un cambio publicado se puede deshacer sin terminal. | Probarlo con un cambio de prueba. | Obligatorio | |
| C7 | Si una publicación falla, la web sigue enseñando la última versión buena y el error se puede ver en algún sitio. | Provocar un fallo a propósito en un borrador o en una rama de prueba. | Obligatorio | |
| C8 | Hay dos papeles: quien escribe y quien publica. | Probar con una cuenta de cada papel. | Deseable | |
| C9 | Las imágenes se reducen y se convierten a un formato ligero sin que la persona editora tenga que hacer nada. | Subir una foto de móvil de más de 3 MB y mirar el peso de la que sale en la web. | Deseable | |

### D. Accesibilidad

| Id | Criterio | Cómo lo comprobamos | Tipo | Resultado |
| --- | --- | --- | --- | --- |
| D1 | Lighthouse da 95 o más en accesibilidad en la portada, el calendario, una noticia y Uneix-te, en móvil y escritorio. | `npm run lighthouse`. | Obligatorio | |
| D2 | axe no encuentra ningún problema grave ni crítico en esas cuatro páginas. | axe-core sobre las páginas publicadas. | Obligatorio | |
| D3 | Toda la web se puede usar solo con el teclado: hay un enlace para saltar al contenido, el orden del foco tiene sentido y el foco siempre se ve. | Recorrido a mano con Tab y Mayús+Tab por las cuatro páginas y el menú móvil. | Obligatorio | |
| D4 | El texto cumple el contraste AA (4,5:1, o 3:1 en texto grande), también sobre los colores de la colla. | Herramienta de contraste sobre cada combinación de colores del diseño. | Obligatorio | |
| D5 | Con un lector de pantalla se entiende la estructura (títulos, menú, contenido principal) y se puede leer una noticia. | NVDA en Windows sobre la portada y una noticia. | Obligatorio | |
| D6 | Las animaciones se paran con "reducir movimiento" del sistema. | Activar la opción y recargar. | Obligatorio | |
| D7 | Se puede ampliar el texto al 200 % sin perder contenido. | Zoom del navegador al 200 %. | Deseable | |

### E. Rendimiento, dispositivos y coste

| Id | Criterio | Cómo lo comprobamos | Tipo | Resultado |
| --- | --- | --- | --- | --- |
| E1 | Lighthouse da 90 o más en rendimiento en móvil en la portada, el calendario y una noticia. | `npm run lighthouse`, tres pasadas y mediana. | Obligatorio | |
| E2 | La portada pesa menos de 500 KB en la primera carga. | Lighthouse (peso total). | Deseable | |
| E3 | No hay scroll horizontal ni nada cortado entre 360 y 1440 px de ancho. | Script de revisión en 4 tamaños, con capturas. | Obligatorio | |
| E4 | El coste es cero: plan gratuito del hosting y del CMS, y sin dominio propio. | Revisar los planes contratados. | Obligatorio | |
| E5 | Los límites del plan gratuito que nos afectan están anotados, con una estimación de cuánto los usamos. | Revisión del documento de comparativa. | Obligatorio | |

### F. Prueba con una persona ajena y entregables

| Id | Criterio | Cómo lo comprobamos | Tipo | Resultado |
| --- | --- | --- | --- | --- |
| F1 | Una persona que no ha participado en el proyecto entra, publica una noticia con imagen y cambia la hora de un ensayo, solo con la guía y sin ayuda. | La observamos sin intervenir. Anotamos el tiempo, dónde duda y si lo termina. | Obligatorio | |
| F2 | Después de la prueba, la guía se corrige con lo que le costó y anotamos qué cambiamos. | Comparar las dos versiones de la guía. | Obligatorio | |
| F3 | Están la comparativa de CMS y de hosting, con lo descartado y por qué, la guía para el editor y el documento de aprendizaje, que separa lo medido, lo observado y lo estimado. | Revisión de los documentos. | Obligatorio | |
| F4 | La web está publicada y el repositorio es público. | Abrir los dos enlaces. | Obligatorio | |
