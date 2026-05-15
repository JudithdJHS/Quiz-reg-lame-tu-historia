import { PreguntaQuiz } from '@/types/quiz'

export const PREGUNTAS: PreguntaQuiz[] = [
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
    id: 'q8', tipo: 'temperatura', foto: 'alex',
    texto: '¿Qué frase describe mejor cómo llegaste hasta aquí?',
    opciones: [
      { id: 'A', texto: 'Llevo meses siguiendo a Ana y Alex — sus videos describen exactamente lo que vivo.', temperatura: 'caliente' },
      { id: 'B', texto: 'Alguien me compartió esto y quise intentarlo.', temperatura: 'frio' },
      { id: 'C', texto: 'Vi un reel o video y algo me detuvo — sentí que era para mí.', temperatura: 'frio' },
      { id: 'D', texto: 'Ya hice el taller antes y quiero seguir el proceso.', temperatura: 'caliente', esExAlumno: true },
    ]
  },
  {
    id: 'q9', tipo: 'filtro-compromiso', foto: 'ana',
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
    id: 'q10', tipo: 'filtro-compromiso-directo', foto: 'alex',
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
