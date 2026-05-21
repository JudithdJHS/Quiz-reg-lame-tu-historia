import { PerfilId, ResultadoPerfil } from '@/types/quiz'

export const RESULTADOS: Record<PerfilId, ResultadoPerfil> = {
  A: {
    nombre: 'La que sostiene sola',
    subtitulo: 'Lleva tiempo esperando que él quiera luchar por lo que es de dos',
    colorHeader: '#EEEDFE',

    situacion: 'Has sostenido más de lo que muchos imaginan. Has rezado, has invitado, has esperado. Y hay algo dentro de ti que sigue creyendo que esto puede cambiar — aunque ya no sabes por cuánto tiempo más podrás esperar sola. La espera unilateral es uno de los patrones más agotadores del matrimonio: la mujer que carga sola algo que debería ser de dos.',

    testimonio: '"Empecé el proceso sola, con muchísimo miedo. Pensé que no tenía sentido si él no venía. Pero a las tres semanas entendí que el trabajo más importante era el mío — y eso nadie me lo podía quitar."',

    mensaje: 'La pregunta que vale hacerte hoy no es cuándo va a cambiar él. Es cuánto tiempo más vas a posponer tu propia sanación esperando que él dé el primer paso.',

    costoInaccion: 'Cada semana que pasa esperando que él dé el primer paso es una semana menos de tu propia vida. El proceso no depende de él. Nunca dependió.',

    visionFuturo: {
      noPrometemos: 'que él cambie si tú haces el trabajo.',
      prometemos: 'que cuando tú sanes, algo en tu historia empieza a moverse. Lo hemos visto cientos de veces.',
    },

    pasosCamino: [
      { titulo: 'Dejar de vivir en espera y recuperarte a ti misma', descripcion: 'El primer trabajo es tuyo — y no depende de que él venga.' },
      { titulo: 'Entender por qué la dinámica está atascada', descripcion: 'Nombrarlo es el inicio de poder cambiarlo.' },
      { titulo: 'Recuperar tu paz sin depender de su decisión', descripcion: 'Tu bienestar no puede seguir siendo rehén de su proceso.' },
      { titulo: 'Que lo que viviste se convierta en fortaleza para tu familia', descripcion: 'Las heridas trabajadas se vuelven recursos — para ti y los tuyos.' },
    ],
    destinoCamino: 'Un hogar donde tus hijos aprenden que el amor no se rinde',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en matrimonios católicos',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Puedes empezar sola, a tu ritmo, sin esperar que él diga sí. Las sesiones 2 y 3 del taller están diseñadas para el trabajo personal que no depende de tu pareja.',
    precio: '$32/mes',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Empieza el Taller Grabado hoy →',
    etiqueta: 'perfil-espera-sola',
    secuencia: 'A',
    recursosSecundarios: {
      titulo: 'TAMBIÉN PARA TI — RECURSOS PARA EL CAMINO EN SOLITARIO',
      recursos: [
        {
          nombre: 'Taller "Sanando mi Parte"',
          descripcion: 'Para sanar las heridas propias que no dependen de que él esté listo. 3–4 sesiones en video con workbook incluido. Trabajo interior real, a tu ritmo.',
          precio: '$97–127 USD · Pago único · Sin suscripción.',
          url: process.env.NEXT_PUBLIC_URL_TALLER || '#',
        },
        {
          nombre: 'Guía Premium "Penitencia por Amor"',
          descripcion: 'Audio íntimo narrado por Ana. Acompañamiento espiritual diario para el proceso interior — para quien camina sola pero no sin Dios.',
          precio: '$27–47 USD · Pago único.',
          url: '#',
        },
      ],
      ctaTexto: 'Quiero trabajar mi parte →',
    },
  },

  B: {
    nombre: 'Los que viven lejos bajo el mismo techo',
    subtitulo: 'La distancia ya no es solo emocional — se volvió el modo de vida',
    colorHeader: '#E1F5EE',

    situacion: 'No hay gritos. No hay peleas épicas. Solo silencio, rutina y la sensación de que el amor se fue apagando sin que nadie lo notara a tiempo. Comparten techo, hijos, cuentas. Pero ya no se cuentan lo que importa. La distancia emocional sin conflicto visible es el patrón más difícil de reconocer — porque por fuera, todo parece estar bien.',

    testimonio: '"Llevábamos siete años siendo compañeros de casa. Nunca peleábamos. Eso nos hacía pensar que estábamos bien. No estábamos bien — estábamos resignados."',

    mensaje: 'Tu matrimonio no está roto. Está pidiendo ayuda. Hay diferencia. Pero esa diferencia tiene fecha de vencimiento.',

    costoInaccion: 'La distancia emocional no desaparece sola. Cada año que pasa sin nombrarla, se vuelve más difícil de revertir — no porque no haya solución, sino porque ambos se acostumbran a no sentir.',

    visionFuturo: {
      noPrometemos: 'volver a los primeros años.',
      prometemos: 'que aprendan a elegirse de nuevo — con más herramientas y más consciencia que la primera vez.',
    },

    pasosCamino: [
      { titulo: 'Entender por qué la conexión se rompió', descripcion: 'La distancia tiene causas concretas — y se pueden trabajar.' },
      { titulo: 'Aprender a hablarse desde el corazón, no desde la razón', descripcion: 'La comunicación profunda es una habilidad que se aprende.' },
      { titulo: 'Recuperar la intimidad real — no solo la física', descripcion: 'La conexión emocional es la base de todo lo demás.' },
      { titulo: 'Construir un proyecto de vida que valga la pena juntos', descripcion: 'Un matrimonio con dirección compartida no se resigna — avanza.' },
    ],
    destinoCamino: 'Un hogar donde volvieron a elegirse de verdad',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en matrimonios católicos',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller en Vivo · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'La distancia emocional necesita experiencia grupal, no solo contenido grabado. Ver que otras parejas viven lo mismo — y lo están revertiendo — es lo que rompe la resignación.',
    precio: 'Próxima cohorte — consultar fechas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Ver fechas del Taller →',
    etiqueta: 'perfil-distancia',
    secuencia: 'A',
  },

  C: {
    nombre: 'En el momento más oscuro',
    subtitulo: 'Infidelidad, separación, o al borde de una decisión definitiva',
    colorHeader: '#FAECE7',

    situacion: 'Lo que estás viviendo tiene nombre y tiene salida. Pero en este momento probablemente no puedes verla — porque el dolor ocupa todo el espacio. Una infidelidad. Una separación. Una decisión que sientes que no puedes seguir aplazando. Las crisis agudas no se resuelven solas ni con tiempo — necesitan acompañamiento real.',

    testimonio: '"Llegué pensando que estaba ahí para decidir si divorciarme. Salí entendiendo que primero necesitaba sanarme a mí. Todo lo demás vino después."',

    mensaje: 'No te pedimos que confíes en un método. Te pedimos que confíes en lo que Dios puede hacer con tu historia — exactamente desde donde estás.',

    costoInaccion: 'En una crisis aguda, cada día sin acompañamiento real es un día que el dolor se instala más profundo. No porque seas débil — sino porque el dolor no procesado se convierte en decisiones que después no puedes deshacer.',

    visionFuturo: {
      noPrometemos: 'que el camino sea fácil ni que los resultados sean inmediatos.',
      prometemos: 'acompañarte con herramientas reales para que puedas ver con claridad lo que hoy el dolor no te deja ver — y tomar las decisiones que merece tu familia.',
    },

    pasosCamino: [
      { titulo: 'Dejar de cargarlo solo — recibir acompañamiento real', descripcion: 'Hay cosas que no se pueden procesar en soledad. No tienes que hacerlo.' },
      { titulo: 'Entender qué pasó y ponerle nombre al dolor', descripcion: 'El dolor sin nombre ocupa todo el espacio. Nombrarlo lo hace tratable.' },
      { titulo: 'Recuperar tu paz y tu identidad', descripcion: 'En medio de la crisis, es fácil perder de vista quién eres. Volver a ti es el centro.' },
      { titulo: 'Que tu historia sirva — a ti y a tu familia', descripcion: 'Lo que se trabaja con honestidad se convierte en legado, no en cadena.' },
    ],
    destinoCamino: 'Una vida donde el dolor tuvo un propósito',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en matrimonios católicos',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Escríbenos directamente',
    descripcionProducto: 'Tu situación requiere acompañamiento real. Antes de recomendarte el camino más adecuado, queremos conocer tu situación. Escríbenos a regalametuhistoria@gmail.com — te respondemos personalmente.',
    precio: '',
    urlProductoKey: 'EMAIL_CONTACTO',
    ctaTexto: 'Escríbenos directamente →',
    etiqueta: 'perfil-crisis-aguda',
    secuencia: 'A',
  },

  D: {
    nombre: 'Los que creen que no es para ellos',
    subtitulo: 'El matrimonio funciona… pero hay algo que no termina de encajar',
    colorHeader: '#EAF3DE',

    situacion: 'Quizás piensas: "Nosotros no estamos tan mal." Y tal vez tengas razón. Pero las crisis más silenciosas no son las explosivas — son las que van creciendo mientras la vida sigue normal por fuera. Los matrimonios no se rompen de golpe. Se erosionan despacio, en los silencios, en las pequeñas heridas no habladas, en los patrones que se repiten sin que nadie los nombre.',

    testimonio: '"Fuimos al taller por curiosidad. No creíamos que lo necesitábamos. Salimos entendiendo que llevábamos años construyendo sin cimientos — y que aún estábamos a tiempo."',

    mensaje: 'Los mismos principios que sanan un matrimonio roto son los que blindan uno que funciona. No tienes que estar en crisis para merecer herramientas.',

    costoInaccion: 'Lo que hoy es una grieta pequeña, mañana puede ser una fractura. No esperar a tocar fondo también es sabiduría.',

    visionFuturo: {
      noPrometemos: 'que su matrimonio nunca tendrá una crisis.',
      prometemos: 'que si la tiene, estarán mucho mejor preparados para atravesarla juntos.',
    },

    pasosCamino: [
      { titulo: 'Ver las grietas antes de que se conviertan en fracturas', descripcion: 'El que ve el problema a tiempo tiene el mayor margen de maniobra.' },
      { titulo: 'Aprender las herramientas que los matrimonios sanos usan', descripcion: 'No se trata de arreglar lo roto — se trata de construir mejor.' },
      { titulo: 'Construir una conexión más profunda de la que ya tienen', descripcion: 'Un matrimonio que cuida su raíz crece — no solo sobrevive.' },
    ],
    destinoCamino: 'Un matrimonio que dura porque se cuidó a tiempo',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en matrimonios católicos',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'El lugar perfecto para entender qué es el taller, qué pilares trabaja y si resuena con lo que tu matrimonio necesita — sin la presión de una cohorte en vivo.',
    precio: '$32/mes — exploración sin compromiso',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Explorar el Taller Grabado →',
    etiqueta: 'perfil-prevencion',
    secuencia: 'B',
  },

  E: {
    nombre: 'La que quiere pero siente que no puede',
    subtitulo: 'El dinero no debería ser la puerta que cierra el camino',
    colorHeader: '#FAEEDA',

    situacion: 'Quieres sanar. Eso ya lo tienes claro. Pero los números no cierran — y eso genera una mezcla de frustración y culpa que no debería estar ahí. Tu dolor no vale menos por tener recursos limitados. La barrera económica es real, y nombrarla sin vergüenza es el primer paso para encontrar el camino posible.',

    testimonio: '"Pensé que el dinero era el obstáculo. Pero cuando encontré una opción accesible, me di cuenta de que el verdadero obstáculo era el miedo. El dinero era la excusa que me dejaba quedarme quieta."',

    mensaje: 'No te vayas pensando que la falta de dinero es la señal de Dios cerrándote la puerta. A veces es solo la oportunidad de dar el primer paso con lo que tienes.',

    costoInaccion: 'Esperar las condiciones perfectas para sanar es como esperar el momento perfecto para ir al médico. Mientras esperas, el problema no espera contigo.',

    visionFuturo: {
      noPrometemos: 'que el camino sea sin esfuerzo.',
      prometemos: 'que el primer paso es posible hoy, con lo que tienes.',
    },

    pasosCamino: [
      { titulo: 'Dar el primer paso con lo que tienes — sin esperar condiciones perfectas', descripcion: 'El momento perfecto no existe. El momento posible, sí.' },
      { titulo: 'Sanar lo que puedas sanar ahora', descripcion: 'No tienes que resolverlo todo. Solo avanzar lo que puedas hoy.' },
      { titulo: 'Construir desde lo posible, no desde lo ideal', descripcion: 'Los matrimonios más sólidos empezaron con lo que había — no con lo que faltaba.' },
    ],
    destinoCamino: 'Una familia que salió adelante porque alguien decidió empezar',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en matrimonios católicos',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Menos de lo que cuesta una consulta. Sin fecha fija. Sin compromiso de largo plazo. Y si aún así el dinero es un obstáculo real, escríbenos — hay caminos y formas.',
    precio: '$32/mes',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Empezar por $32/mes →',
    etiqueta: 'perfil-barrera-economica',
    secuencia: 'B',
    recursosSecundarios: {
      titulo: 'UNA ALTERNATIVA SIN SUSCRIPCIÓN',
      recursos: [
        {
          nombre: 'Taller "Sanando mi Parte"',
          descripcion: 'Pago único, sin mensualidades. 3–4 sesiones en video para trabajar tu proceso interior sin comprometerte a una suscripción. Ideal si el $32/mes se siente incierto.',
          precio: '$97–127 USD · Pago único · Sin suscripción.',
          url: process.env.NEXT_PUBLIC_URL_TALLER || '#',
        },
      ],
      ctaTexto: 'Ver opción de pago único →',
    },
  },

  F: {
    nombre: 'Los que quieren empezar bien',
    subtitulo: 'Novios o recién casados que eligieron prepararse antes de improvisar',
    colorHeader: '#FBEAF0',

    situacion: 'Estás haciendo exactamente lo que hay que hacer. La mayoría de las parejas que nos escriben — rotas, llorando, durmiendo en habitaciones separadas — no llegaron ahí por falta de amor. Llegaron por falta de preparación. Tú ya lo entendiste. La preparación matrimonial no es un trámite. Es la diferencia entre construir sobre roca o sobre arena.',

    testimonio: '"Íbamos a casarnos convencidos de que el amor era suficiente. El proceso nos mostró que el amor es el punto de partida, no la garantía. Salimos con algo mucho más valioso: herramientas."',

    mensaje: 'No te vamos a dar fórmulas. Te vamos a dar herramientas. Y vas a salir entendiendo que ese sí que vas a decir delante del altar no es el final de algo — es el primer día de un camino que vale la pena caminar bien.',

    costoInaccion: 'La mayoría de las parejas en crisis nos dicen lo mismo: "Ojalá hubiéramos hecho esto antes de casarnos." Tú todavía puedes.',

    visionFuturo: {
      noPrometemos: 'un matrimonio perfecto.',
      prometemos: 'que van a llegar al altar sabiendo lo que prometen — y eso cambia todo.',
    },

    pasosCamino: [
      { titulo: 'Conocer las heridas que traes antes de heredárselas a tu familia', descripcion: 'Todos llegamos al matrimonio con historia. La diferencia es si la trabajamos.' },
      { titulo: 'Aprender a comunicarte bien antes de que duela', descripcion: 'Es más fácil aprender en la calma que en medio de la tormenta.' },
      { titulo: 'Entender lo que prometes el día que digas sí', descripcion: 'El matrimonio no es un sentimiento — es una decisión que se renueva.' },
      { titulo: 'Construir desde el principio algo que dure de verdad', descripcion: 'Los cimientos importan más que cualquier otra cosa.' },
    ],
    destinoCamino: 'Un matrimonio que empezó diferente porque elegiste prepararte',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en matrimonios católicos',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller en Vivo · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'El mismo taller, otra entrada. No restauración — preparación. La sesión 2 te permite ver las heridas que traes de tu familia de origen antes de heredárselas a la familia que estás por construir.',
    precio: 'Próxima cohorte — consultar fechas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Inscribirme al Taller →',
    etiqueta: 'perfil-novios',
    secuencia: 'C',
  },

  G: {
    nombre: 'Quien está discerniendo su vocación',
    subtitulo: 'No busca solo una relación — busca un propósito',
    colorHeader: '#E6F1FB',

    situacion: 'Hay una pregunta que no se hace en voz alta y que te quita el sueño: ¿Es el matrimonio mi camino? Si esa pregunta vive dentro de ti, lo que sientes no es ansiedad — es discernimiento. Y discernir es trabajo serio. La claridad no llega con el tiempo. Se construye con honestidad, con oración y con información real sobre lo que implica la vocación que estás considerando.',

    testimonio: '"Llevaba años con la pregunta dentro sin poder nombrarla. Pensé que el tiempo me daría claridad. Pero la claridad no llega sola — se trabaja."',

    mensaje: 'Discernir bien no es decidir rápido. Es entender despacio. Este espacio te da lugar para entender — sin la presión de tener que decidir nada al final.',

    costoInaccion: 'El discernimiento aplazado no desaparece — solo se vuelve más pesado. Cada año sin trabajarlo es un año viviendo con una pregunta sin respuesta que ocupa espacio en tu cabeza y en tu corazón.',

    visionFuturo: {
      noPrometemos: 'darte la respuesta.',
      prometemos: 'darte la claridad para que puedas encontrarla tú mismo.',
    },

    pasosCamino: [
      { titulo: 'Ver el matrimonio desde adentro antes de comprometerte', descripcion: 'Entender lo que implica te da información real para discernir.' },
      { titulo: 'Distinguir lo que quieres tú de lo que quiere Dios para ti', descripcion: 'El discernimiento verdadero empieza donde termina el ruido exterior.' },
      { titulo: 'Tomar la decisión más importante de tu vida con claridad', descripcion: 'Una vocación elegida desde la libertad interior se vive diferente.' },
    ],
    destinoCamino: 'Una vocación vivida con convicción, no con duda',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en matrimonios católicos',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Ver el matrimonio desde adentro — no como meta cultural, sino como vocación — te da elementos para entender si es tu camino o no. Sin presión. A tu ritmo.',
    precio: '$32/mes',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Explorar el Taller Grabado →',
    etiqueta: 'perfil-discernimiento',
    secuencia: 'B',
  },

  H: {
    nombre: 'Los que buscan santidad',
    subtitulo: 'Su matrimonio funciona — pero saben que el objetivo no es solo durar',
    colorHeader: '#F1EFE8',

    situacion: 'Su matrimonio funciona. Se aman. Tienen fe. Pero ustedes saben que el objetivo no es simplemente durar — sino llegar juntos al cielo. Y eso se construye. No aparece solo. Un matrimonio que funciona pero no crece, eventualmente retrocede. No hay punto neutral: o profundizas o te estancas.',

    testimonio: '"Creíamos que el objetivo del matrimonio era ser felices. El proceso nos mostró que el objetivo es ser santos — y que eso es mucho más exigente y mucho más hermoso que la felicidad."',

    mensaje: 'Los principios que sanan también edifican. Las herramientas que rescatan un matrimonio en crisis son exactamente las que blindan al matrimonio que está bien. Ustedes están en el momento más importante: ahora, cuando todavía hay paz para construir.',

    costoInaccion: 'El estancamiento espiritual en el matrimonio no es neutral. Con el tiempo, tiene un costo — para ustedes y para los que los rodean.',

    visionFuturo: {
      noPrometemos: 'que será fácil ir más profundo.',
      prometemos: 'que lo que construyan desde ahora será el testimonio que sus hijos y otras familias necesitan ver.',
    },

    pasosCamino: [
      { titulo: 'Profundizar en lo que ya tienen — que hay más', descripcion: 'Un matrimonio bien construido siempre tiene más por descubrir.' },
      { titulo: 'Convertir su amor en testimonio para otros', descripcion: 'Lo que ustedes viven en casa tiene el poder de inspirar a otras familias.' },
      { titulo: 'Construir una iglesia doméstica real en su hogar', descripcion: 'El hogar es el primer lugar donde se vive y transmite la fe.' },
      { titulo: 'Acompañar a otras parejas con lo que ustedes aprendieron', descripcion: 'La misión de su matrimonio va más allá de los dos.' },
    ],
    destinoCamino: 'Un matrimonio que llevó a otros al cielo',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en matrimonios católicos',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller en Vivo · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'La ruta más completa del ecosistema RTH. No como solución a un problema — como misión. Su matrimonio puede convertirse en testimonio que lleve a otros al cielo.',
    precio: 'Próxima cohorte — consultar fechas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Inscribirme al Taller →',
    etiqueta: 'perfil-santidad',
    secuencia: 'C',
  },
}
