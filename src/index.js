const containerBubbleSort = document.querySelector(
  ".data-container-bubble-sort"
);
const containerSelectionSort = document.querySelector(
  ".data-container-selection-sort"
);

const buttonLinearGenerate = document.querySelector(".button-generate-linear");

$("#option-linear-search").click(function (e) {
  e.preventDefault();
  console.log("inside option linear search click");
  $("#bubble-sort-view").collapse('hide');
  $("#binary-search-view").collapse('hide');
  $("#selection-sort-view").collapse('hide');
  $("#linear-search-view").collapse("show");
});

$("#option-binary-search").on("click", function (e) {
  e.preventDefault();
  $("#bubble-sort-view").collapse("hide");
  $("#linear-search-view").collapse("hide");
  $("#selection-sort-view").collapse("hide");
  $("#binary-search-view").collapse("show");
});

$("#option-selection-sort").on("click", function (e) {
  e.preventDefault();
  $("#bubble-sort-view").collapse("hide");
  $("#binary-search-view").collapse("hide");
  $("#linear-search-view").collapse("hide");
  $("#selection-sort-view").collapse("show");
});

$("#option-bubble-sort").on("click", function (e) {
  e.preventDefault();
  $("#linear-search-view").collapse("hide");
  $("#binary-search-view").collapse("hide");
  $("#selection-sort-view").collapse("hide");
  $("#bubble-sort-view").collapse("show");
});


$("#bubble-sort-view").on("shown.bs.collapse", function () {
  console.log("Opened");
  $(".data-container-bubble-sort").empty();
});

$("#bubble-sort-view").on("hidden.bs.collapse", function () {
  console.log("Closed");
  $(".data-container-bubble-sort").empty();
});


const stopBubbleSort = false;
const stopQuickSort = false;

$("#button-generate-linear").on("click", function (event) {
  event.preventDefault();
  generateArray();
});

$("#button-generate-binary").on("click", function (event) {
  event.preventDefault();
  console.log("trying to generate binary");
  generateBinaryArray();
});

$("#button-linear-find").on("click", function (e) {
  e.preventDefault();
  console.log("trying to find using linear search");
  findNumberUsingLinearSearch();
});

$("#button-binary-find").on("click", function (e) {
  e.preventDefault();
  console.log("trying to find using binary search");
  findNumber();
});

$("#button-bubble-sort").on("click", function (e) {
  e.preventDefault();
  blocks = document.querySelectorAll(".block");
  console.log(blocks)
  if(blocks.length < 10){
    alert('Please generate array before sorting');
  }
  bubbleSort();
});

$("#button-generate-bubble").on("click", function (e) {
  e.preventDefault();
  console.log("inside generate bubble btn click");
  $(".data-container-bubble-sort").empty();
  const num = parseInt($("#generate-bubble-input").val());
  generateBlocks(num, containerBubbleSort);
});

$("#button-generate-selection").on("click", function (e) {
  e.preventDefault();
  console.log("inside generate selection btn click");
  $(".data-container-selection-sort").empty();
  const num = parseInt($("#generate-selection-input").val());
  generateBlocks(num, containerSelectionSort);
});

$("#button-selection-sort").on("click", function (e) {
  e.preventDefault();
  blocks = document.querySelectorAll(".block");
  console.log(blocks)
  if(blocks.length < 10){
    alert('Please generate array before sorting');
  }
  selectionSort();
});


$("#button-generate-linear").on("click", function (e) {
  e.preventDefault();
  console.log("button working");
});

