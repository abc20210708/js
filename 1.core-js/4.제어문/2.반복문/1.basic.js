//조건이 t순간 내부실행
//코드를 실행하면 다시 위로 올라와서 판단
//조건이 참일 동안만!반복

//n횟수제어용도
var n = 1; //1.제어변수 선언 (begin :시작값)/1부터~

while (n <= 10) { //2.조건식 (end:끝값)/10될 때까지~
    console.log(`${n}번 학생 안녕하세요 :)`);
    n++; //3. 증감식 (step:증감값-횟수제어)/한 개씩 증가시키면서
}

