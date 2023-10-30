// ---------------------------------- Task section ----------------------------------

// To check which category is active
function checkActive() {

    // Store the ID of the selected category
    let classID = $('.categories-panel div input[type="radio"]:checked').attr('id');

    // If any div in the task-panel has class name resembling with the classID, then enter
    if($('.task-panel').children('div').hasClass(`${classID}`)) {

        // First remove the hide class from all the div's in the task-panel
        $('.task-panel').children('div').addClass('hide');
        // Remove hide class from spotify and youtube
        $('.task-panel div.spotify').removeClass('hide');
        $('.task-panel div.youtube').removeClass('hide');
        // Now remove the hide class from the div that has class name resembling with the classID
        $(`.task-panel div.${classID}`).removeClass('hide');
    }
}

// To add new Task section when a new category is added
function addTaskCategory() {

    // Get the length of the number of task sections in task-panel
    let categoryNumber = $('.task-panel').children('div').length;
    // Get the length of the number of categories in categories-panel
    let categoryCount = $('.categories-panel').children('div').length;
    // Get the name of the last category in categories-panel
    let categoryTitle = $('.categories-panel div:last input[type=radio]').attr('id');

    // Create a new Task section with corresponding category title
    let newTaskCategory = 
        `<div class='category-${categoryNumber+1} ${categoryTitle}' id='for${categoryTitle}'>` + 
            '<div class="container">' + 
                '<div class="task-container">' + 
                '</div>' + //task-container
                '<div class="flex-row add-task">' + 
                    '<div class="flex-row add-task-btn" onclick="openForm()">' + 
                        '<svg class="add-task-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">' + 
                            '<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>' + 
                        '</svg>' + 
                    '</div>' + //add-task-btn
                    '<div class="tooltip tooltip-add-task">' + 
                        '<span class="tooltip-contents">Add Task</span>' + 
                    '</div>' + //tooltip-add-task
                '</div>' + //add-task
            '</div>' + //container
            `<div class="flex-row pagination" id="${categoryTitle}Pagination">` + 
            '</div>' + //pagination
        '</div>'; //category
    
    // Append the new task section if category at kost 3 (Limit of 4 task sections)
    if(categoryNumber < 4) {
        $('.task-panel').append(newTaskCategory);
    }

    // Get the length of the number of task sections in task-panel
    categoryNumber = $('.task-panel div').length;
    // If number of categories is not euqal to number of task sections, remove the extra added task section
    if(categoryNumber != categoryCount) {
        $(`.task-panel div.category-${categoryNumber}`).remove();
    }

    // Check which category is active
    checkActive();
}


// Toggle clock animation
$(document).on('click', '.start-pause', function() {
    toggleTimer($(this).attr('id'));
});
function toggleTimer(taskID) {
    if($(`div.start-pause#${taskID} svg ellipse`).hasClass('timer-off'))
    {
        $(`div.start-pause#${taskID} svg g:eq(1)#clockSideButton`).css({'animation-play-state': 'paused', 
                                   'animation' : 'none'})
        $(`div.start-pause#${taskID} svg ellipse`).removeClass('timer-off');
        $(`div.start-pause#${taskID} svg ellipse`).addClass('timer-on');
        $(`div.start-pause#${taskID} svg g:eq(0)#clockHand`).css({'animation-play-state': 'running'});
        $(`div.start-pause#${taskID} svg g:eq(2) g:eq(0)#clockStartPushHorizontal`).css({'animation-play-state': 'running', 
                                   'animation' : 'clock-start-push-horizontal 1000ms linear 1 normal forwards'});
        $(`div.start-pause#${taskID} svg g:eq(2) g:eq(1)#clockStartPushVertical`).css({'animation-play-state': 'running', 
                                   'animation': 'clock-start-push-vertical 1000ms linear 1 normal forwards'});
    }
    else
    {
        $(`div.start-pause#${taskID} svg g:eq(1)#clockSideButton`).css({'animation-play-state': 'running', 
                                   'animation' : 'clock-side-button-push 1000ms linear normal forwards'})
        $(`div.start-pause#${taskID} svg ellipse`).removeClass('timer-on')
        $(`div.start-pause#${taskID} svg ellipse`).addClass('timer-off');
        $(`div.start-pause#${taskID} svg g:eq(0)#clockHand`).css({'animation-play-state': 'paused'})
        $(`div.start-pause#${taskID} svg g:eq(2) g:eq(0)#clockStartPushHorizontal`).css({'animation-play-state': 'paused', 
                                   'animation' : 'none'});
        $(`div.start-pause#${taskID} svg g:eq(2) g:eq(1)#clockStartPushVertical`).css({'animation-play-state': 'paused', 
                                   'animation': 'none'});
    }
}


// Popup Form
function openForm() {
    $('.popup-wrapper').addClass('popup-wrapper-show');
    $('.new-task-backdrop').removeClass('backdrop-out');
    $('.new-task-backdrop').addClass('backdrop-in');
    $('.form-main').removeClass('form-out');
    $('.form-main').addClass('form-in');
}
function closeForm()
{
    $('.new-task-backdrop').removeClass('backdrop-in');
    $('.new-task-backdrop').addClass('backdrop-out');
    $('.form-main').removeClass('form-in');
    $('.form-main').addClass('form-out');
    setTimeout(function () {
        $('.popup-wrapper').removeClass('popup-wrapper-show');
    }, '150')
}


// First function call to check which category is active
checkActive();

// ---------------------------------- Task section end ----------------------------------