document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const email = document.querySelector('.email');
    const error = document.querySelector('.email-error');
    const modal = document.querySelector('.modal')
    let reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    form.addEventListener('submit', formSend);
    

    async function formSend(e) {
        e.preventDefault();
                
        if (!isEmailValid(email.value)) {
            return error.textContent ='Please, check your email';
        } else {
            let response = await fetch ('https://httpbin.org/post', {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => response.json())
            .then(form => {
                alert(form.form.email);
                
            })
            .catch(error => console.log(error))
            openModal();
            form.reset();
        }


    }

    function isEmailValid(value) {
        return reg.test(value);
    }
})

function openModal() {
    document.querySelector('.modal').classList.add('modal-show')
}

// Timer

document.addEventListener('DOMContentLoaded', function () {

    const deadline = new Date (2023, 04, 31)
    let timerId = null;
    
    function declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }

    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;

        $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }

    const $days = document.querySelector('.frame-timer_days-count');
    const $hours = document.querySelector('.frame-timer_hours-count');
    const $minutes = document.querySelector('.frame-timer_minutes-count');
    const $seconds = document.querySelector('.frame-timer_seconts-count');

    countdownTimer();

    timerId = setInterval(countdownTimer, 1000);
})