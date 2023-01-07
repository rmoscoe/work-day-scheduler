// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  $(".saveBtn").on("click", saveInput);

  function saveInput(event) {
    //prevent the default behavior of the button
    event.preventDefault();

    //store the parent div of the clicked buttn with an id in a variable for later use
    let parentDiv;
    if (event.target.matches("i")) {
      parentDiv = $(event.target).parents().eq(1);
    } else {
      parentDiv = $(event.target).parent();
    }
    
    //save the text value in local storage
    localStorage.setItem($(parentDiv).attr("id"), $(parentDiv).children().eq(1).val());
    
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  //store the current hour in a variable
  const timeNow = Number(dayjs().format("H"));
  
  //compare timeNow against the id of each time block to apply classes
  for (i = 0; i < $(".container-lg").children().length; i++) {
    if (Number($(".container-lg").children().eq(i).attr("id").split("-").pop()) < timeNow) {
      $(".container-lg").children().eq(i).addClass("past");
    } else if (Number($(".container-lg").children().eq(i).attr("id").split("-").pop()) === timeNow) {
      $(".container-lg").children().eq(i).addClass("present");
    } else {
      $(".container-lg").children().eq(i).addClass("future");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  for (let i = 0; i < $(".container-lg").children().length; i++) {
    $(".container-lg").children().eq(i).children().eq(1).text(localStorage.getItem($(".container-lg").children().eq(i).attr("id")));
  }

  // TODO: Add code to display the current date in the header of the page.
  let todayDate = dayjs().format("dddd, MMMM D")
  let suffix;
  switch (dayjs().format("D")) {
    case "1":
      suffix = "st";
      break;
    case "21":
      suffix = "st";
      break;
    case "31":
      suffix = "st";
      break;
    case "2":
      suffix = "nd";
      break;
    case "22":
      suffix = "nd";
      break;
    default:
      suffix = "th";
  }
  console.log(suffix);

  $("#currentDay").text(todayDate + suffix);
});
