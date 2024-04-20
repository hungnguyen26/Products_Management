// button status
const buttonStatus = document.querySelectorAll("[button-status]"); //thuộc tính tự định nghĩa nên phải có []
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}
// end button status

// form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//end  form search

//phân trang pegination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
//end phân trang

// check box multi
const checkBoxMulti = document.querySelector("[checkbox-multi ]");
if (checkBoxMulti) {
  const inputCheckAll = checkBoxMulti.querySelector('input[name = "checkall"]');
  const inputCheckId = checkBoxMulti.querySelectorAll('input[name = "id"]');

  // logic check All
  inputCheckAll.addEventListener("click", () => {
    // console.log(inputCheckAll.checked);    // checked : đã được check hay chưa
    if (inputCheckAll.checked) {
      inputCheckId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputCheckId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputCheckId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkBoxMulti.querySelectorAll(
        'input[name = "id"]:checked'
      );

      if (countChecked.length == inputCheckId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// END check box multi

//form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault(); // k load lại trang, ngăn hành động mặc định
    // console.log(event);

    const checkBoxMulti = document.querySelector("[checkbox-multi ]");
    const inputCheck = checkBoxMulti.querySelectorAll(
      'input[name = "id"]:checked'
    );

    const typeChange = event.target.elements.type.value;

    // console.log(typeChange);
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc xóa những sản phẩm này");

      if (!isConfirm) {
        return;
      }
    }

    if (inputCheck.length > 0) {
      let Ids = [];

      const inputIDS = formChangeMulti.querySelector('input[name = "ids"]');

      inputCheck.forEach((input) => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector('input[name = "position"]').value;
          console.log(position);

          console.log(`${id}-${position}`);
          Ids.push(`${id}-${position}`);
        } else {
          Ids.push(id);
        }
      });

      inputIDS.value = Ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!!");
    }
  });
}
//END form change multi

// thông báo
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const btnCloseAlert = showAlert.querySelector("[close-alert]");
  btnCloseAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// end thông báo

// preview upload ảnh
const uploadImg = document.querySelector("[upload-img]");
if (uploadImg) {
  const uploadImgInput = document.querySelector("[upload-img-input]");
  const uploadImgpreview = document.querySelector("[upload-img-preview]");

  uploadImgInput.addEventListener("change", (event) => {
    console.log(event);

    const file = event.target.files[0];
    if (file) {
      uploadImgpreview.src = URL.createObjectURL(file);
    }
  });

  const deleteImg = document.querySelector(".delete-img");

  deleteImg.addEventListener("click", () => {
    uploadImgInput.value = "";
    uploadImgpreview.src = "";
  });
}
// end preview upload ảnh

// sort
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  // sắp xếp
  sortSelect.addEventListener("change", (event) => {
    const value = event.target.value;

    const [sortKey, sortValue] = value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
    // xóa sắp xếp
    sortClear.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");

      window.location.href = url.href;
    });
  });

  // thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if(sortValue && sortKey ){
  const sortValue = url.searchParams.get("sortValue");
    const StringSort = `${sortKey}-${sortValue}`;
    
    const optionSelected = sortSelect.querySelector(`option[value = '${StringSort}']`);
    optionSelected.selected = true;
  }
}
// end sort
