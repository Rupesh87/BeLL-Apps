$(function() {
  App.Router = new (Backbone.Router.extend({

    routes: {
      ''                            : 'Groups', 
      'resources'                   : 'Resources',
      'resource/add'                : 'ResourceForm',
      'resource/edit/:resourceId'   : 'ResourceForm',
      'teams'                      : 'Groups',
      'team/edit/:groupId'         : 'GroupForm',
      'team/assign/:groupId'       : 'GroupAssign',
      'team/assignments/:groupId'  : 'GroupAssignments',
      'team/add'                   : 'GroupAdd',
      'members'                      : 'Members',
      'member/add'                   : 'MemberAdd',
      'member/edit/:memberId'        : 'MemberForm',
    },

    ResourceForm : function(resourceId) {
      var resource = (resourceId)
        ? new App.Models.Resource({_id: resourceId})
        : new App.Models.Resource()
      resource.on('processed', function() {
        Backbone.history.navigate('resources', {trigger: true})
      })
      var resourceFormView = new App.Views.ResourceForm({model: resource})
      App.$el.children('.body').html(resourceFormView.el)
      if(resource.id) {
        App.listenToOnce(resource, 'sync', function() {
          resourceFormView.render()
        })
        resource.fetch()
      }
      else {
        resourceFormView.render()
      }
    },

    Resources: function(database) {
      var resources = new App.Collections.Resources()
      resources.fetch({success: function() {
        var resourcesTableView = new App.Views.ResourcesTable({collection: resources})
        resourcesTableView.render()
        App.$el.children('.body').html('<h1>Resources</h1>')
        App.$el.children('.body').append(resourcesTableView.el)
      }})
    },

    Groups: function() {
      groups = new App.Collections.Groups()
      groups.fetch({success: function() {
        groupsTable = new App.Views.GroupsTable({collection: groups})
        groupsTable.render()
        App.$el.children('.body').html('<h1>Teams</h1>')
        App.$el.children('.body').append(groupsTable.el)
      }})
    },

    Members: function() {
      members = new App.Collections.Members()
      members.fetch({success: function() {
        membersTable = new App.Views.MembersTable({collection: members})
        membersTable.render()
        App.$el.children('.body').html('<h1>Members</h1>')
        App.$el.children('.body').append(membersTable.el)
      }})
    },

    GroupAdd : function() {
      // Set up the model
      var group = new App.Models.Group()
      // when the users submits the form, the group will be processed
      group.on('processed', function() {
        this.save()
      })
      // after this group is saved move on to the groups page
      group.on('sync', function() {
        Backbone.history.navigate('teams', {trigger: true})
      })
      // Set up the form
      var groupForm = new App.Views.GroupForm({model: group})
      groupForm.render()
      App.$el.children('.body').html('<h1>Add a Team</h1>')
      App.$el.children('.body').append(groupForm.el)
    },

    MemberAdd : function() {
      // Set up the model
      var member = new App.Models.Member()
      // when the users submits the form, the group will be processed
      member.on('processed', function() {
        this.save()
      })
      // after this group is saved move on to the groups page
      member.on('sync', function() {
        Backbone.history.navigate('members', {trigger: true})
      })
      // Set up the form
      var memberForm = new App.Views.MemberForm({model: member})
      memberForm.render()
      App.$el.children('.body').html('<h1>Add a Member</h1>')
      App.$el.children('.body').append(memberForm.el)
    },

    GroupAssign: function(groupId) {
      var assignResourcesToGroupTable = new App.Views.AssignResourcesToGroupTable()
      assignResourcesToGroupTable.groupId = groupId
      assignResourcesToGroupTable.render()
      App.$el.children('.body').html(assignResourcesToGroupTable.el)
    },

    GroupAssignments: function(groupId) {

    }

  }))

})