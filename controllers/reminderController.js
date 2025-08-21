const setReminder = async (req, res) => {
    try {
      const { applicationId, reminderDate } = req.body;
      // Logic to set reminders (e.g., save in database or schedule notifications)
      res.status(201).json({ message: 'Reminder set successfully', applicationId, reminderDate });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { setReminder };
  