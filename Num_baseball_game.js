const $input = document.querySelector("#User_input");
const $form = document.querySelector("#User_form");
const $logs = document.querySelector("#Game_logs_text");
const $gameStart = document.querySelector("#Game_start")

let numbers
let answer

const lineBreak = () => {
  $logs.append(document.createElement(`br`));
}

const createAnswer = () => {
  numbers = []; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  answer = [];

  for (let n = 0; n < 10; n++) {
    numbers.push(n);
  }
  
  for (let n = 0; n < 3; n ++) { // 3번 반복
    const index = Math.floor(Math.random() * numbers.length); // 0~ 9까지 정수
    answer.push(numbers[index]);
    numbers.splice(index, 1);
  }
}

const gameStart = () => {
  $input.disabled = false;
  $input.focus();
  createAnswer();
  tries.length = 0;
  $logs.textContent = "컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!"
  lineBreak();
}

const tries = [];
function checkInput(input) { // 검사하는 코드 
  if (input.length !== 3) { // 길이가 3이 아닌가
    return alert('3자리 숫자를 입력해 주세요.');
  }
  if (new Set(input).size !== 3) { // 중복된 숫자가 있는가.. 살짝 이해 안됨
    return alert('중복되지 않게 입력해 주세요.');
  }
  if (tries.includes(input)) {
    return alert('이미 시도한 값입니다.'); // alert의 return값은 undefined이다.
  }
  return true;
} 

$form.addEventListener("submit", (event) => {
  event.preventDefault(); // form 기본동작인 새로고침 막기
  const value = $input.value;
  $input.value = "";
  if (!checkInput(value)) { // undefined도 if문 안에 들어가면 false
    return; // 입력 값 문제 있음
  }
  // 몇 스트라이크 몇 볼인지 검사
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) { // 일치하는 숫자 발견
      if(index === i) { // 자릿수도 같음
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }

  const message = document.createTextNode(`${tries.length+1}번째 시도 : ${value}`);
  $logs.append(message);
  lineBreak();
  $logs.append(`${ball}B${strike}S`);
  lineBreak();

  tries.push(value);

  if (answer.join("") === value) {
    const message = document.createTextNode(`${tries.length}번만에 맞히셨습니다. 게임을 종료합니다.`);
    $logs.append(message);
    $input.disabled = true;
  }  
})

