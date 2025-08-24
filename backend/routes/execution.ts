import { Router } from "express";
import { authMiddleware } from "../auth-middleware";

const router = Router();

// Temporary in-memory storage for testing
const mockExecutions = new Map<string, any>();

router.get("/", authMiddleware, async (req, res) => {
    const userId = req.userId;
    
    // For testing purposes, return mock executions
    const userExecutions = Array.from(mockExecutions.values()).filter(exec => exec.userId === userId);
    
    res.json({
        executions: userExecutions
    });
});

router.get("/:executionId", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const executionId = req.params.executionId;
    
    const execution = mockExecutions.get(executionId);
    
    if (!execution || execution.userId !== userId) {
        return res.status(404).json({
            error: "Execution not found"
        });
    }

    // Mock response for testing
    res.json({
        response: {
            id: execution.id,
            title: execution.title,
            type: execution.type
        }
    });
});

router.delete("/:executionId", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const executionId = req.params.executionId;
    
    try {
        const execution = mockExecutions.get(executionId);
        
        if (!execution || execution.userId !== userId) {
            return res.status(404).json({
                error: "Execution not found"
            });
        }

        // Delete from mock storage
        mockExecutions.delete(executionId);

        res.json({
            success: true,
            message: "Execution deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting execution:", error);
        res.status(500).json({
            error: "Failed to delete execution"
        });
    }
});

export default router;