const COPY_BYTTON_APPLY_CLASS = 'copy-button-apply';
const DEFAULT_BACKGROUD_STYLE = 'background-color: #eecf9; display: inline-block; padding: 3px; align-items: center; justify-content: center; user-select: none;';
const SENDER_BACKGROUD_STYLE = 'background-color: #efefef; display: inline-block; padding: 3px; align-items: center; justify-content: center; user-select: none;';
const DOWN_BACKGROUD_STYLE = 'background-color: #dadada; display: inline-block; padding: 3px; align-items: center; justify-content: center; user-select: none;';
const DEFAULT_BUTTON_CLASS = 'copy-button';
const INNER_TEXT = "TS copy";

const intervalBoard = setInterval(function() {
    let items = document.getElementsByClassName('tbTileContent');
    for (let i = 0; i < items.length; i++) {
        if (!items[i].classList.contains(COPY_BYTTON_APPLY_CLASS)){
            applyBoardButton(items[i]);
        }
    }
} , 500);

const intervalWorkItem = setInterval(function() {
    boardItem = document.getElementsByClassName('work-item-form-header-controls-container')[0];
    if (boardItem && !boardItem.classList.contains(COPY_BYTTON_APPLY_CLASS)){
        applyTaskButton(boardItem);
    }
} , 500);


/**
 * Добавить кнопку странице задания.
 * @param {Object} boardItem Контейнер для кнопки доски.
 */
function applyTaskButton(boardItem) {
    boardItem.classList.add(COPY_BYTTON_APPLY_CLASS);

    div = document.createElement('div');
    div.classList.add('workitemcontrol');
    div.classList.add('work-item-control');
    div.classList.add('initialized');

    let btn = getButton([DEFAULT_BUTTON_CLASS] ,function() {
        let fullTask = (document.getElementsByClassName('caption')[0].innerHTML).split(' ');
        let title = document.getElementsByClassName('wrap')[0].children[0].value
        navigator.clipboard.writeText(`${fullTask[1]}: ${fullTask[0]}. ${title}`);
    });
    btn.style.marginTop = '2px';

    boardItem.append(div);
    div.append(btn);
};

/**
 * Добавить кнопку элементу доски.
 * @param {Object} boardItem Элемент доски.
 */
function applyBoardButton(boardItem) {
    boardItem.classList.add(COPY_BYTTON_APPLY_CLASS);

    div = document.createElement('div');
    div.classList.add('field-container');
    div.classList.add('onTileEditDiv');
    div.classList.add('non-combo-behavior');
    div.classList.add('ellipsis');
    div.classList.add('additional-field');
    div.style.marginTop = '-6px';
    div.style.marginBottom = '4px'

    let btn = getButton([DEFAULT_BUTTON_CLASS] ,function() {
        let taskId = boardItem.getElementsByClassName('id')[0].innerText;
        let taskType = boardItem.getElementsByClassName('work-item-type-icon')[0].ariaLabel;
        let title = boardItem.getElementsByClassName('clickable-title')[0].innerText;
        navigator.clipboard.writeText(`${taskId}: ${taskType}. ${title}`);
    });
    
    boardItem.append(div);
    div.append(btn);
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