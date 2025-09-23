import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function Provider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Quiz questions data
  const questions = {
    Grade_9_Unit1: [
      {
        id: 1,
        question: "What is your nationality?",
        type: "vocabulary",
        answers: [
          { answer: "I am Turkish", trueAnswer: true },
          { answer: "I am Turkey", trueAnswer: false },
          { answer: "I am from Turkey", trueAnswer: false },
          { answer: "I live in Turkey", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "What does a teacher do?",
        type: "vocabulary",
        answers: [
          { answer: "Teaches students", trueAnswer: true },
          { answer: "Cooks food", trueAnswer: false },
          { answer: "Fixes cars", trueAnswer: false },
          { answer: "Sells clothes", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "Which one is a job?",
        type: "vocabulary",
        answers: [
          { answer: "Doctor", trueAnswer: true },
          { answer: "Happy", trueAnswer: false },
          { answer: "Beautiful", trueAnswer: false },
          { answer: "Quickly", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "How old are you?",
        type: "vocabulary",
        answers: [
          { answer: "I am 16 years old", trueAnswer: true },
          { answer: "I am 16 years", trueAnswer: false },
          { answer: "I have 16 years", trueAnswer: false },
          { answer: "My age is 16 years", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "What is your name?",
        type: "vocabulary",
        answers: [
          { answer: "My name is Ali", trueAnswer: true },
          { answer: "My name Ali", trueAnswer: false },
          { answer: "I name is Ali", trueAnswer: false },
          { answer: "Name is Ali", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "Where do you work?",
        type: "vocabulary",
        answers: [
          { answer: "I work at a hospital", trueAnswer: true },
          { answer: "I work in hospital", trueAnswer: false },
          { answer: "I work on hospital", trueAnswer: false },
          { answer: "I work hospital", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "What is a nurse?",
        type: "vocabulary",
        answers: [
          { answer: "A person who helps doctors", trueAnswer: true },
          { answer: "A person who teaches", trueAnswer: false },
          { answer: "A person who cooks", trueAnswer: false },
          { answer: "A person who drives", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "Which country are you from?",
        type: "vocabulary",
        answers: [
          { answer: "I am from Turkey", trueAnswer: true },
          { answer: "I am Turkey", trueAnswer: false },
          { answer: "I from Turkey", trueAnswer: false },
          { answer: "I come Turkey", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "What does 'occupation' mean?",
        type: "vocabulary",
        answers: [
          { answer: "Job", trueAnswer: true },
          { answer: "Age", trueAnswer: false },
          { answer: "Name", trueAnswer: false },
          { answer: "Address", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "I am a student. I _____ at university.",
        type: "vocabulary",
        answers: [
          { answer: "study", trueAnswer: true },
          { answer: "work", trueAnswer: false },
          { answer: "play", trueAnswer: false },
          { answer: "sleep", trueAnswer: false }
        ]
      }
    ],
    Grade_9_Unit2: [
      {
        id: 1,
        question: "Where is the library?",
        type: "vocabulary",
        answers: [
          { answer: "It's next to the school", trueAnswer: true },
          { answer: "It's in the school", trueAnswer: false },
          { answer: "It's on the school", trueAnswer: false },
          { answer: "It's under the school", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "The bank is _____ the post office.",
        type: "vocabulary",
        answers: [
          { answer: "opposite", trueAnswer: true },
          { answer: "in", trueAnswer: false },
          { answer: "on", trueAnswer: false },
          { answer: "under", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "How can I go to the hospital?",
        type: "vocabulary",
        answers: [
          { answer: "Go straight and turn left", trueAnswer: true },
          { answer: "Go left and turn straight", trueAnswer: false },
          { answer: "Turn straight and go left", trueAnswer: false },
          { answer: "Left turn and go straight", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "Where do you live?",
        type: "vocabulary",
        answers: [
          { answer: "I live in Ankara", trueAnswer: true },
          { answer: "I live on Ankara", trueAnswer: false },
          { answer: "I live at Ankara", trueAnswer: false },
          { answer: "I live Ankara", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "The cinema is _____ the restaurant and the pharmacy.",
        type: "vocabulary",
        answers: [
          { answer: "between", trueAnswer: true },
          { answer: "next", trueAnswer: false },
          { answer: "opposite", trueAnswer: false },
          { answer: "behind", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "Excuse me, where is the nearest ATM?",
        type: "vocabulary",
        answers: [
          { answer: "It's around the corner", trueAnswer: true },
          { answer: "It's in the corner", trueAnswer: false },
          { answer: "It's on the corner", trueAnswer: false },
          { answer: "It's at the corner", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "The park is _____ my house.",
        type: "vocabulary",
        answers: [
          { answer: "near", trueAnswer: true },
          { answer: "in", trueAnswer: false },
          { answer: "on", trueAnswer: false },
          { answer: "at", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "Turn right _____ the traffic lights.",
        type: "vocabulary",
        answers: [
          { answer: "at", trueAnswer: true },
          { answer: "in", trueAnswer: false },
          { answer: "on", trueAnswer: false },
          { answer: "to", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "The supermarket is _____ the second floor.",
        type: "vocabulary",
        answers: [
          { answer: "on", trueAnswer: true },
          { answer: "in", trueAnswer: false },
          { answer: "at", trueAnswer: false },
          { answer: "to", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "My neighborhood is very _____.",
        type: "vocabulary",
        answers: [
          { answer: "quiet", trueAnswer: true },
          { answer: "quietly", trueAnswer: false },
          { answer: "quietness", trueAnswer: false },
          { answer: "quieter", trueAnswer: false }
        ]
      }
    ],
    Grade_9_Unit1_Listening: [
      {
        id: 1,
        question: "Listen to the audio and choose the correct answer: What is the person's job?",
        type: "listening",
        audioUrl: "/audio/job1.mp3",
        answers: [
          { answer: "Teacher", trueAnswer: true },
          { answer: "Doctor", trueAnswer: false },
          { answer: "Engineer", trueAnswer: false },
          { answer: "Lawyer", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "Listen and answer: Where is the person from?",
        type: "listening",
        audioUrl: "/audio/nationality1.mp3",
        answers: [
          { answer: "Turkey", trueAnswer: true },
          { answer: "Germany", trueAnswer: false },
          { answer: "France", trueAnswer: false },
          { answer: "Italy", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What is the person's age?",
        type: "listening",
        audioUrl: "/audio/age1.mp3",
        answers: [
          { answer: "25", trueAnswer: true },
          { answer: "23", trueAnswer: false },
          { answer: "27", trueAnswer: false },
          { answer: "29", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "Listen: What is the person's name?",
        type: "listening",
        audioUrl: "/audio/name1.mp3",
        answers: [
          { answer: "Mehmet", trueAnswer: true },
          { answer: "Ali", trueAnswer: false },
          { answer: "Ahmet", trueAnswer: false },
          { answer: "Mustafa", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "Where does the person work?",
        type: "listening",
        audioUrl: "/audio/workplace1.mp3",
        answers: [
          { answer: "Hospital", trueAnswer: true },
          { answer: "School", trueAnswer: false },
          { answer: "Bank", trueAnswer: false },
          { answer: "Restaurant", trueAnswer: false }
        ]
      }
    ],
    Grade_9_Unit3: [
      {
        id: 1,
        question: "What type of movie is 'Titanic'?",
        type: "vocabulary",
        answers: [
          { answer: "Romance", trueAnswer: true },
          { answer: "Horror", trueAnswer: false },
          { answer: "Comedy", trueAnswer: false },
          { answer: "Action", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "I like _____ movies. They make me laugh.",
        type: "vocabulary",
        answers: [
          { answer: "comedy", trueAnswer: true },
          { answer: "horror", trueAnswer: false },
          { answer: "drama", trueAnswer: false },
          { answer: "thriller", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What do you do in your free time?",
        type: "vocabulary",
        answers: [
          { answer: "I read books", trueAnswer: true },
          { answer: "I go to work", trueAnswer: false },
          { answer: "I study lessons", trueAnswer: false },
          { answer: "I do homework", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "My hobby is _____.",
        type: "vocabulary",
        answers: [
          { answer: "playing guitar", trueAnswer: true },
          { answer: "play guitar", trueAnswer: false },
          { answer: "to play guitar", trueAnswer: false },
          { answer: "played guitar", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "Horror movies are very _____.",
        type: "vocabulary",
        answers: [
          { answer: "scary", trueAnswer: true },
          { answer: "funny", trueAnswer: false },
          { answer: "romantic", trueAnswer: false },
          { answer: "boring", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "I _____ watching TV in the evenings.",
        type: "vocabulary",
        answers: [
          { answer: "enjoy", trueAnswer: true },
          { answer: "hate", trueAnswer: false },
          { answer: "dislike", trueAnswer: false },
          { answer: "avoid", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "What's your favorite _____?",
        type: "vocabulary",
        answers: [
          { answer: "hobby", trueAnswer: true },
          { answer: "work", trueAnswer: false },
          { answer: "lesson", trueAnswer: false },
          { answer: "duty", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "Action movies have a lot of _____.",
        type: "vocabulary",
        answers: [
          { answer: "excitement", trueAnswer: true },
          { answer: "romance", trueAnswer: false },
          { answer: "sadness", trueAnswer: false },
          { answer: "boredom", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "I prefer _____ books to watching movies.",
        type: "vocabulary",
        answers: [
          { answer: "reading", trueAnswer: true },
          { answer: "read", trueAnswer: false },
          { answer: "to read", trueAnswer: false },
          { answer: "reads", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "The movie was so _____ that I fell asleep.",
        type: "vocabulary",
        answers: [
          { answer: "boring", trueAnswer: true },
          { answer: "exciting", trueAnswer: false },
          { answer: "interesting", trueAnswer: false },
          { answer: "amazing", trueAnswer: false }
        ]
      }
    ],
    Grade_9_Unit2_Visual: [
      {
        id: 1,
        question: "What place is shown in the image?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Library", trueAnswer: true },
          { answer: "Hospital", trueAnswer: false },
          { answer: "Restaurant", trueAnswer: false },
          { answer: "Bank", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "What can you see in this picture?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Park", trueAnswer: true },
          { answer: "School", trueAnswer: false },
          { answer: "Office", trueAnswer: false },
          { answer: "Shop", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "This building is a _____.",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Hospital", trueAnswer: true },
          { answer: "School", trueAnswer: false },
          { answer: "Cinema", trueAnswer: false },
          { answer: "Museum", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "What type of transportation is this?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/136739/pexels-photo-136739.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Bus", trueAnswer: true },
          { answer: "Train", trueAnswer: false },
          { answer: "Plane", trueAnswer: false },
          { answer: "Ship", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "Where can you buy food?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Supermarket", trueAnswer: true },
          { answer: "Library", trueAnswer: false },
          { answer: "Post office", trueAnswer: false },
          { answer: "Bank", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "This is a _____.",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Restaurant", trueAnswer: true },
          { answer: "Hospital", trueAnswer: false },
          { answer: "School", trueAnswer: false },
          { answer: "Bank", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "What do you see in the picture?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Street", trueAnswer: true },
          { answer: "River", trueAnswer: false },
          { answer: "Mountain", trueAnswer: false },
          { answer: "Forest", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "This place is a _____.",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Pharmacy", trueAnswer: true },
          { answer: "Bakery", trueAnswer: false },
          { answer: "Bookstore", trueAnswer: false },
          { answer: "Clothing store", trueAnswer: false }
        ]
      }
    ],
    Grade_10_Unit1: [
      {
        id: 1,
        question: "What subject do you study in chemistry class?",
        type: "vocabulary",
        answers: [
          { answer: "Chemical reactions", trueAnswer: true },
          { answer: "Historical events", trueAnswer: false },
          { answer: "Mathematical equations", trueAnswer: false },
          { answer: "Literary works", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "The teacher _____ the lesson very well.",
        type: "vocabulary",
        answers: [
          { answer: "explains", trueAnswer: true },
          { answer: "explain", trueAnswer: false },
          { answer: "explaining", trueAnswer: false },
          { answer: "explained", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "I need to _____ for the exam tomorrow.",
        type: "vocabulary",
        answers: [
          { answer: "study", trueAnswer: true },
          { answer: "play", trueAnswer: false },
          { answer: "sleep", trueAnswer: false },
          { answer: "eat", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "What do you use to write on the board?",
        type: "vocabulary",
        answers: [
          { answer: "Chalk", trueAnswer: true },
          { answer: "Pencil", trueAnswer: false },
          { answer: "Pen", trueAnswer: false },
          { answer: "Marker", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "The _____ rings at 9 o'clock.",
        type: "vocabulary",
        answers: [
          { answer: "bell", trueAnswer: true },
          { answer: "clock", trueAnswer: false },
          { answer: "phone", trueAnswer: false },
          { answer: "alarm", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "Students sit at their _____ during class.",
        type: "vocabulary",
        answers: [
          { answer: "desks", trueAnswer: true },
          { answer: "beds", trueAnswer: false },
          { answer: "chairs", trueAnswer: false },
          { answer: "tables", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "I forgot my _____ at home, so I can't do my homework.",
        type: "vocabulary",
        answers: [
          { answer: "textbook", trueAnswer: true },
          { answer: "lunch", trueAnswer: false },
          { answer: "jacket", trueAnswer: false },
          { answer: "phone", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "The _____ is very strict about punctuality.",
        type: "vocabulary",
        answers: [
          { answer: "principal", trueAnswer: true },
          { answer: "student", trueAnswer: false },
          { answer: "janitor", trueAnswer: false },
          { answer: "parent", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "We have a _____ every Friday to test our knowledge.",
        type: "vocabulary",
        answers: [
          { answer: "quiz", trueAnswer: true },
          { answer: "party", trueAnswer: false },
          { answer: "game", trueAnswer: false },
          { answer: "movie", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "The school _____ has many books.",
        type: "vocabulary",
        answers: [
          { answer: "library", trueAnswer: true },
          { answer: "cafeteria", trueAnswer: false },
          { answer: "gymnasium", trueAnswer: false },
          { answer: "office", trueAnswer: false }
        ]
      }
    ],
    Grade_10_Unit2: [
      {
        id: 1,
        question: "What are you going to do this weekend?",
        type: "vocabulary",
        answers: [
          { answer: "I'm going to visit my grandparents", trueAnswer: true },
          { answer: "I go to visit my grandparents", trueAnswer: false },
          { answer: "I will to visit my grandparents", trueAnswer: false },
          { answer: "I visiting my grandparents", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "My dream is _____ a doctor.",
        type: "vocabulary",
        answers: [
          { answer: "to become", trueAnswer: true },
          { answer: "become", trueAnswer: false },
          { answer: "becoming", trueAnswer: false },
          { answer: "became", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "I _____ travel around the world someday.",
        type: "vocabulary",
        answers: [
          { answer: "plan to", trueAnswer: true },
          { answer: "plan", trueAnswer: false },
          { answer: "planning", trueAnswer: false },
          { answer: "planned", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "What do you want to be in the future?",
        type: "vocabulary",
        answers: [
          { answer: "I want to be an engineer", trueAnswer: true },
          { answer: "I want be an engineer", trueAnswer: false },
          { answer: "I want being an engineer", trueAnswer: false },
          { answer: "I wanting to be an engineer", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "She has _____ to study abroad.",
        type: "vocabulary",
        answers: [
          { answer: "decided", trueAnswer: true },
          { answer: "decide", trueAnswer: false },
          { answer: "deciding", trueAnswer: false },
          { answer: "decision", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "My _____ is to graduate with honors.",
        type: "vocabulary",
        answers: [
          { answer: "goal", trueAnswer: true },
          { answer: "hobby", trueAnswer: false },
          { answer: "job", trueAnswer: false },
          { answer: "problem", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "I'm _____ forward to the summer vacation.",
        type: "vocabulary",
        answers: [
          { answer: "looking", trueAnswer: true },
          { answer: "look", trueAnswer: false },
          { answer: "looked", trueAnswer: false },
          { answer: "looks", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "We are _____ a trip to Europe next year.",
        type: "vocabulary",
        answers: [
          { answer: "planning", trueAnswer: true },
          { answer: "plan", trueAnswer: false },
          { answer: "planned", trueAnswer: false },
          { answer: "plans", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "I hope to _____ my dreams come true.",
        type: "vocabulary",
        answers: [
          { answer: "make", trueAnswer: true },
          { answer: "do", trueAnswer: false },
          { answer: "have", trueAnswer: false },
          { answer: "get", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "What are your _____ for the future?",
        type: "vocabulary",
        answers: [
          { answer: "plans", trueAnswer: true },
          { answer: "problems", trueAnswer: false },
          { answer: "hobbies", trueAnswer: false },
          { answer: "subjects", trueAnswer: false }
        ]
      }
    ],
    Grade_10_Unit1_Speaking: [
      {
        id: 1,
        question: "Practice saying: 'I study mathematics at school.'",
        type: "speaking",
        targetText: "I study mathematics at school.",
        answers: [
          { answer: "Perfect pronunciation", trueAnswer: true },
          { answer: "Good pronunciation", trueAnswer: false },
          { answer: "Needs improvement", trueAnswer: false },
          { answer: "Try again", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "Say: 'The teacher explains the lesson clearly.'",
        type: "speaking",
        targetText: "The teacher explains the lesson clearly.",
        answers: [
          { answer: "Excellent", trueAnswer: true },
          { answer: "Good", trueAnswer: false },
          { answer: "Fair", trueAnswer: false },
          { answer: "Poor", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "Pronounce: 'Students take notes during class.'",
        type: "speaking",
        targetText: "Students take notes during class.",
        answers: [
          { answer: "Very clear", trueAnswer: true },
          { answer: "Clear", trueAnswer: false },
          { answer: "Unclear", trueAnswer: false },
          { answer: "Very unclear", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "Say: 'I need to prepare for the exam.'",
        type: "speaking",
        targetText: "I need to prepare for the exam.",
        answers: [
          { answer: "Perfect", trueAnswer: true },
          { answer: "Good", trueAnswer: false },
          { answer: "Average", trueAnswer: false },
          { answer: "Below average", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "Practice: 'The library is open until 6 PM.'",
        type: "speaking",
        targetText: "The library is open until 6 PM.",
        answers: [
          { answer: "Excellent pronunciation", trueAnswer: true },
          { answer: "Good pronunciation", trueAnswer: false },
          { answer: "Fair pronunciation", trueAnswer: false },
          { answer: "Needs practice", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "Say: 'We have chemistry class on Mondays.'",
        type: "speaking",
        targetText: "We have chemistry class on Mondays.",
        answers: [
          { answer: "Outstanding", trueAnswer: true },
          { answer: "Very good", trueAnswer: false },
          { answer: "Good", trueAnswer: false },
          { answer: "Needs work", trueAnswer: false }
        ]
      }
    ],
    Grade_10_Unit3: [
      {
        id: 1,
        question: "Legends are _____ stories from the past.",
        type: "vocabulary",
        answers: [
          { answer: "traditional", trueAnswer: true },
          { answer: "modern", trueAnswer: false },
          { answer: "scientific", trueAnswer: false },
          { answer: "realistic", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "The hero in the story was very _____.",
        type: "vocabulary",
        answers: [
          { answer: "brave", trueAnswer: true },
          { answer: "coward", trueAnswer: false },
          { answer: "lazy", trueAnswer: false },
          { answer: "selfish", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What is a myth?",
        type: "vocabulary",
        answers: [
          { answer: "A traditional story", trueAnswer: true },
          { answer: "A news report", trueAnswer: false },
          { answer: "A scientific fact", trueAnswer: false },
          { answer: "A modern novel", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "The _____ lived in a big castle.",
        type: "vocabulary",
        answers: [
          { answer: "king", trueAnswer: true },
          { answer: "farmer", trueAnswer: false },
          { answer: "student", trueAnswer: false },
          { answer: "worker", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "Dragons are _____ creatures in legends.",
        type: "vocabulary",
        answers: [
          { answer: "mythical", trueAnswer: true },
          { answer: "real", trueAnswer: false },
          { answer: "modern", trueAnswer: false },
          { answer: "scientific", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "The princess was _____ by the dragon.",
        type: "vocabulary",
        answers: [
          { answer: "captured", trueAnswer: true },
          { answer: "helped", trueAnswer: false },
          { answer: "ignored", trueAnswer: false },
          { answer: "praised", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "Ancient people _____ many stories.",
        type: "vocabulary",
        answers: [
          { answer: "told", trueAnswer: true },
          { answer: "forgot", trueAnswer: false },
          { answer: "ignored", trueAnswer: false },
          { answer: "destroyed", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "The knight used a _____ to fight.",
        type: "vocabulary",
        answers: [
          { answer: "sword", trueAnswer: true },
          { answer: "pen", trueAnswer: false },
          { answer: "book", trueAnswer: false },
          { answer: "phone", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "Fairy tales usually have a _____ ending.",
        type: "vocabulary",
        answers: [
          { answer: "happy", trueAnswer: true },
          { answer: "sad", trueAnswer: false },
          { answer: "scary", trueAnswer: false },
          { answer: "boring", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "The _____ helped the hero on his journey.",
        type: "vocabulary",
        answers: [
          { answer: "wizard", trueAnswer: true },
          { answer: "enemy", trueAnswer: false },
          { answer: "monster", trueAnswer: false },
          { answer: "villain", trueAnswer: false }
        ]
      }
    ],
    Grade_11_Unit1: [
      {
        id: 1,
        question: "What career requires working with computers?",
        type: "vocabulary",
        answers: [
          { answer: "Software developer", trueAnswer: true },
          { answer: "Chef", trueAnswer: false },
          { answer: "Gardener", trueAnswer: false },
          { answer: "Mechanic", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "An architect _____ buildings.",
        type: "vocabulary",
        answers: [
          { answer: "designs", trueAnswer: true },
          { answer: "cooks", trueAnswer: false },
          { answer: "teaches", trueAnswer: false },
          { answer: "drives", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What skills do you need to be a journalist?",
        type: "vocabulary",
        answers: [
          { answer: "Writing and communication", trueAnswer: true },
          { answer: "Cooking and cleaning", trueAnswer: false },
          { answer: "Singing and dancing", trueAnswer: false },
          { answer: "Running and jumping", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "A _____ helps people with legal problems.",
        type: "vocabulary",
        answers: [
          { answer: "lawyer", trueAnswer: true },
          { answer: "doctor", trueAnswer: false },
          { answer: "teacher", trueAnswer: false },
          { answer: "engineer", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "What does an entrepreneur do?",
        type: "vocabulary",
        answers: [
          { answer: "Starts their own business", trueAnswer: true },
          { answer: "Works for the government", trueAnswer: false },
          { answer: "Teaches at school", trueAnswer: false },
          { answer: "Fixes cars", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "A veterinarian takes care of _____.",
        type: "vocabulary",
        answers: [
          { answer: "animals", trueAnswer: true },
          { answer: "plants", trueAnswer: false },
          { answer: "machines", trueAnswer: false },
          { answer: "buildings", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "What qualification do you need to be a pilot?",
        type: "vocabulary",
        answers: [
          { answer: "Flying license", trueAnswer: true },
          { answer: "Cooking certificate", trueAnswer: false },
          { answer: "Driving license", trueAnswer: false },
          { answer: "Teaching degree", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "A pharmacist works in a _____.",
        type: "vocabulary",
        answers: [
          { answer: "pharmacy", trueAnswer: true },
          { answer: "restaurant", trueAnswer: false },
          { answer: "school", trueAnswer: false },
          { answer: "bank", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "What does a psychologist study?",
        type: "vocabulary",
        answers: [
          { answer: "Human behavior", trueAnswer: true },
          { answer: "Plants", trueAnswer: false },
          { answer: "Machines", trueAnswer: false },
          { answer: "Weather", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "An accountant works with _____.",
        type: "vocabulary",
        answers: [
          { answer: "numbers and money", trueAnswer: true },
          { answer: "animals", trueAnswer: false },
          { answer: "food", trueAnswer: false },
          { answer: "music", trueAnswer: false }
        ]
      }
    ],
    Grade_11_Unit2: [
      {
        id: 1,
        question: "Playing chess improves your _____ skills.",
        type: "vocabulary",
        answers: [
          { answer: "strategic thinking", trueAnswer: true },
          { answer: "cooking", trueAnswer: false },
          { answer: "singing", trueAnswer: false },
          { answer: "dancing", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "I'm _____ at playing the piano.",
        type: "vocabulary",
        answers: [
          { answer: "skilled", trueAnswer: true },
          { answer: "bad", trueAnswer: false },
          { answer: "terrible", trueAnswer: false },
          { answer: "hopeless", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What hobby requires creativity?",
        type: "vocabulary",
        answers: [
          { answer: "Painting", trueAnswer: true },
          { answer: "Sleeping", trueAnswer: false },
          { answer: "Eating", trueAnswer: false },
          { answer: "Walking", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "She has a _____ for languages.",
        type: "vocabulary",
        answers: [
          { answer: "talent", trueAnswer: true },
          { answer: "problem", trueAnswer: false },
          { answer: "fear", trueAnswer: false },
          { answer: "hatred", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "Photography is both an art and a _____.",
        type: "vocabulary",
        answers: [
          { answer: "skill", trueAnswer: true },
          { answer: "problem", trueAnswer: false },
          { answer: "disease", trueAnswer: false },
          { answer: "punishment", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "To be good at sports, you need to _____ regularly.",
        type: "vocabulary",
        answers: [
          { answer: "practice", trueAnswer: true },
          { answer: "sleep", trueAnswer: false },
          { answer: "eat", trueAnswer: false },
          { answer: "complain", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "Gardening requires _____ and care.",
        type: "vocabulary",
        answers: [
          { answer: "patience", trueAnswer: true },
          { answer: "anger", trueAnswer: false },
          { answer: "laziness", trueAnswer: false },
          { answer: "carelessness", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "What skill is important for public speaking?",
        type: "vocabulary",
        answers: [
          { answer: "Confidence", trueAnswer: true },
          { answer: "Shyness", trueAnswer: false },
          { answer: "Fear", trueAnswer: false },
          { answer: "Nervousness", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "Learning a musical instrument requires _____.",
        type: "vocabulary",
        answers: [
          { answer: "dedication", trueAnswer: true },
          { answer: "laziness", trueAnswer: false },
          { answer: "carelessness", trueAnswer: false },
          { answer: "impatience", trueAnswer: false }
        ]
      }
    ],
    Grade_11_Unit1_Listening: [
      {
        id: 1,
        question: "Listen to the career interview. What job is the person applying for?",
        type: "listening",
        audioUrl: "/audio/career1.mp3",
        answers: [
          { answer: "Marketing Manager", trueAnswer: true },
          { answer: "Software Developer", trueAnswer: false },
          { answer: "Graphic Designer", trueAnswer: false },
          { answer: "Sales Representative", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "What qualification does the candidate have?",
        type: "listening",
        audioUrl: "/audio/qualification1.mp3",
        answers: [
          { answer: "MBA degree", trueAnswer: true },
          { answer: "High school diploma", trueAnswer: false },
          { answer: "Technical certificate", trueAnswer: false },
          { answer: "Medical degree", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "How many years of experience does the person have?",
        type: "listening",
        audioUrl: "/audio/experience1.mp3",
        answers: [
          { answer: "5 years", trueAnswer: true },
          { answer: "2 years", trueAnswer: false },
          { answer: "8 years", trueAnswer: false },
          { answer: "10 years", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "What is the person's greatest strength?",
        type: "listening",
        audioUrl: "/audio/strength1.mp3",
        answers: [
          { answer: "Leadership skills", trueAnswer: true },
          { answer: "Technical skills", trueAnswer: false },
          { answer: "Language skills", trueAnswer: false },
          { answer: "Creative skills", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "When can the person start working?",
        type: "listening",
        audioUrl: "/audio/start1.mp3",
        answers: [
          { answer: "Next month", trueAnswer: true },
          { answer: "Next week", trueAnswer: false },
          { answer: "Next year", trueAnswer: false },
          { answer: "Immediately", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "What salary is the person expecting?",
        type: "listening",
        audioUrl: "/audio/salary1.mp3",
        answers: [
          { answer: "$50,000 per year", trueAnswer: true },
          { answer: "$30,000 per year", trueAnswer: false },
          { answer: "$70,000 per year", trueAnswer: false },
          { answer: "$40,000 per year", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "Why does the person want this job?",
        type: "listening",
        audioUrl: "/audio/motivation1.mp3",
        answers: [
          { answer: "Career growth opportunity", trueAnswer: true },
          { answer: "High salary", trueAnswer: false },
          { answer: "Easy work", trueAnswer: false },
          { answer: "Short hours", trueAnswer: false }
        ]
      }
    ],
    Grade_11_Unit3: [
      {
        id: 1,
        question: "During hard times, people need _____.",
        type: "vocabulary",
        answers: [
          { answer: "support", trueAnswer: true },
          { answer: "problems", trueAnswer: false },
          { answer: "difficulties", trueAnswer: false },
          { answer: "troubles", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "When you face a challenge, you should _____.",
        type: "vocabulary",
        answers: [
          { answer: "stay strong", trueAnswer: true },
          { answer: "give up", trueAnswer: false },
          { answer: "run away", trueAnswer: false },
          { answer: "complain", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What helps people overcome difficulties?",
        type: "vocabulary",
        answers: [
          { answer: "Determination", trueAnswer: true },
          { answer: "Laziness", trueAnswer: false },
          { answer: "Fear", trueAnswer: false },
          { answer: "Doubt", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "Economic _____ affects many families.",
        type: "vocabulary",
        answers: [
          { answer: "crisis", trueAnswer: true },
          { answer: "success", trueAnswer: false },
          { answer: "growth", trueAnswer: false },
          { answer: "prosperity", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "She showed great _____ during her illness.",
        type: "vocabulary",
        answers: [
          { answer: "courage", trueAnswer: true },
          { answer: "weakness", trueAnswer: false },
          { answer: "fear", trueAnswer: false },
          { answer: "cowardice", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "The family _____ many hardships together.",
        type: "vocabulary",
        answers: [
          { answer: "endured", trueAnswer: true },
          { answer: "enjoyed", trueAnswer: false },
          { answer: "celebrated", trueAnswer: false },
          { answer: "ignored", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "Natural disasters can cause great _____.",
        type: "vocabulary",
        answers: [
          { answer: "suffering", trueAnswer: true },
          { answer: "happiness", trueAnswer: false },
          { answer: "joy", trueAnswer: false },
          { answer: "celebration", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "It's important to _____ hope during difficult times.",
        type: "vocabulary",
        answers: [
          { answer: "maintain", trueAnswer: true },
          { answer: "lose", trueAnswer: false },
          { answer: "forget", trueAnswer: false },
          { answer: "abandon", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "The community came together to _____ the victims.",
        type: "vocabulary",
        answers: [
          { answer: "help", trueAnswer: true },
          { answer: "ignore", trueAnswer: false },
          { answer: "blame", trueAnswer: false },
          { answer: "abandon", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "After the storm, they had to _____ their lives.",
        type: "vocabulary",
        answers: [
          { answer: "rebuild", trueAnswer: true },
          { answer: "destroy", trueAnswer: false },
          { answer: "abandon", trueAnswer: false },
          { answer: "forget", trueAnswer: false }
        ]
      }
    ],
    Grade_12_Unit1: [
      {
        id: 1,
        question: "What instrument has 88 keys?",
        type: "vocabulary",
        answers: [
          { answer: "Piano", trueAnswer: true },
          { answer: "Guitar", trueAnswer: false },
          { answer: "Violin", trueAnswer: false },
          { answer: "Drums", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "A _____ leads an orchestra.",
        type: "vocabulary",
        answers: [
          { answer: "conductor", trueAnswer: true },
          { answer: "singer", trueAnswer: false },
          { answer: "dancer", trueAnswer: false },
          { answer: "actor", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What genre of music is characterized by improvisation?",
        type: "vocabulary",
        answers: [
          { answer: "Jazz", trueAnswer: true },
          { answer: "Classical", trueAnswer: false },
          { answer: "Pop", trueAnswer: false },
          { answer: "Rock", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "The _____ of a song is the main tune.",
        type: "vocabulary",
        answers: [
          { answer: "melody", trueAnswer: true },
          { answer: "rhythm", trueAnswer: false },
          { answer: "harmony", trueAnswer: false },
          { answer: "tempo", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "What do you call a group of musicians playing together?",
        type: "vocabulary",
        answers: [
          { answer: "Band", trueAnswer: true },
          { answer: "Audience", trueAnswer: false },
          { answer: "Crowd", trueAnswer: false },
          { answer: "Team", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "A _____ is a musical composition for a solo instrument.",
        type: "vocabulary",
        answers: [
          { answer: "sonata", trueAnswer: true },
          { answer: "symphony", trueAnswer: false },
          { answer: "opera", trueAnswer: false },
          { answer: "ballet", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "The _____ is the speed of music.",
        type: "vocabulary",
        answers: [
          { answer: "tempo", trueAnswer: true },
          { answer: "volume", trueAnswer: false },
          { answer: "pitch", trueAnswer: false },
          { answer: "tone", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "What instrument family does the trumpet belong to?",
        type: "vocabulary",
        answers: [
          { answer: "Brass", trueAnswer: true },
          { answer: "Woodwind", trueAnswer: false },
          { answer: "String", trueAnswer: false },
          { answer: "Percussion", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "A _____ is a large musical work for orchestra and soloists.",
        type: "vocabulary",
        answers: [
          { answer: "symphony", trueAnswer: true },
          { answer: "song", trueAnswer: false },
          { answer: "tune", trueAnswer: false },
          { answer: "jingle", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "The words of a song are called the _____.",
        type: "vocabulary",
        answers: [
          { answer: "lyrics", trueAnswer: true },
          { answer: "notes", trueAnswer: false },
          { answer: "chords", trueAnswer: false },
          { answer: "scales", trueAnswer: false }
        ]
      }
    ],
    Grade_12_Unit2: [
      {
        id: 1,
        question: "A true friend is always _____.",
        type: "vocabulary",
        answers: [
          { answer: "loyal", trueAnswer: true },
          { answer: "selfish", trueAnswer: false },
          { answer: "dishonest", trueAnswer: false },
          { answer: "unreliable", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "What quality is most important in friendship?",
        type: "vocabulary",
        answers: [
          { answer: "Trust", trueAnswer: true },
          { answer: "Money", trueAnswer: false },
          { answer: "Beauty", trueAnswer: false },
          { answer: "Fame", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "When friends disagree, they should _____.",
        type: "vocabulary",
        answers: [
          { answer: "communicate", trueAnswer: true },
          { answer: "fight", trueAnswer: false },
          { answer: "ignore each other", trueAnswer: false },
          { answer: "end the friendship", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "A good friend _____ you in difficult times.",
        type: "vocabulary",
        answers: [
          { answer: "supports", trueAnswer: true },
          { answer: "abandons", trueAnswer: false },
          { answer: "criticizes", trueAnswer: false },
          { answer: "ignores", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "Friendship requires _____ understanding.",
        type: "vocabulary",
        answers: [
          { answer: "mutual", trueAnswer: true },
          { answer: "one-sided", trueAnswer: false },
          { answer: "selfish", trueAnswer: false },
          { answer: "temporary", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "What can damage a friendship?",
        type: "vocabulary",
        answers: [
          { answer: "Betrayal", trueAnswer: true },
          { answer: "Honesty", trueAnswer: false },
          { answer: "Support", trueAnswer: false },
          { answer: "Understanding", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "True friends _____ each other's secrets.",
        type: "vocabulary",
        answers: [
          { answer: "keep", trueAnswer: true },
          { answer: "share", trueAnswer: false },
          { answer: "sell", trueAnswer: false },
          { answer: "forget", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "A _____ friend is someone you can depend on.",
        type: "vocabulary",
        answers: [
          { answer: "reliable", trueAnswer: true },
          { answer: "unreliable", trueAnswer: false },
          { answer: "dishonest", trueAnswer: false },
          { answer: "selfish", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "Good friends _____ each other's achievements.",
        type: "vocabulary",
        answers: [
          { answer: "celebrate", trueAnswer: true },
          { answer: "envy", trueAnswer: false },
          { answer: "ignore", trueAnswer: false },
          { answer: "criticize", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "Friendship is built on _____ and respect.",
        type: "vocabulary",
        answers: [
          { answer: "trust", trueAnswer: true },
          { answer: "fear", trueAnswer: false },
          { answer: "jealousy", trueAnswer: false },
          { answer: "competition", trueAnswer: false }
        ]
      }
    ],
    Grade_12_Unit1_Visual: [
      {
        id: 1,
        question: "What musical instrument is shown in the image?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Piano", trueAnswer: true },
          { answer: "Guitar", trueAnswer: false },
          { answer: "Violin", trueAnswer: false },
          { answer: "Drums", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "What type of performance is this?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Concert", trueAnswer: true },
          { answer: "Movie", trueAnswer: false },
          { answer: "Sports game", trueAnswer: false },
          { answer: "Conference", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What instrument is the person playing?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Guitar", trueAnswer: true },
          { answer: "Piano", trueAnswer: false },
          { answer: "Violin", trueAnswer: false },
          { answer: "Flute", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "What is shown in this music-related image?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Recording studio", trueAnswer: true },
          { answer: "Kitchen", trueAnswer: false },
          { answer: "Classroom", trueAnswer: false },
          { answer: "Library", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "What musical equipment is this?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Microphone", trueAnswer: true },
          { answer: "Camera", trueAnswer: false },
          { answer: "Phone", trueAnswer: false },
          { answer: "Lamp", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "What instrument family is shown?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/1327430/pexels-photo-1327430.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Drums", trueAnswer: true },
          { answer: "Strings", trueAnswer: false },
          { answer: "Brass", trueAnswer: false },
          { answer: "Woodwinds", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "What is this musical notation called?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Sheet music", trueAnswer: true },
          { answer: "Book", trueAnswer: false },
          { answer: "Newspaper", trueAnswer: false },
          { answer: "Magazine", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "What type of musical event is this?",
        type: "visual",
        imageUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400",
        answers: [
          { answer: "Orchestra performance", trueAnswer: true },
          { answer: "Dance show", trueAnswer: false },
          { answer: "Theater play", trueAnswer: false },
          { answer: "Art exhibition", trueAnswer: false }
        ]
      }
    ],
    Grade_12_Unit3: [
      {
        id: 1,
        question: "Human rights are _____ for all people.",
        type: "vocabulary",
        answers: [
          { answer: "universal", trueAnswer: true },
          { answer: "limited", trueAnswer: false },
          { answer: "optional", trueAnswer: false },
          { answer: "temporary", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "Everyone has the right to _____.",
        type: "vocabulary",
        answers: [
          { answer: "freedom of speech", trueAnswer: true },
          { answer: "silence others", trueAnswer: false },
          { answer: "control others", trueAnswer: false },
          { answer: "limit others", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "What is discrimination?",
        type: "vocabulary",
        answers: [
          { answer: "Unfair treatment based on differences", trueAnswer: true },
          { answer: "Equal treatment for all", trueAnswer: false },
          { answer: "Fair judgment", trueAnswer: false },
          { answer: "Respectful behavior", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "The right to education means _____.",
        type: "vocabulary",
        answers: [
          { answer: "everyone can go to school", trueAnswer: true },
          { answer: "only rich people can study", trueAnswer: false },
          { answer: "education is not important", trueAnswer: false },
          { answer: "schools are optional", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "What does equality mean?",
        type: "vocabulary",
        answers: [
          { answer: "Same rights for everyone", trueAnswer: true },
          { answer: "Different rules for different people", trueAnswer: false },
          { answer: "Special privileges for some", trueAnswer: false },
          { answer: "Unfair treatment", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "Freedom of religion means people can _____.",
        type: "vocabulary",
        answers: [
          { answer: "choose their own beliefs", trueAnswer: true },
          { answer: "force others to believe", trueAnswer: false },
          { answer: "ban other religions", trueAnswer: false },
          { answer: "control others' faith", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "What is the purpose of human rights?",
        type: "vocabulary",
        answers: [
          { answer: "To protect human dignity", trueAnswer: true },
          { answer: "To create inequality", trueAnswer: false },
          { answer: "To limit freedom", trueAnswer: false },
          { answer: "To cause conflict", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "Everyone has the right to _____ working conditions.",
        type: "vocabulary",
        answers: [
          { answer: "safe", trueAnswer: true },
          { answer: "dangerous", trueAnswer: false },
          { answer: "unhealthy", trueAnswer: false },
          { answer: "unfair", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "What does justice mean?",
        type: "vocabulary",
        answers: [
          { answer: "Fair treatment under the law", trueAnswer: true },
          { answer: "Punishment without trial", trueAnswer: false },
          { answer: "Favoritism", trueAnswer: false },
          { answer: "Corruption", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "Human rights violations should be _____.",
        type: "vocabulary",
        answers: [
          { answer: "reported and stopped", trueAnswer: true },
          { answer: "ignored", trueAnswer: false },
          { answer: "encouraged", trueAnswer: false },
          { answer: "hidden", trueAnswer: false }
        ]
      }
    ]
  };

  const value = {
    questions,
    currentQuestion,
    setCurrentQuestion
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a Provider');
  }
  return context;
};