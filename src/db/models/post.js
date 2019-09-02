'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{} 
  );
  Post.associate = function(models) {
    Post.belongsTo(models.Topic, {
      foreignKey: 'topicId',
      onDelete: 'CASCADE'
    });
    Post.hasMany(models.Flair, {
      foreignKey: 'postId',
      as: 'flairs'
    });
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments'
    });
    Post.hasMany(models.Vote, {
      foreignKey: 'postId',
      as: 'votes'  
    })
 
    Post.prototype.getPoints = function(){
          let total = 0;
          if(this.votes.length === 0){
            return 0;
          }else{
            for(var i =0; i < this.votes.length; i++)
            total += this.votes[i].value;
          }
          return total;
     };
  Post.prototype.hasUpvoteFor = function(userId, callback){
    return this.getVotes({
      where: {
        userId: userId,
        postId: this.id,
        value: 1
      }
    })
    .then((votes) => {
      votes.value = 1 ? callback(true) : callback(false);
    });
  }
  
  Post.prototype.hasDownvoteFor = function(userId, callback){
    return this.getVotes({
      where: {
        userId: userId,
        postId: this.id,
        value: -1
      }
    })
    .then((votes) => {
      votes.value = -1 ? callback(true) : callback(false);
    });
  }
};
return Post;
};