# Adriano.dev

Portafolio bilingüe de Adriano González, construido con React, Vite, TypeScript y Tailwind CSS.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

El comando de compilación verifica TypeScript y genera un sitio estático en `dist/`. Para desplegarlo en Vercel, Netlify o un servidor estático, usa `npm run build` como comando de compilación y `dist` como directorio de publicación.

## Contenido

Edita `src/data/portfolio.ts` para actualizar textos en español e inglés, redes, proyectos, experiencia y tecnologías. El idioma y el tema se conservan en el navegador.

| Recurso | Ruta |
| --- | --- |
| Foto | `public/assets/profile.png` |
| CV en español | `public/assets/cv-adriano-es.pdf` |
| CV en inglés | `public/assets/cv-adriano-en.pdf` |
| Diagrama de VuelaData | `public/assets/vueladata-infra.png` |
| Video demo de VuelaData | `public/assets/vueladata-demo.mp4` |
| Captura de BankOs | `public/assets/bankos-dashboard.png` |
| Captura de Fundación Anda | `public/assets/fundacion-anda.png` |
| Instagram | Entrada `instagram` en `src/data/portfolio.ts` |

El formulario prepara un borrador con `mailto:`. El visitante lo envía desde su aplicación de correo. Para Instagram, actualiza `href` y `detail` y retira `placeholder`.

El icono de Power BI proviene de [Microsoft Power BI Icons](https://github.com/microsoft/PowerBI-Icons/blob/main/SVG/Power-BI.svg), bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
