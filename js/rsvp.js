import request from 'request';

import { createFormAlert, flipSubmitButtonState, disableSubmitButton } from './util';

const requestOptions = {
  uri: 'https://medalreyes-wedding-server.herokuapp.com/rsvp',
  method: 'POST',
  json: {}
};

const formIsComplete = (rsvpForm) => {
  return rsvpForm.hasOwnProperty('name') && rsvpForm.hasOwnProperty('attending');
};

const addAttendeeFormElements = (invitedGuests) => {
  // Build form elements for invited guests
  const attendeeLabelHtml = `
    <label id="invitedGuests" class="supplementary-label-1">Select guests to RSVP for:</label>
  `;
  const attendeeCheckboxesHtml = invitedGuests.map((guestName) => {
    return `
      <p class="checkbox-p">
        <input type="checkbox" name="attendingGuests[]" value="${guestName}" class="checkbox">
        ${guestName}
      </p>
    `;
  }).join('');

  // Add elements to DOM
  const rsvpFormEntries = document.getElementById('rsvp-form-entries');
  rsvpFormEntries.insertAdjacentHTML('beforeend', attendeeLabelHtml + attendeeCheckboxesHtml);
};

const initRsvp = (rsvpForm) => {
  console.log(rsvpForm);
  if (!formIsComplete(rsvpForm)) {
    createFormAlert({
      status: 'danger',
      message: 'Please complete the entire form before submitting.'
    });
    return;
  }

  // If RSVP has been initialized, throw error if attendees have not been provided
  if (document.getElementById('invitedGuests')) {
    createFormAlert({
      status: 'danger',
      message: 'Please select which guests you are RSVPing for.'
    });
    return;
  }

  // Send RSVP initialization request
  requestOptions.json = rsvpForm;
  request(requestOptions, (err, res, body) => {
    flipSubmitButtonState();
    if (err) createFormAlert({ status: 'danger', message: err});
    // The process inited if we received an 'info' status back
    if (body.status === 'info') {
      console.log(body);
      addAttendeeFormElements(body.info.invitedGuests);
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }
    // Show message regardless (includes a non-attending RSVP)
    createFormAlert(body);
    // Remove button if submission was successful
    if (body.status === 'success') {
      disableSubmitButton();
    }
  });
};

const finalizeRsvp = (rsvpForm) => {
  console.log(rsvpForm);
  if (!formIsComplete(rsvpForm)) {
    createFormAlert({
      status: 'danger',
      message: 'Please complete the entire form before submitting.'
    });
    return;
  }

  requestOptions.json = rsvpForm;
  request(requestOptions, (err, res, body) => {
    flipSubmitButtonState();
    if (err) createFormAlert({ status: 'danger', message: err});
    createFormAlert(body);
    // Remove button if submission was successful
    if (body.status === 'success') {
      disableSubmitButton();
    }
  });
};

module.exports = { initRsvp, finalizeRsvp };
