import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputData: document.querySelector('#datetime-picker'),
  btnSetTime: document.querySelector('[data-start]'),
  timer: [
    document.querySelector('[data-days]'),
    document.querySelector('[data-hours]'),
    document.querySelector('[data-minutes]'),
    document.querySelector('[data-seconds]'),
  ],
};

refs.btnSetTime.addEventListener('click', onClickStartTimer);

refs.btnSetTime.disabled = true;

let selectedValidDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) < Date.now()) {
      Report.failure(
        'Notiflix Failure',
        'Please choose a date in the future',
        'Okay'
      );
    } else {
      Notify.success('Date set)');
      refs.btnSetTime.disabled = false;
      selectedValidDate = Date.parse(selectedDates[0]);
    }
  },
};

flatpickr('input#datetime-picker', options);

function onClickStartTimer() {
  const actualTimerValue = selectedValidDate - Date.now();
  refs.btnSetTime.disabled = true;
  refs.inputData.disabled = true;

  let idInterval = setInterval(() => {
    const actualTimerValue = selectedValidDate - Date.now();

    const { days, hours, minutes, seconds } = convertMs(actualTimerValue);
    const actualDateArray = [days, hours, minutes, seconds];

    refs.timer.forEach((e, i) => {
      e.textContent = addLeadingZero(actualDateArray[i]);
    });
    if (actualTimerValue <= 0) {
      clearInterval(idInterval);
      Report.success('The timer has finished', '', 'Okay');
      refs.timer.forEach(e => {
        e.textContent = addLeadingZero(0);
      });
      refs.btnSetTime.disabled = false;
      refs.inputData.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
