# Comparativa de CMS y hosting

> **Proyecto de prácticas.** No es la web oficial de la Colla Castellera Capgrossos de Mataró.

Elegimos el CMS y el hosting para este caso concreto: una colla castellera con voluntarios sin perfil técnico ni cuenta de GitHub, que publican casi cada semana en temporada y no tienen presupuesto. Los criterios que más pesan son los de [CRITERIOS.md](CRITERIOS.md): C1 (entrar sin GitHub), C4 (vista previa), C6 (deshacer sin terminal), C8 (quien escribe y quien publica) y E4 (coste cero).

Consultamos la documentación oficial el 11 de noviembre de 2026. Cada dato va marcado como **documentado** (lo dice la documentación oficial), **sin documentar** (la documentación no lo dice y hay que probarlo) o **probado** (lo hemos comprobado nosotros, en FEDERG o en este proyecto).

## CMS

Comparamos dos CMS basados en Git y uno que no lo es. Sveltia, el que usamos en FEDERG, va como referencia.

| | Sveltia CMS (referencia) | Pages CMS (Git) | Decap CMS con Decap Turbo (Git) | Sanity (no Git) |
| --- | --- | --- | --- | --- |
| Dónde vive el contenido | Archivos Markdown en el repositorio | Archivos Markdown en el repositorio | Archivos Markdown en el repositorio | Base de datos de Sanity en la nube. La web lo pide por API al construirse |
| Autenticación | Cuenta de GitHub con un proxy OAuth (probado) | Las personas sin GitHub se invitan por correo como colaboradoras (documentado). La documentación no dice si entran con un enlace o con contraseña | Se invita por correo y se entra con una cuenta de Turbo, sin GitHub (documentado) | Cuenta de Sanity. Qué proveedores de inicio de sesión admite está sin documentar en las páginas que leímos |
| Roles y permisos | Los de GitHub: quien tiene escritura publica (probado) | Las colaboradoras editan contenido e imágenes, pero no la configuración ni a otras colaboradoras (documentado). No hay un papel solo para publicar | Rol propio con un complemento de pago (documentado) | En el plan gratuito, solo Administrador y Lector (documentado). Quien edita tiene que ser administrador |
| Imágenes | Se guardan en el repositorio y se convierten a WebP al subirlas (probado) | Se guardan en el repositorio, sin reducirlas (documentado). Astro las optimiza al construir | Se guardan en el repositorio. S3 o R2 solo en el plan de pago (documentado) | CDN de imágenes de Sanity con 100 GB de almacenamiento y 100 GB de tráfico al mes en el plan gratuito (documentado) |
| Vista previa | Una vista previa por borrador, hecha por Cloudflare (probado) | No hay borradores ni vista previa: guarda directamente en el repositorio (documentado) | Vistas previas de despliegue documentadas para sitios en GitHub. Con Cloudflare Pages, sin documentar | Live Preview y Presentation incluidos en el plan gratuito (documentado) |
| Historial | Todo el historial de Git, se deshace revirtiendo en GitHub (probado) | Todo el historial de Git, pero revertir exige una cuenta de GitHub (documentado) | Todo el historial de Git | Revisión de cambios de borradores durante 3 días. El historial completo no entra en el plan gratuito (documentado) |
| Coste | 0 € (probado) | 0 €, también la versión alojada (documentado) | 0 € con 1 sitio y 1 persona. Con más personas, 19 €/mes (documentado) | 0 € hasta 20 personas, 10.000 documentos y 2 webhooks (documentado) |
| Límites y riesgos | Exige GitHub a cada editor | La app de GitHub pide permisos de administración y de acciones del repositorio (documentado). Solo funciona con GitHub | Gratis solo para una persona | El contenido sale del repositorio y para la copia de seguridad hace falta su herramienta de línea de comandos. Los datos son públicos en el plan gratuito |

### Qué descartamos y por qué

- **Sveltia CMS.** Nos funcionó muy bien en FEDERG, pero cada editor necesita cuenta de GitHub y no cumple C1. Aquí sería repetir la misma barrera.
- **Decap con Decap Turbo.** Resuelve el acceso sin GitHub, pero el plan gratuito es para una sola persona. En una colla escriben al menos dos (crónicas y calendario), y con más personas ya no es gratis (E4). Además, no encontramos nada que confirme que funcione con Cloudflare Pages.
- **Sanity** es la alternativa más fuerte y la que más hemos dudado. Tiene vista previa en directo, un CDN de imágenes muy bueno y entra sin GitHub. La descartamos por tres motivos de este caso:
  1. En el plan gratuito, quien edita tiene que ser administrador, así que cualquier voluntario podría borrar el proyecto entero.
  2. El historial solo guarda tres días de borradores, y una crónica estropeada un lunes y descubierta el sábado ya no se podría recuperar desde el editor.
  3. El contenido saldría del repositorio, y lo aprendido en FEDERG (`RECUPERACION.md`) nos dice que es mejor tenerlo en archivos que podemos copiar.

### Decisión provisional: Pages CMS

**Pages CMS** es el que mejor encaja con los criterios obligatorios:

