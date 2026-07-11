# After TCG — versión final modular

Web tipo app, optimizada para celular y compatible con GitHub Pages.

## Lo importante

La web funciona incluso abriendo `index.html` directamente desde el celular, porque no usa módulos ES ni `fetch` para cargar vistas.

## Editar contenido

Carpeta `EDITAR-ACA`:

- `eventos.js`: fechas, cupos, precios, imágenes y descripciones.
- `config.js`: teléfono, Instagram, dirección y horarios.
- `comunidad.js`: ranking y novedades.

## Cambiar cupos

Buscá:

```js
cuposTotales: 8,
reservados: 5,
```

Cambiá `reservados`. La barra, el texto y el botón se actualizan solos.

## Editor visual básico

Abrí `editar-eventos.html`.
Podés modificar el contenido y descargar un nuevo `eventos.js`.

## Subir a GitHub desde celular

El navegador móvil no suele permitir seleccionar carpetas. Las opciones prácticas son:

1. Usar GitHub Codespaces.
2. Usar una app Git para Android.
3. Subir desde una computadora.
4. Crear un repositorio nuevo desde Codespaces y pegar el contenido.

GitHub no descomprime ZIP automáticamente.

## Publicar

Settings → Pages → Deploy from a branch → `main` → `/root`.
