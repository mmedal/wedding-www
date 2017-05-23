import serialize from 'form-serialize';

import { initRsvp, finalizeRsvp } from './rsvp';


// Intercept form submission and handle in JS
const processRsvpForm = (e) => {
  if (e.preventDefault) e.preventDefault();

  const rsvpDetails = serialize(document.getElementById('rsvp-form'), { hash: true });
  rsvpDetails.attending = true ? rsvpDetails.attending === 'Yes' : false;

  // Check the RSVP stage based on whether attendees have been submitted
  if (rsvpDetails.hasOwnProperty('attendingGuests')) {
    finalizeRsvp(rsvpDetails);
  } else {
    initRsvp(rsvpDetails);
  }

  return false;
};

// Setup RSVP form event handler
const rsvpForm = document.getElementById('rsvp-form');
// M$ madness
if (rsvpForm.attachEvent) {
  rsvpForm.attachEvent("submit", processRsvpForm);
} else {
  rsvpForm.addEventListener("submit", processRsvpForm);
}

// Reinit button after handlers are enabled
document.getElementById('rsvp-submit').disabled = false;
