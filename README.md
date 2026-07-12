# RTH Quiz — Tu Camino a la Restauración

Quiz diagnóstico de Regálame tu Historia. Guía al usuario por 12 preguntas, lo clasifica en uno de 8 perfiles y entrega una ruta personalizada de sanación matrimonial.

---

## Requisitos previos

- Node.js 18+
- Cuenta de Google Cloud con un service account (para Sheets)
- Cuenta Gmail con App Password habilitado (para alertas)
- Cuenta MailerLite con API Key y 3 grupos creados

---

## Instalación

```bash
git clone <repo>
cd rth-quiz
npm install
cp .env.example .env.local
# Edita .env.local con tus credenciales
npm run dev
```

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `MAILERLITE_API_KEY` | API Key de MailerLite (Connect > API) |
| `MAILERLITE_GROUP_ID_A` | ID del grupo Secuencia A — Crisis |
| `MAILERLITE_GROUP_ID_B` | ID del grupo Secuencia B — Exploración |
| `MAILERLITE_GROUP_ID_C` | ID del grupo Secuencia C — Crecimiento |
| `GOOGLE_SHEETS_ID` | ID de la hoja (de la URL de Google Sheets) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email del service account (`...@...iam.gserviceaccount.com`) |
| `GOOGLE_PRIVATE_KEY` | Clave privada del service account (incluir `\n`) |
| `GMAIL_USER` | Tu correo Gmail |
| `GMAIL_APP_PASSWORD` | App Password de Gmail (no la contraseña normal) |
| `ALERT_EMAIL_RECIPIENT` | Email que recibe alertas de crisis (default: regalametuhistoria@gmail.com) |
| `NEXT_PUBLIC_URL_TALLER` | URL del Taller RTH |
| `NEXT_PUBLIC_URL_MEMBRESIA` | URL de la Membresía RTH |
| `NEXT_PUBLIC_APP_URL` | URL de la app (Vercel o localhost) |

---

## Cómo crear el Service Account de Google Sheets

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto o selecciona uno existente
3. Activa la **Google Sheets API** (APIs & Services > Library)
4. Ve a **IAM & Admin > Service Accounts > Create Service Account**
5. Dale un nombre, ej. `rth-quiz-sheets`
6. En la pestaña **Keys**, crea una clave JSON y descárgala
7. Del JSON extrae:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (copia el valor exacto, incluyendo `\n`)
8. Abre tu Google Sheet, ve a **Compartir** y añade el `client_email` como editor
9. La hoja debe tener una pestaña llamada exactamente: `Leads Quiz RTH`
10. En la primera fila añade los encabezados: `Timestamp | Nombre | Email | Perfil | Temperatura | Compromiso | Producto | Secuencia | ExAlumno | UTM_Source | UTM_Medium | UTM_Campaign`

---

## Cómo obtener el App Password de Gmail

1. En tu cuenta Google ve a **Seguridad > Verificación en dos pasos** (debe estar activa)
2. Busca **Contraseñas de aplicaciones** (App passwords)
3. Selecciona app: `Correo`, dispositivo: `Otro (nombre personalizado)` → `RTH Quiz`
4. Copia la contraseña de 16 caracteres generada
5. Pon esa contraseña en `GMAIL_APP_PASSWORD` (sin espacios)

---

## Cómo crear los grupos en MailerLite

1. En MailerLite ve a **Subscribers > Groups**
2. Crea 3 grupos:
   - `RTH Secuencia A — Crisis` → copia su ID a `MAILERLITE_GROUP_ID_A`
   - `RTH Secuencia B — Exploración` → copia su ID a `MAILERLITE_GROUP_ID_B`
   - `RTH Secuencia C — Crecimiento` → copia su ID a `MAILERLITE_GROUP_ID_C`
3. El ID del grupo aparece en la URL al abrirlo: `mailerlite.com/subscribers/groups/XXXXXXXX`

---

## Ejecutar en desarrollo

```bash
npm run dev
# Abre http://localhost:3000
```

---

## Deploy en Vercel

1. Sube el repo a GitHub
2. En Vercel: **New Project > Import** desde GitHub
3. En **Environment Variables** añade todas las variables del `.env.example`
4. La variable `GOOGLE_PRIVATE_KEY` debe pegarse **con los saltos de línea literales** (no `\n` escapado)
5. Deploy automático en cada push a `main`

---

## Cómo añadir las fotos de Ana y Alex

Coloca estos archivos en la carpeta `/public`:

| Archivo | Uso |
|---|---|
| `foto-ana-alex.jpg` | Foto de Ana y Alex juntos — portada y resultado |
| `foto-ana.jpg` | Foto de Ana — preguntas pares del quiz |
| `foto-alex.jpg` | Foto de Alex — preguntas impares del quiz |

Recomendado: fotos en formato JPG, relación 1:1 para las individuales y 4:3 para la foto juntos. Mínimo 600px de ancho.

---

## Cómo actualizar fechas de cohorte

Las fechas del Taller en Vivo aparecen en el campo `precio` de los perfiles B, F y H en [`lib/resultados-data.ts`](lib/resultados-data.ts). Busca `Próxima cohorte` y actualiza la fecha:

```typescript
precio: 'Próxima cohorte — 15 de junio 2026',
```

---

## Panel /admin

CRM ligero de seguimiento para el equipo RTH. La base de datos es el mismo Google Sheet "Leads Quiz RTH".

### Variables de entorno nuevas

| Variable | Descripción |
|---|---|
| `ADMIN_USERS` | Multi-admin: `"Nombre:clave, Nombre2:clave2"`. Cada persona entra con su propia clave y sus gestiones quedan firmadas con su nombre en las notas |
| `ADMIN_PASSWORD` | Fallback de un solo admin sin nombre propio (se loguea como "Equipo"). Solo se usa si `ADMIN_USERS` no está configurada |
| `ADMIN_SESSION_SECRET` | Secreto aleatorio largo (32+ caracteres) para firmar la cookie de sesión |

La sesión dura 8 horas (cookie httpOnly firmada). Sin sesión válida, `/admin/*` redirige al login y `/api/admin/*` responde 401.

**Para añadir o quitar un administrador**, edita `ADMIN_USERS` en Vercel y haz redeploy — no requiere cambios de código:
```
ADMIN_USERS=Yudit:clave-de-yudit, Ana:clave-de-ana, Alex:clave-de-alex
```

### Columnas nuevas en el Sheet

Añadir estas 4 columnas al final de la hoja **Leads Quiz RTH** (después de UTM_Campaign):

| Columna | Letra | Contenido |
|---|---|---|
| `Telefono` | M | WhatsApp del lead (se completa solo desde los eventos de checkout si existe) |
| `Estado` | N | Estado del pipeline: `lead`, `checkout-iniciado`, `pago-fallido`, `abandonado`, `pagado`, `alumno`, `miembro` |
| `UltimaGestion` | O | Timestamp ISO de la última gestión registrada |
| `Notas` | P | Historial de notas, una por línea con fecha `[YYYY-MM-DD]` |

Si `Estado` está vacío, el panel lo deriva automáticamente de la hoja "Eventos Checkout RTH" (pago aprobado → pagado, etc.). Un estado escrito manualmente siempre tiene prioridad.

### Uso

1. Entrar a `/admin` con la clave
2. `/admin/pipeline` muestra las columnas del embudo con los leads
3. Cada tarjeta permite: abrir WhatsApp con mensaje según estado, registrar gestión con nota, y mover de estado con el selector
4. Las tarjetas con más de 3 días sin gestión se resaltan en dorado
