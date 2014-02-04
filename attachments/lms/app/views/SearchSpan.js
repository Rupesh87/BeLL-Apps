$(function() {

  App.Views.SearchSpan = Backbone.View.extend({

    tagName: "tr",

    className: 'search-box',

    template : $("#template-Search-box ").html(),

    render: function () {
      var vars = this.model.toJSON()
      if(vars.name){
        vars.title="CourseSearchBox"
        vars.Tag="CourseSearchBox"
      }else{
        vars.name = "ResourceSearchBox"
      }
      
      this.$el.append(_.template(this.template, vars))
      
    }
  })
})