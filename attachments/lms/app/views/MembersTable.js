$(function() {
  App.Views.MembersTable = Backbone.View.extend({

    tagName: "table",

    className: "table table-striped",

    addOne: function(model){
      var memberRow = new App.Views.MemberRow({model: model})
      memberRow.render()  
      this.$el.append(memberRow.el)
    },

    addAll: function(){
      // @todo this does not work as expected, either of the lines
      // _.each(this.collection.models, this.addOne())
      this.collection.each(this.addOne, this)
    },

    render: function() {
      this.addAll()
    }

  })

})


