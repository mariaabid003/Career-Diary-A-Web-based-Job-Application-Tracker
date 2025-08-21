const Application = require('../models/Application');  // Import Application model
const { Op } = require('sequelize');  // Sequelize Operators for search

// ✅ Create Application
const createApplication = async (req, res) => {
  try {
    const { jobTitle, company, status, interviewDate } = req.body;

    // Validate required fields
    if (!jobTitle || !company || !status) {
      return res.status(400).json({ error: "Job title, company, and status are required" });
    }

    // Create application in DB
    const newApplication = await Application.create({ jobTitle, company, status, interviewDate });
    
    res.status(201).json({ message: "Application created successfully", application: newApplication });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ error: "An error occurred while creating the application" });
  }
};

// ✅ View All Applications
const viewApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();
    
    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.json(applications);
  } catch (error) {
    console.error("View Error:", error);
    res.status(500).json({ error: "An error occurred while retrieving applications" });
  }
};

// ✅ Update Application (Improved)
const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobTitle, company, status, interviewDate } = req.body;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: "Application ID is required" });
    }

    // Find the application by ID
    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update only provided fields
    await application.update({
      jobTitle: jobTitle || application.jobTitle,
      company: company || application.company,
      status: status || application.status,
      interviewDate: interviewDate || application.interviewDate
    });

    res.json({ message: "Application updated successfully", application });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "An error occurred while updating the application" });
  }
};

// ✅ Delete Application
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Find application by ID
    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Delete application
    await application.destroy();
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "An error occurred while deleting the application" });
  }
};

// ✅ Search Applications (by Job Title)
const searchApplications = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const applications = await Application.findAll({
      where: {
        jobTitle: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No matching applications found" });
    }

    res.json(applications);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "An error occurred while searching applications" });
  }
};

// ✅ Filter Applications by Status
const filterApplications = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ error: "Status filter is required" });
    }

    const applications = await Application.findAll({ where: { status } });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found with this status" });
    }

    res.json(applications);
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ error: "An error occurred while filtering applications" });
  }
};

// ✅ Export all functions
module.exports = {
  createApplication,
  viewApplications,
  updateApplication,
  deleteApplication,
  searchApplications,
  filterApplications,
};
