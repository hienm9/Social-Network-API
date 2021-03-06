const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email required"],
      validate: {
          validator: function(v) {
            return /.+@.+\..+/.test(v);
          },
          message: "Please enter a valid email"
      }
    },
    thoughts: [  
        // Array of _id values referencing the Thought model
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        },
    ],
    friends: [
        // Array of _id values referencing the user model (self-reference)
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    ],
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
// the length of the user's friends array field on query.
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('User', userSchema);
module.exports = User;