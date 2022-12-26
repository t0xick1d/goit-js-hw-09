import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRefs = document.querySelector('.form');

formRefs.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  const formData = {
    delay: evt.target.elements.delay.value,
    step: evt.target.elements.step.value,
    amount: evt.target.elements.amount.value,
  };
  const promiseArray = [];
  for (let i = 0; i < formData.amount; i++) {
    let actualDelay = i * formData.step;
    actualDelay += Number(formData.delay);
    promiseArray.push(createPromise(i + 1, actualDelay));
  }
  setTimeout(() => {
    promiseArray.map(e => {
      e.then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    });
  }, formData.delay);
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay);
  });
}
