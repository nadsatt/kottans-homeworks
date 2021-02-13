const FORM = document.querySelector('.movie-form');
const SUBMIT_BUTTON = document.querySelector('.submit-button');
const TICKET_SECTION = document.querySelector('.ticket-section');
const TICKET_FIELDS = document.querySelectorAll('.ticket__field');

SUBMIT_BUTTON.addEventListener('click', submitForm);
TICKET_SECTION.addEventListener('click', hideTicketSection);

function submitForm(e) {
  // prevent page reloading
  e.preventDefault();

  const INPUTS = FORM.querySelectorAll('input:not([name="direction"])');
  const CHECKED_INPUTS = Array.prototype.filter.call(
    INPUTS,
    input => input.checked
  );

  const VALUES = CHECKED_INPUTS.reduce(
    (values, input) => {
      if (input.name === 'seat') {
        values.seats += `${input.value} `;
      } else {
        values[input.name] = input.value;

        if (input.name === 'time') {
          values.hall = input.dataset.hall;
        }
      }
      return values;
    },
    { seats: '' }
  );

  fillTicketFields(TICKET_FIELDS, VALUES);
  showTicketSection();
}

function fillTicketFields(fields, values) {
  fields.forEach(field => field.textContent = values[field.id]|| '-');
}

function showTicketSection() {
  TICKET_SECTION.classList.add('ticket-section--visible');
}

function hideTicketSection() {
  TICKET_SECTION.classList.remove('ticket-section--visible');
}
