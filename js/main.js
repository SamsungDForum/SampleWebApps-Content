App = window.App || {};
App.Main = (function Main() {
    var logger = App.Logger.create({
        loggerEl: document.querySelector('.logsContainer'),
        loggerName: 'Main',
        logLevel: App.Logger.logLevels.ALL
    });

    var imageFilter = new tizen.AttributeFilter('type', 'EXACTLY', 'IMAGE');
    var audioFilter = new tizen.AttributeFilter('type', 'EXACTLY', 'AUDIO');
    var videoFilter = new tizen.AttributeFilter('type', 'EXACTLY', 'VIDEO');

    var contentListEl = document.querySelector('#content-list');

    var contentNameEl = document.querySelector('#content-name');
    var contentTypeEl = document.querySelector('#content-type');
    var contentReleaseEl = document.querySelector('#content-release');
    var contentSizeEl = document.querySelector('#content-size');
    var contentDescriptionEl = document.querySelector('#content-description');

    var BATCH_SIZE = 11;

    var basicMenu = App.Navigation.getMenu('Basic');

    function createButton(content) {
        var buttonEl = document.createElement('button');
        var nameEl = document.createElement('div');
        var typeEl = document.createElement('div');

        nameEl.innerText = content.name;
        typeEl.innerText = content.type;

        buttonEl.setAttribute('class', 'file-button');
        buttonEl.setAttribute('data-list-item', '');
        buttonEl.setAttribute('id', content.id);

        buttonEl.appendChild(nameEl);
        buttonEl.appendChild(typeEl);
        contentListEl.appendChild(buttonEl);
    }

    function registerListMenu() {
        App.Navigation.registerMenu({
            name: 'ContentListNavigation',
            nextMenu: 'Basic',
            domEl: contentListEl,
            alignment: 'vertical',
            onAfterLastItem: function () {
                resetContentInfo();
                App.Navigation.changeActiveMenu('Basic');
            },
            onNextMenu: resetContentInfo,
            onActiveItemChanged: activeItemChangeHandler
        });
        basicMenu.previousMenu = 'ContentListNavigation';
    }

    function unregisterListMenu() {
        App.Navigation.unregisterMenu('ContentListNavigation');
        basicMenu.previousMenu = '';
    }

    function errorCB(err) {
        logger.log(err.message);
    }

    function findCB(contents) {
        contentListEl.innerHTML = '';
        unregisterListMenu();
        contents.forEach(createButton);
        registerListMenu();
    }

    function resetContentInfo() {
        contentNameEl.innerText = '...';
        contentTypeEl.innerText = '...';
        contentReleaseEl.innerText = '...';
        contentSizeEl.innerText = '...';
        contentDescriptionEl.innerText = '...';
    }

    function updateContentInfo(contents) {
        var content = contents[0];

        contentNameEl.innerText = content.name || 'Name not given';
        contentTypeEl.innerText = content.type || 'UNKNOWN';
        contentReleaseEl.innerText = content.releaseDate
            ? App.Utils.dateToReadableString(content.releaseDate) : 'Date not given';
        contentSizeEl.innerText = (content.size && content.size !== 0)
            ? App.Utils.sizeToReadableString(content.size) : 'Size unknown';
        contentDescriptionEl.innerText = (content.description && content.description !== 'Unknown')
            ? content.description : 'Description not given';
    }

    function findAll() {
        tizen.content.find(findCB, errorCB, null, null, null, BATCH_SIZE);
    }

    function findImages() {
        tizen.content.find(findCB, errorCB, null, imageFilter, null, BATCH_SIZE);
    }

    function findAudio() {
        tizen.content.find(findCB, errorCB, null, audioFilter, null, BATCH_SIZE);
    }

    function findVideo() {
        tizen.content.find(findCB, errorCB, null, videoFilter, null, BATCH_SIZE);
    }

    function activeItemChangeHandler(el) {
        var matchingContentFilter = new tizen.AttributeFilter('id', 'EXACTLY', el.id);
        tizen.content.find(updateContentInfo, errorCB, null, matchingContentFilter, null, 1);
    }

    function addButtonsHandlers() {
        var buttonsWithHandlers = [
            { elementSelector: '.show-everything', handler: findAll },
            { elementSelector: '.show-images', handler: findImages },
            { elementSelector: '.show-audio', handler: findAudio },
            { elementSelector: '.show-video', handler: findVideo }
        ];

        App.KeyHandler.addHandlersForButtons(buttonsWithHandlers);
    }

    window.onload = function () {
        addButtonsHandlers();
        findAll();
        basicMenu.onPreviousMenu = function () {
            var activeEl = document.querySelector('.active');
            activeItemChangeHandler(activeEl);
        };
    };
}());
