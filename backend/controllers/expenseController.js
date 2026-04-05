const Expense = require("../models/Expense");

// Add expense
exports.addExpense = async (req, res) => {
    try {
        // Attach the logged-in user's ID to the expense
        const expense = new Expense({
            ...req.body,
            userId: req.user._id   // assuming req.user is set by authentication middleware
        });

        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all expenses for the logged-in user
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user._id });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete expense (only if it belongs to the logged-in user)
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found or not authorized" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};