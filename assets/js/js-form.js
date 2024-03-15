// formGenerator.js  
function createForm() {  
    // 获取当前页面的URL
    var currentURL = window.location.href;
    console.log("Current URL: " + currentURL, window.location);

    var form = document.createElement("form");  
    form.setAttribute("style", "margin: 0 auto; width: 480px; border: 1px solid #ebebeb; padding: 15px; border-radius: 5px;");
    // form.setAttribute("action", "/submit-form"); // 设置表单提交的目标URL  
    // form.setAttribute("onclick", "alert('success'); return false"); // 设置表单提交的目标URL
    // form.setAttribute("method", "post"); // 设置表单提交方法  
  
    var formRowContainer = document.createElement("div"); 
    formRowContainer.setAttribute("class", "epay-form-group");

    var merchantIDInput = document.createElement("input");  
    merchantIDInput.setAttribute("type", "text");  
    merchantIDInput.setAttribute("name", "name");  
    merchantIDInput.setAttribute("autoComplete", "off");  
    merchantIDInput.setAttribute("placeholder", "Merchant ID");  
    merchantIDInput.setAttribute("disabled", "true");
    merchantIDInput.setAttribute("value", "72515C36-79A7-484B-B519-DFA80CB18A40");
  
    formRowContainer.appendChild(merchantIDInput)
    form.appendChild(formRowContainer);  

    var deviceIDInput = document.createElement("input");  
    deviceIDInput.setAttribute("type", "text");  
    deviceIDInput.setAttribute("name", "deviceID");  
    deviceIDInput.setAttribute("autoComplete", "off");  
    deviceIDInput.setAttribute("placeholder", "Device ID");  
    deviceIDInput.setAttribute("disabled", "true");
    deviceIDInput.setAttribute("value", "94EC52BE-DB23-4F89-9254-FDDE201A68C0");
    
    formRowContainer = document.createElement("div");  
    formRowContainer.setAttribute("class", "epay-form-group");
    formRowContainer.appendChild(deviceIDInput)
    form.appendChild(formRowContainer);  

    // var emailInput = document.createElement("input");  
    // emailInput.setAttribute("type", "email");  
    // emailInput.setAttribute("name", "email");  
    // emailInput.setAttribute("autoComplete", "off");  
    // emailInput.setAttribute("placeholder", "Your Email");  
    
    // formRowContainer = document.createElement("div");  
    // formRowContainer.setAttribute("class", "epay-form-group");
    // formRowContainer.appendChild(emailInput)
    // form.appendChild(formRowContainer);  

    // var amountInput = document.createElement("input");  
    // amountInput.setAttribute("type", "number");  
    // amountInput.setAttribute("name", "amount");  
    // amountInput.setAttribute("disabled", "true");  
    // // amountInput.setAttribute("style", "padding: 10px; width: 90%; border: 1px solid #ddd; border-radius: 5px;");
    // amountInput.setAttribute("autoComplete", "off");  
    // amountInput.setAttribute("placeholder", "Amount");  
    
    // formRowContainer = document.createElement("div");  
    // formRowContainer.setAttribute("class", "epay-form-group");
    // formRowContainer.appendChild(amountInput)
    // form.appendChild(formRowContainer);  

    // 跳转到 ePay 支付页面  
    var redirectButton = document.createElement("input");  
    redirectButton.setAttribute("type", "button");  
    redirectButton.setAttribute("style", "margin-top: 10px; padding: 10px; background-color: #000; color: #fff; border: none; cursor: pointer; width: 95%; border-radius: 5px;");
    redirectButton.setAttribute("value", "Redirect To Aldelo ePay");  
    // redirectButton.setAttribute("onclick", "window.open('https://dev-epay.aldelo.cloud', '_blank')");
    redirectButton.setAttribute("onclick", "redirectToPay()"); 
  
    formRowContainer = document.createElement("div");  
    formRowContainer.setAttribute("class", "epay-form-group");

    formRowContainer.appendChild(redirectButton)
    form.appendChild(formRowContainer);  

    // 渲染内嵌的 ePay payment form 表单
    var submitButton = document.createElement("input");  
    submitButton.setAttribute("type", "button");  
    submitButton.setAttribute("style", "margin-top: 10px; padding: 10px; background-color: #000; color: #fff; border: none; cursor: pointer; width: 95%; border-radius: 5px;");
    submitButton.setAttribute("value", "Aldelo ePay");  
    // submitButton.setAttribute("onclick", "window.open('https://dev-epay.aldelo.cloud', '_blank')");
    submitButton.setAttribute("onclick", "switchPayForm()"); 

    formRowContainer = document.createElement("div");  
    formRowContainer.setAttribute("class", "epay-form-group");

    formRowContainer.appendChild(submitButton)
    form.appendChild(formRowContainer);  
  
    // 找到要添加表单的容器元素（例如，具有特定ID的元素）  
    var container = document.getElementById("form-container");  
    container.setAttribute("class", "container");
    if (container) {  
        // 将表单添加到容器中  
        container.appendChild(form);  
    } else {  
        console.error("Container element not found!");  
    }  
}  
  
// 在页面加载完成后调用createForm函数  
window.onload = createForm;

