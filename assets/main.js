import layoutPage from './page-layout/layout.js';
import headerBox from './page-layout/header.js';

const $rootContainer = document.getElementById("root");


document.addEventListener("DOMContentLoaded", function (e) {
    $rootContainer.innerHTML = layoutPage;
    const $header = document.getElementById("header");
    $header.innerHTML = headerBox;
})