const express = require("express");
const router = express.Router();
const students = require("../data/students");


router.get("/", (req, res) => {
  res.status(200).json(students);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID must be a number" });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// POST /students - add a new student
router.post("/", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  
  let newId = 1;
  if (students.length > 0) {
    newId = students[students.length - 1].id + 1;
  }

  const newStudent = { id: newId, name: name, course: course };
  students.push(newStudent);

  res.status(201).json(newStudent);
});


router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID must be a number" });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, course } = req.body;

  if (!name && !course) {
    return res.status(400).json({ message: "Send name or course to update" });
  }

  if (name) student.name = name;
  if (course) student.course = course;

  res.status(200).json(student);
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID must be a number" });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deleted = students.splice(index, 1);

  res.status(200).json({ message: "Student deleted", student: deleted[0] });
});

module.exports = router;
