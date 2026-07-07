# AFTER TCG - Cartelera web

Web estática para AFTER TCG con estética negra/dorada y formato de menú visual gamer.

La idea principal es que quien entra entienda rápido:

- qué puede hacer en el local;
- cuál es el próximo evento;
- qué preventas están activas;
- cómo sumar puntos en la liga;
- cómo consultar por WhatsApp;
- dónde queda y en qué horarios abre.

No hay carrito, checkout, login ni backend.

## Cómo abrir localmente

Usá un servidor local para que los JSON carguen correctamente:

```powershell
python -m http.server 8080
```

Luego abrí:

```text
http://localhost:8080
```

También funciona directo en GitHub Pages.

## Qué archivos editar

Datos generales del local:

```text
data/config.json
```

Eventos:

```text
data/eventos.json
```

Preventas:

```text
data/preventas.json
```

Ranking:

```text
data/ranking.json
```

## Imágenes principales

Las imágenes usadas por la web están en:

```text
assets/hero/local-abierto.png
assets/hero/local-real.png
assets/eventos/mesas-tcg.png
assets/productos/preventas-premium.png
assets/galeria/snacks-switch.png
assets/logo.png
```

Podés reemplazarlas por fotos reales del local manteniendo el mismo nombre de archivo.

La foto principal real del local es:

```text
assets/hero/local-real.png
```

La home usa esta foto como hero visual y también incluye cards grandes para TCG, torneos, lounge y preventas.

## WhatsApp e Instagram

Se editan en:

```text
data/config.json
```

El WhatsApp debe ir con código de país y sin signos:

```json
"whatsapp": "5491178289401"
```

## GitHub Pages

1. Subí todos los archivos al repositorio.
2. Entrá a `Settings`.
3. Abrí `Pages`.
4. Elegí `Deploy from a branch`.
5. Seleccioná `main` y `/root`.
6. Guardá.

No hay build ni dependencias.
