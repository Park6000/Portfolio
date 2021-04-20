let lastTime = 0;
let moveSpeed = 20;
let currentFirstList;

let body;
let allWorkList;
let mainWorkList;
let subWorkList;
let workListWidth;

let animating = false;
let animationPause = false;

let workDetail;

$(document).ready(() => {
    body = $('body');
    allWorkList = $('#work-list-all');
    mainWorkList = $('#work-list-main');
    subWorkList = mainWorkList.clone().attr('id', 'work-list-sub').css('display', 'none');
    allWorkList.append(subWorkList);
    workListWidth = mainWorkList.innerWidth();

    workDetail = $('#work-detail-modal');

    checkAnimationWorkList();

    $('.work').on('mouseover', () => {
        animationPause = true;
    })

    $('.work').on('mouseout', () => {
        if($('.work-detail-modal-used').length > 0) return;
        animationPause = false;
    })

    $('.work').on('click', (event) => {
        workDetail.addClass('work-detail-modal-used');
        let target = $(event.target);
        animationPause = true;
    })
    
    $('#close-modal-btn').on('click', () => {
        workDetail.removeClass('work-detail-modal-used');
        animationPause = false;
    })
})

function moveWorkList() {
    if(!animating) return;
    
    let currentTime = new Date().getTime();
    let deltaTime = (currentTime - lastTime) * 0.001;
    lastTime = currentTime;
    
    let currentLeft = parseFloat(allWorkList.css('left'));
    let targetLeft = currentLeft + moveSpeed * deltaTime * -1;

    if(targetLeft <= -workListWidth) {
        allWorkList.append(currentFirstList);
        targetLeft += workListWidth;
        currentFirstList = $(allWorkList.children().get(0));
    }

    if(!animationPause)
        allWorkList.css('left', targetLeft);

    requestAnimationFrame(moveWorkList)
}

$( window ).resize(function() {
    checkAnimationWorkList();
});

function checkAnimationWorkList() {
    if(workListWidth >= body.innerWidth()) {
        if(animating) return;
        animating = true;
        subWorkList.css('display', 'flex');
        allWorkList.css('left', '0');
        lastTime = new Date().getTime();
        currentFirstList = mainWorkList;
        requestAnimationFrame(moveWorkList)
    } else {
        animating = false;
        subWorkList.css('display', 'none');
        allWorkList.css('left', 'auto');
    }
}

