import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

function Provider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = {
    Grade_9_Unit1: [
      {
        id: 1,
        question: "A: What is your ________?\nB: I’m Chinese.",
        answers: [
          { answer: "Country", trueAnswer: false },
          { answer: "Job", trueAnswer: false },
          { answer: "Age", trueAnswer: false },
          { answer: "Nationality", trueAnswer: true }
        ]
      },
      {
        id: 2,
        question: "A: Where are you from?\nB: I’m from ________.",
        answers: [
          { answer: "Turkish", trueAnswer: false },
          { answer: "Turkey", trueAnswer: true },
          { answer: "Canadian", trueAnswer: false },
          { answer: "Spanish", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "A/an _______a woman whose job is to serve customers at their tables in a restaurant.",
        answers: [
          { answer: "Waitress", trueAnswer: true },
          { answer: "Waiter", trueAnswer: false },
          { answer: "Fashion designer", trueAnswer: false },
          { answer: "Instructor", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "July and Britney work at the same workplace. So they are _______.",
        answers: [
          { answer: "Roommates", trueAnswer: false },
          { answer: "Classmates", trueAnswer: false },
          { answer: "Colleagues", trueAnswer: true },
          { answer: "Deskmates", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "When I was a student, I used to be _______ waiter at a cafe. I mean, I didn’t use to work all day long.",
        answers: [
          { answer: "Full-time", trueAnswer: false },
          { answer: "Part-time", trueAnswer: true }
        ]
      },
      {
        id: 6,
        question: "My sister is my parents’ ___________.\nA) Son\nB) Nephew\nC) Aunt\nD) Daughter",
        answers: [
          { answer: "A) Son", trueAnswer: false },
          { answer: "B) Nephew", trueAnswer: false },
          { answer: "C) Aunt", trueAnswer: false },
          { answer: "D) Daughter", trueAnswer: true }
        ]
      },
      {
        id: 7,
        question: "In summer, the streets are full of people in Antalya. It is a _______ city.",
        answers: [
          { answer: "Old", trueAnswer: false },
          { answer: "Empty", trueAnswer: false },
          { answer: "Crowded", trueAnswer: true },
          { answer: "Quiet", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "I was born in Russia. It is my ________.\nA)Tourist Attraction\nB) Abroad\nC)Shopping Center\nD)Hometown",
        answers: [
          { answer: "A)Tourist Attraction", trueAnswer: false },
          { answer: "B) Abroad", trueAnswer: false },
          { answer: "C)Shopping Center", trueAnswer: false },
          { answer: "D)Hometown", trueAnswer: true }
        ]
      },
      {
        id: 9,
        question: "“Thanks to graduation from university, I found a job and my parents bought a new car for me as a present. So I killed two birds with one stone.” What is the meaning of the underlined idiom?",
        answers: [
          { answer: "Having two birds in one cage", trueAnswer: false },
          { answer: "Doing two things in one action.", trueAnswer: true }
        ]
      },
      {
        id: 10,
        question: "“I get along with my classmates. They are my nearest and dearest.” What is the meaning of the underlined idiom?",
        answers: [
          { answer: "People who are close relatives or friends", trueAnswer: true },
          { answer: "People who are in a bad relationship with you", trueAnswer: false }
        ]
      }
    ],
    Grade_9_Unit2: [
      {
        id: 1,
        question: "________ is the place that we cook food.",
        answers: [
          { answer: "Livingroom", trueAnswer: false },
          { answer: "Bathroom", trueAnswer: false },
          { answer: "Kitchen", trueAnswer: true },
          { answer: "Garage", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "There are flowers ____ the vase.",
        answers: [
          { answer: "On", trueAnswer: true },
          { answer: "At", trueAnswer: false },
          { answer: "Under", trueAnswer: false },
          { answer: "In", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "We buy medicine from ______",
        answers: [
          { answer: "Pharmacy", trueAnswer: true },
          { answer: "Library", trueAnswer: false },
          { answer: "Shopping mall", trueAnswer: false },
          { answer: "Hospital", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "In our living room, there is a ______. Which of the followings is NOT suitable for the missing part?",
        answers: [
          { answer: "Sofa", trueAnswer: false },
          { answer: "Fridge", trueAnswer: true },
          { answer: "Coffee table", trueAnswer: false },
          { answer: "Cushions", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "I go to school on foot because it is very ____ to my home.",
        answers: [
          { answer: "Far", trueAnswer: false },
          { answer: "Close", trueAnswer: true },
          { answer: "Quiet", trueAnswer: false },
          { answer: "Expensive", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "In Hong Kong, the average yearly temperature is 22.6. In Vaduz, the average yearly temperature is 9.2. Which of the followings is TRUE according to the information above?",
        answers: [
          { answer: "Vaduz is more crowded then Hong Kong.", trueAnswer: false },
          { answer: "Hong Kong is busier than Vaduz.", trueAnswer: false },
          { answer: "Vaduz is as cold as Hong Kong.", trueAnswer: false },
          { answer: "Hong Kong is hotter than Vaduz.", trueAnswer: true }
        ]
      },
      {
        id: 7,
        question: "We read books and study in a ________.",
        answers: [
          { answer: "Leisure centre", trueAnswer: false },
          { answer: "Museum", trueAnswer: false },
          { answer: "Library", trueAnswer: true },
          { answer: "Theatre", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "The soccer ball is between the volleyball and the basketball.",
        answers: [
          { answer: "The soccer ball is in front of the volleyball and the basketball.", trueAnswer: false },
          { answer: "The soccer ball is near the volleyball and the basketball.", trueAnswer: false },
          { answer: "The soccer ball is opposite the football and the basketball.", trueAnswer: false },
          { answer: "The soccer ball is between the volleyball and the basketball.", trueAnswer: true }
        ]
      },
      {
        id: 9,
        question: "“Make yourself at your home” means……",
        answers: [
          { answer: "Feeling comfortable in someone else’s home.", trueAnswer: true },
          { answer: "Feeling uncomfortable in someone else’s home.", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "“Hustle and bustle” means …….",
        answers: [
          { answer: "peace and rest", trueAnswer: false },
          { answer: "noise and activity", trueAnswer: true }
        ]
      }
    
    ],
    Grade_9_Unit3: [
      {
        id: 1,
        question: "_____________ film is a film that dramatizes the life of a non-fictional or historically-based person or people.",
        answers: [
          { answer: "Historical", trueAnswer: false },
          { answer: "Horror", trueAnswer: false },
          { answer: "Animation", trueAnswer: false },
          { answer: "Biography", trueAnswer: true }
        ]
      },
      {
        id: 2,
        question: "What is the synonym of the idiom 'kick the bucket'?",
        answers: [
          { answer: "to survive", trueAnswer: false },
          { answer: "to die", trueAnswer: true },
          { answer: "to live", trueAnswer: false },
          { answer: "to fight", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "”A bomb” means…….",
        answers: [
          { answer: "an unpopular movie", trueAnswer: false },
          { answer: "a popular movie", trueAnswer: false },
          { answer: "an exciting movie", trueAnswer: true },
          { answer: "a feel-good movie", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "I’m keen on _________ I am a man of words and emotions.",
        answers: [
          { answer: "scuba-diving", trueAnswer: false },
          { answer: "snowboarding", trueAnswer: false },
          { answer: "writing poems", trueAnswer: true },
          { answer: "knitting", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "I want to take up dancing and be on the stage. What is the meaning of the underlined idiom?",
        answers: [
          { answer: "start", trueAnswer: true },
          { answer: "finish", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "Never give up! You are about to win! What is the meaning of the underlined word?",
        answers: [
          { answer: "stop", trueAnswer: false },
          { answer: "fight", trueAnswer: true }
        ]
      },
      {
        id: 7,
        question: "I don’t like biking because it is ________",
        answers: [
          { answer: "relaxing", trueAnswer: false },
          { answer: "extraordinary", trueAnswer: false },
          { answer: "fascinating", trueAnswer: false },
          { answer: "exhausting", trueAnswer: true }
        ]
      },
      {
        id: 8,
        question: "I give it two thumbs up. While I was watching this movie, I laughed a lot. What is the meaning of the underlined phrase?",
        answers: [
          { answer: "to like something very much", trueAnswer: true },
          { answer: "to dislike something", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "”Try someone’s hand at” means……",
        answers: [
          { answer: "to start doing something new or different", trueAnswer: true },
          { answer: "to get help from other people", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "”Reach for the moon” means…….",
        answers: [
          { answer: "to walk on the moon", trueAnswer: false },
          { answer: "to have very high goals", trueAnswer: true }
        ]
      },
        ],
    Grade_10_Unit1: [
      {
        id: 1,
        question: "______ are courses that a student is required to take and pass in order to graduate.",
        answers: [
          { answer: "Elective courses", trueAnswer: false },
          { answer: "Ice-breaker activities", trueAnswer: false },
          { answer: "Compulsory courses", trueAnswer: true },
          { answer: "Extra-curricular activities", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "Students have to _______ at school. It is a must.",
        answers: [
          { answer: "Obey the rules", trueAnswer: true },
          { answer: "Play truant", trueAnswer: false },
          { answer: "Be late", trueAnswer: false },
          { answer: "Talk each other during the lessons", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "I’m afraid I can’t join your birthday party. I have an important exam tomorrow. So I should _______.",
        answers: [
          { answer: "Stick to the timetable", trueAnswer: false },
          { answer: "Do revision", trueAnswer: true },
          { answer: "Sit for exams", trueAnswer: false },
          { answer: "Obey the rules", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "In order to ________, students should study hard.",
        answers: [
          { answer: "Play truant", trueAnswer: false },
          { answer: "Get high scores", trueAnswer: true },
          { answer: "Argue with friends", trueAnswer: false },
          { answer: "Get enough sleep", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "“I am nervous today because I started to go a new school. What are my new classmates like?” What is the problem about?",
        answers: [
          { answer: "School and campus facilities", trueAnswer: false },
          { answer: "Timetable", trueAnswer: false },
          { answer: "Consultants’ and teachers’ attitude", trueAnswer: false },
          { answer: "The new friend circle", trueAnswer: true }
        ]
      },
      {
        id: 6,
        question: "Freshman means __________",
        answers: [
          { answer: "A first-year student", trueAnswer: true },
          { answer: "A hardworking student", trueAnswer: false },
          { answer: "A second-year student", trueAnswer: false },
          { answer: "A graduated student", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "Music and art courses are generally _________ at schools.",
        answers: [
          { answer: "Compulsory courses", trueAnswer: false },
          { answer: "Elective courses", trueAnswer: true },
          { answer: "Challenging courses", trueAnswer: false },
          { answer: "Extra-curricular activities", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "__________  aims to create a friendly and less stressed atmosphere.",
        answers: [
          { answer: "Challenging courses", trueAnswer: false },
          { answer: "Timetable", trueAnswer: false },
          { answer: "Exams", trueAnswer: false },
          { answer: "Icebreaker activities", trueAnswer: true }
        ]
      },
      {
        id: 9,
        question: "This year, I am going to go a university. Unfortunately, I can’t find a suitable dormitory to stay in. All of them is very crowded.” What  is the problem about?",
        answers: [
          { answer: "Transportation", trueAnswer: false },
          { answer: "The new friend circle", trueAnswer: false },
          { answer: "Accommodation", trueAnswer: true },
          { answer: "Adaptation", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "_________ means country of origin.",
        answers: [
          { answer: "Foreign country", trueAnswer: false },
          { answer: "Hometown", trueAnswer: true },
          { answer: "Dormitory", trueAnswer: false },
          { answer: "Host family", trueAnswer: false }
        ]
      }
    ],

    Grade_10_Unit2: [
      {
        id: 1,
        question: "______________ means making reservation at a restaurant etc.",
        answers: [
          { answer: "Visiting", trueAnswer: false },
          { answer: "Booking", trueAnswer: true },
          { answer: "Hanging around", trueAnswer: false },
          { answer: "Doing sports", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "During my primary school years, I was dreaming my future job. This is a …………..",
        answers: [
          { answer: "Long-term plan", trueAnswer: true },
          { answer: "Short-term plan", trueAnswer: false },
          { answer: "Plan for holiday", trueAnswer: false },
          { answer: "Plan for the weekend", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "His jokes seemed spontaneous, but were in fact carefully prepared beforehand. What is the meaning of the underlined word?",
        answers: [
          { answer: "Done in a planned way", trueAnswer: true },
          { answer: "Done in an unplanned way", trueAnswer: false },
          { answer: "Done in a cruel way", trueAnswer: false },
          { answer: "Done in a happy mood", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "“Let the river flow” What is the synonym of this idiom?",
        answers: [
          { answer: "Walk on air", trueAnswer: false },
          { answer: "Kill two birds with one stone", trueAnswer: false },
          { answer: "Give something the thumbs up", trueAnswer: false },
          { answer: "Allow the nature to take its course", trueAnswer: true }
        ]
      },
      {
        id: 5,
        question: "“We are going to fly to Italy” expresses ______",
        answers: [
          { answer: "A promise", trueAnswer: false },
          { answer: "A future plan", trueAnswer: true }
        ]
      },
      {
        id: 6,
        question: "“We are meeting at a cafe” expresses ________",
        answers: [
          { answer: "An arrangement", trueAnswer: true },
          { answer: "A promise", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "“I will not tell your secret to anybody.” expresses ______",
        answers: [
          { answer: "A promise", trueAnswer: true },
          { answer: "A wish", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "“My mother and me are going to go shopping on Saturday” expresses _______",
        answers: [
          { answer: "A long-term plan", trueAnswer: false },
          { answer: "A weekend plan", trueAnswer: true }
        ]
      },
      {
        id: 9,
        question: "“Cool-headed” is the synonym of the word “_______”",
        answers: [
          { answer: "Calm", trueAnswer: true },
          { answer: "Excited", trueAnswer: false },
          { answer: "Unhappy", trueAnswer: false },
          { answer: "Nervous", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "They are having a check-up at __________.",
        answers: [
          { answer: "A library", trueAnswer: false },
          { answer: "A dormitory", trueAnswer: false },
          { answer: "A luxurious restaurant", trueAnswer: false },
          { answer: "A private hospital", trueAnswer: true }
        ]
      }
    ],
    Grade_10_Unit3: [
      {
        id: 1,
        question: "___________ means taking control of a country or city and its people by force.",
        answers: [
          { answer: "besiege", trueAnswer: false },
          { answer: "triumphant", trueAnswer: false },
          { answer: "conquer", trueAnswer: true },
          { answer: "surrender", trueAnswer: false }
        ]
      },
      {
        id: 2,
        question: "_______________ means very successful  in a way that causes great satisfaction.",
        answers: [
          { answer: "triumphant", trueAnswer: true },
          { answer: "cannon", trueAnswer: false },
          { answer: "surrender", trueAnswer: false },
          { answer: "besiege", trueAnswer: false }
        ]
      },
      {
        id: 3,
        question: "___________ means an old type of big heavy gun, usually on wheels that fires solid metal or stone balls.",
        answers: [
          { answer: "surrender", trueAnswer: false },
          { answer: "cannon", trueAnswer: true },
          { answer: "conquer", trueAnswer: false },
          { answer: "besiege", trueAnswer: false }
        ]
      },
      {
        id: 4,
        question: "______ means the practice of showing respect for God or a god, saying prayers, chanting.",
        answers: [
          { answer: "worship", trueAnswer: true },
          { answer: "cannon", trueAnswer: false },
          { answer: "cannon", trueAnswer: false },
          { answer: "surrender", trueAnswer: false }
        ]
      },
      {
        id: 5,
        question: "__________ means admitting that you have lost and want to stop fighting.",
        answers: [
          { answer: "conquer", trueAnswer: false },
          { answer: "surrender", trueAnswer: true },
          { answer: "besiege", trueAnswer: false },
          { answer: "worship", trueAnswer: false }
        ]
      },
      {
        id: 6,
        question: "___________ means surrounding a building, city etc. with soldiers till the people inside give up defending.",
        answers: [
          { answer: "conquer", trueAnswer: false },
          { answer: "worship", trueAnswer: false },
          { answer: "besiege", trueAnswer: true },
          { answer: "surrender", trueAnswer: false }
        ]
      },
      {
        id: 7,
        question: "What is the synonym of 'surrender'?",
        answers: [
          { answer: "give up", trueAnswer: true },
          { answer: "pass away", trueAnswer: false },
          { answer: "take off", trueAnswer: false },
          { answer: "pass by", trueAnswer: false }
        ]
      },
      {
        id: 8,
        question: "What is the synonym of 'look after'?",
        answers: [
          { answer: "look around", trueAnswer: false },
          { answer: "take care of", trueAnswer: true },
          { answer: "get on well with", trueAnswer: false },
          { answer: "look forward", trueAnswer: false }
        ]
      },
      {
        id: 9,
        question: "___________ means taking hold of something or someone suddenly and roughly.",
        answers: [
          { answer: "grab", trueAnswer: true },
          { answer: "hit", trueAnswer: false },
          { answer: "push", trueAnswer: false },
          { answer: "pull", trueAnswer: false }
        ]
      },
      {
        id: 10,
        question: "____________ means an act of defeating an enemy or opponent in a battle, game, or other competition.",
        answers: [
          { answer: "surrender", trueAnswer: false },
          { answer: "worship", trueAnswer: false },
          { answer: "besiege", trueAnswer: false },
          { answer: "victory", trueAnswer: true }
        ],
      },
    ],
      Grade_11_Unit1: [
        {
          id: 1,
          question: "___________________ is our best hope for approaching immortal knowledge.",
          answers: [
            { answer: "sustainable energy", trueAnswer: false },
            { answer: "artificial intelligence", trueAnswer: true },
            { answer: "space colonisation", trueAnswer: false },
            { answer: "transportation system", trueAnswer: false }
          ]
        },
        {
          id: 2,
          question: "The entire _______ has done a great job this year.",
          answers: [
            { answer: "shift", trueAnswer: false },
            { answer: "benefit", trueAnswer: false },
            { answer: "staff", trueAnswer: true },
            { answer: "vacancy", trueAnswer: false }
          ]
        },
        {
          id: 3,
          question: "We all spoke to them and John emerged as the best _________",
          answers: [
            { answer: "candidate", trueAnswer: true },
            { answer: "shift", trueAnswer: false },
            { answer: "vacancy", trueAnswer: false },
            { answer: "benefit", trueAnswer: false }
          ]
        },
        {
          id: 4,
          question: "A/An___________ is a person who sets up businesses and business deals.",
          answers: [
            { answer: "app developer", trueAnswer: false },
            { answer: "biotechnologist", trueAnswer: false },
            { answer: "orthodontist", trueAnswer: false },
            { answer: "entrepreneur", trueAnswer: true }
          ]
        },
        {
          id: 5,
          question: "The government has ________ May 19th to celebrate his anniversary.",
          answers: [
            { answer: "cashed up", trueAnswer: false },
            { answer: "got ahead", trueAnswer: false },
            { answer: "burnt out", trueAnswer: false },
            { answer: "fixed upon", trueAnswer: true }
          ]
        },
        {
          id: 6,
          question: "If you _____ yourself ____, you make yourself exhausted or ill by working too hard.",
          answers: [
            { answer: "fix/upon", trueAnswer: false },
            { answer: "get/ahead", trueAnswer: false },
            { answer: "burn/out", trueAnswer: true },
            { answer: "cash/up", trueAnswer: false }
          ]
        },
        {
          id: 7,
          question: "A/An ________is a dentist who corrects the position of people's teeth.",
          answers: [
            { answer: "orthodontist", trueAnswer: true },
            { answer: "app developer", trueAnswer: false },
            { answer: "entrepreneur", trueAnswer: false },
            { answer: "biotechnologist", trueAnswer: false }
          ]
        },
        {
          id: 8,
          question: "______________ means being  very pleased or happy about something.",
          answers: [
            { answer: "to get on well with", trueAnswer: false },
            { answer: "to sell like hotcakes", trueAnswer: false },
            { answer: "to be tickled to death", trueAnswer: true },
            { answer: "to make prediction", trueAnswer: false }
          ]
        },
        {
          id: 9,
          question: "This year's festival tickets are _____________________",
          answers: [
            { answer: "being tickled to death", trueAnswer: false },
            { answer: "raining cats and dogs", trueAnswer: false },
            { answer: "selling like hotcakes", trueAnswer: true },
            { answer: "playing a part", trueAnswer: false }
          ]
        },
        {
          id: 10,
          question: "John: I design programmes and codes for computers. What is John’s job?",
          answers: [
            { answer: "orthodontist", trueAnswer: false },
            { answer: "software engineer", trueAnswer: true },
            { answer: "entrepreneur", trueAnswer: false },
            { answer: "app developer", trueAnswer: false }
          ]
        }
      ],

      Grade_11_Unit2: [
        {
          id: 1,
          question: "Which of the following is not an extreme sport?",
          answers: [
            { answer: "Wingsuiting", trueAnswer: false },
            { answer: "Drifting", trueAnswer: false },
            { answer: "Ice climbing", trueAnswer: false },
            { answer: "T-commerce", trueAnswer: true }
          ]
        },
        {
          id: 2,
          question: "Which of the following is not a TV programme?",
          answers: [
            { answer: "Blues", trueAnswer: true },
            { answer: "Soap opera", trueAnswer: false },
            { answer: "Game show", trueAnswer: false },
            { answer: "Infotainment", trueAnswer: false }
          ]
        },
        {
          id: 3,
          question: "Which of the following is not a kind of music?",
          answers: [
            { answer: "Soft rock", trueAnswer: false },
            { answer: "Blues", trueAnswer: false },
            { answer: "News flash", trueAnswer: true },
            { answer: "Hip hop", trueAnswer: false }
          ]
        },
        {
          id: 4,
          question: "What is the meaning of the underlined phrase in the sentence: 'I am gifted in playing football.'?",
          answers: [
            { answer: "To have natural ability", trueAnswer: true },
            { answer: "To have no ability", trueAnswer: false },
            { answer: "To decide", trueAnswer: false },
            { answer: "To plan", trueAnswer: false }
          ]
        },
        {
          id: 5,
          question: "Which of the following is the same as this sentence: 'I am good at speaking English.'?",
          answers: [
            { answer: "I can't speak English fluently.", trueAnswer: false },
            { answer: "I am good at speaking English.", trueAnswer: true },
            { answer: "I hate speaking English.", trueAnswer: false },
            { answer: "I have to confess that I wasn't really sick yesterday; I just didn't want to come into work.", trueAnswer: false }
          ]
        },
        {
          id: 6,
          question: "What is the meaning of the underlined word in the sentence: 'I have to confess that I wasn't really sick yesterday; I just didn't want to come into work.'?",
          answers: [
            { answer: "To lie", trueAnswer: true },
            { answer: "To express", trueAnswer: false },
            { answer: "To admit", trueAnswer: false },
            { answer: "To tell", trueAnswer: false }
          ]
        },
        {
          id: 7,
          question: "What is the synonym of the underlined word in the sentence: 'I joined Mary’s birthday party uneagerly. I don’t like her.'?",
          answers: [
            { answer: "Half-heartedly", trueAnswer: true },
            { answer: "Willingly", trueAnswer: false },
            { answer: "Fast", trueAnswer: false },
            { answer: "Happily", trueAnswer: false }
          ]
        },
        {
          id: 8,
          question: "What is the meaning of the underlined phrase in the sentence: 'You have a flair for drawing pictures. I can’t take my eyes off them.'?",
          answers: [
            { answer: "To have no ability", trueAnswer: false },
            { answer: "To be clumsy", trueAnswer: false },
            { answer: "To have a talent", trueAnswer: true },
            { answer: "To be exhausted", trueAnswer: false }
          ]
        },
        {
          id: 9,
          question: "_____________ is a person or thing differing from all other members of a particular group or set in some way.",
          answers: [
            { answer: "Reluctant", trueAnswer: false },
            { answer: "A flair for", trueAnswer: false },
            { answer: "A good command", trueAnswer: false },
            { answer: "The odd man out", trueAnswer: true }
          ]
        }
      ],

      Grade_11_Unit3: [
        {
          id: 1,
          question: "Illiteracy means the inability to read or write.",
          answers: [
            { answer: "Failure", trueAnswer: false },
            { answer: "Illiteracy", trueAnswer: true },
            { answer: "Poverty", trueAnswer: false },
            { answer: "Racism", trueAnswer: false }
          ]
        },
        {
          id: 2,
          question: "Racism means prejudice, discrimination, or antagonism by an individual, community, or institution against a person or people on the basis of their membership of a particular racial or ethnic group, typically one that is a minority or marginalized.",
          answers: [
            { answer: "Racism", trueAnswer: true },
            { answer: "Failure", trueAnswer: false },
            { answer: "Poverty", trueAnswer: false },
            { answer: "Illiteracy", trueAnswer: false }
          ]
        },
        {
          id: 3,
          question: "Failure means lack of success.",
          answers: [
            { answer: "poverty", trueAnswer: false },
            { answer: "failure", trueAnswer: true },
            { answer: "racism", trueAnswer: false },
            { answer: "illiteracy", trueAnswer: false }
          ]
        },
        {
          id: 4,
          question: "Disability means a physical or mental condition that limits a person's movements, senses, or activities.",
          answers: [
            { answer: "disability", trueAnswer: true },
            { answer: "failure", trueAnswer: false },
            { answer: "poverty", trueAnswer: false },
            { answer: "racism", trueAnswer: false }
          ]
        },
        {
          id: 5,
          question: "Poverty means the state of being extremely poor.",
          answers: [
            { answer: "racism", trueAnswer: false },
            { answer: "failure", trueAnswer: false },
            { answer: "poverty", trueAnswer: true },
            { answer: "disability", trueAnswer: false }
          ]
        },
        {
          id: 6,
          question: "Make ends meet means earning just enough money to live on.",
          answers: [
            { answer: "make ends meet", trueAnswer: true },
            { answer: "pursue your dreams", trueAnswer: false },
            { answer: "hit rock bottom", trueAnswer: false },
            { answer: "fell on hard times", trueAnswer: false }
          ]
        },
        {
          id: 7,
          question: "Hit rock bottom means reach the lowest point possible.",
          answers: [
            { answer: "pursue your dreams", trueAnswer: false },
            { answer: "fell on hard times", trueAnswer: false },
            { answer: "make ends meet", trueAnswer: false },
            { answer: "hit rock bottom", trueAnswer: true }
          ]
        },
        {
          id: 8,
          question: "You can overcome your problems thanks to your beloved ones.",
          answers: [
            { answer: "overcome", trueAnswer: true },
            { answer: "suffer from", trueAnswer: false },
            { answer: "inspire", trueAnswer: false },
            { answer: "drop out of", trueAnswer: false }
          ]
        },
        {
          id: 9,
          question: "Get rid of means take action so as to be free of (a troublesome or unwanted person or thing).",
          answers: [
            { answer: "prescribe", trueAnswer: false },
            { answer: "get rid of", trueAnswer: true },
            { answer: "supply", trueAnswer: false },
            { answer: "suffer from", trueAnswer: false }
          ]
        },
        {
          id: 10,
          question: "Prescribe means (of a medical practitioner) advise and authorize the use of (a medicine or treatment) for someone, especially in writing.",
          answers: [
            { answer: "apply", trueAnswer: false },
            { answer: "suffer from", trueAnswer: false },
            { answer: "prescribe", trueAnswer: true },
            { answer: "get rid of", trueAnswer: false }
          ]
        }
      ],

      Grade_12_Unit1: [
        {
          id: 1,
          question: "Each ___________ of the song must be memorized before the singer takes the stage.",
          answers: [
            { answer: "voice", trueAnswer: false },
            { answer: "lyric", trueAnswer: true },
            { answer: "tempo", trueAnswer: false },
            { answer: "melody", trueAnswer: false }
          ]
        },
        {
          id: 2,
          question: "Which of the followings is not a string instrument?",
          answers: [
            { answer: "cello", trueAnswer: false },
            { answer: "guitar", trueAnswer: false },
            { answer: "piano", trueAnswer: true },
            { answer: "contrabass", trueAnswer: false }
          ]
        },
        {
          id: 3,
          question: "Which of the followings is not a percussion instrument?",
          answers: [
            { answer: "tambourine", trueAnswer: false },
            { answer: "xylophone", trueAnswer: false },
            { answer: "flute", trueAnswer: true },
            { answer: "maracas", trueAnswer: false }
          ]
        },
        {
          id: 4,
          question: "__________________ is the use of music to effect positive changes in the psychological, physical, cognitive, or social functioning of individuals with health or educational problems.",
          answers: [
            { answer: "deafening music", trueAnswer: false },
            { answer: "raucous music", trueAnswer: false },
            { answer: "healing music", trueAnswer: true },
            { answer: "techno music", trueAnswer: false }
          ]
        },
        {
          id: 5,
          question: "____________________ means worth remembering or easily remembered, especially because of being special or unusual.",
          answers: [
            { answer: "boring", trueAnswer: false },
            { answer: "unbelievable", trueAnswer: false },
            { answer: "exhausting", trueAnswer: false },
            { answer: "memorable", trueAnswer: true }
          ]
        },
        {
          id: 6,
          question: "If you describe something as eerie, you mean that ________.",
          answers: [
            { answer: "it seems strange and frightening, and makes you feel nervous.", trueAnswer: true },
            { answer: "it seems perfect", trueAnswer: false },
            { answer: "it seems ordinary and classical", trueAnswer: false },
            { answer: "it seems enjoyable", trueAnswer: false }
          ]
        },
        {
          id: 7,
          question: "______________ is  a conventional category that groups together pieces of music sharing a set of conventions or traditions.",
          answers: [
            { answer: "voice of the singer", trueAnswer: false },
            { answer: "music genre", trueAnswer: true },
            { answer: "melody", trueAnswer: false },
            { answer: "tempo", trueAnswer: false }
          ]
        },
        {
          id: 8,
          question: "If you listen to calming music all the time,_________________.",
          answers: [
            { answer: "you may dance", trueAnswer: false },
            { answer: "you may have a headache", trueAnswer: false },
            { answer: "you may be nervous", trueAnswer: false },
            { answer: "you may feel sleepy", trueAnswer: true }
          ]
        },
        {
          id: 9,
          question: "Listening to __________ alone may distract drivers’ attention and cause sleepiness.",
          answers: [
            { answer: "pop music", trueAnswer: false },
            { answer: "rap music", trueAnswer: false },
            { answer: "raucous music", trueAnswer: true },
            { answer: "hip-hop music", trueAnswer: false }
          ]
        },
        {
          id: 10,
          question: "_______________ means what is good for one person may be bad for another.",
          answers: [
            { answer: "One’s meat is another’s poison", trueAnswer: true },
            { answer: "waste not want not", trueAnswer: false },
            { answer: "four eyes see more than two", trueAnswer: false },
            { answer: "less is more", trueAnswer: false }
          ]
        }
      ],
      Grade_12_Unit2: [
        {
          id: 1,
          question: "A good friend is ___________. Which of the followings is not suitable for the blank?",
          answers: [
            { answer: "helpful", trueAnswer: false },
            { answer: "reliable", trueAnswer: false },
            { answer: "dishonest", trueAnswer: true },
            { answer: "thoughtful", trueAnswer: false }
          ]
        },
        {
          id: 2,
          question: "A good friend is ____________.",
          answers: [
            { answer: "disrespectful", trueAnswer: true },
            { answer: "jealous", trueAnswer: false },
            { answer: "Creckless", trueAnswer: false },
            { answer: "generous", trueAnswer: false }
          ]
        },
        {
          id: 3,
          question: "_____________ means having a similar appearance to or qualities in common with (someone or something); look or seem like.",
          answers: [
            { answer: "resemble", trueAnswer: true },
            { answer: "dislike", trueAnswer: false },
            { answer: "remind", trueAnswer: false },
            { answer: "forget", trueAnswer: false }
          ]
        },
        {
          id: 4,
          question: "______________ means  imagining how someone else feels in a difficult situation",
          answers: [
            { answer: "look forward to", trueAnswer: false },
            { answer: "look after", trueAnswer: false },
            { answer: "put oneself in someone’s shoes", trueAnswer: true },
            { answer: "get on well with", trueAnswer: false }
          ]
        },
        {
          id: 5,
          question: "A good friend is someone who will not leave you half way through. Which of the followings is about this statement?",
          answers: [
            { answer: "punctual", trueAnswer: false },
            { answer: "loyal", trueAnswer: true },
            { answer: "judgmental", trueAnswer: false },
            { answer: "praising", trueAnswer: false }
          ]
        },
        {
          id: 6,
          question: "__________ the absence of pretence, deceit, or hypocrisy.",
          answers: [
            { answer: "sincerity", trueAnswer: true },
            { answer: "dissappointment", trueAnswer: false },
            { answer: "loyalty", trueAnswer: false },
            { answer: "punctuality", trueAnswer: false }
          ]
        },
        {
          id: 7,
          question: "Only those who are givers can be good friends. Which of the followings is about this statement?",
          answers: [
            { answer: "emphatetic", trueAnswer: false },
            { answer: "considerate", trueAnswer: false },
            { answer: "generous", trueAnswer: true },
            { answer: "disrecpectful", trueAnswer: false }
          ]
        },
        {
          id: 8,
          question: "_________________ means receive (money, property, or a title) as an heir at the death of the previous holder.",
          answers: [
            { answer: "inherit", trueAnswer: true },
            { answer: "pay", trueAnswer: false },
            { answer: "sell", trueAnswer: false },
            { answer: "visit", trueAnswer: false }
          ]
        },
        {
          id: 9,
          question: "”He has always told me the truth.” Which of the followings is about this statement?",
          answers: [
            { answer: "punctual", trueAnswer: false },
            { answer: "generous", trueAnswer: false },
            { answer: "thoughtful", trueAnswer: false },
            { answer: "honest", trueAnswer: true }
          ]
        },
        {
          id: 10,
          question: "We _____________________. We have similar interests.",
          answers: [
            { answer: "have much in common", trueAnswer: true },
            { answer: "hate each other", trueAnswer: false },
            { answer: "don’t get on well with each other", trueAnswer: false },
            { answer: "live in the same city", trueAnswer: false }
          ]
        }
      ],

      Grade_12_Unit3: [
        {
          id: 1,
          question: "Each ___________ of the song must be memorized before the singer takes the stage.",
          answers: [
            { answer: "voice", trueAnswer: false },
            { answer: "lyric", trueAnswer: true },
            { answer: "tempo", trueAnswer: false },
            { answer: "melody", trueAnswer: false }
          ]
        },
        {
          id: 2,
          question: "Which of the followings is not a string instrument?",
          answers: [
            { answer: "cello", trueAnswer: false },
            { answer: "guitar", trueAnswer: false },
            { answer: "piano", trueAnswer: true },
            { answer: "contrabass", trueAnswer: false }
          ]
        },
        {
          id: 3,
          question: "Which of the followings is not a percussion instrument?",
          answers: [
            { answer: "tambourine", trueAnswer: false },
            { answer: "xylophone", trueAnswer: false },
            { answer: "flute", trueAnswer: true },
            { answer: "maracas", trueAnswer: false }
          ]
        },
        {
          id: 4,
          question: "__________________ is the use of music to effect positive changes in the psychological, physical, cognitive, or social functioning of individuals with health or educational problems.",
          answers: [
            { answer: "deafening music", trueAnswer: false },
            { answer: "raucous music", trueAnswer: false },
            { answer: "healing music", trueAnswer: true },
            { answer: "techno music", trueAnswer: false }
          ]
        },
        {
          id: 5,
          question: "____________________ means worth remembering or easily remembered, especially because of being special or unusual.",
          answers: [
            { answer: "boring", trueAnswer: false },
            { answer: "unbelievable", trueAnswer: false },
            { answer: "exhausting", trueAnswer: false },
            { answer: "memorable", trueAnswer: true }
          ]
        },
        {
          id: 6,
          question: "If you describe something as eerie, you mean that ________.",
          answers: [
            { answer: "it seems strange and frightening, and makes you feel nervous.", trueAnswer: true },
            { answer: "it seems perfect", trueAnswer: false },
            { answer: "it seems ordinary and classical", trueAnswer: false },
            { answer: "it seems enjoyable", trueAnswer: false }
          ]
        },
        {
          id: 7,
          question: "______________ is  a conventional category that groups together pieces of music sharing a set of conventions or traditions.",
          answers: [
            { answer: "voice of the singer", trueAnswer: false },
            { answer: "music genre", trueAnswer: true },
            { answer: "melody", trueAnswer: false },
            { answer: "tempo", trueAnswer: false }
          ]
        },
        {
          id: 8,
          question: "If you listen to calming music all the time,_________________.",
          answers: [
            { answer: "you may dance", trueAnswer: false },
            { answer: "you may have a headache", trueAnswer: false },
            { answer: "you may be nervous", trueAnswer: false },
            { answer: "you may feel sleepy", trueAnswer: true }
          ]
        },
        {
          id: 9,
          question: "Listening to __________ alone may distract drivers’ attention and cause sleepiness.",
          answers: [
            { answer: "pop music", trueAnswer: false },
            { answer: "rap music", trueAnswer: false },
            { answer: "raucous music", trueAnswer: true },
            { answer: "hip-hop music", trueAnswer: false }
          ]
        },
        {
          id: 10,
          question: "_______________ means what is good for one person may be bad for another.",
          answers: [
            { answer: "One’s meat is another’s poison", trueAnswer: true },
            { answer: "waste not want not", trueAnswer: false },
            { answer: "four eyes see more than two", trueAnswer: false },
            { answer: "less is more", trueAnswer: false }
          ]
        }
      ],
  };
  
  const sharedValuesAndMethods = {
    questions,
    currentQuestion,
    setCurrentQuestion,
  };

  return (
    <QuizContext.Provider value={sharedValuesAndMethods}>
      {children}
    </QuizContext.Provider>
  );
}

const useQuizContext = () => useContext(QuizContext);
export { Provider, useQuizContext };
export default QuizContext;
