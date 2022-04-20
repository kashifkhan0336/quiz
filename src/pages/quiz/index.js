import "./index.css";
import "../shared_css/shared.css";
import ArgonStorage from "argon-storage";
const store = new ArgonStorage({ compress: true });
import $ from "jquery";
window.$ = $;
const quiz = store.get("c_qz", true);
function submit() {
  let sc = 0;
  $("body").css("pointer-events", "none").css("filter", "blur(1px)");
  quiz.quiz_questions.forEach((question, question_index) => {
    function selection() {
      if ($(`input:radio[name ='q${question_index}a']:checked`).val()) {
        return $(`input:radio[name ='q${question_index}a']:checked`).data(
          "index"
        );
      } else {
        return "0";
      }
    }
    console.log(store.get(`q_${question_index}`));
    console.log(selection());
    if (selection() == store.get(`q_${question_index}`)["ans"]) {
      sc = sc + 1;
    } else {

    }
  });

  store.set("sc", `${sc}/${quiz.quiz_questions.length}`);
  window.location.href = "result.html";
}
if (store.get("user") && store.get("auth") && store.get("c_qz")) {
  console.log("Authenticated!");
  countdown("timer", 0, parseInt(quiz.quiz_time_in_sec));
  console.log(store.get("c_qz"));
  $("h1").text(quiz.quiz_name);
  quiz.quiz_questions.forEach((question, question_index) => {
    store.set(`q_${question_index}`, {
      q: question.index,
      ans: question.correct_option_index,
    });
    $(".questions-container").append(
      `<div class="q${question_index} ques">
      <p class="question">
        <strong>Q1.</strong> ${question.text}?
      </p>
      <ul class="choices">
      
      </ul>
    </div>`
    );
    question.options.forEach((e, index) => {
      $(`.q${question_index} > .choices`).append(`
      <li class="choice">
        <input type="radio" name="q${question_index}a" id="1a${
        index + 1
      }" data-index="${index}" />
        <label for="1a${index + 1}">${e.text}</label>
      </li>`);
    });
  });

  $(".questions-container").append(`          <div class="btn-container">
  <a href="#" class="submit-btn">Submit</a>
</div>  `);
  $(".submit-btn").click(function () {
    submit();
  });
} else {
  window.location.href = "index.html";
  console.log("401");
}

function countdown(elementName, minutes, seconds) {
  var element, endTime, hours, mins, msLeft, time;
  function twoDigits(n) {
    return n <= 9 ? "0" + n : n;
  }

  element = document.getElementById(elementName);
  endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
  updateTimer();

  function updateTimer() {
    msLeft = endTime - +new Date();

    if (msLeft < 1000) {
      element.innerHTML = "Time is up!";
      // if (!timeUpOverlay.classList.contains("visible")) {
      //   ansChecker();
      // }
      submit();
    } else {
      time = new Date(msLeft);
      hours = time.getUTCHours();
      mins = time.getUTCMinutes();
      element.innerHTML =
        (hours ? hours + ":" + twoDigits(mins) : mins) +
        ":" +
        twoDigits(time.getUTCSeconds());
      setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
    }
  }
}
