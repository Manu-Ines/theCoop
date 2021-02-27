window.addEventListener('load', () => {
    const resetPassForm = document.getElementById('resetPassWord')
    const forgotPassError = document.getElementById('forgotPassError')

    resetPassForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const forgotPassEmail = document.getElementById('forgotPassEmail').value

        axios({
            method: 'post',
            url: '/send-reset-email',
            data: {
                email: forgotPassEmail,
            },
        })
            .then((res) => {
                if (res.data.status === 400) {
                    forgotPassError.innerHTML = `<div class="alert alert-danger my-3">${res.data.data}</div>`
                } else {
                    forgotPassError.innerHTML = `<div class="alert alert-success my-3">${res.data.data}</div>`
                }
            })
            .catch((e) => console.log(e))
    })
})
