const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minLength: [1],
      maxLength: [280]
    },
    createdAt: {
        type: Date,
        //set default value to the current timestamp
        default: Date.now, 
        //use getter method to format the timestamp on query
        get: createdAtVal => dateFormat(createdAtVal)      
    },
    username: {
        type: String,
        required: true
    },
    //Array of nested documents created with the reactionSchema, these are like replies
    reaction: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
  );

// Create a virtual called friendCount that retrieves 
// the length of the thought's "reactions" array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const User = model('Thought', thoughtSchema);
module.exports = Thought;