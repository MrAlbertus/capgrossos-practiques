# Prototipo de Pages CMS

Prueba del 11 de noviembre de 2026 para confirmar la decisión provisional de [COMPARATIVA.md](COMPARATIVA.md) antes de construir la web. Cada punto dice si está **probado** o **pendiente**.

## Resultados

| Qué queríamos saber | Resultado | Estado |
| --- | --- | --- |
| Cómo se entra sin GitHub | La pantalla de entrada tiene "Sign in with GitHub" y también "Continue with email". | Visto. Falta entrar con una cuenta invitada por correo |
| Qué permisos pide la app de GitHub | Al instalarla: lectura de checks, estados de commit, despliegues, metadatos y Pages; lectura y escritura de acciones, código y creación de repositorios; y leer los correos del usuario. No coincide del todo con la documentación, que habla de permisos de administración. | Probado |
| Si se puede limitar a un repositorio | Sí: "Only select repositories" con solo `capgrossos-practiques`. | Probado |
| En qué rama guarda | En la que sale en la dirección (`.../capgrossos-practiques/main/...`). Guarda directamente en `main`, sin pull request. | Probado |
| Con qué autor quedan los commits | Con la cuenta de GitHub de quien edita (`3fd73d9`, "Create src/content/actualitat/esborrany-de-prova-del-cms.md (via Pages CMS)"). Para las personas invitadas por correo, la documentación dice que se usa la identidad de la app. | Probado con GitHub. Pendiente con correo |
| Si la ruta relativa de las imágenes funciona con Astro | Sí: escribe `../../assets/actualitat/castell-il-lustracio.jpg` y Astro la optimiza. | Probado |
| Si el texto se guarda en Markdown | Sí, debajo del frontmatter. | Probado |
| Si el borrador está marcado por defecto | Sí, y la web pública no lo enseña. | Probado en un build local |
| Historial | El editor tiene un botón de historial junto a Guardar. | Visto. Falta probar si deja recuperar una versión |
| Vista previa con el segundo proyecto de Cloudflare | | Pendiente |
| `noindex` en los dos proyectos | | Pendiente |
