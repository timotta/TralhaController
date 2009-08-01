var TralhaController = {
  thread : null,
  observers : [],
  addObserver:function() {
	var obj = this.observerByArguments(arguments);
    this.observers.push( obj );
    if (this.urlAtual != undefined ) {
        obj.update(this.urlAtual);
    }
    this._init();
  },
  observerByArguments:function(args) {
	obj = {};
	if( args.length == 1 ) { 
		obj.observer = args[0];
		obj.update = function(url) {
			this.observer.update(url);
		}
	} else if( args.length == 2 ) {
		obj.regex = args[0];
		obj.observer = args[1];
		obj.update = function(url) {
			if( (new RegExp(this.regex)).exec(url) ) {
				this.observer.update(url);
			}
		}
	}
	return obj;
  },
  _init:function() {
    if(!this.thread) {
      thread = setInterval( function() { TralhaController._check(); }, 400 );
    }
  },
  _check:function() {
    if( this.urlAtual != document.location.href ) {
      this.urlAtual = document.location.href;
      this._notify();
    }
  },
  _notify:function() {
    for(i=0;i<this.observers.length;i++) {
      if (this.urlAtual) {
        if( this.observers[i].update ) {
          this.observers[i].update( this.urlAtual );
        } else {
          alert("O observer numero [" + i + "] deve implementar o metodo update.");
        }
      }
    }
  }
}