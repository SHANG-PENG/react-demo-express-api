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
        console.log("submit -form...");
        event.preventDefault();
        var data = new FormData(form);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/api/epay/submit-form', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            token: data.get('token'),
            storeName: data.get('storeName'),
            amount: data.get('amount'),
            cardNumber: data.get('CardNumber'),
            cardholderName: data.get('CardholderName'),
            cardExpires: data.get('CardExpires'),
            cardVerifyCode: data.get('CardholderName'),
            billingZipCode: data.get('billingZipCode'),
        }));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Success:', xhr.responseText);
                } else {
                    console.error('Error:', xhr.responseText);
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

    // storeName
    var storeNameInput = document.createElement("input");
    storeNameInput.setAttribute("type", "text");
    storeNameInput.setAttribute("name", "Store Name");
    storeNameInput.setAttribute("autoComplete", "off");
    storeNameInput.setAttribute("placeholder", "Store Name");
    storeNameInput.setAttribute("disabled", "true");
    storeNameInput.setAttribute("value", "Happy Grill");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");
    formRowContainer.appendChild(storeNameInput);
    form.appendChild(formRowContainer);

    // amount
    var amountInput = document.createElement("input");
    amountInput.setAttribute("type", "text");
    amountInput.setAttribute("name", "Amount");
    amountInput.setAttribute("autoComplete", "off");
    amountInput.setAttribute("placeholder", "Amount");
    amountInput.setAttribute("disabled", "true");
    amountInput.setAttribute("value", "$9.99");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");
    formRowContainer.appendChild(amountInput);
    form.appendChild(formRowContainer);

    // card number
    var cardNumberInput = document.createElement("input");
    cardNumberInput.setAttribute("type", "text");
    cardNumberInput.setAttribute("name", "CardNumber");
    // cardNumberInput.setAttribute("style", "padding: 10px; width: 90%; border: 1px solid #ddd; border-radius: 5px;");
    cardNumberInput.setAttribute("autoComplete", "off");
    cardNumberInput.setAttribute("placeholder", "Credit Card Number");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");
    formRowContainer.appendChild(cardNumberInput);
    form.appendChild(formRowContainer);

    // cardHolder Name
    var cardholderNameInput = document.createElement("input");
    cardholderNameInput.setAttribute("type", "text");
    cardholderNameInput.setAttribute("name", "CardholderName");
    // cardholderNameInput.setAttribute("style", "padding: 10px; width: 90%; border: 1px solid #ddd; border-radius: 5px;");
    cardholderNameInput.setAttribute("autoComplete", "off");
    cardholderNameInput.setAttribute("placeholder", "Cardholder Name");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");
    formRowContainer.appendChild(cardholderNameInput);
    form.appendChild(formRowContainer);

    // card expires
    var cardExpiresInput = document.createElement("input");
    cardExpiresInput.setAttribute("type", "text");
    cardExpiresInput.setAttribute("name", "CardExpires");
    // cardExpiresInput.setAttribute("style", "padding: 10px; width: 90%; border: 1px solid #ddd; border-radius: 5px;");
    cardExpiresInput.setAttribute("autoComplete", "off");
    cardExpiresInput.setAttribute("placeholder", "Card Expires");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");
    formRowContainer.appendChild(cardExpiresInput);
    form.appendChild(formRowContainer);

    // card verify code(CVV)
    var cardVerifyCodeInput = document.createElement("input");
    cardVerifyCodeInput.setAttribute("type", "text");
    cardVerifyCodeInput.setAttribute("name", "CardholderName");
    // cardVerifyCodeInput.setAttribute("style", "padding: 10px; width: 90%; border: 1px solid #ddd; border-radius: 5px;");
    cardVerifyCodeInput.setAttribute("autoComplete", "off");
    cardVerifyCodeInput.setAttribute("placeholder", "Card Verify Code(CVV)");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");
    formRowContainer.appendChild(cardVerifyCodeInput);
    form.appendChild(formRowContainer);

    // billing zip code
    var billingZipCodeInput = document.createElement("input");
    billingZipCodeInput.setAttribute("type", "text");
    billingZipCodeInput.setAttribute("name", "billingZipCode");
    // billingZipCodeInput.setAttribute("style", "padding: 10px; width: 90%; border: 1px solid #ddd; border-radius: 5px;");
    billingZipCodeInput.setAttribute("autoComplete", "off");
    billingZipCodeInput.setAttribute("placeholder", "Billing Zip Code");

    formRowContainer = document.createElement("div");
    formRowContainer.setAttribute("class", "aldelo-epay-form-group");
    formRowContainer.appendChild(billingZipCodeInput);
    form.appendChild(formRowContainer);

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

    var container = document.getElementById("form-container");
    container.setAttribute("class", "container");
    if (container) {
        container.appendChild(form);
    } else {
        console.error("Container element not found!");
    }
}

window.onload = createAldeloEPayPaymentForm;
