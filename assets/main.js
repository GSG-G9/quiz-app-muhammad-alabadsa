import layoutPage from "./page-layout/layout.js";
import headerBox from "./page-layout/header.js";
import startSection from "./page-layout/start.js";
import contentSection from "./page-layout/content.js";
import selectLanguage from "./quiz-options/language.js";
import questionsSection from "./quiz-questions/quiz-questions.js";
import questions from "./quiz-questions/questions.js";

const $rootContainer = document.getElementById("root");
let $resultsContainer;
let $submitButton;
let $quizQuestionsContainer;
let $optionsArea;
let $progressBar;
let $quizInfo;
let $backToLanguageList;
let $resulContainer;
let $languageSelectContainer;
let $quizQuestions;

const state = {
  selectZone: false,
  questions: [],
};

localStorage.setItem("quizapp", JSON.stringify(questions));

let currentIndex = 0;
let rightAnswersCount = 0;

function showResult(questionCount) {
  let theResults;

  if (currentIndex === questionCount) {
    $quizQuestionsContainer.remove();
    $optionsArea.remove();
    $submitButton.remove();
    $progressBar.remove();
    $quizInfo.remove();

    if (
      rightAnswersCount > questionCount / 2 &&
      rightAnswersCount < questionCount
    ) {
      theResults = `
        <div class="result-container">
          <div class="message-container">
            <span class="message good">Good</span>
            <span class="message--desc good">Good But You Have To Work Hard!</span>
          </div>
          <div class="correct-answer">
            <div>Correct Answer</div>
            <div>
              <span>${rightAnswersCount}</span>
            </div>
          </div>
          <div class="wrong-answer">
            <div>Wrong Answer</div>
            <div>
              <span>${questionCount - rightAnswersCount}</span>
            </div>
          </div>
          <div class="back-language-list">
            <button class="back-language-list__btn">Language List</button>
          </div>
        </div>
      `;
    } else if (rightAnswersCount === questionCount) {
      theResults = `
      <div class="result-container">
        <div class="message-container">
          <span class="message perfect">Perfect</span>
          <span class="message--desc">All Answer Is Correct.</span>
        </div>
        <div class="correct-answer">
          <div>Correct Answer</div>
          <div>
            <span>${rightAnswersCount}</span>
          </div>
        </div>
        <div class="wrong-answer">
          <div>Correct Answer</div>
          <div>
            <span>${questionCount - rightAnswersCount}</span>
          </div>
        </div>
        <div class="back-language-list">
          <button class="back-language-list__btn">Language List</button>
        </div>
      </div>
    `;
    } else {
      theResults = `
      <div class="result-container">
        <div class="message-container">
          <span class="message bad">Bad</span>
          <span class="message--desc bad">Most of the answers are wrong.</span>
        </div>
        <div class="correct-answer">
          <div>Correct Answer</div>
          <div>
            <span>${rightAnswersCount}</span>
          </div>
        </div>
        <div class="wrong-answer">
          <div>Wrong Answer</div>
          <div>
            <span>${questionCount - rightAnswersCount}</span>
          </div>
        </div>
        <div class="back-language-list">
          <button class="back-language-list__btn">Language List</button>
        </div>
      </div>
    `;
    }
    // const textNode = document.createTextNode('')
    $resultsContainer.innerHTML = theResults;
    $backToLanguageList = document.querySelector(".back-language-list");
    $languageSelectContainer.classList.remove("fade-out");
    $backToLanguageList.addEventListener("click", function () {
      $resulContainer.classList.add("fade-out");
      setTimeout(function () {
        // $resulContainer.innerHTML = "";
        $quizQuestions.style.display = "none";
        $languageSelectContainer.classList.remove("block-none");
      }, 500);
    });
    // $resultsContainer.style.padding = "10px";
    // $resultsContainer.style.backgroundColor = "white";
    // $resultsContainer.style.marginTop = "10px";
  }
}

function checkAnswer(rightAnswer, questionsCount) {
  let answer = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answer.length; i++) {
    if (answer[i].checked) {
      theChoosenAnswer = answer[i].dataset.answer;
    }
  }
  if (rightAnswer === theChoosenAnswer) {
    rightAnswersCount++;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  $rootContainer.innerHTML = layoutPage;
  const $header = document.getElementById("header");
  const $contentQuiz = document.getElementById("content-quiz");

  $header.innerHTML = headerBox;
  $contentQuiz.innerHTML += startSection;
  $contentQuiz.innerHTML += contentSection;
  $contentQuiz.innerHTML += selectLanguage;
  $contentQuiz.innerHTML += questionsSection;

  $languageSelectContainer = document.getElementById("language");
  $quizQuestions = document.getElementById("quiz-questions");

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
      $quizQuestionsContainer = document.querySelector(
        ".quiz-questions-container .question-area"
      );
      $submitButton = document.querySelector(".submit-button");
      $optionsArea = document.querySelector(".options-area");
      $resultsContainer = document.querySelector(".results");
      $progressBar = document.querySelector(".progress-bar");
      $quizInfo = document.querySelector(".quiz-info");
      // $backToLanguageList = document.querySelector(".back-language-list");
      // $resulContainer = document.querySelector(".result-container");
      let $progressBarJuice = document.querySelector(".progress-bar .span");

      state.questions[0].questions.sort(() => 0.5 - Math.random()).length = 10;

      $submitButton.addEventListener("click", function (e) {
        let correctAnswer = questions[0].questions[currentIndex].correctAnswer;

        currentIndex++;
        console.log(currentIndex);
        // console.log(correctAnswer);

        checkAnswer(correctAnswer, questions[0].questions.length);

        $quizQuestionsContainer.innerHTML = "";
        $optionsArea.innerHTML = "";

        $progressBarJuice.style.width = currentIndex + "0%";

        renderQuestions(
          questions[0].questions[currentIndex],
          questions[0].lang,
          questions[0].questions.length
        );

        showResult(questions[0].questions.length);
        $resulContainer = document.querySelector(".result-container");
      });

      const renderQuestions = function (questions, lang, questionsCount) {
        if (currentIndex < questionsCount) {
          console.log(currentIndex);
          console.log(questionsCount);

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
      // $backToLanguageList.addEventListener("click", function () {
      //   $resulContainer.classList.add("fade-out");

      //   setTimeout(function () {
      //     $resulContainer.classList.add("block-none");
      //   }, 500);
      // });
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
