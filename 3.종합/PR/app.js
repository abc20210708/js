//==========전역 변수=========//


const todos = [{
    id: 1,
    text: "예산",
    cost: 0
}];






//==========함수 정의=========//

//추가될 새로운 할 일의 아이디를 생성하는 함수
function makeNewId() {
    if (todos.length <= 0) { // 기존 할 일 데이터가 하나도 없음
        return 1;
    } else {
        //맨 마지막 할 일의 id + 1을 리턴
        return todos[todos.length - 1].id + 1;
    }

}



//새로운 할 일을 화면에 렌더링 하는 함수
function renderNewTodo(newToDo) {

    const $newLi = document.createElement('li');

    const $toDoList = document.getElementById('list');
    $toDoList.appendChild($newLi);
    $newLi.classList.add('list-item');
    $newLi.dataset.id = newToDo.id;

    $newLi.innerHTML = `${newToDo.text} <em><span>${newToDo.cost} </span></em><p>
    <!-- 수정 버튼 -->
    <div class="modify"><i class="fas fa-undo-alt"></i></div> 
    <!-- 삭제 버튼 -->
    <div class="remove"><i class="fas fa-minus-circle"></i></div>`
}


//리스트 추가 기능 처리
function insertTodoData() {

    const $todoText = document.getElementById('budget');
    const $todocost = document.getElementById('money');
    const $sum = document.getElementById('sum');

    //1.데이터 처리
    const newToDo = {
        id: makeNewId(),
        text: $todoText.value,
        cost: $todocost.value
    }
    //console.log(newToDo);

    todos.push(newToDo);
    console.log(todos);

    //2.화면에 데이터 렌더링
    renderNewTodo(newToDo);

    //3.입력완료 input 텍스트 제거
    $todoText.value = '';
    $todocost.value = '';

    
    //4.지출 합계 계산
     
    //$sum.textContent = $todocost.text;
    
    let total = 0;
    for (var num of todos) {
        total += Number(num.cost);

        $sum.textContent = total;
        console.log(total);
    }

}


//==========메인 실행=========//
(function () {

    //리스트 추가 
    const $addBtn = document.querySelector('.finish');
    $addBtn.addEventListener('click', e => {
        e.preventDefault();
        console.log('add클릭되었음!');

        insertTodoData();
    })
})();