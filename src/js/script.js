$(document).ready(() => {
    let loader = $('.loader-bg');
    let menu = $('#menu');
    let menuLinks = $('.menu__link');
    let btnsOpenModal = $('.btn_openModal');
    let headerBtns = $('.header__btn');
    let blur = $('.blur');
    let modal = $('#modal');
    let modalClose = $('#modal-close');
    let submitBtn = $('#submit');
    let emailInput = $('#email');
    let hasError = false;
    let burgerContainer = $('#burger-container');
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

    (function headerMenu() {
        burgerContainer.click(function () {
            menu.toggleClass('menu_open');
            burgerContainer.toggleClass('burger-container_open');
            blur.toggleClass('blurring');
        });

        for (let i = 0; i < menuLinks.length; i++) {
            menuLinks.eq(i).click(function () {
                closeBlur();
            });
        }
    })();

    function closeBlur() {
        menu.removeClass('menu_open');
        modal.removeClass('visible');
        burgerContainer.removeClass('burger-container_open');
        blur.removeClass('blurring');
        emailInput.val('');
        emailInput.removeClass('invalid');
    }

    (function blurActions() {
        blur.click(function () {
            closeBlur();
        });
    })();

    (function modalActions() {
        for (let i = 0; i < btnsOpenModal.length; i++) {
            btnsOpenModal.eq(i).click(function () {
                blur.addClass('blurring');
                modal.addClass('visible');
                menu.removeClass('menu_open');
            });
        }

        modalClose.click(function () {
            closeBlur();
            modalClose.toggleClass('rotate');
        });
    }());


    (function mediaQueries() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            headerBtns.removeClass('btn_transparent');
        }
    })();


    (function sendForm() {
        if (!emailInput.val()) {
            submitBtn.attr('disabled', 'true');
        }

        function isEmailValid(value) {
            return EMAIL_REGEXP.test(value);
        }

        emailInput.change(function () {
            if (isEmailValid(emailInput.val())) {
                submitBtn.removeAttr('disabled');
                emailInput.removeClass('invalid');
                hasError = false;
            } else {
                submitBtn.attr('disabled', 'true');
                emailInput.addClass('invalid');
                hasError = true;
            }
        })

        submitBtn.click(function () {
            if (isEmailValid(emailInput.val())) {
                emailInput.css('border-color', 'transparent');
                hasError = false;
            }

            if (!hasError) {
                loader.addClass('visible');
                // $.ajax({
                //     method: 'POST',
                //     url: '',
                //     data: {email: emailInput.val()}
                // })
                //     .done(function (msg) {
                //         loader.removeClass('visible');
                //         modal.removeClass('visible');
                //         blur.removeClass('blurring');
                //         if (msg.success) {
                //             emailInput.val('');
                //         } else {
                //             alert('Возникла ошибка при отправке запроса на сервер. Пожалуйста, попробуйте позже.')
                //         }
                //     })
            }
        });
    })();
})

$(window).on('load', function(){
    let loader = $('.loader-bg');
    loader.removeClass('visible');
});