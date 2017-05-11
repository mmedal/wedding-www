import { createFormAlert } from './util';

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
  addAttendeeFormElements([rsvpForm.name, 'John Cena']);
  createFormAlert({'status': 'info', 'message': 'Now, simply select the guests you would like to RSVP for.'});
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

  createFormAlert({
    status: 'success',
    message: 'You have officially RSVPed. See you on July 8th!'
  });
};

module.exports = { initRsvp, finalizeRsvp };
