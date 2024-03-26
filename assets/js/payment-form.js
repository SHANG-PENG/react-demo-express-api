
var pk = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsyEUtkE/nwhK5LgaqhYd
91iFrxajcuX3JUI6ShdEzXWIJAF+Y0mu3IVHZ63e03b/RC03G8DHPicLKAm6uc87
5aD5zlTlCwcWu2QV6Zq1wkSHbp8yvaAptszJfMVkaBX7YoYRk5W4LulEoVacQr+v
BfCEEI3eXyU+xLssc1ly22VhmmRMO4V8ZmGoFnMf0nBw6doNHdS1KrJ0AJyV++Pw
7u8p3dlzEsWpmb47VANuIN8OuifWEJzUxd2o9PXvbeKIt/qDYdKGDh7ChG8dMtZX
VShB9ggiBXP6Pz1XTqEOrPU8IEl/6tWPudkh1UMSJd0FWbZuvgL65agKvlfjVjnI
iQIDAQAB`

var pk2 = `MIIEowIBAAKCAQEAsyEUtkE/nwhK5LgaqhYd91iFrxajcuX3JUI6ShdEzXWIJAF+
Y0mu3IVHZ63e03b/RC03G8DHPicLKAm6uc875aD5zlTlCwcWu2QV6Zq1wkSHbp8y
vaAptszJfMVkaBX7YoYRk5W4LulEoVacQr+vBfCEEI3eXyU+xLssc1ly22VhmmRM
O4V8ZmGoFnMf0nBw6doNHdS1KrJ0AJyV++Pw7u8p3dlzEsWpmb47VANuIN8OuifW
EJzUxd2o9PXvbeKIt/qDYdKGDh7ChG8dMtZXVShB9ggiBXP6Pz1XTqEOrPU8IEl/
6tWPudkh1UMSJd0FWbZuvgL65agKvlfjVjnIiQIDAQABAoIBABBurHO7sJZqMFSi
/u8zcDRMjpbtQLk9l1p3pNk/ITSn34FOEcYR8FSSdWZxcMt9UxVyAGgvWxe8hS17
FwIMnLYH+mKPLyO/1roCCHCRnLLhjnr7Z7A1jR4T0zf686cIvTLgkaQ0S90h0QXr
6BHHe8rTsYnDOe8If6WUdhNu1TaDAv9gpGiKgSvUtF260HAW2v2B67kKzkfiXEwn
vVknl6y+koTtHtfNxblcxw9C5v1mqrg+SSP/V4EfWB/4fn2F8xETRMLXSGThPxgJ
k0JwlcUN0yTocFyv66JJqWCic8dAcEIIlCiRGF9V/joYM7/FbQ4cCgkxTxusLzmZ
QBT8O7ECgYEA4/zeecKnvnl9coiDoSoGMkJic3gBVQj/Ogkd/8qs/202Ya4QGvA/
obSwy15oYN+FaxXxRJ3aP5n1UG6mIInnGvYRqmrfrnpOlwk4/7xVm1iafPxAknaQ
AZAJx9DOW9OMXus25/txQ1Wy3t8oYncyxfjxniUQBzzQw3gKfS3tJ2cCgYEAySNq
EXE/b6Vx6XxBq4AT7bveFYTYWAMDnNGuNsWHTUxQZ0riOMFpWdu/lJPs4frDv0fa
iH599mhsIAFuXK+sX1I/H+aYbnq0lAG9jeCfYlNEWblp/2oWi2lQBOst+c16Qhr6
JL73P/BlugP3sOAuC3LG2kDrGp9VMj+jrsqbSo8CgYBf5iryzqVeop3ZAoFT1mh6
1Z+x8GWnDjzFfbZHtUoluxun5N7TZgFuFKJVOSXwsbTeQYGWGkwGes1Mgu6QO1Gh
7qWpqIDkVIAgWfnG4MKlsJRzRGwo74RNk/f5O+TBjW+7MXeMByEycKbnxrinCnqp
+bgwjGh8kuFBh4np89qQuwKBgQCaHrnCnb0W5nXPi7eiGuSqUD7OzFkdr0mQWxab
v2V6dFRToYyQIpuAECLPTT3Atm5RXlR0LECGk+Lt70rKWI3DCHl4DzCTzxAZLPA7
C3f1VopUGf+/h2G49zwqWK6E786TYqpzh6Ra6PB5xVqAvHZrrUnzqLS9VINqmlro
rzSovwKBgHu3EQ8jfNwaE5Q1+ypnvWOM5yTuDhrV2+tPaYMfxLUSq1Tx+nw1BvhV
/iNB1RBLnd2BAWoyze1OXU6l6j6Tozgd/R4zcMN5KdC1QJKuWtfZHREjBIx8uZce
ZMbpselV5TudhrbwnXDALlfXJmsWnsTwvnMrab/SI+DnkSuFvy8/`

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


function createAldeloEPayPaymentForm() {
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
                    }
                    break;
                case "CardExpires":
                    if (!/^\d{4}$/.test(value)) {
                        isValid = false;
                        message = "Card Expires is invalid";
                    }
                    isValid = true;
                    break;
                case "CardVerifyCodeName":
                    isValid = true;
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
            cardVerifyCodeName = formData.get('CardVerifyCodeName');

        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(pk);
        const encrypted = encrypt.encrypt(JSON.stringify(dataToEncrypt));

        // debugger
        if (!fnFormFieldValidation("CardNumber", cardNumber)) return false;
        if (!fnFormFieldValidation("CardExpires", cardExpires)) return false;
        if (!fnFormFieldValidation("CardVerifyCodeName", cardVerifyCodeName)) return false;

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


        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', '$$SubmitUrl$$', true);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.send(JSON.stringify({
        //     cardNumber: data.get('CardNumber'),
        //     cardExpires: data.get('CardExpires'),
        //     cardVerifyCode: data.get('CardVerifyCodeName'),
        //     // billingZipCode: data.get('billingZipCode'),
        // }));
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status === 200) {
        //             console.log('Success:', xhr.responseText);
        //             if (typeof successCallback === 'function') {
        //                 successCallback()
        //             }
        //         } else {
        //             console.error('Error:', xhr.responseText);
        //             if (typeof errorCallback === 'function') {
        //                 errorCallback()
        //             }
        //         }
        //     }
        // };

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
    form.appendChild(newFormRowContainer({ name: "CardVerifyCodeName", label: 'Card Verify Code(CVV)', type: "text", isRequired: true, error: "*Card Verify Code(CVV) is required" }));

    // 创建提交按钮
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
    container.setAttribute("class", "container");
    if (container) {
        var forms = container.getElementsByTagName("form");
        if(forms.length > 0) {
            // generate new form
            container.replaceChildren("")
        }
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
