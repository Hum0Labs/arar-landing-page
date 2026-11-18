/**
 * Alquiler y arrendamiento — interacciones de la página.
 *
 *  1. Aparición al hacer scroll y paralaje del hero
 *  2. Selección de equipos (se conserva hasta el formulario y entre visitas)
 *  3. Demostración de la plataforma
 *  4. Ciclo de vida
 *  5. Formulario de cotización
 *
 * Sin dependencias: solo APIs del navegador.
 */

const root = document.querySelector('.rl');
const dataEl = document.getElementById('rl-data');

if (root && dataEl) {
  const data = JSON.parse(dataEl.textContent);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* Analítica: eventos sin datos personales, listos para GTM/GA4 (dataLayer). */
  const track = (event, props = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: `alquiler_${event}`, ...props });
  };

  $$('[data-track]').forEach((el) => {
    el.addEventListener('click', () => track(el.dataset.track, { origen: el.dataset.trackOrigin || '' }));
  });

  /* ------------------------------------------------------------------ */
  /* 1. Aparición y paralaje                                             */
  /* ------------------------------------------------------------------ */
  const reveals = $$('.rl-reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    reveals.forEach((el) => io.observe(el));
  }

  const layers = $$('.rl-stage [data-depth]');
  const desktop = window.matchMedia('(min-width: 901px)');
  if (layers.length && !reduceMotion) {
    let ticking = false;
    const apply = () => {
      ticking = false;
      const y = desktop.matches ? Math.min(window.scrollY, 900) : 0;
      layers.forEach((el) => {
        el.style.transform = y ? `translate3d(0, ${(-y * Number(el.dataset.depth)).toFixed(1)}px, 0)` : '';
      });
    };
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(apply);
      },
      { passive: true }
    );
    desktop.addEventListener('change', apply);
  }

  /* ------------------------------------------------------------------ */
  /* 2. Selección de equipos                                             */
  /* ------------------------------------------------------------------ */
  const STORE_KEY = 'arar:alquiler:seleccion';
  const catalog = Object.fromEntries(data.equipment.map((e) => [e.id, e]));
  const planNames = { alquiler: 'Alquiler', arrendamiento: 'Arrendamiento' };
  const state = { items: {}, modality: '' };

  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      Object.entries(saved.items || {}).forEach(([id, item]) => {
        const qty = Math.floor(Number(item && item.qty));
        if (catalog[id] && qty > 0) {
          const profile = catalog[id].profiles.includes(item.profile) ? item.profile : catalog[id].profiles[0];
          state.items[id] = { qty: Math.min(qty, 999), profile };
        }
      });
      if (planNames[saved.modality]) state.modality = saved.modality;
    }
  } catch {
    /* almacenamiento no disponible: la selección vive solo en esta visita */
  }

  const persist = () => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch {
      /* sin almacenamiento */
    }
  };

  const cards = $$('[data-eq]');
  const bar = $('[data-bar]');
  const barCount = $('[data-bar-count]');
  const barLabel = $('[data-bar-label]');
  const summaryList = $('[data-summary-list]');
  const summaryEmpty = $('[data-summary-empty]');
  const summaryPlan = $('[data-summary-plan]');
  const summaryClear = $('[data-summary-clear]');
  const form = $('#rl-quote-form');
  let quoteInView = false;

  const totalUnits = () => Object.values(state.items).reduce((n, item) => n + item.qty, 0);

  function render() {
    cards.forEach((card) => {
      const id = card.dataset.eq;
      const item = state.items[id];
      card.classList.toggle('is-selected', Boolean(item));
      $('.rl-stepper__input', card).value = item ? item.qty : 0;
      if (item) {
        const radio = $$('input[type="radio"]', card).find((r) => r.value === item.profile);
        if (radio) radio.checked = true;
      }
    });

    const total = totalUnits();
    barCount.textContent = total;
    barLabel.textContent = total === 1 ? 'equipo en su solicitud' : 'equipos en su solicitud';
    bar.hidden = total === 0 || quoteInView;

    summaryList.replaceChildren(
      ...Object.entries(state.items).map(([id, item]) => {
        const li = document.createElement('li');
        const qty = document.createElement('span');
        qty.className = 'rl-summary__qty';
        qty.textContent = item.qty;
        const name = document.createElement('span');
        name.className = 'rl-summary__name';
        name.textContent = catalog[id].name;
        const profile = document.createElement('small');
        profile.textContent = item.profile;
        name.append(profile);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'rl-summary__remove';
        remove.setAttribute('aria-label', `Quitar ${catalog[id].name} de la solicitud`);
        remove.textContent = '×';
        remove.addEventListener('click', () => setQty(id, 0, 'resumen'));
        li.append(qty, name, remove);
        return li;
      })
    );
    summaryEmpty.hidden = total > 0;
    summaryClear.hidden = total === 0;
    summaryPlan.hidden = !state.modality;
    summaryPlan.textContent = state.modality ? `Modalidad: ${planNames[state.modality]}` : '';

    $$('[data-plan]').forEach((plan) => {
      const on = plan.dataset.plan === state.modality;
      plan.classList.toggle('is-selected', on);
      $('[data-plan-select]', plan).setAttribute('aria-pressed', String(on));
    });

    if (form) {
      const radio = $$('input[name="modalidad"]', form).find((r) => r.value === state.modality);
      if (radio) radio.checked = true;
    }
  }

  function selectedProfile(card) {
    const checked = $('input[type="radio"]:checked', card);
    return checked ? checked.value : catalog[card.dataset.eq].profiles[0];
  }

  function setQty(id, qty, origen) {
    const card = cards.find((c) => c.dataset.eq === id);
    const next = Math.max(0, Math.min(999, Math.floor(Number(qty)) || 0));
    const before = state.items[id] ? state.items[id].qty : 0;
    if (next === 0) delete state.items[id];
    else state.items[id] = { qty: next, profile: state.items[id]?.profile || selectedProfile(card) };
    if (next !== before) track('equipo_cantidad', { equipo: id, cantidad: next, origen });
    persist();
    render();
  }

  cards.forEach((card) => {
    const id = card.dataset.eq;
    const input = $('.rl-stepper__input', card);
    $$('.rl-stepper__btn', card).forEach((btn) => {
      btn.addEventListener('click', () => setQty(id, (Number(input.value) || 0) + Number(btn.dataset.step), 'tarjeta'));
    });
    input.addEventListener('change', () => setQty(id, input.value, 'tarjeta'));
    input.addEventListener('focus', () => input.select());
    $$('input[type="radio"]', card).forEach((radio) => {
      radio.addEventListener('change', () => {
        if (!state.items[id]) return;
        state.items[id].profile = radio.value;
        persist();
        render();
      });
    });
  });

  const goToQuote = () => {
    $('#cotizacion').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  $$('[data-plan-select]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.modality = btn.dataset.planSelect;
      track('modalidad', { modalidad: state.modality, origen: 'modalidades' });
      persist();
      render();
      goToQuote();
    });
  });

  summaryClear.addEventListener('click', () => {
    state.items = {};
    persist();
    render();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        quoteInView = entry.isIntersecting;
        bar.hidden = totalUnits() === 0 || quoteInView;
      },
      { threshold: 0.12 }
    ).observe($('#cotizacion'));
  }

  /* ------------------------------------------------------------------ */
  /* 3. Demostración de la plataforma                                    */
  /* ------------------------------------------------------------------ */
  const demo = $('.rl-demo');
  if (demo) {
    const STEP_MS = 5200;
    const stepBtns = $$('.rl-step', demo);
    const stepsRow = $('.rl-steps', demo);
    const tabs = $$('[data-scenario]', demo);
    const panels = $$('[data-scenario-panel]', demo);
    const toggle = $('[data-demo-toggle]', demo);
    const count = $('[data-demo-count]', demo);
    const last = stepBtns.length - 1;
    let scenario = 0;
    let step = 0;
    let timer = 0;
    let playing = false;
    let autoStarted = false;
    let visible = false;

    demo.style.setProperty('--rl-step-ms', `${STEP_MS}ms`);

    const showStep = (index) => {
      step = index;
      stepBtns.forEach((btn, i) => {
        if (i === step) btn.setAttribute('aria-current', 'step');
        else btn.removeAttribute('aria-current');
        btn.classList.toggle('is-done', i < step);
      });
      panels.forEach((panel, i) => {
        panel.hidden = i !== scenario;
        $$('.rl-stagep', panel).forEach((stage) => {
          stage.classList.remove('is-active');
          if (i === scenario && Number(stage.dataset.stage) === step) {
            void stage.offsetWidth; // reinicia las animaciones de entrada
            stage.classList.add('is-active');
          }
        });
      });
      count.textContent = step + 1;
      const active = stepBtns[step].parentElement;
      if (stepsRow.scrollWidth > stepsRow.clientWidth) {
        stepsRow.scrollTo({
          left: active.offsetLeft - (stepsRow.clientWidth - active.offsetWidth) / 2,
          behavior: reduceMotion ? 'auto' : 'smooth',
        });
      }
    };

    const setPlaying = (on) => {
      window.clearTimeout(timer);
      playing = on;
      demo.classList.remove('is-playing');
      toggle.setAttribute('aria-label', on ? 'Pausar la demostración' : 'Reproducir la demostración');
      if (!on) return;
      void demo.offsetWidth; // reinicia la barra de progreso
      demo.classList.add('is-playing');
      timer = window.setTimeout(() => {
        if (step >= last) {
          setPlaying(false);
          track('demo_completa', { caso: data.scenarios[scenario].id });
          return;
        }
        showStep(step + 1);
        setPlaying(true);
      }, STEP_MS);
    };

    stepBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        setPlaying(false);
        showStep(i);
        track('demo_paso', { paso: i + 1, caso: data.scenarios[scenario].id });
      });
    });

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        scenario = i;
        tabs.forEach((t, ti) => t.setAttribute('aria-pressed', String(ti === i)));
        showStep(0);
        setPlaying(!reduceMotion);
        track('demo_caso', { caso: data.scenarios[i].id });
      });
    });

    toggle.addEventListener('click', () => {
      if (playing) return setPlaying(false);
      if (step >= last) showStep(0);
      setPlaying(true);
    });

    $('[data-demo-use]', demo).addEventListener('click', () => {
      const sc = data.scenarios[scenario];
      state.items = JSON.parse(JSON.stringify(sc.selection));
      state.modality = sc.modality;
      track('demo_usar_caso', { caso: sc.id });
      setPlaying(false);
      persist();
      render();
      goToQuote();
    });

    showStep(0);

    if ('IntersectionObserver' in window && !reduceMotion) {
      new IntersectionObserver(
        ([entry]) => {
          const was = visible;
          visible = entry.isIntersecting;
          if (visible && !autoStarted) {
            autoStarted = true;
            showStep(0);
            setPlaying(true);
          } else if (!visible && was && playing) {
            setPlaying(false);
            autoStarted = false; // retoma al volver a la vista
          }
        },
        { threshold: 0.3 }
      ).observe($('.rl-window', demo));
    }
  }

  /* ------------------------------------------------------------------ */
  /* 4. Ciclo de vida                                                    */
  /* ------------------------------------------------------------------ */
  const orbit = $('[data-orbit]');
  if (orbit) {
    const stages = data.lifecycle;
    const chips = $$('[data-life]', orbit);
    const center = $('.rl-orbit__center', orbit);
    const asset = $('.rl-asset');
    const path = $('.rl-orbit__progress', orbit);
    const dot = $('.rl-orbit__dot', orbit);
    const halo = $('.rl-orbit__halo', orbit);
    const length = path.getTotalLength();
    const HOLD_MS = 4600;
    let index = 0;
    let frac = 0;
    let raf = 0;
    let timer = 0;
    let auto = !reduceMotion;
    let inView = false;

    const place = (f) => {
      frac = f;
      const p = path.getPointAtLength((f % 1) * length);
      [dot, halo].forEach((c) => {
        c.setAttribute('cx', p.x.toFixed(1));
        c.setAttribute('cy', p.y.toFixed(1));
      });
      path.style.strokeDashoffset = String(1 - Math.min(f, 1));
    };

    const travel = (target) => {
      cancelAnimationFrame(raf);
      const from = frac >= 1 ? 0 : frac;
      let to = target / stages.length;
      if (to <= from && !(target === 0 && from === 0)) to += 1; // siempre en el sentido del reloj
      if (to - from > 1) to -= 1;
      if (reduceMotion) return place(to >= 1 ? 0 : to);
      const start = performance.now();
      const duration = 900 + (to - from) * 900;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        place(from + (to - from) * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
        else if (to >= 1) place(to - 1);
      };
      raf = requestAnimationFrame(tick);
    };

    const swap = (el) => {
      el.classList.remove('is-swapping');
      void el.offsetWidth;
      el.classList.add('is-swapping');
    };

    const show = (next) => {
      index = next;
      const stage = stages[index];
      chips.forEach((chip, i) => chip.setAttribute('aria-pressed', String(i === index)));
      $('[data-life-kicker]', center).textContent = `Etapa ${index + 1} de ${stages.length}`;
      $('[data-life-title]', center).textContent = stage.title;
      $('[data-life-text]', center).textContent = stage.text;
      const status = $('[data-life-status]', asset);
      status.textContent = stage.status;
      status.dataset.tone = stage.tone;
      status.className = 'rl-badge';
      stage.fields.forEach(([, value], i) => {
        $(`[data-life-field="${i}"]`, asset).textContent = value;
      });
      $('[data-life-log]', asset).textContent = stage.log;
      swap(center);
      swap(asset);
      travel(index);
    };

    const schedule = () => {
      window.clearTimeout(timer);
      if (!auto || !inView) return;
      timer = window.setTimeout(() => {
        show((index + 1) % stages.length);
        schedule();
      }, HOLD_MS);
    };

    chips.forEach((chip, i) => {
      chip.addEventListener('click', () => {
        auto = false;
        window.clearTimeout(timer);
        if (i !== index) show(i);
        track('ciclo_etapa', { etapa: stages[i].id });
      });
    });

    place(0);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          schedule();
        },
        { threshold: 0.35 }
      ).observe(orbit);
    }
  }

  /* ------------------------------------------------------------------ */
  /* 5. Formulario de cotización                                         */
  /* ------------------------------------------------------------------ */
  if (form) {
    const sent = $('[data-sent]');
    const required = $$('[required]', form);
    let started = false;

    form.addEventListener('focusin', () => {
      if (started) return;
      started = true;
      track('cotizacion_inicio', { equipos: totalUnits() });
    });

    $$('input[name="modalidad"]', form).forEach((radio) => {
      radio.addEventListener('change', () => {
        state.modality = radio.value;
        persist();
        render();
      });
    });

    const setError = (field, invalid) => {
      field.setAttribute('aria-invalid', String(invalid));
      const msg = $('.rl-field__error', field.closest('.rl-field'));
      if (!msg) return;
      msg.hidden = !invalid;
      if (!msg.id) msg.id = `${field.id}-error`;
      if (invalid) field.setAttribute('aria-describedby', msg.id);
      else field.removeAttribute('aria-describedby');
    };

    required.forEach((field) => {
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true' && field.checkValidity()) setError(field, false);
      });
    });

    const buildSummary = (values) => {
      const lines = Object.entries(state.items).map(
        ([id, item]) => `- ${item.qty} × ${catalog[id].name} (${item.profile})`
      );
      return [
        'Solicitud de cotización · Alquiler y arrendamiento de equipos IT',
        '',
        `Nombre: ${values.nombre}`,
        `Empresa: ${values.empresa}`,
        `Correo: ${values.correo}`,
        values.telefono && `Teléfono: ${values.telefono}`,
        `Modalidad: ${planNames[state.modality] || 'Por definir'}`,
        values.plazo && `Plazo estimado: ${values.plazo}`,
        '',
        'Equipos:',
        ...(lines.length ? lines : ['- Por definir (ver mensaje)']),
        values.mensaje && '',
        values.mensaje && `Mensaje: ${values.mensaje}`,
      ]
        .filter((line) => line !== undefined && line !== false && line !== null)
        .filter((line, i, all) => !(line === '' && all[i - 1] === ''))
        .join('\n');
    };

    const showSent = ({ title, text, withActions }) => {
      $('[data-sent-title]', sent).textContent = title;
      $('[data-sent-text]', sent).textContent = text;
      $('[data-sent-actions]', sent).hidden = !withActions;
      form.hidden = true;
      sent.hidden = false;
      sent.focus({ preventScroll: true });
    };

    $('[data-sent-back]', sent).addEventListener('click', () => {
      sent.hidden = true;
      form.hidden = false;
      $('#q-nombre', form).focus();
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const invalid = required.filter((field) => {
        const bad = !field.value.trim() || !field.checkValidity();
        setError(field, bad);
        return bad;
      });
      if (invalid.length) {
        invalid[0].focus();
        track('cotizacion_error', { campos: invalid.map((f) => f.name).join(',') });
        return;
      }

      const values = Object.fromEntries(
        Array.from(new FormData(form).entries()).map(([key, value]) => [key, String(value).trim()])
      );
      const summary = buildSummary(values);
      const subject = `Cotización de equipos IT · ${values.empresa}`;
      const mailto = `mailto:${data.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
      const whatsapp = `https://wa.me/${data.contact.whatsapp}?text=${encodeURIComponent(summary)}`;
      $('[data-sent-mail]', sent).href = mailto;
      $('[data-sent-wa]', sent).href = whatsapp;

      track('cotizacion_envio', {
        equipos: totalUnits(),
        lineas: Object.keys(state.items).length,
        modalidad: state.modality || 'por_definir',
        canal: data.contact.quoteEndpoint ? 'formulario' : 'correo',
      });

      if (data.contact.quoteEndpoint) {
        const button = $('button[type="submit"]', form);
        button.disabled = true;
        try {
          const response = await fetch(data.contact.quoteEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ ...values, modalidad: state.modality, equipos: state.items, resumen: summary }),
          });
          if (!response.ok) throw new Error(String(response.status));
          showSent({
            title: 'Recibimos su solicitud',
            text: 'Un asesor de ARAR le responderá con la propuesta al correo que nos indicó.',
            withActions: false,
          });
          return;
        } catch {
          /* si el servicio falla, se ofrece el envío por correo o WhatsApp */
        } finally {
          button.disabled = false;
        }
      }

      showSent({
        title: 'Su solicitud está lista para enviar',
        text: 'Abrimos un correo con el resumen de su solicitud. Envíelo para que un asesor le responda con la propuesta.',
        withActions: true,
      });
      window.location.href = mailto;
    });
  }

  render();
}