function generateBlocks(num, container) {
  console.log("inside generate bubble ", num);
  if (num && typeof num !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }

  if (num < 10 || num > 40) {
    alert("Please enter value between 10-40");
    return;
  }
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 100);

    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${value * 3}px`;
    block.style.transform = `translateX(${i * 30}px)`;

    const blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = value;

    block.appendChild(blockLabel);
    container.appendChild(block);
  }
}

function swap(el1, el2, container) {
  return new Promise((resolve) => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    // Wait for the transition to end!
    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 250);
    });
  });
}

function swap(el1, el2, container) {
  return new Promise((resolve) => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    var clonedElement1 = el1.cloneNode(true);
    var clonedElement2 = el2.cloneNode(true);

    // Wait for the transition to end!
    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.replaceChild(clonedElement1, el2);
        container.replaceChild(clonedElement2, el1);
        resolve();
      }, 250);
    });
  });
}

async function bubbleSort(delay = 100) {
  if (delay && typeof delay !== "number") {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i += 1) {
    for (let j = 0; j < blocks.length - i - 1; j += 1) {
      blocks[j].style.backgroundColor = "#FF4949";
      blocks[j + 1].style.backgroundColor = "#FF4949";

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(blocks[j].childNodes[0].innerHTML);
      const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1], containerBubbleSort);
        blocks = document.querySelectorAll(".block");
      }

      blocks[j].style.backgroundColor = "#58B7FF";
      blocks[j + 1].style.backgroundColor = "#58B7FF";
    }

    blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
  }
}

async function selectionSort(delay = 300) {
  if (delay && typeof delay !== "number") {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  let blocks = document.querySelectorAll(".block");

  let len = blocks.length;
  for (let i = 0; i < len; i++) {
    let min = i;

    for (let j = i + 1; j < len; j++) {
      blocks[min].style.backgroundColor = "#FF4949";
      blocks[j].style.backgroundColor = "#FF4949";
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(blocks[min].childNodes[0].innerHTML);
      const value2 = Number(blocks[j].childNodes[0].innerHTML);
      console.log("checking values :", value1, value2);
      if (value1 > value2) {
        blocks[min].style.backgroundColor = "#58B7FF";
        min = j;
      } else {
        blocks[j].style.backgroundColor = "#58B7FF";
      }
    }
    if (min !== i) {
      await swap(blocks[i], blocks[min], containerSelectionSort);
      blocks = document.querySelectorAll(".block");
      blocks[min].style.backgroundColor = "#58B7FF";
      blocks[i].style.backgroundColor = "#58B7FF";
    } else {
      blocks[i].style.backgroundColor = "#58B7FF";
    }
  }
}

function generateArray() {
  //variables
  var $generateGroup = $(".generate-linear");
  var $generateInput = $("#generate-linear-input");
  var $generateInputVal = $generateInput.val();
  var $generateButton = $("#button-generate-linear");
  var $findInput = $("#find-linear-input");
  var $findButton = $("#button-linear-find");
  var $arraySection = $(".linear-array-section");
  //validation
  if (
    $.isNumeric($generateInputVal) &&
    $generateInputVal >= 10 &&
    $generateInputVal <= 100
  ) {
    //set styling if success
    $generateGroup.removeClass("has-error");
    $generateButton.removeClass("error");
    $generateGroup.addClass("has-success");
    $generateButton.addClass("success");
    //remove styling after 2s
    setTimeout(function () {
      $generateGroup.removeClass("has-success");
      $generateButton.removeClass("success");
    }, 2000);
    //disable generate input group
    $generateInput.prop("disabled", true);
    $generateButton.prop("disabled", true);
    //enable find input group
    $findInput.prop("disabled", false);
    $findButton.prop("disabled", false);
    //clear array section
    $arraySection.empty();
    //generate array = create divs and append them to array section
    for (var i = 0; i < $generateInputVal; i++) {
      var $number = $("<div>", {
        class: "l-number",
      });
      $arraySection.append($number.text(i + 1));
    }
  } else {
    // set styling if error
    $generateGroup.removeClass("has-success");
    $generateButton.removeClass("success");
    $generateGroup.addClass("has-error");
    $generateButton.addClass("error");
    alert('Please enter value between 10-100')
  }
}

function generateBinaryArray() {
  //variables
  console.log("inside binary gen");
  var $generateGroup = $(".generate-binary");
  var $generateInput = $("#generate-binary-input");
  var $generateInputVal = $generateInput.val();
  var $generateButton = $("#button-generate-binary");
  var $findInput = $("#find-binary-input");
  var $findButton = $("#button-binary-find");
  var $arraySection = $(".binary-array-section");
  //validation
  if (
    $.isNumeric($generateInputVal) &&
    $generateInputVal >= 10 &&
    $generateInputVal <= 100
  ) {
    //set styling if success
    $generateGroup.removeClass("has-error");
    $generateButton.removeClass("error");
    $generateGroup.addClass("has-success");
    $generateButton.addClass("success");
    //remove styling after 2s
    setTimeout(function () {
      $generateGroup.removeClass("has-success");
      $generateButton.removeClass("success");
    }, 2000);
    //disable generate input group
    $generateInput.prop("disabled", true);
    $generateButton.prop("disabled", true);
    //enable find input group
    $findInput.prop("disabled", false);
    $findButton.prop("disabled", false);
    //clear array section
    $arraySection.empty();
    //generate array = create divs and append them to array section
    for (var i = 0; i < $generateInputVal; i++) {
      var $number = $("<div>", {
        class: "b-number",
      });
      $arraySection.append($number.text(i + 1));
    }
  } else {
    // set styling if error
    $generateGroup.removeClass("has-success");
    $generateButton.removeClass("success");
    $generateGroup.addClass("has-error");
    $generateButton.addClass("error");
    alert('Please enter value between 10-100')
  }
}

async function findNumberUsingLinearSearch() {
  const animationSpeed = 200;
  var $generateInput = $("#generate-linear-input");
  var $generateInputVal = $generateInput.val();
  var $findInput = $("#find-linear-input");
  var $findInputVal = $findInput.val();
  var $findGroup = $(".find-linear-grp");
  var $findButton = $("#button-linear-find");
  var max = parseInt($generateInputVal);
  console.log($generateInputVal, $findInputVal);

  if (
    $.isNumeric($findInputVal) &&
    $findInputVal >= 1 &&
    $findInputVal <= max
  ) {
    $findInput.prop("disabled", true);
    $findButton.prop("disabled", true);

    // const numbers = document.getElementsByTagName('l-number');
    for (let i = 0; i < $generateInputVal; i++) {
      var $currentNumber = $(".l-number:nth-child(" + i + ")");
      await sleep(animationSpeed);
      $currentNumber.css({
        "background-color": "#000",
        color: "#fff",
        "font-weight": "bold",
      });
      await sleep(animationSpeed);
      console.log("loop is running", i, $currentNumber.text(), $findInputVal);
      //if guessed number equals find number then stop
      if (parseInt($currentNumber.text()) === parseInt($findInputVal)) {
        //found number animation
        console.log("found the correct number");
        $currentNumber.css({
          color: "#fff",
          "background-color": "#5cb85c",
          border: "3px solid #4cae4c",
          width: "42px",
          height: "42px",
        });
        break;
      } else {
        console.log("inside linear else block");
        //wrong number animation
        $currentNumber.css({
          color: "#d43f3a",
          "background-color": "#fcfcfc",
          border: "3px solid #d43f3a",
          opacity: "0.4",
        });
        await sleep(animationSpeed);
      }
    }
  }
}

async function findNumber() {
  //variables
  var animationSpeed = 600;
  var $generateInput = $("#generate-binary-input");
  var $generateInputVal = $generateInput.val();
  var $findInput = $("#find-binary-input");
  var $findInputVal = $findInput.val();
  var $findGroup = $(".find-binary-grp");
  var $findButton = $("#button-binary-find");
  var min = 1;
  var max = parseInt($generateInputVal);
  var guess; //console.log(min,max,parseInt($guessNumber.text()));
  console.log($generateInputVal, $findInputVal);
  //validation
  if (
    $.isNumeric($findInputVal) &&
    $findInputVal >= 1 &&
    $findInputVal <= max
  ) {
    //set styling if success
    $findGroup.removeClass("has-error");
    $findButton.removeClass("error");
    $findGroup.addClass("has-success");
    $findButton.addClass("success");
    //remove styling after 2s
    setTimeout(function () {
      $findGroup.removeClass("has-success");
      $findButton.removeClass("success");
    }, 2000);
    //disable find input group
    $findInput.prop("disabled", true);
    $findButton.prop("disabled", true);
    // --- binary search loop ---
    while (max >= min) {
      //compute guess as the average of max and min
      guess = Math.floor((min + max) / 2);
      var $guessNumber = $(".b-number:nth-child(" + guess + ")");
      //guessed number animation
      await sleep(animationSpeed);
      $guessNumber.css({
        "background-color": "#000",
        color: "#fff",
        "font-weight": "bold",
      });
      await sleep(animationSpeed);
      //if guessed number equals find number then stop
      if (parseInt($guessNumber.text()) === parseInt($findInputVal)) {
        //found number animation
        $guessNumber.css({
          color: "#fff",
          "background-color": "#5cb85c",
          border: "3px solid #4cae4c",
          width: "42px",
          height: "42px",
        });
        //fade out all divs except guessed
        $(".b-number").not($guessNumber).css({ opacity: "0.4" });
        await sleep(animationSpeed * 2);
        showRepeatButton();
        break;
      }
      //if guessed number is to low, set new min value
      else if (parseInt($guessNumber.text()) < parseInt($findInputVal)) {
        //wrong number animation
        $guessNumber.css({
          color: "#d43f3a",
          "background-color": "#fcfcfc",
          border: "3px solid #d43f3a",
        });
        await sleep(animationSpeed);
        //fade out all divs <= guess
        $(".b-number")
          .slice(min - 1, parseInt($guessNumber.text()))
          .css({ opacity: "0.4" });
        min = guess + 1;
      }
      //if guessed number is to high, set new max value
      else {
        //wrong number animation
        $guessNumber.css({
          color: "#d43f3a",
          "background-color": "#fcfcfc",
          border: "3px solid #d43f3a",
        });
        await sleep(animationSpeed);
        //fade out all divs >= guess
        $(".b-number")
          .slice(parseInt($guessNumber.text()) - 1, max)
          .css({ opacity: "0.4" });
        max = guess - 1;
      }
    }
  } else {
    // set styling if error
    $findGroup.removeClass("has-success");
    $findButton.removeClass("success");
    $findGroup.addClass("has-error");
    $findButton.addClass("error");
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}




// reset btn click listeners

$("#reset-linear-search").click(function(e){
  e.preventDefault();
  repeat($("#generate-linear-input"),$("#find-linear-input"),$("#button-generate-linear"),$("#button-linear-find"),$(".linear-array-section"))
})

$("#reset-binary-search").click(function(e){
  e.preventDefault();
  repeat($("#generate-binary-input"),$("#find-binary-input"),$("#button-generate-binary"),$("#button-binary-find"),$(".binary-array-section"))
})

$("#reset-selection-sort").click(function(e){
  e.preventDefault();
  repeat($("#generate-selection-input"),null,$("#button-generate-selection"),$("#button-selection-sort"),$(".data-container-selection-sort"))
})

$("#reset-linear-search").click(function(e){
  e.preventDefault();
  repeat($("#generate-linear-input"),$("#find-linear-input"),$("#button-generate-linear"),$("#button-linear-find"),$(".linear-array-section"))
})

function repeat(genInput,findInput,genBtn,findbtn,arraySection) {

  //enable find input group
  genInput.prop('disabled', false);
  if(findInput){
    findInput.prop('disabled', false);
  }
  genBtn.prop('disabled', false);
  
  findbtn.prop('disabled',false)
  //clear array section
  console.log(arraySection);
  arraySection.empty();
 
  genInput.val('');
  findInput.val('');
}