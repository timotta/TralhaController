var TralhaController = {
  thread : null,
  observers : [],
  addObserver:function(obj) {
    this.observers.push(obj);
    this._init();
  },
  _init:function() {
    if(!this.thread) {
      TralhaController._check();
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
      if( this.observers[i].update ) {
        this.observers[i].update( this.urlAtual );
      } else {
        alert("O observer numero [" + i + "] deve implementar o metodo update.");
      }
    }
  }
}
