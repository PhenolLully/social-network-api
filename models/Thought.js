const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction.js");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
        
          return new Date(timestamp).toISOString();
        },
      },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('thought', thoughtSchema);

thoughtSchema.virtual("reactionCount").get(function (){
  return this.reactions.length;
})

module.exports = Thought;
