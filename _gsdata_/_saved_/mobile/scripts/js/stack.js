(function() {

    var stack = function() {
        var stack = [];
	return {
            push: function(o) {
                stack.push(o);
		return this;
            },
            pop: function() {
                return stack.pop();
            },
	    peek: function() {
	        return stack[stack.length - 1];
	    },
        empty: function() {
            while(stack.length > 0){
                stack.pop();
            }
        },
        size: function() {
                return stack.length;
	    },
            inspect: function() {
	        if(stack.length < 1) return;
                var len = stack.length;
		var str = '';
		for(var i = 0; i < len; i++) {
                    str += stack[i];
		    str += '|';
		}
		return str;
            }
	};
    }();

    this.Stack = stack;     

})();



