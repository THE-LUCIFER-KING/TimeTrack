import React from "react";
import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskFail: (taskId: string) => void;
  onTaskReschedule: (taskId: string, newDate: Date) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskComplete,
  onTaskFail,
  onTaskReschedule,
}) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4 bg-secondary">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className={`w-2 h-2 rounded-full ${
                  task.status === "completed"
                    ? "bg-success"
                    : task.status === "failed"
                    ? "bg-destructive"
                    : "bg-warning"
                }`}
              />
              <div>
                <h3 className="font-semibold text-foreground">{task.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Due: {format(task.dueDate, "PPP")}
                </p>
                <p className="text-xs text-muted-foreground">
                  Status: {task.status}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onTaskComplete(task.id)}
                className={`hover:text-success ${
                  task.status === "completed" ? "text-success" : ""
                }`}
              >
                <CheckCircle2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onTaskFail(task.id)}
                className={`hover:text-destructive ${
                  task.status === "failed" ? "text-destructive" : ""
                }`}
              >
                <XCircle className="h-5 w-5" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-warning"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={task.dueDate}
                    onSelect={(date) => {
                      if (date) {
                        onTaskReschedule(task.id, date);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};