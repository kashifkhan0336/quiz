import "./index.css";
import "../shared_css/shared.css";
import $ from "jquery";
window.$ = $;
const btn = document.querySelector(".btn");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal-wrapper");
import ArgonStorage from "argon-storage";
const store = new ArgonStorage({ compress: true });
const quizes = [
  {
    quiz_name: "HTML QUIZ",
    quiz_time_in_sec: "20",
    quiz_questions: [
      {
        index: 0,
        text: "What is HTML full form?",
        correct_option_index: 0,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
      {
        index: 1,
        text: "What is HTML1 full form?",
        correct_option_index: 0,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
      {
        index: 2,
        text: "What is HTML4 full form?",
        correct_option_index: 2,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
    ],
  },
  {
    quiz_name: "CSS QUIZ",
    quiz_time_in_sec: "20",
    quiz_questions: [
      {
        index: 0,
        text: "What is HTML full form?",
        correct_option_index: 0,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
      {
        index: 1,
        text: "What is HTML1 full form?",
        correct_option_index: 0,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
      {
        index: 2,
        text: "What is HTML4 full form?",
        correct_option_index: 2,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
    ],
  },
  {
    quiz_name: "Javascript QUIZ",
    quiz_time_in_sec: "20",
    quiz_questions: [
      {
        index: 0,
        text: "What is HTML full form?",
        correct_option_index: 0,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
      {
        index: 1,
        text: "What is HTML1 full form?",
        correct_option_index: 0,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
      {
        index: 2,
        text: "What is HTML4 full form?",
        correct_option_index: 2,
        options: [
          {
            index: 0,
            text: "Hyper Text Markup Language",
          },
          {
            index: 1,
            text: "Hyper Text Markup Line",
          },
          {
            index: 2,
            text: "Hyper Text Makeup Language",
          },
          {
            index: 3,
            text: "Hyper Teeth Markup Language",
          },
        ],
      },
    ],
  },
];
if (store.get("auth") == "YXV0aF9zcw==") {
  $(document).ready(function () {
    const quizzes = document.querySelectorAll(".quiz");
    btn.addEventListener("click", () => {
      modal.classList.add("show");
    });

    overlay.addEventListener("click", () => {
      modal.classList.remove("show");
    });

    quizzes.forEach((quiz) => {
      quiz.addEventListener("click", () => {
        quizzes.forEach((el) => {
          el.classList.remove("active");
        });
        quiz.classList.add("active");
        if (quiz.classList.contains("active")) {
          btn.disabled = false;
        }
      });
    });
  });

  quizes.forEach((quiz, index) => {
    $(".quiz-container").append(
      `<div class="quiz" data-quizIndex=${index}>${index}.${quiz.quiz_name}</div>`
    );
  });
  $(".modal-btn").click(function () {
    if (
      $("input[type=text]").val().length < 3 &&
      $("input[type=number]").val().length < 1
    ) {
      alert("Enter valid name OR roll number");
    } else {
      store.set("user", {
        u: $("input[type=text]").val(),
        r: $("input[type=number]").val(),
      });
      $(".quiz").each((e, f) => {
        if ($(f).hasClass("active")) {
          store.set(
            "c_qz",
            quizes[parseInt($(f).attr("data-quizIndex"))],
            true
          );
        }
      });
      window.location.href = "quiz.html";
    }
  });
} else {
  window.location.href = "index.html";
}
