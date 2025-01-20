import React, { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { Timer } from "@/components/Timer";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "Error",
        description: "Task title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      dueDate: new Date(),
      status: "pending",
      timeSpent: 0,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId 
          ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    const newStatus = task?.status === "completed" ? "pending" : "completed";
    toast({
      title: "Status Updated",
      description: `Task marked as ${newStatus}`,
    });
  };

  const handleTaskFail = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId 
          ? { ...task, status: task.status === "failed" ? "pending" : "failed" }
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    const newStatus = task?.status === "failed" ? "pending" : "failed";
    toast({
      title: "Status Updated",
      description: `Task marked as ${newStatus}`,
    });
  };

  const handleTaskReschedule = (taskId: string, newDate: Date) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              dueDate: newDate,
            }
          : task
      )
    );
    
    toast({
      title: "Task Rescheduled",
      description: `Task moved to ${format(newDate, "PPP")}`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">Task Tracker</h1>
          <Timer />
        </div>

        <div className="flex space-x-4">
          <Input
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            className="flex-1"
          />
          <Button onClick={handleAddTask}>
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </Button>
        </div>

        <TaskList
          tasks={tasks}
          onTaskComplete={handleTaskComplete}
          onTaskFail={handleTaskFail}
          onTaskReschedule={handleTaskReschedule}
        />
      </div>
    </div>
  );
};

export default Index;