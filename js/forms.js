/* ==========================================================================
   AFRICAN STORY VILLAGE — FORMS
   --------------------------------------------------------------------------
   Frontend validation + a clearly-labelled demo submission flow for every
   form on the site (newsletter, contact, school partnership, author
   visits, creator submissions, general partnership enquiries).

   THIS SITE HAS NO BACKEND YET. Forms validate in the browser and then
   show a "demo validated" message — nothing is sent or stored anywhere.

   // TODO: Connect these forms to Formspree, Netlify Forms, EmailJS, or a
   // custom API endpoint. The single integration point is `submitForm()`
   // below — replace its body with a real fetch() call to your chosen
   // service once one is set up, and keep the validation logic above it.
   ========================================================================== */

function validateField(field) {
  const input = field.querySelector('input, select, textarea');
  if (!input) return true;
  let valid = input.checkValidity();

  if (input.type === 'checkbox' && input.required) {
    valid = input.checked;
  }

  field.classList.toggle('has-error', !valid);
  return valid;
}

function validateForm(form) {
  let allValid = true;
  form.querySelectorAll('.field').forEach((field) => {
    if (!validateField(field)) allValid = false;
  });
  return allValid;
}

/**
 * Single integration point for a real backend. Currently a demo stub.
 */
async function submitForm(form) {
  // // TODO: replace this block with something like:
  // const res = await fetch('https://formspree.io/f/YOUR_ID', {
  //   method: 'POST',
  //   headers: { Accept: 'application/json' },
  //   body: new FormData(form)
  // });
  // return res.ok;

  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
}

function showStatus(form, message, type) {
  const status = form.querySelector('[data-form-status]');
  if (!status) return;
  status.textContent = message;
  status.className = `form-status show ${type}`;
}

function wireForm(form) {
  if (form.dataset.wired === 'true') return;
  form.dataset.wired = 'true';

  form.querySelectorAll('input, select, textarea').forEach((input) => {
    input.addEventListener('blur', () => {
      const field = input.closest('.field');
      if (field) validateField(field);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valid = validateForm(form);
    if (!valid) {
      showStatus(form, 'Please fix the highlighted fields and try again.', 'error');
      const firstError = form.querySelector('.field.has-error input, .field.has-error select, .field.has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const ok = await submitForm(form);
      if (ok) {
        showStatus(form, "Demo form validated successfully. Connect a form backend before production \u2014 see js/forms.js.", 'success');
        form.reset();
        if (window.ASVToast) window.ASVToast("Thanks \u2014 that's saved for now as a demo submission.");
      } else {
        showStatus(form, 'Something went wrong submitting the form. Please try again.', 'error');
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

function initAllForms() {
  document.querySelectorAll('form').forEach(wireForm);
}

/* Pre-fill contact.html enquiry type from a query string, e.g. ?type=school */
function prefillContactType() {
  const select = document.getElementById('contact-type');
  if (!select) return;
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  if (type && Array.from(select.options).some((o) => o.value === type)) {
    select.value = type;
  }
}

document.addEventListener('asv:includesReady', () => {
  initAllForms();
  prefillContactType();
});
