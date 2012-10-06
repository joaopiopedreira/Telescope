Template.user_item.rendered = function(){
};

Template.user_item.helpers({
	avatar_url: function(){
		return getAvatarUrl(this);
	},
	created_at_formatted: function(){
		return this.createdAt ? moment(this.createdAt).fromNow() : '–';
	},
	display_name: function(){
		return getDisplayName(this);
	},
	email: function(){
		return getEmail(this);
	},
	posts: function(){
		return Posts.find({'userId':this._id});
	},
	posts_count: function(){
		return Posts.find({'userId':this._id}).count();
	},
	comments: function(){
		return Comments.find({'userId':this._id});
	},
	comments_count: function(){
		// Posts.find({'user_id':this._id}).forEach(function(post){console.log(post.headline);});
		return Comments.find({'userId':this._id}).count();
	}
});

Template.user_item.events({
	'click .invite-link': function(e, instance){
		e.preventDefault();
		Meteor.users.update(instance.data._id,{
			$set:{
				isInvited: true
			}
		});
	},
	'click .uninvite-link': function(e, instance){
		e.preventDefault();
		Meteor.users.update(instance.data._id,{
			$set:{
				isInvited: false
			}
		});
	},
	'click .admin-link': function(e, instance){
		e.preventDefault();
		Meteor.users.update(instance.data._id,{
			$set:{
				isAdmin: true
			}
		});
	},
	'click .unadmin-link': function(e, instance){
		e.preventDefault();
		Meteor.users.update(instance.data._id,{
			$set:{
				isAdmin: false
			}
		});
	}
})