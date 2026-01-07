const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// 1. DATA STORAGE ( Student Database)
let students = [
    { id: 1, name: "Kavin", dept: "CSE", age: 19 },
    { id: 2, name: "savitha", dept: "ECE", age: 20 }
];

// 2. GET (Read all students)
app.get('/students', (req, res) => {
    res.json(students);
});

// 3. GET (Read one student by ID)
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// 4. POST (Create a new student)
app.post('/students', (req, res) => {
    // If we don't use express.json(), this 'req.body' will be undefined
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        dept: req.body.dept,
        age: req.body.age
    };

    if (!newStudent.name || !newStudent.dept || !newStudent.age) {
        return res.status(400).json({ message: "Name, Dept, and Age are required" });
    }

    students.push(newStudent);
    res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// 5. PUT (Update a student)
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (student) {
        // Update logic: Use new data if provided, otherwise keep old data
        student.name = req.body.name || student.name;
        student.dept = req.body.dept || student.dept;
        student.age  = req.body.age  || student.age;

        res.json({ message: "Student updated", student });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// 6. DELETE (Remove a student)
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
        const deletedStudent = students.splice(index, 1);
        res.json({ message: "Student deleted", student: deletedStudent });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// Start Server
app.listen(port, () => {
    console.log("Server is running at http://localhost:" + port);
});