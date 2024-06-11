const express = require("express");
const router = express.Router();

const ProjectController = require('../../Controllers/Project.controller');

// Get a list of projects with optional params
router.get('/', ProjectController.getProjects);

// Create a new project
router.post('/', ProjectController.createProject);

// Get a project by id
router.get('/:id', ProjectController.getProjectById);

// Update a project by id
router.patch('/:id', ProjectController.updateProject);

// Delete a project by id
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
