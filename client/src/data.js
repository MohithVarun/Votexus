import Club1 from './imgs/flag1.jpg'
import Club2 from './imgs/flag5.png'
import Club3 from './imgs/flag4.jpg'
import Candidate1 from './imgs/candidate1.jfif'
import Candidate2 from './imgs/candidate2.avif'
import Candidate3 from './imgs/candidate3.avif'
import Candidate4 from './imgs/candidate4.webp'
import Candidate5 from './imgs/candidate5.jfif'
import Candidate6 from './imgs/candidate6.jfif'
import Candidate7 from './imgs/candidate7.jfif'
import Candidate8 from './imgs/candidate8.jfif'

export const elections=[
    {
        id:"e1",
        title:"Cricket Club",
        description:'Join us at the Cricket Club and be part of a community that celebrates the spirit of cricket, fosters personal growth, and builds lasting connections.',
        club: Club1,
        candidates: ["c2","c3","c4"],
        voters: []
    },
    {
        id:"e2",
        title:"Dance Club",
        description:'The dance club is a vibrant hub of creativity and passion, empowering dancers to excel on national platforms and within the university community. From its inception, the club has been driven by a mission to provide comprehensive training and opportunities for dancers to hone their skills through workshops, competitions, and performances. Embracing the transformative power of dance as a means of self-expression and community engagement, the club fosters a vibrant and inclusive dance culture that encourages creativity, passion, and skill development.',
        club: Club2,
        candidates: ["c1","c5","c6"],
        voters: []
    },
    {
        id:"e3",
        title:"Cubing Club",
        description:"Welcome to the world of cubing, where the twist and turn of a Rubik's Cube isn't just a pastime—it's a journey into the realm of mental acuity. It offers relaxation, social interaction, and learning opportunities, making it a versatile and rewarding pursuit for individuals of all ages and backgrounds. Our club's primary mission is to encourage members to limit phone usage, enhance focus and mental strength, and create a supportive environment where members feel encouraged to pursue their cubing goals. Our club promotes a balanced digital lifestyle, bolstering concentration, fortifying mental resilience, and fostering a nurturing space for members to chase their cubing aspirations.",
        club: Club3,
        candidates: ["c7","c8"],
        voters: []
    },
]

export const candidates=[
    {
        id:"c1",
        fullName:"Ram",
        image:Candidate1,
        motto:'want to good college.',
        voteCount:23,
        election:"e2",
    },
    {
        id:"c2",
        fullName:"Ram",
        image:Candidate2,
        motto:'want to good college.',
        voteCount:18,
        election:"e1",
    },
    {
        id:"c3",
        fullName:"Ram",
        image:Candidate3,
        motto:'want to good college.',
        voteCount:3,
        election:"e1",
    },
    {
        id:"c4",
        fullName:"Ram",
        image:Candidate4,
        motto:'want to good college.',
        voteCount:5,
        election:"e1",
    },
    {
        id:"c5",
        fullName:"Ram",
        image:Candidate5,
        motto:'want to good college.',
        voteCount:238,
        election:"e2",
    },
    {
        id:"c6",
        fullName:"Ram",
        image:Candidate6,
        motto:'want to good college.',
        voteCount:42,
        election:"e2",
    },
    {
        id:"c7",
        fullName:"Ram",
        image:Candidate7,
        motto:'want to good college.',
        voteCount:190,
        election:"e3",
    },
    {
        id:"c8",
        fullName:"Ram",
        image:Candidate8,
        motto:'want to good college.',
        voteCount:19,
        election:"e3",
    },
]


export const voters=[
    {
        id:"v1",
        fullName:"SreeRam",
        email:"ram@gamil.com",
        password:"achiever123",
        isAdmin:true,
        votedElections:["e2"]
    },
    {
        id:"v2",
        fullName:"SreeRam",
        email:"ram@gamil.com",
        password:"achiever123",
        isAdmin:false,
        votedElections:["e1","e2"]
    },
    {
        id:"v3",
        fullName:"SreeRam",
        email:"ram@gamil.com",
        password:"achiever123",
        isAdmin:false,
        votedElections:["e1","e2"]
    },
    {
        id:"v4",
        fullName:"SreeRam",
        email:"ram@gamil.com",
        password:"achiever123",
        isAdmin:true,
        votedElections:[]
    },
]

