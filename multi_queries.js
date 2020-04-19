const express = require('express');
const express_graphql = require('express-graphql');
const {
    buildSchema
} = require('graphql');

const schema = buildSchema(`
    type Query {
        course(id: Int!): Course,
        courses(topic: String): [Course]
    }

    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

const getCourse = function (args) {
    const id = args.id;
    return coursesData.filter(course => {
        return course.id = id;
    })[0];
}

const getCourses = function (args) {
    if (args.topic) {
        const topic = args.topic;
        return coursesData.filter(course => {
            return course.topic = topic;
        })
    } else {
        return coursesData
    }
}

const updateCourseTopic = function ({
    id,
    topic
}) {
    coursesData.map((course) => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });

    return coursesData.filter(course => course.id === id)[0];
}

const root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
};

const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})


const coursesData = [{
        id: 1,
        title: 'Title 1',
        author: 'Vedant Karpe 1',
        description: 'Implementing Graphql',
        topic: 'node.js + grapql',
        url: 'TBD',
    },
    {
        id: 2,
        title: 'Title 2',
        author: 'Vedant Karpe 2',
        description: 'Using Express',
        topic: 'Express + graphql',
        url: 'TBD',
    }
];





//// Query

// query getSingleCourse($courseId: Int!) {
//   course(id:$courseId) {
//     title
//     author
//   }
// }


// query getCourses($courseTopic: String!) {
//   courses(topic: $courseTopic) {
//     title
//     author
//   }
// }

// # Query Variables
// # {
// #   "courseId": 1,
// #   "courseTopic": "test"
// # }






/////////////////////////////// ************************************************ Using Fragments ************************************************ ///////////////////////

// query getCoursesWithFragments($courseId1: Int!, $courseId2: Int!) {
//     course1: course(id:$courseId1) {
//     	...courseFields
//   	}
//     course2: course(id:$courseId2) {
//       ...courseFields
//   	}
// }

// fragment courseFields on Course {
//   title
//   author
// }

// Query Variables
// # {
// #   "courseId1": 1,
// #   "courseId1": 2,
// # }