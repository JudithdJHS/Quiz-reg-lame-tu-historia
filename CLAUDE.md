# CLAUDE.md — RTH Quiz "Tu Camino a la Restauración"

> Documento maestro para Claude Code.
> Lee este archivo completo antes de escribir una sola línea de código.
> Todo lo que necesitas saber está aquí. No asumas nada que no esté escrito.

---

## 1. QUÉ ESTÁS CONSTRUYENDO

Una aplicación web independiente que implementa el quiz diagnóstico **"Tu Camino a la Restauración"** para **Regálame tu Historia (RTH)**, marca de restauración matrimonial católica fundada por **Ana y Alex**, terapeutas de pareja y familia.

**No es un formulario. No es un test de personalidad. Es una conversación.**

La persona que llega a este quiz está emocionalmente afectada — puede estar viviendo una crisis matrimonial, una separación, años de distancia con su pareja, o simplemente buscando claridad en su vocación. La experiencia debe sentirse como si Ana y Alex estuvieran en la sala con ella, preguntándole con calma, con cercanía, con esperanza. No un diagnóstico frío. Una conversación humana que termina con una ruta concreta.

**El objetivo funcional:**
1. Guiar al usuario por 12 preguntas emocionales
2. Clasificarlo en uno de 8 perfiles según sus respuestas
3. Capturar su nombre y email antes de mostrar el resultado
4. Mostrar su resultado personalizado en una página nueva `/resultado`
5. Registrarlo en MailerLite con las etiquetas correctas y activar la secuencia de email
6. Registrarlo en Google Sheets como CRM
7. Enviar un email de alerta al equipo RTH si el perfil es crisis aguda con compromiso alto

---

## 2. STACK TÉCNICO

```
Framework:     Next.js 14 con App Router
Lenguaje:      TypeScript (strict mode)
Estilos:       Tailwind CSS — sin librerías de componentes (no shadcn, no MUI)
Tipografías:   Playfair Display (titulares) + Inter (cuerpo) — Google Fonts
Email alerts:  Nodemailer con cuenta Gmail + App Password
CRM:           Google Sheets API v4 con service account
Email mktg:    MailerLite API v2
Deploy:        Vercel
Estado:        sessionStorage (sin base de datos propia)
```

**NO usar:**
- Librerías de componentes UI (shadcn, MUI, Chakra, etc.)
- Redux, Zustand ni gestores de estado externos
- Base de datos propia
- localStorage (solo sessionStorage para estado del quiz)

---

## 3. ESTRUCTURA DEL PROYECTO

```
rth-quiz/
├── CLAUDE.md
├── README.md
├── .env.example
├── .env.local                       ← NO commitear
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── public/
│   ├── logo-rth.svg                 ← logo de RTH (incluido)
│   ├── foto-ana-alex.jpg            ← foto principal juntos (RTH añadirá)
│   ├── foto-ana.jpg                 ← foto de Ana (RTH añadirá)
│   └── foto-alex.jpg                ← foto de Alex (RTH añadirá)
├── app/
│   ├── layout.tsx
│   ├── page.tsx                     ← bienvenida
│   ├── quiz/
│   │   └── page.tsx                 ← motor del quiz
│   ├── resultado/
│   │   └── page.tsx                 ← resultado (protegido)
│   └── api/
│       ├── submit/
│       │   └── route.ts             ← clasificación + MailerLite + Sheets + email
│       └── health/
│           └── route.ts
├── components/
│   ├── QuizProgress.tsx
│   ├── QuizCard.tsx
│   ├── QuizOpcion.tsx
│   ├── CapturaEmail.tsx
│   ├── ResultadoCard.tsx
│   ├── AnaAlexPresencia.tsx         ← foto + microcopy de acompañamiento
│   └── RutaPortafolio.tsx
├── lib/
│   ├── quiz-data.ts
│   ├── resultados-data.ts
│   ├── clasificador.ts
│   ├── mailerlite.ts
│   ├── sheets.ts
│   └── mailer.ts
└── types/
    └── quiz.ts
```

---

## 4. VARIABLES DE ENTORNO

```bash
# MailerLite
MAILERLITE_API_KEY=
MAILERLITE_GROUP_ID_A=            # Secuencia A — Crisis
MAILERLITE_GROUP_ID_B=            # Secuencia B — Exploración
MAILERLITE_GROUP_ID_C=            # Secuencia C — Crecimiento

# Google Sheets
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=               # incluir \n tal como está en el JSON

# Gmail / Nodemailer
GMAIL_USER=
GMAIL_APP_PASSWORD=
ALERT_EMAIL_RECIPIENT=regalametuhistoria@gmail.com

# URLs de productos RTH
NEXT_PUBLIC_URL_TALLER=https://www.regalametuhistoria.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio
NEXT_PUBLIC_URL_MEMBRESIA=https://regalametuhistoria.systeme.io/membresiaparasanar2?utm_source=ig&utm_medium=social&utm_content=link_in_bio

# App
NEXT_PUBLIC_APP_URL=              # URL de Vercel o http://localhost:3000
```

---

## 5. IDENTIDAD VISUAL — OBLIGATORIA

### Paleta de colores (SOLO estos valores)

```
#F5EDE0  crema pergamino    → fondo principal
#6B783E  verde oliva        → botones primarios, barra de progreso
#C49E50  dorado cálido      → titulares, acentos, detalles
#BD886A  tierra suave       → texto de apoyo, secundarios
#FDFAF6  blanco luminoso    → fondos de tarjetas
#3D3520  oscuro             → texto principal
#E0D5C4  gris borde         → bordes suaves
```

### Tipografías

```
Playfair Display → titulares, nombres de perfil, frases de impacto, mensajes
Inter            → cuerpo, opciones del quiz, botones, labels
```

Importar desde Google Fonts en `app/layout.tsx`.

### Principios de diseño NO negociables

