// function Validator(options) {

//     /*
// sửa lỗi : form-message có thể ở trong cùng nhiều thẻ div , thay hết các phần
// sử dụng inputElement.parent 
// output : form-message dù nằm trong bao nhiêu thẻ div thì vẫn
// lấy ra thẻ form-group ngoài cùng
// ý tưởng : lặp qua từng thẻ cha của input nếu trùng với selector
// thì trả về thẻ form-group hiện tại , không thì gán thẻ hiện tại
// vào biến rồi lặp tiếp
// */
//     function getParent(element, selector) {
//         while (element.parentElement) {
//             if (element.parentElement.matches(selector)) {
//                 return element.parentElement;
//             }
//             element = element.parentElement;

//         }
//     }

//     const selectorRules = {}

//     function validate(inputElement, rule) {

//         const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

//         var errorMessage;

//         var rules = selectorRules[rule.selector]
//         for (var i = 0; i < rules.length; i++) {
//             switch (inputElement.type) {
//                 case 'radio':
//                 case 'checkbox':
//                     errorMessage = rules[i](
//                         formElement.querySelector(rule.selector + ':checked')
//                     );
//                     break;
//                 default:
//                     errorMessage = rules[i](inputElement.value);
//             }
//             if (errorMessage) break;
//         }

//         if (errorMessage) {
//             errorElement.innerText = errorMessage;
//             getParent(inputElement, options.formGroupSelector).classList.add('invalid');
//         }
//         else {
//             errorElement.innerText = '';
//             getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
//         }
//         return !errorMessage;
//     }

//     const formElement = document.querySelector(options.form);
//     if (formElement) {


//         formElement.onsubmit = function (e) {
//             e.preventDefault();
//             var formValid = true;
//             options.rules.forEach(function (rule) {
//                 const inputElement = formElement.querySelector(rule.selector)
//                 var isValid = validate(inputElement, rule);
//                 if (!isValid) {
//                     formValid = false
//                 }
//             })

//             if (formValid) {
//                 if (typeof options.onSubmit === 'function') {
//                     var enableInputs = formElement.querySelectorAll('[name]')
                    
//                     var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        
//                         switch(input.type) {
//                                 case 'checkbox':
//                                     if(!input.matches(':checked')) {
//                                         values[input.name] = '';
//                                         return values;
//                                     }
//                                     if(!Array.isArray(values[input.name])) {
//                                         values[input.name] = [];
//                                     }
//                                     values[input.name].push(input.value);
//                                     break;
//                                 case 'radio':
//                                     values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
//                                     break;
//                                 case 'file' :
//                                     values[input.name] = input.files;
//                                     break;
//                                 default : 
//                                     values[input.name] = input.value;

//                         }
                        
//                         return values;
//                     }, {});

//                     options.onSubmit({ formValues })
//                 }
//             }

//         }



//         options.rules.forEach(function (rule) {
//             if (Array.isArray(selectorRules[rule.selector])) {
//                 selectorRules[rule.selector].push(rule.test);
//             }
//             else {
//                 selectorRules[rule.selector] = [rule.test];
//             }
//             var inputElements = formElement.querySelectorAll(rule.selector)
            
//             Array.from(inputElements).forEach(function (inputElement) {


//                 inputElement.onblur = function () {
//                     validate(inputElement, rule);
//                 }

//                 inputElement.oninput = function () {
//                     const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
//                     errorElement.innerText = '';
//                     getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
//                 }

//             })





//         })
//         //console.log(selectorRules)

//     }
// }

// Validator.isRequired = function (selector) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value ? undefined : 'Hãy nhập đúng định dạng'
//         }
//     }

// }

// Validator.isEmail = function (selector) {
//     return {
//         selector: selector,
//         test: function (value) {
//             const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//             return regex.test(value) ? undefined : "Hãy nhập đúng định dạng email"
//         }
//     }

// }

// Validator.isMin = function (selector, min, message) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value.length >= min ? undefined : message || "Hãy nhập đúng định dạng"
//         }
//     }

// }

// Validator.isConfirmed = function (selector, isConfirmed, message) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value === isConfirmed() ? undefined : message || "Hãy nhập đúng định dạng"

//         }
//     }

// }

