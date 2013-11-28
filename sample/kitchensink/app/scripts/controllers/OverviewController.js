(function( scope ) {


    var views = [
        {
            _value_: 'M.View'

        },
        {
            _value_: 'M.SliderView'
        },
        {
            _value_: 'Form Views',
            goto:'forms'
        }
    ];

    Kitchensink.Controllers.OverviewController = M.Controller.extend({

        _nextPage: '/',

        gotoPage: function( event, element ) {

            var goto = element.model.get('goto');
            var route = '';
            switch(goto){
                case 'forms':
                    route = 'forms'
                    break;
            };

            Kitchensink.navigate({
                route: route
            });

        },

        person: M.Model.create({
            name: 'egon',
            birthday: '1383751054966',
            favorite: NO
        }),

        consoleModel: M.Model.create({
            _value_: ''
        }),

        bindingTestModel: M.Model.create({
            a: 'first attribute',
            b: 'second attribute'
        }),

        selectionListModel: M.Model.create({water: 'evian'}),
        multipleSelectionListModel: M.Model.create({water: ['evian']}),

        eventDidHappen: function( ev, elem ) {
            //            var val = this.consoleModel.get('_value_');
            this.consoleModel.set('_value_', '');
            var val = elem._type + ' ' + ev.type + ' ' + elem.getValue();
            this.consoleModel.set('_value_', val);
        },

        tmpViews: null,

        menu: null,

        hello: function() {
            console.log('hello');
        },

        nextPage: function() {
            var transition = M.PageTransitions.MOVE_TO_LEFT_FROM_RIGHT;

            if( this._nextPage === 'page2' ) {
                this._nextPage = 'page3';
                transition = M.PageTransitions.NONE;
            } else if( this._nextPage === 'page3' ) {
                this._nextPage = '/';
            } else if( this._nextPage === '/' ) {
                this._nextPage = 'page2';
            }

            Kitchensink.navigate({
                route: this._nextPage,
                transition: transition
            });
        },

        backPage: function() {
            var transition = M.PageTransitions.MOVE_TO_RIGHT_FROM_LEFT;

            if( this._nextPage === 'page3' ) {
                this._nextPage = 'page2';
                transition = M.PageTransitions.NONE;
            } else if( this._nextPage === 'page2' ) {
                this._nextPage = 'page1';
            } else if( this._nextPage === 'page1' ) {
                this._nextPage = '/';
            }

            Kitchensink.navigate({
                route: this._nextPage,
                transition: transition
            });
        },

        /**
         * The application start (after reload)
         */
        applicationStart: function() {
            this._init();

            egon = this.person;

            //set a layout
            var _layout = M.SwitchHeaderContentLayout.design(this, null, true);
            Kitchensink.setLayout(_layout);

            //fill the layout with a view and render it
            Kitchensink.getLayout().applyViews({
                header: this.header,
                content: this.menu
            });
        },

        show: function( settings ) {
            this._init();
            Kitchensink.getLayout().applyViews({
                header: this.header,
                content: this.menu
            });
            Kitchensink.getLayout().startTransition();
        },

        _init: function(){

            //Init the collection
            this.tmpViews = this.tmpViews || new Kitchensink.Collections.TMPViewCollection(views);

            //create the menu
            this.menu = this.menu || Kitchensink.Views.MenuView.create(this, null, true);

            this.header = this.header || M.View.extend({
                tagName: 'h2',
                grid: 'col-md-12',
                value: M.I18N.get('global.appName', {aka: 'Absinth'})
            }).create()
        },

        gotoTablayoutExample: function() {
            Kitchensink.navigate({
                route: 'page4/0'
            });
        }
    });

})(this);