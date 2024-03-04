const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    //   }
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
        
          return new Date(timestamp).toISOString();
        },
      },
    },
    {
      toJSON: { getters: true }
    },
    {
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
thoughtSchema.virtual("reactionCount")(function (){
    return this.reactions.length;
})

const Student = model('student', studentSchema);

module.exports = Student;
