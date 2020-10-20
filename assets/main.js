import layoutPage from "./page-layout/layout.js";
import headerBox from "./page-layout/header.js";
import startSection from "./page-layout/start.js";
import contentSection from "./page-layout/content.js";
import selectLanguage from "./quiz-options/language.js";

const state = {
  selectZone: false,
  questions: [],
};

const questions = [
  {
    lang: "javascript",
    questions: {
      question: "AAAAA",
      options: ["op_1", "op_2", "pp_3"],
      correctAnswer: "op_2",
    },
  },
  {
    lang: "css",
    questions: {
      question: "AAAAA",
      options: ["op_1", "op_2", "pp_3"],
      correctAnswer: "op_2",
    },
  },
  {
    lang: "html",
    questions: {
      question: "AAAAA",
      options: ["op_1", "op_2", "pp_3"],
      correctAnswer: "op_2",
    },
  },
];

localStorage.setItem("quizapp", JSON.stringify(questions));

const $rootContainer = document.getElementById("root");

document.addEventListener("DOMContentLoaded", function (e) {
  $rootContainer.innerHTML = layoutPage;
  const $header = document.getElementById("header");
  const $contentQuiz = document.getElementById("content-quiz");

  $header.innerHTML = headerBox;
  $contentQuiz.innerHTML += startSection;
  $contentQuiz.innerHTML += contentSection;
  $contentQuiz.innerHTML += selectLanguage;

  const $languageSelectContainer = document.getElementById("language");
  $languageSelectContainer.classList.add("block-none");

  const $options = document.querySelectorAll("[class*=language__]");

  const array = Object.values($options).map((i) => {
    // const lang = i.className.split(" ")[1].split("__")[1];
    i.addEventListener("click", function (e) {
      const lang = e.target.className.split(" ")[1].split("__")[1];

      switch (lang) {
        case "javascript":
          state.questions = JSON.parse(localStorage.getItem("quizapp")).filter(
            (q) => q.lang === "javascript"
          );
          break;
        case "css":
          state.questions = JSON.parse(localStorage.getItem("quizapp")).filter(
            (q) => q.lang === "css"
          );
          break;
        case "html":
          state.questions = JSON.parse(localStorage.getItem("quizapp")).filter(
            (q) => q.lang === "html"
          );
          break;
        default:
          "";
      }
      console.log(state.questions);
    });
  });

  const $startQuiz = document.getElementById("start-quiz");
  const $startQuizBtn = document.getElementById("start-quiz-btn");
  const $StartContentDesc = document.getElementById("start-content-desc");

  $startQuizBtn.addEventListener("click", function (e) {
    $startQuiz.classList.add("fade-left");
    $StartContentDesc.classList.add("fade-right");
    setTimeout(() => {
      $startQuiz.classList.add("block-non");
      $StartContentDesc.classList.add("block-non");
      $startQuiz.classList.remove("fade-left");
      $StartContentDesc.classList.remove("fade-right");
      $languageSelectContainer.classList.add("nonevisible");
      $languageSelectContainer.classList.remove("block-none");

      $languageSelectContainer.classList.add("fadeIn");
      $languageSelectContainer.classList.remove("nonevisible");

      document.getElementById("content-main").style.display = "none";
    }, 398);
  });
});
