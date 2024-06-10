const createError = require('http-errors');
const mongoose = require('mongoose');

const Project = require('../Models/project.model');

/*
    // if sysadmin user: getAllProjects()
    // if admin user: getProjectsByOrgID()
    // if non-admin user: getProjectsByUserId()
*/
const getProjects: async (req, res, next) => {
    try {
        // TODO: Add logic
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

/*
    Retrieve all projects apply optional filters)
*/
const getAllProjects: async (req, res, next) => {
    try {
        // TODO: Add logic
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

/*
    Retrieve all projects for a specific organization (apply optional filters)
*/
const getProjectsByOrgID: async (req, res, next) => {
    try {
        // TODO: Add logic
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

/*
    Retrieve all projects that a specific user is a collaborator on (apply optional filters)
*/
const getProjectsByUserID: async (req, res, next) => {
    try {
        // TODO: Add logic
    } catch (error) {
        console.log(error.message);
    }
};

/*
    Create a new project
*/
const createProject: async (req, res, next) => {
    try {
        // TODO: Add logic
    } catch (error) {
        console.log(error.message);
        if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
        }
        next(error);
    }
};

/*
    Get project by projectID
*/
const getProjectById: async (req, res, next) => {
    const id = req.params.id;
    try {
        const project = await Project.findById(id);
        // TODO: Add logic
        if (!project) {
            throw createError(404, 'Project does not exist.');
        }
        res.send(project);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Project id'));
            return;
        }
        next(error);
    }
};

/*
    Update a project
*/
const updateProject: async (req, res, next) => {
    try {
        //TODO: Add logic
        const id = req.params.id;
        const updates = req.body;
        const options = {
            new: true
        };

        const result = await Project.findByIdAndUpdate(id, updates, options);
        if (!result) {
            throw createError(404, 'Project does not exist');
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            return next(createError(400, 'Invalid Project Id'));
        }

        next(error);
    }
};

/*
    Delete a project
*/
const deleteProject: async (req, res, next) => {
    //TODO: Add logic
    const id = req.params.id;
    try {
        const result = await Project.findByIdAndDelete(id);
        // console.log(result);
        if (!result) {
            throw createError(404, 'Project does not exist.');
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Project id'));
            return;
        }
        next(error);
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};