function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      } else {
        element = element.parentElement;
      }
    }
  }

  var formElement = document.querySelector(options.form);

  var selectorRules = {};

  //hàm thực hiện thông báo lỗi
  function validate(inputElement, rule) {
    var msgElement = getParent(inputElement, options.formGroup).querySelector(
      options.formError
    );
    var messageError;

    //gán các rule của selector được blur vào rules
    var rules = selectorRules[rule.selector];

    //duyệt qua tất cả các phần tử trong rules
    for (var rulei of rules) {
      // kiểm tra lỗi
      // rulei ở đây là Validator.isRequired.test
      // nên  rulei(inputElement.value) ko cần gọi phương thức test

      switch (inputElement.type) {
        case "radio":
        case "checkbox":
          messageError = rulei(
            formElement.querySelector(rule.selector + ":checked")
          );
          break;
        default:
          messageError = rulei(inputElement.value);
      }
      //nếu gặp lỗi thì dừng vòng lặp
      if (messageError) break;
    }

    if (messageError) {
      msgElement.innerText = messageError;
      getParent(inputElement, options.formGroup).classList.add("invalid");
    } else {
      msgElement.innerText = "";
      getParent(inputElement, options.formGroup).classList.remove("invalid");
    }
    return !messageError;
  }

  if (formElement) {
    //hành động onsubmit
    formElement.onsubmit = function (e) {
      let loadingElement = document.querySelector("#loading");
      loadingElement.classList.remove("hidden");
      e.preventDefault();

      //kiểm tra toàn bộ form có hiệu lực hay không
      var isFormValid = true;

      //thực hiện lặp qua từng rule và validate
      options.rules.forEach(function (rule) {
        //dùng queryselectorAll để lấy tất cả các phần tử input trường hợp có nhiều thẻ input
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        //  kiểm tra nếu có bất kì input nào lỗi thì form --> lỗi
        if (!isValid) {
          isFormValid = false;
        }
      });

      // nếu form ko lỗi thì thực hiện submit
      if (isFormValid) {
        //kiểm tra options có đối tượng onSubmit là một hàm hay không
        if (typeof options.onSubmit === "function") {
          //lấy tất cả các thẻ input có attribute name
          var enableInputs = formElement.querySelectorAll("[name]");

          // kết quả của  valueInput trả về 1 nodelist nên cần chuyển sang array và thực hiện hàm reduce
          // hàm reduce sẽ truyền 2 tham số là:
          // - values --> đối tượng chứa các giá trị và name của thẻ input
          // - input --> element input
          var valueInput = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            switch (input.type) {
              case "radio":
              case "checkbox":
                if (input.matches(":checked")) {
                  values[input.name] = input.value;
                  // console.log();
                }
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          },
          {});
          // thực hiện hàm onSubmit
          options.onSubmit(valueInput);
        } else {
          formElement.submit();
        }
      }
      setTimeout(() => {
        loadingElement.classList.add("hidden");
      }, 4000);
    };

    //lặp qua mỗi rule và xử lý (lắng nghe, blur, input,...)
    options.rules.forEach(function (rule) {
      // rule là các Validator.isRequired, email ,...
      //Lưu lại các rule cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      // console.log("selectorRules", selectorRules);

      //dùng queryselectorAll để lấy tất cả các phần tử input trường hợp có nhiều thẻ input
      var inputElements = formElement.querySelectorAll(rule.selector);
      // console.log("inputElements", inputElements);

      Array.from(inputElements).forEach(function (inputElement) {
        //xử lý blur khỏi input --> thông báo kiểm tra lỗi
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        // xử lý nhập chữ vào input --> mất thông báo kiểm tra lỗi
        inputElement.oninput = function () {
          var msgElement = getParent(
            inputElement,
            options.formGroup
          ).querySelector(options.formError);
          msgElement.innerText = "";
          getParent(inputElement, options.formGroup).classList.remove(
            "invalid"
          );
        };
      });
    });
  }
}
// Định nghĩa rules

//kiểm tra nhập trống
Validator.isRequired = function (selector, isEmpty) {
  return {
    //selector để kiểm tra nó đang là thẻ input nào
    selector: selector,
    //hàm test dùng để kiểm tra lỗi --> nhận vào đối số value để kiểm tra
    test: function (value) {
      // console.log("type:", typeof value);
      // console.log("value:", value);
      return value ? undefined : isEmpty;
    },
  };
};

//kiểm tra nhập dạng email
Validator.isEmail = function (selector, isEmail) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : isEmail;
    },
  };
};

//kiểm tra nhập độ dài mật khâu
Validator.isMinLength = function (selector, minPass, isPass) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= minPass ? undefined : isPass;
    },
  };
};

//kiểm tra xác nhận mật khẩu
Validator.isConfirmed = function (selector, confirmPass, isConfirm) {
  return {
    selector: selector,
    test: function (value) {
      return value === confirmPass() ? undefined : isConfirm;
    },
  };
};
