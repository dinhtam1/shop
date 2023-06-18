const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const btnLogin = $('.btn-login')
        const btnRegister = $('.btn-register')
        const modal = $('.modal')
        const modalRegister = $('.modal-Register')
        const modalLogin = $('.modal-Login')
        const modalOverlay = $('.modal__overlay')
        const modalBodys = $$('.modal__body')
        const switchBtns = $$('.auth-form__switch-btn')
        const btnNormals = $$('.btn-normal')
        const categoryItems = $$('.category-item')
        const homeFilterBtns = $$('.home-filter__btn')
        const headerCartItemRemoves =  $$('.header__cart-item-remove');
        const headerCartItems = $$('.header__cart-item')
        function showModal(modal) {
            modal.classList.add('open')
        }


        if (modalLogin) {
            btnLogin.onclick = function () {
                showModal(modalLogin);
            }
            modalLogin.addEventListener('click', function () {
                modalLogin.classList.remove('open')

            })
        }

        if (modalRegister) {
            btnRegister.onclick = function () {
                showModal(modalRegister);
            }

            modalRegister.addEventListener('click', function () {
                modalRegister.classList.remove('open')

            })
        }
        Array.from(btnNormals).forEach(function (btnNormal) {
            btnNormal.onclick = function (e) {
                e.preventDefault();
            }
        })


        Array.from(modalBodys).forEach(function (modalBody) {
            modalBody.addEventListener('click', function (event) {
                event.stopPropagation();
            })
        })

        Array.from(switchBtns).forEach(function (switchBtn) {

            switchBtn.onclick = function () {
                modalRegister.classList.toggle('open');
                modalLogin.classList.toggle('open');
            }
        })

        Array.from(categoryItems).forEach(function (categoryItem) {
            categoryItem.onclick = function (event) {
                event.preventDefault();
                categoryItems.forEach(function(categoryItem){
                    if(categoryItem.classList.contains('category-item--active')){
                    categoryItem.classList.remove('category-item--active');
                }
                })
                categoryItem.classList.add('category-item--active');
            }
        })


        Array.from(homeFilterBtns).forEach(function(homeFilterBtn){
            
            homeFilterBtn.onclick = function(event){
                event.preventDefault();
                homeFilterBtns.forEach(function(homeFilterBtn){
                    if(homeFilterBtn.classList.contains('btn--primary')){
                        homeFilterBtn.classList.remove('btn--primary');
                }
                })
                homeFilterBtn.classList.add('btn--primary');
            }

        })

