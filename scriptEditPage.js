const COPY_BYTTON_APPLY_CLASS = 'copy-button-apply';
const DEFAULT_BACKGROUD_STYLE = 'background-color: #eecf9; display: inline-block; padding: 3px; align-items: center; justify-content: center; user-select: none;';
const SENDER_BACKGROUD_STYLE = 'background-color: #efefef; display: inline-block; padding: 3px; align-items: center; justify-content: center; user-select: none;';
const DOWN_BACKGROUD_STYLE = 'background-color: #dadada; display: inline-block; padding: 3px; align-items: center; justify-content: center; user-select: none;';
const DEFAULT_BUTTON_CLASS = 'copy-button';
const INNER_TEXT = "TS copy";

const intervalWorkItem = setInterval(function() {
    boardItem = document.getElementsByClassName('work-item-form-header-controls-container')[0];
        if (boardItem && !boardItem.classList.contains(COPY_BYTTON_APPLY_CLASS)){
            applyButton(boardItem);
        }
} , 500);

/**
 * Добавить кнопку странице задания.
 * @param {Object} boardItem Контейнер для кнопки доски.
 */
function applyButton(boardItem) {
    boardItem.classList.add(COPY_BYTTON_APPLY_CLASS);

    let btn = getButton([DEFAULT_BUTTON_CLASS] ,function() {
        let fullTask = (document.getElementsByClassName('caption')[0].innerHTML).split(' ');
        let title = document.getElementById('witc_1_txt').value;
        navigator.clipboard.writeText(`${fullTask[1]}: ${fullTask[0]}. ${title}`);
    });
    btn.style.marginTop = '2px';

    boardItem.append(btn);
};

/**
 * Получить готовую кнопку.
 * @param {Array} classList Применяемые классы. 
 * @param {Function} onclick Обработчик нажатия.
 */
function getButton(classList, onclick) {
    button = document.createElement('div');
    button.innerText = INNER_TEXT;
    button.style.cssText = DEFAULT_BACKGROUD_STYLE;

    for (let i = 0; i < classList.length; i++) {
        button.classList.add(classList[i])
    }

    button.addEventListener('mouseenter', function(item) {
        item.currentTarget.attributes.style.value = SENDER_BACKGROUD_STYLE;
    });
      
    button.addEventListener('mouseleave', function(item) {
        item.currentTarget.attributes.style.value = DEFAULT_BACKGROUD_STYLE;
    });

    button.addEventListener('mousedown', function(item) {
        onclick();
        item.currentTarget.attributes.style.value = DOWN_BACKGROUD_STYLE;
    });

    button.addEventListener('mouseup', function(item) {
        onclick();
        item.currentTarget.attributes.style.value = SENDER_BACKGROUD_STYLE;
    });

    return button;
}