//==========전역 변수=========//

const todos = [{
        id: 1,
        text: "할 일 1",
        done: false
    },
    {
        id: 2,
        text: "할 일 2",
        done: false
    },
    {
        id: 3,
        text: "할 일 3",
        done: false
    }
];



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

//새로운 할 일을 화면에 렌더링하는 함수
function renderNewTodo(newToDo) {

    const $newLi = document.createElement('li');

    const $toDoList = document.querySelector('.todo-list');
    $toDoList.appendChild($newLi);
    $newLi.classList.add('todo-list-item');
    $newLi.dataset.id = newToDo.id;

    $newLi.innerHTML = `
        <label class="checkbox">
        <input type="checkbox">
        <span class="text">${newToDo.text}</span>
        </label>
        <div class="modify">
            <span class="lnr lnr-undo"></span>
        </div>
        <div class="remove">
            <span class="lnr lnr-cross-circle"></span>
        </div>`;


}

//할 일 추가 기능 처리
function insertTodoData() {

    const $todoText = document.getElementById('todo-text');

    //1.데이터 처리
    const newToDo = {
        id: makeNewId(),
        text: $todoText.value,
        done: false
    }
    //console.log(newToDo);

    todos.push(newToDo);
    // console.log(todos);

    //2. 화면에 데이터 렌더링
    renderNewTodo(newToDo);

    //3.입력완료 input 텍스트 제거
    $todoText.value = '';
}

    //data-id 값으로 배열을 탐색하여 인덱스를 리턴
    function findIndexById(dataId) {

        for(let i=0; i <todos.length; i++) {
            if(todos[i].id === dataId) {
                return i;
            }
        }
        return null; //못찾았을 때 null리턴 혹은 -1

    }

//할 일 완료 변화 처리
function changCheckState($label) {
    /* 
    1. css 변동: 체크가 된 label 태그를 찾아 checked 클래스 추가
    2. 이벤트가 발생한 그 label을 찾아서 처리하려면 이벤트 타겟정보가
    필요함
    3. 이벤트 타겟정보는 이 함수 호출한 핸드러가 알고 있음.
    */
   $label.classList.toggle('checked');

   /* 
   4. 문제상황: css만 변하고 실제 데이터(done)은 변동이 없음.
   5. todos배열의 해당 객체에 접근해서 done값을 변동시켜야함.
   6. 만약 2번째 체크박스를 눌렀으면 todos 배열의 1번 인덱스에
      접근하여 해당 done값을 반대로 수정해야 함.

   7. 인덱스에 접근하려면 인덱스를 알아내야 하고 그러려먼
      id 정보가 필요하다.
   */
    const dataId = +$label.parentNode.dataset.id;
    //console.log(dataId);

    //8. id값을 기반으로 배열을 탐색하여 data-id와 일치하는
    //   id 프로퍼티를 가진 객체가 몇 번째에 있었는지를 체크
    const idx = findIndexById(dataId);
    //console.log(`idx:${idx}`);

    //9.찾은 인덱스로 배열에 해당 객체에 접근하여 done을 수정
    if (idx !== null) {
        todos[idx].done = !todos[idx].done;
    }
    console.log(todos);
}


// 할 일 삭제 처리 함수
function removeToDoData($li) {

    //1.화면처리 : ul에서 작세대상 li를 제거
    const $ul = document.querySelector('.todo-list');
    $ul.removeChild($li);

    //2. 배열 데이터 삭제처리
    const delIdx = findIndexById(+$li.dataset.id);
    todos.splice(delIdx, 1);

    // console.log(todos);
}

//수정모드 진입 처리
function enterModifyMode($modSpan) {

    //버튼 모양을 교체 (클래스 교체)
    $modSpan.classList.replace('lnr-undo','lnr-checkmark-circle');

    //텍스트 span을 input:text로 교체
    //span 태그 찾기
    const $textSpan = $modSpan.parentNode.previousElementSibling.lastElementChild;
    console.log($textSpan);

    //input 태그 만들기
    const $modInput = document.createElement('input');
    $modInput.setAttribute('type', 'text');
    $modInput.setAttribute('value', $textSpan.textContent);
    $modInput.classList.add('modify-input');

    //태그 교체
    const $label = $textSpan.parentNode;
    $label.replaceChild($modInput, $textSpan);
}


//할 일 수정 완료 처리
function modifyToDoData($modSpan){ 


    //1. 버튼 모양을 원래대로 되돌림
    //console.log($modSpan);
    $modSpan.classList.replace('lnr-checkmark-circle','lnr-undo');
    //2. input text를 다시 span으로 교체
    const $label = $modSpan.parentNode.previousElementSibling;
    const $modInpu = $label.lastElementChild
   const $modInput = document.createElement('input');
   const $label = $modInput.parentNode;
   $label.replaceChild($modSpan, $modInput);
    
    //3. 배열 데이터도 수정
    

    console.log(todos);
    
}

//==========메인 실행=========//
(function () {

    //할 일 추가 이벤트 
    const $addBtn = document.getElementById('add');
    $addBtn.addEventListener('click', e => {
        e.preventDefault(); //서버 전송기능 중단
        //console.log("애드버튼 클릭됨!!");

        insertTodoData();
    });

    //할 일 완료 (체크박스) 이벤트
    const $toDoList = document.querySelector('.todo-list');
    $toDoList.addEventListener('change', e => {

        if(!e.target.matches('.checkbox input[type=checkbox]')) return;
        //console.log('체크 박스 이벤트 발생!');

        //console.log(e.target.parentNode);
        changCheckState(e.target.parentNode);
    });

    //할 일 삭제버튼 클릭 이벤트 
    $toDoList.addEventListener('click', e => {
        
        if(!e.target.matches('.remove span')) return;
        
        // console.log('삭제버튼 클릭됨!');
        // console.log(e.target);

        removeToDoData(e.target.parentNode.parentNode);
    });

    //할 일 수정 클릭 이벤트
    $toDoList.addEventListener('click', e => {

        if (e.target.matches('.modify .lnr-undo')) {
            //수정 모드 진입처리
            console.log('수정모드진입버튼클릭!');
            enterModifyMode(e.target);
        } else if (e.target.matches('.modify .lnr-checkmark-circle')) { 
            //수정 완료료 처리
            modifyToDoData(e.target);
        } else { //둘 다 아닌 이상한 거 눌렀으면
            return;
        }

    })

})();