1. Fondo siempre Crema Pergamino (#F5EDE0) — nunca blanco puro
2. Las fotos de Ana y Alex son protagonistas — siempre visibles y cálidas
3. Una sola pregunta por pantalla
4. Animaciones suaves: fade + slide 300-400ms
5. Mobile first: diseñar para 375px, escalar a 1440px
6. Espacio generoso — que todo respire
7. Nunca colores fuera de la paleta: no negro puro, no morado, no gris frío

---

## 6. FLUJO DE EXPERIENCIA COMPLETO

### Pantalla 1: Bienvenida (`/`)

Debe transmitir: Ana y Alex te esperan. Esto es para ti. Hay esperanza.

**Elementos:**
- Foto grande de Ana y Alex juntos — protagonista visual, cálida, natural
- Logo RTH en la parte superior
- Texto de apertura (usar exactamente este):

```
No todos los matrimonios viven la misma batalla.
Algunos están luchando por salvar lo que queda.
Otros llevan años esperando que algo cambie.
Algunos no saben si esto tiene solución…
y otros quieren construir algo santo desde el principio.

Responde con honestidad.
Tal vez descubras algo que tu corazón ya sabía…
pero no había podido nombrar.
```

- Botón único: "Comenzar mi camino →" en Verde Oliva

---

### Pantalla 2: Quiz (`/quiz`)

**Una pregunta por pantalla.** Al seleccionar una opción → avanzar automáticamente a los 400ms.

**Elementos fijos en cada pregunta:**
- Barra de progreso en la parte superior (dorado, avanza con cada respuesta)
- "Pregunta X de 12" — discreto, en Tierra Suave
- Foto de Ana o Alex — alternando entre preguntas (ver campo `foto` en quiz-data.ts)
- Microcopy de acompañamiento si la pregunta lo tiene (ver campo `microcopy`)

**Estados de las opciones:**
- Normal: fondo #FDFAF6, borde #E0D5C4
- Hover: borde #6B783E suave, fondo ligeramente más cálido
- Seleccionado: borde #6B783E sólido, fondo #EAF3DE → avance automático a 400ms

**Las Q8, Q9, Q10** se presentan exactamente igual que las demás. El usuario no sabe que tienen función especial.

---

### Pantalla 3: Captura de email (dentro de `/quiz`, al terminar Q12)

```
"Ya casi está"
"Tu camino a la restauración está listo."
"¿Dónde lo recibimos?"
"Te enviamos tu camino completo con la ruta que hemos trazado para ti."

[campo] Tu nombre          → placeholder: "¿Cómo te llamamos?"
[campo] Tu correo          → placeholder: "el que revisas de verdad"
[checkbox] He leído y acepto la política de privacidad de Regálame tu Historia.
           Puedo darme de baja cuando quiera.

[botón] "Ver mi camino →"  → Verde Oliva — DESACTIVADO hasta nombre + email + checkbox
```

Mientras se procesan las APIs: spinner suave. No bloquear pantalla agresivamente.
Al completar el submit exitoso: guardar en sessionStorage → navegar a `/resultado`.

---

### Pantalla 4: Resultado (`/resultado`)

**Protección:** si sessionStorage no tiene `completado: true` → redirigir a `/`.

**Estructura:**
```
Logo RTH (pequeño, arriba)
Foto de Ana y Alex (cálida, presente)

"Tu camino a la restauración"    ← Playfair Display Italic, Dorado
[nombre del perfil]              ← Playfair Display Bold, grande
[subtítulo]                      ← Inter, Tierra Suave

[línea divisoria dorada]

[situación — párrafo narrativo]
[mensaje contundente — callout con borde izquierdo dorado, Playfair Italic]

"Tu primer paso"
[nombre del producto]
[descripción del producto]
[precio]

[botón CTA principal — Verde Oliva]

"Tu ruta completa"
[pasos en línea — primer paso destacado en Verde Oliva]
```

---

## 7. MICROCOPYS DE ACOMPAÑAMIENTO

Textos opcionales que aparecen antes de algunas preguntas. Crean la sensación de diálogo.

```
Antes de Q2:       "Cuéntanos un poco más sobre tu situación..."
Antes de Q3:       "Sabemos que esto puede doler. Gracias por estar aquí."
Antes de Q5:       "Esta pregunta es importante. Tómate un momento."
Antes de Q6:       "La fe es el centro de todo lo que hacemos en RTH."
Antes de Q7:       "No hay respuesta correcta. Solo la tuya."
Antes de Q10:      "Tu respuesta aquí nos ayuda a acompañarte mejor."
Antes de captura:  "Has llegado hasta aquí. Eso ya dice mucho de ti."
```

---

## 8. LAS 12 PREGUNTAS (para `lib/quiz-data.ts`)

Las etiquetas [A-H] son INTERNAS. NUNCA se muestran al usuario.

```typescript
export const PREGUNTAS = [
  {
    id: 'q1', tipo: 'perfil', foto: 'ana',
    texto: 'Cuando piensas en tu relación hoy, ¿qué frase se acerca más a lo que sientes?',
    opciones: [
      { id: 'A', texto: '"Llevo mucho tiempo esperando que él quiera cambiar."' },
      { id: 'B', texto: '"Vivimos bajo el mismo techo… pero emocionalmente estamos muy lejos."' },
      { id: 'C', texto: '"Siento que intentar salvar mi matrimonio me está costando mi paz."' },
      { id: 'D', texto: '"Tenemos problemas, pero creo que no son tan graves."' },
      { id: 'E', texto: '"Quiero ayuda, pero no sé si puedo costearla."' },
      { id: 'F', texto: '"Voy a casarme y quiero hacerlo bien desde el inicio."' },
      { id: 'G', texto: '"Estoy discerniendo si el matrimonio es mi camino."' },
      { id: 'H', texto: '"Mi matrimonio está bien, pero queremos crecer en santidad."' },
    ]
  },
  {
    id: 'q2', tipo: 'perfil', foto: 'alex',
    microcopy: 'Cuéntanos un poco más sobre tu situación...',
    texto: '¿Qué describe mejor tu situación actual con tu pareja?',
    opciones: [
      { id: 'A', texto: 'Él no quiere participar en ningún proceso de ayuda, pero yo sigo aquí.' },
      { id: 'B', texto: 'Hablamos de lo necesario, pero ya no nos contamos nada de verdad.' },
      { id: 'C', texto: 'Estamos separados, hay una infidelidad de por medio, o estamos al borde de tomar una decisión definitiva.' },
      { id: 'D', texto: 'Tenemos roces y momentos difíciles, pero en general seguimos adelante.' },
      { id: 'E', texto: 'Necesitamos ayuda pero la situación económica lo complica todo.' },
      { id: 'F', texto: 'Somos novios o estamos próximos a casarnos.' },
      { id: 'G', texto: 'No tengo una relación definida todavía — estoy buscando claridad.' },
      { id: 'H', texto: 'Nuestra relación es buena y queremos llevarla a un nivel más profundo.' },
    ]
  },
  {
    id: 'q3', tipo: 'perfil', foto: 'ana',
    microcopy: 'Sabemos que esto puede doler. Gracias por estar aquí.',
    texto: '¿Qué es lo que más te duele en este momento?',
    opciones: [
      { id: 'A', texto: 'Sentir que soy la única que lucha por algo que debería ser de dos.' },
      { id: 'B', texto: 'La frialdad, el silencio o la sensación de vivir como compañeros de casa.' },
      { id: 'C', texto: 'El dolor de una herida muy reciente — traición, pérdida de confianza o ruptura.' },
      { id: 'D', texto: 'Ver que nos alejamos poco a poco sin saber cómo detenerlo.' },
      { id: 'E', texto: 'Querer sanar pero sentir que no tengo acceso a la ayuda que necesito.' },
      { id: 'F', texto: 'El miedo a repetir historias de dolor que ya vi en otros.' },
      { id: 'G', texto: 'No saber si lo que siento es vocación o miedo disfrazado de amor.' },
      { id: 'H', texto: 'Saber que hay más para vivir juntos espiritualmente y no saber cómo llegar ahí.' },
    ]
  },
  {
    id: 'q4', tipo: 'perfil', foto: 'alex',
    texto: '¿Cómo describirías la comunicación entre ustedes hoy?',
    opciones: [
      { id: 'A', texto: 'Soy yo quien siempre busca el diálogo. Él prefiere no hablar.' },
      { id: 'B', texto: 'Hablamos, pero nunca de lo que realmente importa.' },
      { id: 'C', texto: 'La comunicación está rota o es muy dolorosa cuando ocurre.' },
      { id: 'D', texto: 'A veces nos cuesta entendernos, pero no es un problema grave.' },
      { id: 'E', texto: 'Queremos hablar mejor pero no sabemos cómo y los recursos para aprender son limitados.' },
      { id: 'F', texto: 'Queremos aprender a comunicarnos bien antes de casarnos.' },
      { id: 'G', texto: 'Todavía no hay una relación estable que definir.' },
      { id: 'H', texto: 'Nos comunicamos bien, pero queremos conversaciones más profundas y con propósito.' },
    ]
  },
  {
    id: 'q5', tipo: 'filtro-compromiso', foto: 'ana',
    microcopy: 'Esta pregunta es importante. Tómate un momento.',
    texto: 'Cuando piensas en buscar ayuda para tu relación, ¿qué pasa dentro de ti?',
    opciones: [
      { id: 'A', texto: 'Sé que necesito ayuda y estoy dispuesto/a a trabajar aunque él no venga.' },
      { id: 'B', texto: 'Quiero intentarlo de verdad, aunque no sé si los dos estaremos dispuestos.' },
      { id: 'C', texto: 'Estoy en un punto donde necesito ayuda urgente — no puedo seguir como estoy.' },
      { id: 'D', texto: 'Me da curiosidad, pero no sé si realmente lo necesito.' },
      { id: 'E', texto: 'Lo quiero con todo mi corazón, pero el dinero es un obstáculo real.' },
      { id: 'F', texto: 'Quiero formarme antes de casarme — es una decisión consciente.' },
      { id: 'G', texto: 'Quiero entender qué quiere Dios para mí antes de comprometerme.' },
      { id: 'H', texto: 'Estamos bien y queremos seguir creciendo — es una elección de profundidad, no de crisis.' },
    ]
  },
  {
    id: 'q6', tipo: 'perfil', foto: 'alex',
    microcopy: 'La fe es el centro de todo lo que hacemos en RTH.',
    texto: '¿Cómo está hoy la fe en tu relación?',
    opciones: [
      { id: 'A', texto: 'Yo busco a Dios, pero él está alejado o es indiferente a la fe.' },
      { id: 'B', texto: 'Antes teníamos más vida espiritual juntos — ahora cada uno va por su lado.' },
      { id: 'C', texto: 'Siento que lo que vivimos me está alejando de Dios o me hace dudar de Él.' },
      { id: 'D', texto: 'Vamos a misa, pero no tenemos una vida espiritual profunda como pareja.' },
      { id: 'E', texto: 'La fe es importante para mí aunque nuestra situación sea complicada.' },
      { id: 'F', texto: 'Quiero que Dios esté en el centro de nuestro matrimonio desde el primer día.' },
      { id: 'G', texto: 'Busco entender lo que Dios quiere para mi vida — el matrimonio o la consagración.' },
      { id: 'H', texto: 'La fe es el eje de nuestra relación y queremos profundizar juntos.' },
    ]
  },
  {
    id: 'q7', tipo: 'perfil', foto: 'ana',
    microcopy: 'No hay respuesta correcta. Solo la tuya.',
    texto: '¿Qué cambio deseas de verdad — no lo que crees que deberías querer, sino lo que realmente anhelas?',
    opciones: [
      { id: 'A', texto: 'Que él finalmente quiera luchar por lo nuestro.' },
      { id: 'B', texto: 'Volver a sentir amor real, cercanía y conexión.' },
      { id: 'C', texto: 'Salir de este dolor — entender qué pasó y poder respirar.' },
      { id: 'D', texto: 'Entender si realmente necesitamos ayuda antes de que sea tarde.' },
      { id: 'E', texto: 'Encontrar un camino de sanación que sea posible para mí.' },
      { id: 'F', texto: 'Construir desde el principio algo que dure de verdad.' },
      { id: 'G', texto: 'Claridad. Saber si el matrimonio es para mí y cómo discernirlo bien.' },
      { id: 'H', texto: 'Que nuestro matrimonio sea testimonio — que lleve a otros a Dios.' },
    ]
  },
  {
    id: 'q8', tipo: 'temperatura',
    foto: 'alex',
    texto: '¿Qué frase describe mejor cómo llegaste hasta aquí?',
    opciones: [
      { id: 'A', texto: 'Llevo meses siguiendo a Ana y Alex — sus videos describen exactamente lo que vivo.', temperatura: 'caliente' },
      { id: 'B', texto: 'Alguien me compartió esto y quise intentarlo.', temperatura: 'frio' },
      { id: 'C', texto: 'Vi un reel o video y algo me detuvo — sentí que era para mí.', temperatura: 'frio' },
      { id: 'D', texto: 'Ya hice el taller antes y quiero seguir el proceso.', temperatura: 'caliente', esExAlumno: true },
    ]
  },
  {
    id: 'q9', tipo: 'filtro-compromiso',
    foto: 'ana',
    microcopy: 'Tu respuesta aquí nos ayuda a acompañarte mejor.',
    texto: 'Si pudieras hacer algo por tu relación esta semana — solo una cosa — ¿qué elegirías?',
    opciones: [
      { id: 'A', texto: 'Iniciar un proceso de sanación aunque sea sola — ya no puedo seguir esperando.', compromisoSenal: 'alto' },
      { id: 'B', texto: 'Hacer algo concreto para recuperar la conexión con mi pareja.', compromisoSenal: 'alto' },
      { id: 'C', texto: 'Hablar con alguien que entienda lo que estoy viviendo y me dé dirección.', compromisoSenal: 'alto' },
      { id: 'D', texto: 'Entender mejor qué está pasando en mi relación antes de actuar.', compromisoSenal: 'bajo' },
      { id: 'E', texto: 'Encontrar una forma de acceder a ayuda dentro de mis posibilidades.', compromisoSenal: 'alto' },
      { id: 'F', texto: 'Formarme para llegar al matrimonio con herramientas reales.', compromisoSenal: 'alto' },
      { id: 'G', texto: 'Tener un espacio para discernir con profundidad y sin presión.', compromisoSenal: 'medio' },
      { id: 'H', texto: 'Profundizar juntos en algo que nos acerque más a Dios y el uno al otro.', compromisoSenal: 'alto' },
    ]
  },
  {
    id: 'q10', tipo: 'filtro-compromiso-directo',
    foto: 'alex',
    texto: '¿Estás dispuesto/a a trabajar en tu proceso aunque sea incómodo, aunque requiera tiempo y aunque los resultados no sean inmediatos?',
    opciones: [
      { id: 'A', texto: 'Sí. Estoy cansado/a de seguir igual y quiero hacer algo diferente de verdad.', compromiso: 'alto' },
      { id: 'B', texto: 'Creo que sí, aunque tengo dudas de si podré con todo el proceso.', compromiso: 'alto' },
      { id: 'C', texto: 'Quiero intentarlo, pero necesito entender mejor qué implica antes de comprometerme.', compromiso: 'medio' },
      { id: 'D', texto: 'Honestamente no estoy seguro/a todavía.', compromiso: 'bajo' },
    ]
  },
  {
    id: 'q11', tipo: 'perfil', foto: 'ana',
    texto: 'Cuando ves contenido sobre sanación matrimonial, ¿qué pasa normalmente?',
    opciones: [
      { id: 'A', texto: '"Ojalá mi pareja quisiera ver esto conmigo."' },
      { id: 'B', texto: '"Esto describe exactamente lo que estamos viviendo."' },
      { id: 'C', texto: '"Necesito más que inspiración — necesito ayuda de verdad."' },
      { id: 'D', texto: '"Es para matrimonios con problemas más graves que el mío."' },
      { id: 'E', texto: '"Me encantaría acceder a esto, pero no sé si puedo costear el proceso."' },
      { id: 'F', texto: '"Quiero aprender antes de vivir una crisis, no después."' },
      { id: 'G', texto: '"Me sirve para entender si el matrimonio es lo que Dios quiere para mí."' },
      { id: 'H', texto: '"Siempre encuentro algo nuevo para llevar a nuestra relación."' },
    ]
  },
  {
    id: 'q12', tipo: 'perfil', foto: 'alex',
    texto: '¿Qué deseo profundo te trajo hasta aquí hoy?',
    opciones: [
      { id: 'A', texto: 'No seguir cargando sola algo que pesa demasiado.' },
      { id: 'B', texto: 'Volver a querernos. Volver a elegirlos.' },
      { id: 'C', texto: 'Encontrar una salida — entender qué pasó y poder seguir.' },
      { id: 'D', texto: 'Cuidar lo que tenemos antes de perderlo.' },
      { id: 'E', texto: 'Saber que hay un camino posible aunque mis recursos sean limitados.' },
      { id: 'F', texto: 'Llegar al altar sabiendo lo que estoy prometiendo.' },
      { id: 'G', texto: 'Entender si el matrimonio es mi vocación — y cómo saberlo con certeza.' },
      { id: 'H', texto: 'Llegar juntos al cielo. Eso es todo.' },
    ]
  },
]
```

---

## 9. LÓGICA DE CLASIFICACIÓN (`lib/clasificador.ts`)

```typescript
export interface ClasificacionResult {
  perfil: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
  temperatura: 'caliente' | 'frio'
  compromiso: 'alto' | 'medio' | 'bajo'
  secuencia: 'A' | 'B' | 'C'
  esExAlumno: boolean
  flagAlertaCrisis: boolean
}

export function clasificar(respuestas: Record<string, string>): ClasificacionResult {
  // Preguntas de perfil (Q8, Q9, Q10 NO cuentan)
  const preguntasPerfil = ['q1','q2','q3','q4','q5','q6','q7','q11','q12']
  const conteo: Record<string, number> = {A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0}
  preguntasPerfil.forEach(q => { if (respuestas[q]) conteo[respuestas[q]]++ })

  // Temperatura (Q8)
  const temperatura = ['A','D'].includes(respuestas.q8) ? 'caliente' : 'frio'
  const esExAlumno = respuestas.q8 === 'D'

  // Compromiso (Q10 determinante, Q9 señal secundaria)
  let compromiso: 'alto' | 'medio' | 'bajo' = 'medio'
  if (['A','B'].includes(respuestas.q10)) compromiso = 'alto'
  else if (respuestas.q10 === 'C') compromiso = 'medio'
  else if (respuestas.q10 === 'D') compromiso = 'bajo'
  if (respuestas.q9 === 'D' && ['C','D'].includes(respuestas.q10)) compromiso = 'bajo'

  // Perfil dominante
  const maxConteo = Math.max(...Object.values(conteo))
  const candidatos = Object.keys(conteo).filter(k => conteo[k] === maxConteo)
  let perfil = candidatos.length === 1 ? candidatos[0] : resolverEmpate(candidatos, respuestas)

  // Secuencia
  const secuencia = ['A','B','C'].includes(perfil) ? 'A'
                  : ['D','E','G'].includes(perfil) ? 'B' : 'C'

  return {
    perfil: perfil as ClasificacionResult['perfil'],
    temperatura, compromiso, secuencia, esExAlumno,
    flagAlertaCrisis: perfil === 'C' && compromiso === 'alto'
  }
}

function resolverEmpate(candidatos: string[], respuestas: Record<string, string>): string {
  if (candidatos.includes('C') && candidatos.includes('A'))
    return respuestas.q2 === 'C' ? 'C' : 'A'
  if (candidatos.includes('A') && candidatos.includes('B')) return 'B'
  if (candidatos.includes('D') && candidatos.includes('H')) return 'H'
  if (candidatos.includes('E') && candidatos.includes('A')) return 'A'
  if (candidatos.includes('F') && candidatos.includes('G')) return 'F'
  const prioridad = ['C','A','B','E','D','F','G','H']
  return prioridad.find(p => candidatos.includes(p)) || candidatos[0]
}
```

---

## 10. LOS 8 RESULTADOS (`lib/resultados-data.ts`)

```typescript
export const RESULTADOS = {
  A: {
    nombre: 'La que sostiene sola',
    subtitulo: 'Lleva tiempo esperando que él quiera luchar por lo que es de dos',
    colorHeader: '#EEEDFE',
    situacion: 'Has sostenido más de lo que muchos imaginan. Has rezado, has invitado, has esperado. Y hay algo dentro de ti que sigue creyendo que esto puede cambiar — aunque ya no sabes por cuánto tiempo más podrás esperar sola.',
    mensaje: 'La pregunta que vale hacerte hoy no es cuándo va a cambiar él. Es cuánto tiempo más vas a posponer tu propia sanación esperando que él dé el primer paso.',
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Puedes empezar sola, a tu ritmo, sin esperar que él diga sí. Las sesiones 2 y 3 del taller están diseñadas para el trabajo personal que no depende de tu pareja.',
    precio: '$32/mes',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Empieza el Taller Grabado hoy →',
    ruta: ['Taller Grabado', 'Taller en Vivo', 'Membresía', 'Diplomado'],
    etiqueta: 'perfil-espera-sola',
    secuencia: 'A',
  },
  B: {
    nombre: 'Los que viven lejos bajo el mismo techo',
    subtitulo: 'La distancia ya no es solo emocional — se volvió el modo de vida',
    colorHeader: '#E1F5EE',
    situacion: 'No hay gritos. No hay peleas épicas. Solo silencio, rutina y la sensación de que el amor se fue apagando sin que nadie lo notara a tiempo. Comparten techo, hijos, cuentas. Pero ya no se cuentan lo que importa.',
    mensaje: 'Tu matrimonio no está roto. Está pidiendo ayuda. Hay diferencia. Pero esa diferencia tiene fecha de vencimiento.',
    primerPaso: 'Taller en Vivo · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'La distancia emocional necesita experiencia grupal, no solo contenido grabado. Ver que otras parejas viven lo mismo — y lo están revertiendo — es lo que rompe la resignación.',
    precio: 'Próxima cohorte — consultar fechas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Ver fechas del Taller →',
    ruta: ['Taller en Vivo', 'Membresía', 'Diplomado', 'Ermitas'],
    etiqueta: 'perfil-distancia',
    secuencia: 'A',
  },
  C: {
    nombre: 'En el momento más oscuro',
    subtitulo: 'Infidelidad, separación, o al borde de una decisión definitiva',
    colorHeader: '#FAECE7',
    situacion: 'Lo que estás viviendo tiene nombre y tiene salida. Pero en este momento probablemente no puedes verla — porque el dolor ocupa todo el espacio. Una infidelidad. Una separación. Una decisión que sientes que no puedes seguir aplazando.',
    mensaje: 'No te pedimos que confíes en un método. Te pedimos que confíes en lo que Dios puede hacer con tu historia — exactamente desde donde estás.',
    primerPaso: 'Escríbenos directamente',
    descripcionProducto: 'Tu situación requiere acompañamiento real. Antes de recomendarte el camino más adecuado, queremos conocer tu situación. Escríbenos a regalametuhistoria@gmail.com — te respondemos personalmente.',
    precio: '',
    urlProductoKey: 'EMAIL_CONTACTO',
    ctaTexto: 'Escríbenos directamente →',
    ruta: ['Contacto directo', 'Taller en Vivo', 'Acompañamiento personalizado', 'Diplomado'],
    etiqueta: 'perfil-crisis-aguda',
    secuencia: 'A',
  },
  D: {
    nombre: 'Los que creen que no es para ellos',
    subtitulo: 'El matrimonio funciona… pero hay algo que no termina de encajar',
    colorHeader: '#EAF3DE',
    situacion: 'Quizás piensas: "Nosotros no estamos tan mal." Y tal vez tengas razón. Pero las crisis más silenciosas no son las explosivas — son las que van creciendo mientras la vida sigue normal por fuera. No esperar a tocar fondo también es sabiduría.',
    mensaje: 'Los mismos principios que sanan un matrimonio roto son los que blindan uno que funciona. No tienes que estar en crisis para merecer herramientas.',
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'El lugar perfecto para entender qué es el taller, qué pilares trabaja y si resuena con lo que tu matrimonio necesita — sin la presión de una cohorte en vivo.',
    precio: '$32/mes — exploración sin compromiso',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Explorar el Taller Grabado →',
    ruta: ['Taller Grabado', 'Taller en Vivo', 'Membresía'],
    etiqueta: 'perfil-prevencion',
    secuencia: 'B',
  },
  E: {
    nombre: 'La que quiere pero siente que no puede',
    subtitulo: 'El dinero no debería ser la puerta que cierra el camino',
    colorHeader: '#FAEEDA',
    situacion: 'Quieres sanar. Eso ya lo tienes claro. Pero los números no cierran — y eso genera una mezcla de frustración y culpa que no debería estar ahí. Tu dolor no vale menos por tener recursos limitados.',
    mensaje: 'No te vayas pensando que la falta de dinero es la señal de Dios cerrándote la puerta. A veces es solo la oportunidad de dar el primer paso con lo que tienes.',
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Menos de lo que cuesta una consulta. Sin fecha fija. Sin compromiso de largo plazo. Y si aún así el dinero es un obstáculo real, escríbenos — hay caminos y formas.',
    precio: '$32/mes',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Empezar por $32/mes →',
    ruta: ['Taller Grabado', 'Taller en Vivo', 'Membresía'],
    etiqueta: 'perfil-barrera-economica',
    secuencia: 'B',
  },
  F: {
    nombre: 'Los que quieren empezar bien',
    subtitulo: 'Novios o recién casados que eligieron prepararse antes de improvisar',
    colorHeader: '#FBEAF0',
    situacion: 'Estás haciendo exactamente lo que hay que hacer. La mayoría de las parejas que nos escriben — rotas, llorando, durmiendo en habitaciones separadas — no llegaron ahí por falta de amor. Llegaron por falta de preparación. Tú ya lo entendiste. Y eso es enorme.',
    mensaje: 'No te vamos a dar fórmulas. Te vamos a dar herramientas. Y vas a salir entendiendo que ese sí que vas a decir delante del altar no es el final de algo — es el primer día de un camino que vale la pena caminar bien.',
    primerPaso: 'Taller en Vivo · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'El mismo taller, otra entrada. No restauración — preparación. La sesión 2 te permite ver las heridas que traes de tu familia de origen antes de heredárselas a la familia que estás por construir.',
    precio: 'Próxima cohorte — consultar fechas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Inscribirme al Taller →',
    ruta: ['Taller en Vivo', 'Membresía', 'Diplomado'],
    etiqueta: 'perfil-novios',
    secuencia: 'C',
  },
  G: {
    nombre: 'Quien está discerniendo su vocación',
    subtitulo: 'No busca solo una relación — busca un propósito',
    colorHeader: '#E6F1FB',
    situacion: 'Hay una pregunta que no se hace en voz alta y que te quita el sueño: ¿Es el matrimonio mi camino? Si esa pregunta vive dentro de ti, lo que sientes no es ansiedad — es discernimiento. Y discernir es trabajo serio.',
    mensaje: 'Discernir bien no es decidir rápido. Es entender despacio. Este espacio te da lugar para entender — sin la presión de tener que decidir nada al final.',
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Ver el matrimonio desde adentro — no como meta cultural, sino como vocación — te da elementos para entender si es tu camino o no. Sin presión. A tu ritmo.',
    precio: '$32/mes',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Explorar el Taller Grabado →',
    ruta: ['Taller Grabado', 'Taller en Vivo', 'Membresía'],
    etiqueta: 'perfil-discernimiento',
    secuencia: 'B',
  },
  H: {
    nombre: 'Los que buscan santidad',
    subtitulo: 'Su matrimonio funciona — pero saben que el objetivo no es solo durar',
    colorHeader: '#F1EFE8',
    situacion: 'Su matrimonio funciona. Se aman. Tienen fe. Pero ustedes saben que el objetivo no es simplemente durar — sino llegar juntos al cielo. Y eso se construye. No aparece solo.',
    mensaje: 'Los principios que sanan también edifican. Las herramientas que rescatan un matrimonio en crisis son exactamente las que blindan al matrimonio que está bien. Ustedes están en el momento más importante: ahora, cuando todavía hay paz para construir.',
    primerPaso: 'Taller en Vivo · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'La ruta más completa del ecosistema RTH. No como solución a un problema — como misión. Su matrimonio puede convertirse en testimonio que lleve a otros al cielo.',
    precio: 'Próxima cohorte — consultar fechas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Inscribirme al Taller →',
    ruta: ['Taller en Vivo', 'Diplomado', 'Membresía', 'Ermitas'],
    etiqueta: 'perfil-santidad',
    secuencia: 'C',
  },
}
```

---

## 11. API ROUTE `/api/submit/route.ts`

```typescript
// Payload del frontend
interface SubmitPayload {
  nombre: string
  email: string
  perfil: string
  temperatura: string
  compromiso: string
  secuencia: string
  esExAlumno: boolean
  flagAlertaCrisis: boolean
  etiqueta: string
  producto: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

// Ejecutar en paralelo — no bloquear si uno falla
await Promise.allSettled([
  registrarEnMailerLite(payload),
  registrarEnSheets(payload),
  ...(payload.flagAlertaCrisis ? [enviarAlertaCrisis(payload)] : [])
])

// Respuesta siempre exitosa para el usuario
return NextResponse.json({ ok: true })
```

---

## 12. INTEGRACIÓN MAILERLITE (`lib/mailerlite.ts`)

```typescript
// POST https://connect.mailerlite.com/api/subscribers
// Si email ya existe: PUT para actualizar

const payload = {
  email: data.email,
  fields: {
    name: data.nombre,
    perfil_rth: data.etiqueta,
    temperatura_rth: data.temperatura,
    compromiso_rth: data.compromiso,
    producto_rth: data.producto,
    secuencia_rth: data.secuencia,
  },
  groups: [getGroupId(data.secuencia)],
  status: 'active',
}
```

---

## 13. INTEGRACIÓN GOOGLE SHEETS (`lib/sheets.ts`)

```
Nombre de la hoja: 'Leads Quiz RTH'
Columnas: Timestamp | Nombre | Email | Perfil | Temperatura | Compromiso | Producto | Secuencia | ExAlumno | UTM_Source | UTM_Medium | UTM_Campaign
Método: spreadsheets.values.append — nunca sobreescribir
Auth: service account con google-auth-library
```

---

## 14. ALERTA DE CRISIS (`lib/mailer.ts`)

```typescript
// Solo cuando: perfil === 'C' && compromiso === 'alto'
// Nodemailer con Gmail + App Password

subject: '🚨 Lead prioritario — Perfil C (Crisis Aguda) · RTH Quiz'
// Incluir: nombre, email, perfil, compromiso, fecha
// Texto: "Este lead requiere contacto personal en menos de 24h"
```

---

## 15. SESSIONSTORAGE

```typescript
// Clave: 'rth_quiz_resultado'
interface QuizSesion {
  completado: boolean   // true solo si submit fue exitoso
  perfil: string
  temperatura: string
  compromiso: string
  nombre: string
  timestamp: number
}
// Si completado !== true o timestamp > 2h → redirigir a /
```

---

## 16. META TAGS (`app/layout.tsx`)

```typescript
export const metadata = {
  title: 'Tu Camino a la Restauración · Regálame tu Historia',
  description: 'Descubre qué camino está hecho para ti. Quiz de Ana y Alex, terapeutas de pareja y familia con más de 1.000 personas acompañadas.',
  openGraph: {
    title: 'Tu Camino a la Restauración · Regálame tu Historia',
    description: '¿Cuál es tu situación real? Responde con honestidad y descubre la ruta que hemos trazado para ti.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  },
}
```

---

## 17. ERRORES QUE NUNCA DEBES COMETER

- Mostrar etiquetas [A-H] al usuario
- Ofrecer sesión 1:1 de forma automática (solo perfil C menciona contacto directo)
- Usar localStorage (solo sessionStorage)
- Bloquear navegación al resultado si una API falla (usar Promise.allSettled)
- Mostrar errores técnicos al usuario
- Timeout menor a 8 segundos en APIs externas
- Procesar pagos (solo links externos)
- Permitir acceso a /resultado sin quiz completado
- Usar colores fuera de la paleta definida
- Usar Playfair Display en texto de cuerpo largo

---

## 18. CRITERIOS DE CALIDAD

- [ ] Quiz funciona end-to-end en localhost sin errores de consola
- [ ] Los 8 perfiles producen resultados visualmente distintos y emocionalmente coherentes
- [ ] Foto de Ana o Alex visible en cada pregunta, alternando
- [ ] Botón "Ver mi camino" desactivado hasta nombre + email + checkbox completos
- [ ] Lead aparece en MailerLite con etiquetas correctas tras completar
- [ ] Lead aparece en Google Sheets con todos los campos
- [ ] Perfil C + compromiso alto dispara email de alerta
- [ ] Acceso directo a /resultado sin quiz redirige a /
- [ ] Responsivo en 375px y 1440px
- [ ] Sin errores de TypeScript
- [ ] Colores y tipografías exactamente según manual de marca
- [ ] Logo SVG de RTH presente en bienvenida y resultado

---

## 19. ORDEN DE CONSTRUCCIÓN

```
1.  types/quiz.ts
2.  lib/quiz-data.ts
3.  lib/resultados-data.ts
4.  lib/clasificador.ts
5.  lib/mailerlite.ts
6.  lib/sheets.ts
7.  lib/mailer.ts
8.  app/api/submit/route.ts
9.  app/api/health/route.ts
10. components/QuizProgress.tsx
11. components/QuizOpcion.tsx
12. components/QuizCard.tsx
13. components/AnaAlexPresencia.tsx
14. components/CapturaEmail.tsx
15. components/RutaPortafolio.tsx
16. components/ResultadoCard.tsx
17. app/layout.tsx
18. app/page.tsx
19. app/quiz/page.tsx
20. app/resultado/page.tsx
21. README.md
22. .env.example
```

---

## 20. README.md QUE DEBES GENERAR

Incluir en este orden:
1. Descripción del proyecto
2. Requisitos previos
3. Instalación
4. Variables de entorno (todas descritas)
5. Cómo crear el service account de Google Sheets (paso a paso)
6. Cómo obtener el App Password de Gmail
7. Cómo crear los grupos en MailerLite
8. Cómo ejecutar en desarrollo
9. Deploy en Vercel
10. Cómo añadir las fotos de Ana y Alex
11. Cómo actualizar fechas de cohorte

---

*RTH · Quiz Tu Camino a la Restauración · Mayo 2026 · Confidencial*

---

## 21. REDISEÑO COMPLETO DEL RESULTADO — VERSIÓN 2.0

### El problema que hay que resolver

El resultado actual muestra una lista de productos con precios. Eso es lo peor que le puedes hacer a alguien que acaba de responder 12 preguntas íntimas sobre su matrimonio roto. Antes de ayudarla, ya le estás vendiendo. La confianza se rompe en el momento más importante.

### La emoción objetivo del resultado

La persona termina de leer y siente:
- "Por fin alguien entiende exactamente lo que me pasa — y tiene nombre"
- "No sabía que esto que vivo es un patrón, no un fracaso personal"
- "Hay personas que estuvieron exactamente aquí y salieron diferentes"
- "Quiero saber más — quiero hablar con ellos"

El resultado NO debe vender. Debe revelar, acompañar y generar confianza. La conversión ocurre DESPUÉS de que la persona confía.

---

### NUEVA ESTRUCTURA VISUAL DEL RESULTADO (`app/resultado/page.tsx`)

```
[1] FOTO DE ANA Y ALEX — protagonista, cálida, con overlay suave
    Encima: "Ana y Alex · Terapeutas de Pareja y Familia"

[2] SALUDO PERSONALIZADO
    "Hola [nombre],"
    "Tu camino a la restauración" — Playfair Display Italic, Dorado

[3] EL PATRÓN — lo que no sabía (NUEVO — corazón del resultado)
    Título del patrón en Playfair Display Bold, grande
    Subtítulo del perfil en Inter, Tierra Suave
    ──── línea dorada ────
    Párrafo de revelación — el insight que le da nombre a lo que vive
    Tono: cálido, clínico pero humano, como un espejo preciso

[4] TESTIMONIO ANÓNIMO — prueba social real (NUEVO)
    Frase en Playfair Display Italic, entre comillas, sobre fondo crema-dorado
    "Una persona que llegó exactamente donde estás tú nos dijo..."
    ──── borde izquierdo dorado ────

[5] SITUACIÓN NOMBRADA — validación emocional
    Párrafo breve que valida su dolor sin dramatizarlo

[6] MENSAJE CONTUNDENTE — la frase de impacto
    En Playfair Display Italic, centrado, grande
    Sobre fondo crema ligeramente más oscuro con borde dorado

[7] COSTO DE LA INACCIÓN — urgencia desde la verdad (NUEVO)
    Párrafo corto, honesto, sin alarmar
    "Cada semana que pasa sin hacer este trabajo..."

[8] VISIÓN DE FUTURO HONESTA (NUEVO)
    "No prometemos que..." — honestidad que genera confianza
    "Prometemos algo más honesto: que..."

[9] EL CAMINO — ruta visual de transformaciones (REDISEÑO TOTAL)
    Ver especificaciones de diseño abajo ↓

[10] PRIMER PASO — producto + CTA
     Solo al final, después de todo lo anterior
     Sin precio visible en el primer impacto — solo el nombre y descripción
     El precio aparece en texto pequeño debajo del botón
```

---

### DISEÑO DEL CAMINO — Sección más importante del resultado

**NO es una lista de productos. Es una ruta visual hacia la transformación.**

Cada paso muestra un LOGRO, no un producto. El producto es el vehículo — la transformación es lo que le importa a la persona.

#### Diseño visual del camino

```
"Tu camino hacia aquí" — label en Dorado, Playfair Italic, centrado

[línea vertical dorada que conecta todos los pasos — como un camino]

    ╭─────────────────────────────────────────╮
    │  ✦  PASO 1 — destacado, Verde Oliva    │  ← "Tu primer paso"
    │  [TÍTULO DE TRANSFORMACIÓN]             │
    │  [descripción de qué cambia en su vida] │
    ╰─────────────────────────────────────────╯
          │ (línea dorada que baja)
    ╭─────────────────────────────────────────╮
    │  ○  PASO 2 — crema, borde dorado suave │
    │  [TÍTULO DE TRANSFORMACIÓN]             │
    │  [descripción breve]                    │
    ╰─────────────────────────────────────────╯
          │
    [PASO 3]
          │
    [PASO 4 — siempre termina con algo relacionado con su familia/legado]
          │
    ╭─────────────────────────────────────────╮
    │  ✦  Destino final — Dorado/Luz         │
    │  "Un hogar donde el amor es real"       │  ← varía por perfil
    ╰─────────────────────────────────────────╯
```

#### Especificaciones técnicas del camino

```css
/* Contenedor del camino */
.camino-container {
  position: relative;
  padding: 2rem 0;
}

/* Línea vertical conectora */
.camino-container::before {
  content: '';
  position: absolute;
  left: 28px;       /* centrada con el número */
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #C49E50, #C49E5050);
}

/* Paso activo (primer paso) */
.paso-activo {
  background: #6B783E;
  color: #FDFAF6;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 20px rgba(107, 120, 62, 0.2);
}

/* Número del paso activo */
.paso-numero-activo {
  background: #C49E50;
  color: #FDFAF6;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

/* Pasos siguientes */
.paso-siguiente {
  background: #FDFAF6;
  border: 1px solid #E0D5C4;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  opacity: 0.85;
}

/* Destino final */
.paso-destino {
  background: linear-gradient(135deg, #F5EDE0, #EDE3D5);
  border: 1.5px solid #C49E50;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  margin-top: 1rem;
}

.paso-destino-icono {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.paso-destino-titulo {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.25rem;
  color: #C49E50;
}
```

#### Los títulos de transformación por perfil (NO son nombres de productos)

**Perfil A — espera sola:**
- Paso 1: "Dejar de vivir en espera y recuperarte a ti misma"
- Paso 2: "Entender por qué la dinámica está atascada"
- Paso 3: "Recuperar tu paz sin depender de su decisión"
- Paso 4: "Que lo que viviste se convierta en fortaleza para tu familia"
- Destino: "Un hogar donde tus hijos aprenden que el amor no se rinde"

**Perfil B — distancia:**
- Paso 1: "Entender por qué la conexión se rompió"
- Paso 2: "Aprender a hablarse desde el corazón, no desde la razón"
- Paso 3: "Recuperar la intimidad real — no solo la física"
- Paso 4: "Construir un proyecto de vida que valga la pena juntos"
- Destino: "Un hogar donde volvieron a elegirse de verdad"

**Perfil C — crisis aguda:**
- Paso 1: "Dejar de cargarlo solo — recibir acompañamiento real"
- Paso 2: "Entender qué pasó y ponerle nombre al dolor"
- Paso 3: "Recuperar tu paz y tu identidad"
- Paso 4: "Que tu historia sirva — a ti y a tu familia"
- Destino: "Una vida donde el dolor tuvo un propósito"

**Perfil D — prevención:**
- Paso 1: "Ver las grietas antes de que se conviertan en fracturas"
- Paso 2: "Aprender las herramientas que los matrimonios sanos usan"
- Paso 3: "Construir una conexión más profunda de la que ya tienen"
- Destino: "Un matrimonio que dura porque se cuidó a tiempo"

**Perfil E — barrera económica:**
- Paso 1: "Dar el primer paso con lo que tienes — sin esperar condiciones perfectas"
- Paso 2: "Sanar lo que puedas sanar ahora"
- Paso 3: "Construir desde lo posible, no desde lo ideal"
- Destino: "Una familia que salió adelante porque alguien decidió empezar"

**Perfil F — novios:**
- Paso 1: "Conocer las heridas que traes antes de heredárselas a tu familia"
- Paso 2: "Aprender a comunicarte bien antes de que duela"
- Paso 3: "Entender lo que prometes el día que digas sí"
- Paso 4: "Construir desde el principio algo que dure de verdad"
- Destino: "Un matrimonio que empezó diferente porque elegiste prepararte"

**Perfil G — discernimiento:**
- Paso 1: "Ver el matrimonio desde adentro antes de comprometerte"
- Paso 2: "Distinguir lo que quieres tú de lo que quiere Dios para ti"
- Paso 3: "Tomar la decisión más importante de tu vida con claridad"
- Destino: "Una vocación vivida con convicción, no con duda"

**Perfil H — santidad:**
- Paso 1: "Profundizar en lo que ya tienen — que hay más"
- Paso 2: "Convertir su amor en testimonio para otros"
- Paso 3: "Construir una iglesia doméstica real en su hogar"
- Paso 4: "Acompañar a otras parejas con lo que ustedes aprendieron"
- Destino: "Un matrimonio que llevó a otros al cielo"

---

### EL BLOQUE DEL PRIMER PASO — al final del resultado, después del camino

```
──── línea dorada ────

"¿Por dónde empezar?"          ← Playfair Display Italic, Dorado

[nombre del primer paso]        ← Inter SemiBold, grande, Oscuro
[descripción del producto]      ← Inter Regular, Tierra Suave
                                   Sin mencionar MailerLite, secuencias ni automatizaciones

[BOTÓN CTA]                     ← Verde Oliva, texto blanco, grande, redondeado
                                   Sin precio en el botón

[precio]                        ← Inter Regular, pequeño, discreto, bajo el botón
```

---

### PALETA EMOCIONAL DEL RESULTADO

El resultado debe tener tres zonas de color emocional:

1. **Zona de revelación** (patrón + testimonio): fondo Crema Pergamino (#F5EDE0), borde dorado lateral
2. **Zona de esperanza** (visión de futuro + camino): fondo Blanco Luminoso (#FDFAF6), acentos dorados
3. **Zona de acción** (primer paso + CTA): fondo Verde Oliva muy suave (#EAF3DE), botón Verde Oliva sólido

El dorado (#C49E50) aparece en los momentos de revelación y esperanza — nunca en los momentos de venta.

---

### LO QUE DEBE DESAPARECER DEL RESULTADO ACTUAL

- ❌ Los nombres de productos como títulos de pasos (Taller Grabado, Membresía, Diplomado, Ermitas)
- ❌ Los precios visibles en la ruta
- ❌ La lista numerada plana sin diseño visual
- ❌ El avatar "A&A" en círculo — reemplazar por foto real o foto placeholder cálida
- ❌ Cualquier sensación de catálogo o carrito de compra

