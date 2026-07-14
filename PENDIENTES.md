# Pendientes RTH — Yudit

> Actualizado: 14 de julio de 2026

---

## 0. Handoff — Automatización de acceso a Skool tras compra del taller (14 jul 2026)

**Qué se hizo:**
- Se arregló el landing de WordPress "Taller del Infierno al cielo en el matrimonio": los botones "Quiero empezar mi camino →" no llevaban a ningún lado (ancla `#rth-tg-precios` inexistente). Se agregó el `id` correspondiente en `rth_precios_taller` (`wp-content/themes/rth-child/functions.php`).
- Se creó `app/gracias-taller/page.tsx` — página de agradecimiento con instrucciones, a la que ahora redirige `/comprar` cuando Wompi aprueba el pago (antes solo mostraba un estado inline).
- Se automatizó el acceso al curso privado del taller en Skool: `app/api/wompi-webhook/route.ts` ahora dispara, además de MailerLite/Sheets/email, una llamada a un webhook de Zapier (`lib/zapier-skool.ts`, variable `ZAPIER_SKOOL_INVITE_WEBHOOK_URL`) que ejecuta la acción de Skool "Invite with custom course access" — manda la invitación oficial con el curso ya desbloqueado, sin aprobación manual.
- Si esa llamada falla, queda registrado como evento `skool-invite-fallido` en la hoja "Eventos Checkout RTH", y aparece como badge rojo "⚠ Skool falló — dar acceso a mano" en la tarjeta del lead en `/admin/pipeline` — para no depender de revisar logs de Vercel.
- Se actualizó el copy del correo automático (`enviarEmailAcceso`) y de `/gracias-taller`: ya no dicen "aprobamos tu solicitud" (ese paso manual desapareció).
- Se descartó usar n8n como orquestador — Skool no tiene API pública, solo Zapier tiene integración privada con ellos, así que n8n hubiera sido un intermediario sin valor. Todo el código existente (verificación de firma Wompi, MailerLite, Sheets/CRM, email) se dejó intacto — solo se le agregó el paso nuevo hacia Skool.

**Pendiente de tu lado (bloqueante para que esto funcione en producción):**
- [ ] Confirmar/activar el plan **Skool Pro** ($99/mes, o ~$82/mes anual) — la acción de Zapier que desbloquea el curso solo existe en Pro.
- [ ] En Zapier: crear un Zap con trigger "Webhooks by Zapier → Catch Hook", acción Skool → "Invite with custom course access", conectado con el API key + URL del grupo (`skool.com/regalame-tu-historia-5976`), seleccionando el curso "Taller del Infierno al cielo en el matrimonio", mapeando el email del payload entrante.
- [ ] Copiar esa URL de Catch Hook a `ZAPIER_SKOOL_INVITE_WEBHOOK_URL` en `.env.local` y en Vercel, luego redeploy.
- [ ] **Bloqueado, 100% del lado de Yudit**: falta crear la cuenta en comercios.wompi.co y que el cliente (Ana y Alex / RTH) la apruebe. Sin eso no hay llaves que sacar. Después de aprobada: sacar `NEXT_PUBLIC_WOMPI_PUBLIC_KEY`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_EVENTS_SECRET`, `WOMPI_AMOUNT_IN_CENTS` (Configuración → Llaves API) y registrar el webhook `https://quiz-reg-lame-tu-historia.vercel.app/api/wompi-webhook` ahí.
- [x] `URL_SKOOL_TALLER` ya está en Vercel.
- [ ] En Skool: configurar los planes/pricing para la futura membresía "Un camino para sanar" (independiente de esto — el taller usa "Private" + Zapier, no un tier de Pricing).

Sin las variables de Wompi + Skool + Zapier, el checkout completo no funciona todavía en producción — el código ya está listo y verificado (`tsc --noEmit` limpio, webhook probado localmente simulando un pago aprobado), solo falta la configuración externa.

---

## 1. Google Sheet (para que funcione el panel /admin) — ✅ hecho (14 jul 2026)

- [x] Columnas M-P (Telefono, Estado, UltimaGestion, Notas) ya están en "Leads Quiz RTH".
- [x] Hoja "Eventos Checkout RTH" ya existe como pestaña separada.

## 2. Vercel — variables de entorno (revisado 14 jul 2026, confirmado directo en el dashboard)

