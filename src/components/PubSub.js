// ================ PubSub ================
const PubSub = {
    lists: {},
    subscribe: function(listName, fn){
        this.lists[listName] = this.lists[listName] || [];
        this.lists[listName].push(fn);
    },
    unscubscribe: function(listName, fn){
        if(this.lists[listName]){
            for(var i = 0; i < this.lists[listName].length; i++){
               if(this.lists[listName][i] === fn){
                   this.lists[listName].split(i, 1);
                   break
               } 
            }
        }
    },
    publish: function(listName, data){
        if (this.lists[listName]) {
            this.lists[listName].forEach(function(fn){
                fn(data)
            })
        }
    }
};

export default PubSub;