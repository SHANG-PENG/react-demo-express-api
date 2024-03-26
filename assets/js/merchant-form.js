function loadScript(url, callback) {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src == url) {
            if (typeof callback === 'function') {
                callback();
            }
            return;
        }
    }

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;

                if (typeof callback === 'function') {
                    callback();
                }
            }
        };
    } else {  //Others  
        script.onload = function () {
            if (typeof callback === 'function') {
                callback();
            }
        };
    }

    script.src = url;
    document.body.appendChild(script);
}

function createEPayPaymentForm() {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    // form.setAttribute("action", "http://localhost:8080/api/epay/submit-form");
    form.setAttribute("id", "aldelo-epay-form");
    form.setAttribute(
        "style",
        "margin: 0 auto; width: 480px; border: 1px solid #ebebeb; padding: 15px; border-radius: 5px;"
    );

    function fnFormFieldValidation(name, value) {
        if (!name) return
        var inputEle = form.querySelector('input[name="' + name + '"]');
        if (!inputEle) return

        var formControl = inputEle.parentElement;
        var label = formControl.querySelector("label");
        var labelText = label.innerText;
        var isValid = true, message = 'Error message';
        if (!value) {
            isValid = false;
            message = `${labelText} is required`;
        } else {
            switch (name) {
                case "CardNumber":
                    if (!/^\d{16}$/.test(value)) {
                        isValid = false;
                        message = "Card Number is invalid";
                        // message = "Only numbers are allowed";
                    }
                    break;
                case "CardExpires":
                    if (!/^\d{4}$/.test(value)) {
                        isValid = false;
                        // message = "Only numbers are allowed(YYYYDD)";
                        message = "Card Expires is invalid";
                    }
                    break;
                case "CardVerifyCode":
                    if (!/^\d{3}$/.test(value)) {
                        isValid = false;
                        // message = "Only numbers are allowed";
                        message = "CVV is invalid";
                    }
                    break;
            }
        }

        if (isValid) {
            formControl.className = "aldelo-epay-form-group success";
            var small = formControl.querySelector("small");
            small.innerText = "";
        } else {
            formControl.className = "aldelo-epay-form-group error";
            var small = formControl.querySelector("small");
            small.innerText = `*${message}`
        }
        return isValid;
    }

    // function fnFormFieldsValidation 

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const dataToEncrypt = {};
        for (const [key, value] of formData.entries()) {
            dataToEncrypt[key] = value;
        }
        var cardNumber = formData.get('CardNumber'),
            cardExpires = formData.get('CardExpires'),
            CardVerifyCode = formData.get('CardVerifyCode');

        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(`$$PK$$`);
        const encrypted = encrypt.encrypt(JSON.stringify(dataToEncrypt));

        // debugger
        if (!fnFormFieldValidation("CardNumber", cardNumber)) return false;
        if (!fnFormFieldValidation("CardExpires", cardExpires)) return false;
        if (!fnFormFieldValidation("CardVerifyCode", CardVerifyCode)) return false;

        console.log('encrypted:', encrypted)

        fetch('$$SubmitUrl$$', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: encrypted })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (typeof ePayHandler === 'function') {
                    ePayHandler({ type: 'payment', code: 200, data: data })
                }
            })
            .catch(error => {
                if (typeof ePayHandler === 'function') {
                    ePayHandler({ type: 'payment', data: { error: error } })
                }
                console.error('Error:', error)
            });
    });

    var formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");

    function newFormRowContainer(opts = {}) {
        if (!opts.name) return

        var optsType = opts.type ?? "text";
        var frc = document.createElement("div");
        frc.setAttribute("class", "aldelo-epay-form-group");

        if (opts.label) {
            var rLabel = document.createElement("label");
            rLabel.setAttribute("for", opts.name);
            rLabel.innerText = opts.label;
            rLabel.setAttribute("style", "display: block; margin-bottom: 5px;");
            frc.appendChild(rLabel);
        }

        var rInput = document.createElement("input");
        rInput.setAttribute("type", optsType);
        rInput.setAttribute("name", opts.name);
        // rInput.setAttribute("style", "padding: 10px; width: 90%; border: 1px solid #ddd; border-radius: 5px;");
        rInput.setAttribute("autoComplete", "off");
        rInput.setAttribute("placeholder", opts.isRequired ? "Required" : "Optional");

        frc.appendChild(rInput);

        var rSmall = document.createElement("small");
        rSmall.setAttribute("class", "aldelo-epay-small");
        rSmall.innerText = opts.error;

        var rSmallContainer = document.createElement("div");
        rSmallContainer.setAttribute("style", "width: 100%; padding-left: 3px;text-align: left;");
        rSmallContainer.appendChild(rSmall);

        frc.appendChild(rSmallContainer);

        return frc;
    }

    form.appendChild(newFormRowContainer({ name: "CardNumber", label: 'Card Number', type: "text", isRequired: true, error: "*Card Number is required" }));
    form.appendChild(newFormRowContainer({ name: "CardExpires", label: 'Card Expires', type: "text", isRequired: true, error: "*Card Expires is required" }));
    form.appendChild(newFormRowContainer({ name: "CardVerifyCode", label: 'Card Verify Code(CVV)', type: "text", isRequired: true, error: "*Card Verify Code(CVV) is required" }));

    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute(
        "style",
        "padding: 10px; background-color: #000; color: #fff; border: none; cursor: pointer; width: 95%; border-radius: 5px;"
    );
    submitButton.setAttribute("value", "Pay");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");

    formRowContainer.appendChild(submitButton);
    form.appendChild(formRowContainer);

    var container = document.getElementById("aldelo-epay-form-container");
    container.setAttribute("class", "aldelo-epay-form-container");
    if (container) {
        var forms = container.getElementsByTagName("form");
        if (forms.length > 0) {
            // generate new form
            container.replaceChildren("")
        }

        container.appendChild(form);
        
        // add form style
        var style = document.createElement('style');
        style.type = 'text/css';

        var cssContent = document.createTextNode(`
    /* aldelo epay form */
    .aldelo-epay-form-container {
        margin: 10px auto;
    }

    .aldelo-epay-form {
        width: 560px;
        margin: 0 auto;
        padding: 15px;
        border: 1px solid #ebebeb;
        border-radius: 5px;
    }

    .aldelo-epay-form-group {
        min-height: 48px;
        margin: 0 auto;
    }

    .aldelo-epay-form-group label {
        text-align: left;
        padding-left: .5rem;
        font-size: .9rem;
        font-weight: 600;
    }

    .aldelo-epay-form-group input {
        width: 90%;
        height: 42px;
        padding: 0 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
    }

    .aldelo-epay-form-group input[type="button"] {
        margin-top: 10px;
        padding: 10px;
        background-color: #000;
        color: #fff;
        border: none;
        cursor: pointer;
        width: 95%;
        border-radius: 5px;
    }

    .aldelo-epay-form-group input[type="submit"] {
        margin-top: 0.25rem;
    }

    .aldelo-epay-form-group small {
        width: 100%;
        position: relative;
        left: 0;
        bottom: 0;
        visibility: hidden;
        padding-left: 3px;
        color: #e74c3c;
    }

    .aldelo-epay-form-group.success input {
        border: 1px solid #2ecc71;
    }

    .aldelo-epay-form-group.error input {
        border-color: #e74c3c;
    }

    .aldelo-epay-form-group.success small {
        visibility: hidden;
    }

    .aldelo-epay-form-group.error small {
        visibility: visible;
    }

    /* aldelo epay form */`
    );
        style.appendChild(cssContent);
    
        document.head.appendChild(style);

    } else {
        console.error("Container element not found!");
    }
}

window.onload = createEPayPaymentForm;
