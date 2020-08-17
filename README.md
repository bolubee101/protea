# protea
Tentative Backend for protea, a freelancer platform with opportunities for internship


## Endpoints

1. POST /api/users/register - Registers a new user into the collection
The schema of the expected data is
```
{firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nationality: String,
  contact: {
    type: String,
    required: true
  },
  jobsCreated:{
    type:[Schema.Types.ObjectId]
  },
  jobsCompleted:{
      type:[Schema.Types.ObjectId]
  },
  role: String,
  bio: String,
  skills: [SkillSchema],
  employer_rating: Number,
  intern_rating: Number
};
```