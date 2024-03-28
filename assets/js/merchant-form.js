const pk = `$$PK$$`;

function fnAttachFieldsToForm() {
    let form = document.getElementById("aldelo-epay-form");
    if (!form) {
        ePayHandler({ type: "AttachForm", error: "Form not found" })
        return;
    }

    const fnNewFormEle = (opt = {}) => {
        let container = form.querySelector(`div[id='${opt.containerId}']`);
        if (!container) {
            ePayHandler({ type: "AttachForm", error: `${opt.placeholder} Container div not found` })
            return;
        } else {
            const inputs = container.getElementsByTagName("input");
            if (inputs.length === 0) {
                let ipt = document.createElement("input");
                ipt.setAttribute("type", opt.type || 'text');
                ipt.setAttribute("name", opt.name);
                if (opt.maxLength > 0) {
                    ipt.setAttribute("maxLength", opt.maxLength);
                }
                ipt.setAttribute("placeholder", opt.placeholder);

                container.appendChild(ipt);
            }
        }
    }

    const fieldOpts = [
        { containerId: "epay-card-number", name: "cardNumber", type: "text", placeholder: "Card Number" },
        { containerId: "epay-card-expires", name: "cardExpires", type: "text", placeholder: "Card Expires (MM/YY)" },
        { containerId: "epay-card-verify-code", name: "cardVerifyCode", type: "text", placeholder: "Card Verify Code (CVV)" }
    ];

    fieldOpts.forEach((opt) => fnNewFormEle(opt));
}

window.addEventListener("load", function () {
    fnAttachFieldsToForm();
});
