// ❌ BAD EXAMPLE: Poor formatting and structure

import { EventEmitter } from "events";
import * as fs from "fs";
import { promisify } from "util";
// Random comment in wrong place

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TaskManager extends EventEmitter {
  private tasks: Task[] = [];
  private nextId: number = 1;

  constructor() {
    super();
    this.loadTasks();
  }

  addTask(title: string, priority: "low" | "medium" | "high" = "medium", dueDate?: Date): Task {
    if (!title || title.trim().length === 0) {
      throw new Error("Task title is required");
    }
    const task: Task = {
      id: this.nextId++,
      title: title.trim(),
      completed: false,
      priority,
      dueDate,
    };
    this.tasks.push(task);
    this.emit("taskAdded", task);
    this.saveTasks();
    return task;
  }

  removeTask(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }
    const task = this.tasks[index];
    this.tasks.splice(index, 1);
    this.emit("taskRemoved", task);
    this.saveTasks();
    return true;
  }

  completeTask(id: number): boolean {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      return false;
    }
    task.completed = true;
    this.emit("taskCompleted", task);
    this.saveTasks();
    return true;
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }
  getTasksByPriority(priority: "low" | "medium" | "high"): Task[] {
    return this.tasks.filter((task) => task.priority === priority);
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter((task) => task.completed);
  }

  getPendingTasks(): Task[] {
    return this.tasks.filter((task) => !task.completed);
  }

  private async loadTasks(): Promise<void> {
    try {
      const data = await promisify(fs.readFile)("tasks.json", "utf-8");
      this.tasks = JSON.parse(data);
      this.nextId = Math.max(...this.tasks.map((task) => task.id)) + 1;
    } catch (error) {
      this.tasks = [];
      this.nextId = 1;
    }
  }

  private async saveTasks(): Promise<void> {
    try {
      await promisify(fs.writeFile)("tasks.json", JSON.stringify(this.tasks, null, 2));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }

  updateTask(id: number, updates: Partial<Omit<Task, "id">>): boolean {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      return false;
    }
    Object.assign(task, updates);
    this.emit("taskUpdated", task);
    this.saveTasks();
    return true;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }
}
