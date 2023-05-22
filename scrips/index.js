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
function closeModal() {
    modal.classList.remove('modal-show')
}