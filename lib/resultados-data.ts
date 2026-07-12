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
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en los matrimonios',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Puedes empezar sola, a tu ritmo, sin esperar que él diga sí. La mayor parte del taller está orientada al trabajo personal en primera instancia — proyecto de vida, manejo de emociones, sanación de heridas. No depende de que él venga.',
    precio: '$220 USD · Pago único — puedes pagarlo en cuotas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Tu camino comienza aquí',
    etiqueta: 'perfil-espera-sola',
    secuencia: 'A',
    recursosSecundarios: {
      titulo: 'TAMBIÉN PARA TI — RECURSOS PARA EL CAMINO EN SOLITARIO',
      recursos: [
        {
          nombre: 'Sanando mi Corazón',
          descripcion: 'Para sanar las heridas propias que no dependen de que él esté listo. Sesiones en video con workbook incluido más meditaciones de acompañamiento espiritual diario. Trabajo interior real, a tu ritmo.',
          precio: '$57 USD · Pago único · Sin suscripción.',
          url: process.env.NEXT_PUBLIC_URL_TALLER || '#',
        },
      ],
      ctaTexto: 'Quiero trabajar mi parte →',
    },
  },

  B: {
    nombre: 'Los que viven lejos bajo el mismo techo',
    subtitulo: 'La distancia ya no es solo emocional — se volvió el modo de vida',
    colorHeader: '#E1F5EE',

    situacion: 'No hay gritos. No hay peleas épicas. Solo silencio, rutina, indiferencia y la sensación de que el amor se fue apagando sin que nadie lo notara a tiempo. Comparten techo, hijos, cuentas. Pero ya no se cuentan lo que importa. La distancia emocional sin conflicto visible es el patrón más difícil de reconocer — porque por fuera, todo parece estar bien.',

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
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en los matrimonios',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Tener una experiencia grupal donde ves a otras parejas viviendo lo mismo abre un camino de esperanza apoyado en comunidad, que busca de nuevo el equilibrio en la relación y rompe la resignación.',
    precio: '$220 USD · Pago único — puedes pagarlo en cuotas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Tu camino comienza aquí',
    etiqueta: 'perfil-distancia',
    secuencia: 'A',
  },

  C: {
    nombre: 'En el momento más oscuro',
    subtitulo: 'Infidelidad, separación, o al borde de una decisión definitiva',
    colorHeader: '#FAECE7',

    situacion: 'Lo que estás viviendo tiene nombre y tiene salida. Pero en este momento probablemente no puedes verla — porque el dolor ocupa todo el espacio. Una infidelidad, una separación, una decisión que sientes que no puedes seguir aplazando. Las crisis agudas no se resuelven solas ni con tiempo — necesitan acompañamiento real y profesional.',

    testimonio: '"Llegué pensando que estaba ahí para decidir si divorciarme. Salí entendiendo que primero necesitaba sanarme a mí. Todo lo demás vino después."',

    mensaje: 'No te pedimos que confíes en un método. Te pedimos que confíes en lo que Dios puede hacer con tu historia — exactamente desde donde estás.',

    costoInaccion: 'En una crisis aguda, cada día sin acompañamiento real y profesional es un día que el dolor se instala más profundo. No porque seas débil — sino porque el dolor no procesado se convierte en decisiones que después no puedes deshacer.',

    visionFuturo: {
      noPrometemos: 'que el camino sea fácil ni que los resultados sean inmediatos.',
      prometemos: 'acompañarte con herramientas reales y profesionales para que puedas ver con claridad lo que hoy el dolor no te deja ver — y tomar las decisiones que merece tu familia.',
    },

    pasosCamino: [
      { titulo: 'Dejar de cargarlo solo — recibir acompañamiento real y profesional', descripcion: 'Hay cosas que no se pueden procesar en soledad. No tienes que hacerlo.' },
      { titulo: 'Entender qué pasó y ponerle nombre al dolor', descripcion: 'El dolor sin nombre ocupa todo el espacio. Nombrarlo lo hace tratable.' },
      { titulo: 'Recuperar tu paz y tu identidad', descripcion: 'En medio de la crisis, es fácil perder de vista quién eres. Volver a ti es un paso importante.' },
      { titulo: 'Que tu historia sirva — a ti y a tu familia', descripcion: 'Lo que se trabaja con honestidad se convierte en legado, no en cadena.' },
    ],
    destinoCamino: 'Una vida donde el dolor tuvo un propósito',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en los matrimonios',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'En este momento, el primer paso es tener algo concreto que hacer. El Taller Grabado está disponible hoy, a tu ritmo, sin fechas. Incluye sesión grupal en vivo semanal con Ana y Alex.\n\nY si sientes que necesitas más acompañamiento profesional e inmediato, escríbenos a hola@regalametuhistoria.com',
    precio: '$220 USD · Pago único — puedes pagarlo en cuotas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Tu camino comienza aquí',
    ctaSecundario: 'O escríbenos directamente',
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
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en los matrimonios',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'El lugar perfecto para darle una revisadita a tu relación y afinar sus bases, refrescar con herramientas profesionales la dinámica de tu matrimonio. Lo vivirás a tu ritmo y en intimidad.',
    precio: '$220 USD · Pago único — puedes pagarlo en cuotas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Tu camino comienza aquí',
    etiqueta: 'perfil-prevencion',
    secuencia: 'B',
  },

  E: {
    nombre: 'La que quiere pero siente que no puede',
    subtitulo: 'El dinero no debería ser la puerta que cierra el camino',
    colorHeader: '#FAEEDA',

    situacion: 'Quieres sanar. Eso ya lo tienes claro. Pero las cuentas en tu cabeza no cuadran — y eso genera una mezcla de frustración y culpa que no debería estar ahí. Tu dolor no vale menos por tener recursos limitados. La barrera económica es real, y nombrarla sin vergüenza es el primer paso para encontrar el camino posible.',

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
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en los matrimonios',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Menos de lo que cuesta una consulta. Sin fecha fija. Sin compromiso de largo plazo. Y si aún así el dinero es un obstáculo real, escríbenos — hay caminos y formas.',
    precio: '$220 USD · Pago único — puedes pagarlo en cuotas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Tu camino comienza aquí',
    etiqueta: 'perfil-barrera-economica',
    secuencia: 'B',
    recursosSecundarios: {
      titulo: 'UNA ALTERNATIVA SIN SUSCRIPCIÓN',
      recursos: [
        {
          nombre: 'Sanando mi Corazón',
          descripcion: 'Pago único de menor valor. Sesiones en video para trabajar tu proceso interior, incluye meditaciones de acompañamiento espiritual. Ideal si el taller completo aún no está a tu alcance.',
          precio: '$57 USD · Pago único · Sin suscripción.',
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

    situacion: 'Estás haciendo exactamente lo que hay que hacer. La mayoría de las parejas que nos escriben — rotas, llorando, durmiendo en habitaciones separadas — no llegaron ahí por falta de amor. Llegaron por falta de preparación. Tú ya lo entendiste, la preparación matrimonial no es un trámite. Es la diferencia entre construir sobre roca o sobre arena.',

    testimonio: '"Íbamos a casarnos convencidos de que el amor era suficiente. El proceso nos mostró que el amor es el punto de partida, no la garantía. Salimos con algo mucho más valioso: herramientas."',

    mensaje: 'No te vamos a dar fórmulas, te vamos a dar herramientas para que comprendas bien a qué le vas a decir SÍ en el altar y para que este sacramento sea de bendición y no una lucha constante por sostener la felicidad.',

    costoInaccion: 'La mayoría de las parejas en crisis nos dicen lo mismo: "Ojalá hubiéramos hecho esto antes de casarnos." Tú todavía puedes.',

    visionFuturo: {
      noPrometemos: 'un matrimonio perfecto.',
      prometemos: 'que van a llegar al altar sabiendo lo que prometen — y eso cambia todo.',
    },

    pasosCamino: [
      { titulo: 'Conocer las heridas que traes antes de heredárselas a tu familia', descripcion: 'La diferencia es si es una historia que hemos sanado.' },
      { titulo: 'Aprender a comunicarte bien antes de que duela', descripcion: 'Es más fácil aprender en la calma que en medio de la tormenta — y es el mejor regalo que puedes darte antes de casarte.' },
      { titulo: 'Entender lo que prometes el día que digas sí', descripcion: 'El matrimonio no es un sentimiento — es una decisión que se renueva.' },
      { titulo: 'Construir desde el principio algo que dure de verdad', descripcion: 'Los cimientos importan más que cualquier otra cosa.' },
    ],
    destinoCamino: 'Un matrimonio que empezó diferente porque elegiste prepararte',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en los matrimonios',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Ver el matrimonio desde adentro — con sus heridas, sus patrones y su vocación — antes de prometerte es la mejor preparación que existe. A tu ritmo, en intimidad.',
    precio: '$220 USD · Pago único — puedes pagarlo en cuotas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Tu camino comienza aquí',
    etiqueta: 'perfil-novios',
    secuencia: 'C',
  },

  G: {
    nombre: 'Los que viven en unión libre',
    subtitulo: 'Quieren construir algo verdadero — y saben que el camino comienza aquí',
    colorHeader: '#E6F1FB',

    situacion: 'Estás aquí porque algo dentro de ti sabe que lo que tienen merece más. Más intención. Más profundidad. Tal vez más compromiso. Vivir juntos sin casarse no es el destino — es el lugar desde donde muchas parejas han comenzado su camino más importante. No hay juicio aquí. Hay una puerta abierta.',

    testimonio: '"Llegamos sin saber muy bien qué buscábamos. Salimos entendiendo que queríamos algo diferente — y que había algo mucho más hermoso esperándonos."',

    mensaje: 'No te pedimos que lo tengas todo claro antes de empezar. Te pedimos que des el primer paso con lo que tienes hoy. La claridad no llega antes del proceso — llega dentro de él.',

    costoInaccion: 'Esperar la claridad perfecta para dar el paso es lo que más tiempo cuesta. La claridad se construye en el camino, no antes de empezarlo.',

    visionFuturo: {
      noPrometemos: 'que todas las respuestas lleguen de inmediato.',
      prometemos: 'que al final del proceso tendrán información real y herramientas concretas para tomar la decisión más importante de su vida.',
    },

    pasosCamino: [
      { titulo: 'Ver el matrimonio desde adentro — no como obligación o tradición, sino como vocación', descripcion: 'Entender lo que implica te da información real para decidir.' },
      { titulo: 'Reconocer lo que ya están construyendo — y lo que falta', descripcion: 'Nombrar dónde están es el primer paso para saber a dónde van.' },
      { titulo: 'Tomar la decisión más importante con información real, de las personas correctas', descripcion: 'Una decisión tomada desde la libertad interior se vive diferente.' },
    ],
    destinoCamino: 'Una vocación vivida con convicción, no con duda',

    masterclassGratuita: {
      label: 'MASTERCLASS GRATUITA',
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en los matrimonios',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'Ver el matrimonio desde adentro — con sus heridas, su proyecto de vida y su dimensión espiritual — les da elementos reales para saber qué quieren construir juntos. Sin presión. A su ritmo. Incluye sesión grupal en vivo semanal con Ana y Alex.',
    precio: '$220 USD · Pago único — puedes pagarlo en cuotas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Tu camino comienza aquí',
    etiqueta: 'perfil-union-libre',
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
      titulo: 'Masterclass gratuita — Por qué falla la comunicación en los matrimonios',
      subtitulo: 'Descubre por qué la comunicación se rompe — y cómo restaurarla desde la fe.',
      caption: 'La masterclass estará disponible muy pronto',
    },
    primerPaso: 'Taller Grabado · Del infierno al cielo en el matrimonio',
    descripcionProducto: 'No como solución a un problema — sino como fortalecimiento del matrimonio para ser misión. Las herramientas que restauran un matrimonio en crisis son exactamente las que edifican uno que ya funciona. Empieza aquí — a tu ritmo.',
    precio: '$220 USD · Pago único — puedes pagarlo en cuotas',
    urlProductoKey: 'NEXT_PUBLIC_URL_TALLER',
    ctaTexto: 'Tu camino comienza aquí',
    etiqueta: 'perfil-santidad',
    secuencia: 'C',
  },
}
