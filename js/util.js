const clearAlerts = () => {
  const alerts = document.querySelectorAll('.alert');
  Array.from(alerts).forEach((alert) => alert.remove());
};

const createFormAlert = (alert) => {
  clearAlerts();

  // Build new alert
  let alertHtml = null;
  if (alert.status === 'success') {
    alertHtml = `
      <div class="alert alert-success">
        <strong>Success!</strong> ${alert.message}
      </div>
    `;
  } else if (alert.status === 'info') {
    alertHtml = `
      <div class="alert alert-info">
        <strong>Heads up!</strong> ${alert.message}
      </div>
    `;
  } else if (alert.status === 'warning') {
    alertHtml = `
      <div class="alert alert-warning">
        <strong>Hmmmm...</strong> ${alert.message}
      </div>
    `;
  } else {
    alertHtml = `
      <div class="alert alert-danger">
        <strong>Uh oh!</strong> ${alert.message}
      </div>
    `;
  }

  // Add elements to DOM
  const rsvpFormEntries = document.getElementById('rsvp-form-entries');
  rsvpFormEntries.insertAdjacentHTML('afterbegin', alertHtml);
};

const flipSubmitButtonState = () => {
  const btn = document.getElementById('rsvp-submit');
  if (btn.disabled) {
    btn.disabled = false;
    btn.innerHTML = `Submit`;
  } else {
    btn.disabled = true;
    btn.innerHTML = `Please wait...`;
  }
};

const disableSubmitButton = () => {
  document.getElementById('rsvp-submit').disabled = true;
};

module.exports = { createFormAlert, flipSubmitButtonState, disableSubmitButton };