- Entra sin GitHub (C1).
- Es gratis sin límite de personas (E4).
- El contenido sigue en archivos dentro del repositorio, con todo el historial de Git.

Su punto débil es que guarda directamente, sin borradores ni vista previa, y eso choca con C4. Lo queremos resolver así, y hay que probarlo antes de dar la decisión por buena:

1. Cada noticia y cada evento tienen un campo **"Esborrany"** (borrador) que viene marcado por defecto. Mientras está marcado, la web pública no lo muestra.
2. Un segundo proyecto de Cloudflare Pages construye el mismo repositorio enseñando también los borradores, con `noindex`. Esa es la vista previa: quien edita guarda, espera un minuto y lo ve allí antes de desmarcar el borrador.
3. Para deshacer sin terminal (C6), quien administra revierte el commit desde la web de GitHub, como en FEDERG. Quien edita también puede volver a dejar el texto como estaba y guardar.

**Lo que tenemos que probar primero**, con un prototipo de una hora antes de construir la web:

- Cómo entra una colaboradora invitada por correo y qué ve.
- En qué rama guarda y con qué autor quedan los commits.
- Que el segundo proyecto de Cloudflare enseña los borradores y que el principal no.
- Que los permisos de la app de GitHub se pueden limitar a este repositorio.

Si el prototipo falla en la vista previa o en el acceso, pasamos a Sanity y aceptamos sus límites de roles e historial, anotándolos como riesgo.

C8 (separar quien escribe de quien publica) queda sin cumplir con Pages CMS: cualquiera que pueda editar puede desmarcar el borrador. Es un criterio deseable y lo dejamos anotado como límite.

## Hosting

| | Cloudflare Pages | Netlify | GitHub Pages | Vercel (Hobby) |
| --- | --- | --- | --- | --- |
| Coste | 0 € (documentado) | 0 € con 300 créditos al mes. Cada despliegue a producción gasta créditos (sin documentar en las páginas oficiales que leímos: lo dicen fuentes de terceros) | 0 € | 0 € |
| Construcciones | 500 al mes, una a la vez, 20 minutos como máximo cada una (documentado) | Según los créditos | Con GitHub Actions | Incluidas |
| Vistas previas | Ilimitadas, una por rama (documentado y probado) | Sí | No hay vistas previas por rama | Sí |
| Cabecera `X-Robots-Tag` | Con el archivo `_headers` (documentado y probado en FEDERG) | Con `_headers` o `netlify.toml` | No se pueden poner cabeceras propias, solo la etiqueta meta | Con `vercel.json` |
| Condiciones de uso | Sin restricción para este uso | Sin restricción para este uso | Sin restricción para este uso | Solo uso personal y no comercial (documentado) |

### Elección: Cloudflare Pages

- Es gratis, tiene vistas previas ilimitadas y permite poner la cabecera `noindex` (A2). Ya sabemos cómo se comporta, incluida la caché de las páginas borradas.
- Con dos proyectos (el público y el de borradores), cada vez que se guarda se gastan dos construcciones. Si en temporada se guardan unas 15 veces por semana, salen unas 130 construcciones al mes, más 60 de las reconstrucciones diarias de los dos proyectos: unas 190 de las 500 que permite el plan gratuito. Es una estimación, la mediremos.

### Qué descartamos y por qué

- **GitHub Pages:** no deja poner la cabecera `X-Robots-Tag` y no tiene vistas previas por rama. No cumple A2 ni ayuda a C4.
- **Netlify:** el plan gratuito pasó a funcionar por créditos, y con varios despliegues a la semana más el proyecto de borradores podríamos agotarlos a mitad de mes. Además, su sistema de acceso para editores (Identity) ha estado a punto de desaparecer.
- **Vercel:** técnicamente serviría, pero el plan gratuito es solo para uso personal y no comercial. Una web de una entidad queda en zona gris, aunque sea de prácticas.

## Fuentes

- Pages CMS: [colaboradores](https://pagescms.org/docs/configuration/collaborators/), [documentación](https://pagescms.org/docs/), [imágenes](https://pagescms.org/docs/configuration/media/), [app de GitHub](https://pagescms.org/docs/guides/installing/github-app/), [autenticación](https://pagescms.org/docs/development/authentication/), [inicio y preguntas frecuentes](https://pagescms.org/)
- Decap Turbo: [anuncio](https://decapcms.org/blog/decap-turbo-generally-available/), [planes](https://decapcms.org/turbo/)
- Sanity: [precios y límites](https://www.sanity.io/pricing), [webhooks](https://www.sanity.io/docs/webhooks)
- Cloudflare Pages: [límites](https://developers.cloudflare.com/pages/platform/limits/), [cabeceras](https://developers.cloudflare.com/pages/configuration/headers/), [vistas previas](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- Vercel: [uso justo](https://vercel.com/docs/limits/fair-use-guidelines)
- GitHub Pages: [debate sobre cabeceras propias](https://github.com/orgs/community/discussions/84963)
- Netlify: [nuevos precios por créditos](https://main--www.netlify.com/blog/new-pricing-credits.md) y [debate sobre el fin de Identity](https://github.com/decaporg/decap-cms/discussions/7419)
