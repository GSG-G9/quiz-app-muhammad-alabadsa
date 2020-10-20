import layoutPage from "./page-layout/layout.js";
import headerBox from "./page-layout/header.js";
import startSection from "./page-layout/start.js";
import contentSection from "./page-layout/content.js";
import selectLanguage from "./quiz-options/language.js";
import questionsSection from "./quiz-questions/quiz-questions.js";

const state = {
  selectZone: false,
  questions: [],
};

let currentIndex = 0;

const questions = [
  {
    lang: "javascript",
    questions: [
      {
        question: "AAAAA",
        opt_1: "Option_1",
        opt_2: "Option_2",
        opt_3: "Option_3",
        opt_4: "Option_4",
        correctAnswer: "Option_3",
      },
      {
        question: "BBBBB",
        opt_1: "Option_1",
        opt_2: "Option_2",
        opt_3: "Option_3",
        opt_4: "Option_4",
        correctAnswer: "Option_3",
      },
      {
        question: "CCCCCC",
        opt_1: "Option_1",
        opt_2: "Option_2",
        opt_3: "Option_3",
        opt_4: "Option_4",
        correctAnswer: "Option_3",
      },
    ],
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
  {
    lang: "nodejs",
    questions: {
      question: "AAAAA",
      options: ["op_1", "op_2", "pp_3"],
      correctAnswer: "op_2",
    },
  },
  {
    lang: "reactjs",
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
  $contentQuiz.innerHTML += questionsSection;

  const $languageSelectContainer = document.getElementById("language");
  const $quizQuestions = document.getElementById("quiz-questions");

  $languageSelectContainer.classList.add("block-none");
  $quizQuestions.classList.add("block-none");

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
        case "nodejs":
          state.questions = JSON.parse(localStorage.getItem("quizapp")).filter(
            (q) => q.lang === "nodejs"
          );
        case "reactjs":
          state.questions = JSON.parse(localStorage.getItem("quizapp")).filter(
            (q) => q.lang === "reactjs"
          );
          break;
        default:
          "";
      }
      const { questions } = state;
      console.log(questions);
      const $categoryLang = document.querySelector(".category span");
      const $questionsCountElm = document.querySelector(".count span");
      const $quizQuestionsContainer = document.querySelector(
        ".quiz-questions-container .question-area"
      );
      const $submitButton = document.querySelector(".submit-button");
      const $optionsArea = document.querySelector(".options-area");

      $submitButton.addEventListener("click", function (e) {
        currentIndex++;

        $quizQuestionsContainer.innerHTML = "";
        $optionsArea.innerHTML = "";

        renderQuestions(
          questions[0].questions[currentIndex],
          questions[0].lang,
          questions[0].questions.length
        );
      });

      const renderQuestions = function (questions, lang, questionsCount) {
        if (currentIndex < questionsCount) {
          $categoryLang.innerHTML =
            lang.slice(0, 1).toUpperCase() + lang.slice(1);
          $questionsCountElm.innerHTML = questionsCount;

          let $questionsTitle = document.createElement("h3");
          console.log(questions);
          let questionText = document.createTextNode(questions.question);

          console.log(questions);

          $questionsTitle.appendChild(questionText);
          $quizQuestionsContainer.appendChild($questionsTitle);

          for (let i = 1; i <= 4; i++) {
            let $answersContainer = document.createElement("div");

            $answersContainer.className = "option";

            let $radioButton = document.createElement("input");

            // Add type, name and id to radio button
            $radioButton.name = "question";
            $radioButton.type = "radio";
            $radioButton.id = `opt_${i}`;
            $radioButton.dataset.answer = questions[`opt_${i}`];

            i === 1 ? ($radioButton.checked = true) : false;

            let $theLabel = document.createElement("label");
            $theLabel.htmlFor = `opt_${i}`;
            let labelText = document.createTextNode(questions[`opt_${i}`]);
            $theLabel.appendChild(labelText);
            $answersContainer.appendChild($radioButton);
            $answersContainer.appendChild($theLabel);

            // Add The Answer Container Div to Answer Area Div
            $optionsArea.appendChild($answersContainer);
          }
        }
      };
      /*
        const questionsCounc = questions[0].length;
      const $answerArea = document.querySelector(".options-area");

      let $questionsTitle = document.createElement("h3");

      let questionText = document.createTextNode(
        questions[0].questions.question
      );

      console.log(questions[0].questions.question);

      $questionsTitle.appendChild(questionText);
      $quizQuestionsContainer.appendChild($questionsTitle);

      for (let i = 1; i <= 4; i++) {
        let $answersContainer = document.createElement("div");

        $answersContainer.className = "option";

        let $radioButton = document.createElement("input");

        // Add type, name and id to radio button
        $radioButton.name = "question";
        $radioButton.type = "radio";
        $radioButton.id = `opt_${i}`;
        $radioButton.dataset.answer = questions[0].questions[`opt_${i}`];

        i === 1 ? ($radioButton.checked = true) : false;

        let $theLabel = document.createElement("label");
        $theLabel.htmlFor = `opt_${i}`;
        let labelText = document.createTextNode(questions[0].questions[`opt_${i}`]);
        $theLabel.appendChild(labelText);
        $answersContainer.appendChild($radioButton);
        $answersContainer.appendChild($theLabel);

        // Add The Answer Container Div to Answer Area Div
        $answerArea.appendChild($answersContainer);
      }
      */
      renderQuestions(
        questions[0].questions[currentIndex],
        questions[0].lang,
        questions[0].questions.length
      );
      console.log(questions);

      $languageSelectContainer.classList.add("fade-out");
      $quizQuestions.classList.add("fadeIn");
      setTimeout(() => {
        $languageSelectContainer.classList.add("block-none");
        $quizQuestions.classList.remove("block-none");
      }, 300);
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

      //   $quizQuestions.classList.add("nonevisible");
      //   $quizQuestions.classList.remove("block-none");

      //   $quizQuestions.classList.add("fadeIn");
      //   $quizQuestions.classList.remove("nonevisible");

      document.getElementById("content-main").style.display = "none";
    }, 398);
  });
});
