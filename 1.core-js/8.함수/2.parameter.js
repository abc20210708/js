
// x ~ y 까지의 누적합을 구하는 함수 정의
//함수를 정의할 때 외부에서 받아올 값을
//저장하는 변수
//매개변수 (parameter)
//밑에 예제 x(begin),y(end)가 매개변수!
//calcRangeTotal(10); 한 개만 주면??//
//비교불가 NaN
// b:10, e:undefined
//false니까 total 0//
function calcRangeTotal(begin, end) {
    console.log(`b:${begin}, e:${end}`);
    var total = 0;
    for (var n = begin; n <= end; n++) {
        total += n;
    }
    return total;
}

console.log('====================');
//함수를 호출할 때 함수에 전달하는 값
//3, 8을 인수(argument)라고 부름
//3과8을 받아주는 parameter
var result1 = calcRangeTotal(3, 8);
console.log(result1);

var result2 = calcRangeTotal(10);
console.log(result2);

var result3 = calcRangeTotal(10, 20, 30);
console.log(result3);

// var result4 = calcRangeTotal();
// begin=1, end=10

// var result2 = calcRangeTotal(5);
// 하나만 줫을 때 5~10까지

console.log('====================');

//매개 변수의 기본값
// ES5+
//sayHello();일 때 한국어!
//sayHello('중국어');  -> 따쟈하오!
function sayHello(language='한국어') {

    //ES5
    // language = language || '한국어';
                //undefined 단축


    if (language === '한국어') {
        console.log('안녕하세요 :)');
    } else if (language === '영어') {
        console.log('hello :)');
    } else if ( language === '중국어') {
        console.log('따쟈하오!');
    }
}

sayHello('중국어');

console.log('====================');

//매개변수가 없는 함수 
//없어도 ()는 작성해야함 
//() 지우면 ㄴㄴ
//Math.random()도 매개변수가 없는 함수
function selectRandomPet() {
    var pets = ['멍멍이', '야옹이', '짹짹이', '어흥이', '꾹꾹이'];
    //랜덤 정수 배열 사이즈만큼 생성
    var rn = Math.floor(Math.random() * pets.length);
    return pets[rn];


}

console.log(selectRandomPet());
