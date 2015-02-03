$(function(){
    var eightBallController = {
        __name : 'jp.co.nssol.demo.ball.eightBallController',

        _shakeController : jp.co.nssol.demo.ball.ShakeController,
        eightBallLogic : jp.co.nssol.demo.ball.eightBallLogic,

        _$fortuneWindow : null,
        _waterSound : null,

        _MOVERATIO : 1,

        __ready : function(){
            this._$fortuneWindow = this.$find('.fortuneWindow');
            this._$ballMover = this.$find('.ballMover');
            this._$ballMover.draggable();
            this.eightBallLogic.init().done(this.own(function(){
                var initialMsg = this.eightBallLogic.getInitialMsg();
                this._$fortuneWindow.html($('<div class="fortune"></div>').text(initialMsg));
            }));
        },

        changeLang : function(lang){
            this.eightBallLogic.init(lang).done(this.own(function(){
                var initialMsg = this.eightBallLogic.getInitialMsg();
                this._$fortuneWindow.html($('<div class="fortune"></div>').text(initialMsg));
            }));
        },
        '.ball touchend' : function(context, $el){
            this.$find('.ball').each(function(){
                $(this).toggleClass('flipped');
            });
        },
        '.ball dblclick' : function(context, $el){
            this.log.debug('ball doubleClicked', this.__name);
            $el.trigger('touchend');
        },

        '{rootElement} shake' : function (context, $el) {
            //this.eightBallLogic.playAudio();
            var fortune = this.eightBallLogic.getFortune();
            this._$fortuneWindow.html(
                $('<div class="fortune"></div>')
                .text(fortune)
                .css(
                    {'opacity':0, 'top' : "55%"})
            ).promise().done(function(){
                $('.fortune').delay(400).animate(
                    {'opacity':1, 'top' : "50%"},{'duration': 800,'easing':'swing'}
                );

            });
        },
        '{rootElement} move' : function (context, $el) {
            var ac = context.evArg;

            var x = ac.x * this._MOVERATIO;
            var y = ac.y * (-this._MOVERATIO);

            var xCss = {'transform' : 'translateX(' + x + '%)'
             + ' translateY(' + y + '%)'}
            this._$ballMover.css(xCss);
        },
        '{document} deviceready' : function (context, $el) {
            this._waterSound = new Media('res/sound/water.wav');
        },

        '.ballMover dragstop' : function(context, $el){
            this._$ballMover.animate(
                {top : '0px', left : '0px' },{'duration': 500,'easing':'swing'}
            );
        }
    };
    //h5.core.controller('#eightBallContents', eightBallController);
    h5.core.expose(eightBallController);
});
