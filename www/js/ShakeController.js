$(function() {
	var shakeController = {
		_SHAKEINTERVAL : 300,
		_maxAc : 0,
		_lastShakedTimeMillis : 0,

		_isMoving : false,
		_startMovingThreshold : 10.0,
		_stopMovingThreshold : 6.0,

        _MOVEINTERVAL : 25,
        _lastMovedTimeMillis : 0,

        _counter : 0,
        //_countMax : 3,
        //_acs : {x : [0,0,0], y : [0,0,0]},

		__name : 'jp.co.nssol.demo.ball.ShakeController',
		__construct : function() {
			this.log.info('{0}を実行', '__construct');
		},
		__init : function() {
			this.log.info('{0}を実行', '__init');
		},
		__ready : function() {
            this._lastMovedTimeMillis = new Date().getTime();
			this.log.info('{0}を実行', '__ready');
		},
		'.shakeButton click' : function(context, $el){
			context.event.preventDefault();
			this.trigger('shake', {maxAc : 10});
		},
		'{window} devicemotion' : function(context, $el) {
			context.event.preventDefault();
			var currentTimeMillis = new Date().getTime();
			var ac = context.event.originalEvent.acceleration;
            //this._counter += 1;
            //this._counter %= this._countMax;
            //this._acs.x[this._counter] = ac.x;
            //this._acs.y[this._counter] = ac.y;

            if (currentTimeMillis - this._lastMovedTimeMillis > this._MOVEINTERVAL){
                this._lastMovedTimeMillis += this._MOVEINTERVAL;
                var x = ac.x;
                var y = ac.y;
                //var x = this._average(this._acs.x);
                //var y = this._average(this._acs.y);
                this.trigger('move', {'x' : x, 'y' : y});
            }
			// 直前のshakeから一定時間経っていなければ終了
			if (currentTimeMillis - this._lastShakedTimeMillis < this._SHAKEINTERVAL) {
				return;
			}

			// （重力加速度を除外した）加速度を取得する
			var ac = context.event.originalEvent.acceleration;

			// 加速度の最大値を更新
			if (ac.y > this._maxAc) {
				this._maxAc = ac.y;
			}

			this.log.debug('加速度 x:{0}, y:{1}, z:{2}', ac.x, ac.y, ac.z);
			if (!this._isMoving && ac.y > this._startMovingThreshold) {
				this._isMoving = true;
			}
			if (this._isMoving && ac.y < this._stopMovingThreshold) {
				this.trigger('shake', {
					maxAc : this._maxAc
				});
				this._isMoving = false;
				this._maxAc = 0;
				this._lastShakedTimeMillis = currentTimeMillis;
			}
		},
        _sum : function(arr) {
            var sum = 0;
            for (var i=0,len=arr.length; i<len; ++i) {
                sum += arr[i];
            };
            return sum;
        },
        _average : function(arr) {
            return this._sum(arr)/arr.length;
        }
	};

	// shakeControllerをグローバルに公開
	h5.core.expose(shakeController);
});