Ya están: `GOOGLE_PRIVATE_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SHEETS_ID`, `ADMIN_SESSION_SECRET`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_URL_MEMBRESIA`, `NEXT_PUBLIC_URL_TALLER`, `MAILERLITE_API_KEY`, `ALERT_EMAIL_RECIPIENT`, `MAILERLITE_GROUP_ID_A/B/C`, `RESEND_API_KEY`. (`GMAIL_APP_PASSWORD`/`GMAIL_USER` también están pero ya no se usan — se puede limpiar cuando haya tiempo.)

Ya en Vercel (agregadas 14 jul 2026): `SKOOL_WEBHOOK_SECRET`, `MAILERLITE_GROUP_ID_COMPRADORES`, `URL_SKOOL_TALLER`, `NEXT_PUBLIC_APP_URL`.

- [x] `MAILERLITE_GROUP_ID_CHECKOUT_INICIADO` / `MAILERLITE_GROUP_ID_PAGO_FALLIDO` ya están en Vercel.

Falta agregar (bloqueante para checkout + Skool):
- [ ] `ZAPIER_SKOOL_INVITE_WEBHOOK_URL` (cuando exista el Zap)
- [ ] `NEXT_PUBLIC_WOMPI_PUBLIC_KEY`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_EVENTS_SECRET`, `WOMPI_AMOUNT_IN_CENTS`, `WOMPI_CURRENCY` — bloqueado en la cuenta de Wompi (ver sección 0).

## 3. Deploy y prueba del panel /admin

- [x] Deploy hecho (14 jul 2026) — código en producción.
- [x] Login y carga de leads verificado en vivo (14 jul 2026) — se probó un envío real del quiz (`/api/submit`) y apareció al instante en el panel.
- [ ] Probar: mover un lead de estado, registrar una gestión con nota, abrir WhatsApp desde una tarjeta
- [ ] Confirmar que los cambios aparecen en el Sheet (columnas N, O, P)

## 4. MailerLite — Secuencia A (casi lista)

- [ ] Crear la landing de la masterclass gratuita ("Por qué falla la comunicación en los matrimonios") con el video + CTA de compra del taller
- [ ] Reemplazar `URL_LANDING_MASTERCLASS` en el email A-1 con la URL real de esa landing
- [ ] Crear el campo personalizado `comprador_taller` en MailerLite (Subscribers → Fields) si no existe — lo usa el contenido dinámico del A-4
- [ ] Verificar que las condiciones "¿Está en Compradores Taller?" están antes de A-2, A-3, A-5 y A-6 (Sí → Fin, No → Continuar)
- [ ] Activar la automatización de la Secuencia A

## 5. MailerLite — Secuencias B y C (por construir con Claude)

- [ ] Secuencia B (perfiles D, E, G — exploración): 5 emails. Testimonio disponible: Pablo y Viviana (nulidad → volvieron a casarse)
- [ ] Secuencia C (perfiles F, H — crecimiento): 5 emails. Testimonio disponible: Michael y Leidy
- [ ] Activar ambas automatizaciones al terminar

## 6. Compradores del taller (proceso manual por ahora)

Cada vez que alguien compre en Skool:

- [ ] MailerLite → Subscribers → buscar el email
- [ ] Añadirlo al grupo **"Compradores Taller"**
- [ ] Poner el campo `comprador_taller` = `si`

*(Cuando haya tiempo: configurar Make para automatizar esto — Skool "Watch New Members" → MailerLite "Add to Group".)*

## 7. Google Sheet — transferir propiedad a la cuenta de Workspace de RTH

El Sheet "Leads Quiz RTH" (con la pestaña "Eventos Checkout RTH") está creado con la cuenta personal de Yudit — decidido a propósito (14 jul 2026) dejarlo así por ahora para validar que todo funcione, y transferir la propiedad a la cuenta de Google Workspace de RTH más adelante.

- [ ] Transferir propiedad del Sheet a la cuenta de Workspace de RTH (Compartir → agregar el correo → "Transferir propiedad"). Esto mantiene el mismo `GOOGLE_SHEETS_ID` — no requiere tocar el código ni las variables de entorno.
- Nota: si el Workspace tiene restringida la aceptación de transferencias externas, puede necesitar que un admin del Workspace lo habilite primero. Alternativa sin transferir propiedad: compartir con permiso de Editor (funciona igual para la app, pero la propiedad legal del archivo se queda con la cuenta personal).

---

## Referencia rápida

| Qué | Dónde |
|---|---|
| Panel CRM | `/admin` → `/admin/pipeline` |
| Grupo Compradores Taller (ID) | `191357617025582681` |
| Documentación del panel | README.md → sección "Panel /admin" |
| Estados del pipeline | lead → checkout-iniciado → pago-fallido / abandonado → pagado → alumno → miembro |
