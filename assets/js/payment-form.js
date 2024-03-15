function createAldeloEPayPaymentForm() {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    // form.setAttribute("action", "http://localhost:8080/api/epay/submit-form");
    form.setAttribute("id", "aldelo-epay-form");
    form.setAttribute(
        "style",
        "margin: 0 auto; width: 480px; border: 1px solid #ebebeb; padding: 15px; border-radius: 5px;"
    );

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var data = new FormData(form);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '$$SubmitUrl$$', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            // token: data.get('token'),
            // storeName: data.get('storeName'),
            amount: data.get('Amount'),
            cardNumber: data.get('CardNumber'),
            cardExpires: data.get('CardExpires'),
            cardVerifyCode: data.get('CardVeifyCodeName'),
            // billingZipCode: data.get('billingZipCode'),
        }));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Success:', xhr.responseText);
                    if (typeof successCallback === 'function') {
                        successCallback()
                    }
                } else {
                    console.error('Error:', xhr.responseText);
                    if (typeof errorCallback === 'function') {
                        errorCallback()
                    }
                }
            }
        };

        // // 添加特殊字段
        // var specialField = document.createElement("input");
        // specialField.type = "hidden";
        // specialField.name = "specialField";
        // specialField.value = "specialValue"; // 设置特殊字段的值
        // form.appendChild(specialField); // 将特殊字段添加到表单中

        // // 如果校验通过，则提交表单
        // form.submit(); // 此时会触发浏览器的默认提交行为
    });

    var formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");

    var tokenInput = document.createElement("input");
    tokenInput.setAttribute("type", "hidden");
    tokenInput.setAttribute("name", "token");
    tokenInput.setAttribute("autoComplete", "off");
    tokenInput.setAttribute("placeholder", "Token");
    tokenInput.setAttribute("disabled", "true");
    tokenInput.setAttribute("value", "72515C36-79A7-484B-B519-DFA80CB18A40");

    // formRowContainer.appendChild(tokenInput);
    form.appendChild(tokenInput);
    
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
        rInput.setAttribute("name", "CardNumber");
        // rInput.setAttribute("style", "padding: 10px; width: 90%; border: 1px solid #ddd; border-radius: 5px;");
        rInput.setAttribute("autoComplete", "off");
        rInput.setAttribute("placeholder", opts.isRequired ? "Required" : "Optional");

        frc.appendChild(rInput);

        var rSmall = document.createElement("small");
        rSmall.setAttribute("class", "aldelo-epay-small");
        rSmall.innerText = opts.error ?? "*error message*";
        rSmall.setAttribute("style", "color: red; margin-top: 5px;");

        var rSmallContainer = document.createElement("div");
        rSmallContainer.setAttribute("style", "width: 100%; padding-left: 3px;text-align: left;");
        rSmallContainer.appendChild(rSmall);

        frc.appendChild(rSmallContainer);

        return frc;
    }

    form.appendChild(newFormRowContainer({ name: "CardNumber", label: 'Card Number', type: "text", isRequired: true, error: "*Card Number is required" }));
    form.appendChild(newFormRowContainer({ name: "CardExpires", label: 'Card Expires', type: "text", isRequired: true, error: "*Card Expires is required" }));
    form.appendChild(newFormRowContainer({ name: "CardVeifyCodeName", label: 'Card Verify Code(CVV)', type: "text", isRequired: true, error: "*Card Verify Code(CVV) is required" }));

    // 创建提交按钮
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute(
        "style",
        "padding: 10px; background-color: #000; color: #fff; border: none; cursor: pointer; width: 95%; border-radius: 5px;"
    );
    submitButton.setAttribute("value", "Pay");
    // submitButton.setAttribute("onclick", "window.open('https://dev-epay.aldelo.cloud', '_blank')");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");

    formRowContainer.appendChild(submitButton);
    form.appendChild(formRowContainer);

    var container = document.getElementById("aldelo-epay-form-container");
    container.setAttribute("class", "container");
    if (container) {
        var amountTitle = document.createElement("h2");
        amountTitle.innerText = "Amount: $$Amount$$";
        formRowContainer = document.createElement("div");
        formRowContainer.setAttribute("class", "aldelo-epay-form-group");
        formRowContainer.appendChild(amountTitle);
        container.appendChild(formRowContainer);

        container.appendChild(form);
    } else {
        console.error("Container element not found!");
    }
}

window.onload = createAldeloEPayPaymentForm;
