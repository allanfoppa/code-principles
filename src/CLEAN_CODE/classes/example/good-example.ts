/* eslint-disable @typescript-eslint/no-unused-vars */
// ✅ GOOD EXAMPLE: Small, focused classes with single responsibilities

// Domain entities
interface Employee {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  level: "junior" | "mid" | "senior";
  baseSalary: number;
}

interface PerformanceReview {
  employeeId: number;
  rating: number;
  comments: string;
  reviewDate: Date;
  reviewerId: number;
}

interface TrainingRecord {
  employeeId: number;
  trainingName: string;
  enrolledDate: Date;
  completedDate?: Date;
  status: "enrolled" | "completed" | "cancelled";
}

// Single responsibility: Managing employee data
class EmployeeRepository {
  private employees: Employee[] = [];

  add(employee: Employee): void {
    if (this.findById(employee.id)) {
      throw new Error(`Employee with ID ${employee.id} already exists`);
    }
    this.employees.push(employee);
  }

  remove(id: number): boolean {
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index === -1) return false;

    this.employees.splice(index, 1);
    return true;
  }

  findById(id: number): Employee | undefined {
    return this.employees.find((emp) => emp.id === id);
  }

  findByDepartment(departmentId: number): Employee[] {
    return this.employees.filter((emp) => emp.departmentId === departmentId);
  }

  getAll(): Employee[] {
    return [...this.employees];
  }

  update(id: number, updates: Partial<Employee>): boolean {
    const employee = this.findById(id);
    if (!employee) return false;

    Object.assign(employee, updates);
    return true;
  }
}

// Single responsibility: Performance review management
class PerformanceReviewService {
  private reviews: PerformanceReview[] = [];

  addReview(review: PerformanceReview): void {
    this.validateReview(review);
    this.reviews.push(review);
  }

  getEmployeeReviews(employeeId: number): PerformanceReview[] {
    return this.reviews.filter((review) => review.employeeId === employeeId);
  }

  getLatestReview(employeeId: number): PerformanceReview | undefined {
    const employeeReviews = this.getEmployeeReviews(employeeId);
    return employeeReviews.sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime())[0];
  }

  getAverageRating(employeeId: number): number {
    const reviews = this.getEmployeeReviews(employeeId);
    if (reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }

  private validateReview(review: PerformanceReview): void {
    if (review.rating < 1 || review.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    if (!review.comments || review.comments.trim().length === 0) {
      throw new Error("Review comments are required");
    }
  }
}

// Single responsibility: Training management
class TrainingService {
  private trainingRecords: TrainingRecord[] = [];

  enrollEmployee(employeeId: number, trainingName: string): void {
    if (this.isEnrolledInTraining(employeeId, trainingName)) {
      throw new Error(`Employee ${employeeId} is already enrolled in ${trainingName}`);
    }

    const record: TrainingRecord = {
      employeeId,
      trainingName,
      enrolledDate: new Date(),
      status: "enrolled",
    };

    this.trainingRecords.push(record);
  }

  completeTraining(employeeId: number, trainingName: string): boolean {
    const record = this.findTrainingRecord(employeeId, trainingName);
    if (!record || record.status !== "enrolled") {
      return false;
    }

    record.status = "completed";
    record.completedDate = new Date();
    return true;
  }

  getEmployeeTrainingRecords(employeeId: number): TrainingRecord[] {
    return this.trainingRecords.filter((record) => record.employeeId === employeeId);
  }

  getCompletedTrainings(employeeId: number): TrainingRecord[] {
    return this.getEmployeeTrainingRecords(employeeId).filter(
      (record) => record.status === "completed"
    );
  }

  private isEnrolledInTraining(employeeId: number, trainingName: string): boolean {
    return this.trainingRecords.some(
      (record) =>
        record.employeeId === employeeId &&
        record.trainingName === trainingName &&
        record.status === "enrolled"
    );
  }

  private findTrainingRecord(employeeId: number, trainingName: string): TrainingRecord | undefined {
    return this.trainingRecords.find(
      (record) => record.employeeId === employeeId && record.trainingName === trainingName
    );
  }
}

// Single responsibility: Salary calculations
class PayrollService {
  constructor(
    private performanceReviewService: PerformanceReviewService,
    private trainingService: TrainingService
  ) {}

  calculateSalary(employee: Employee): number {
    let salary = employee.baseSalary;

    // Apply level-based multiplier
    salary *= this.getLevelMultiplier(employee.level);

    // Apply performance bonus
    salary += this.calculatePerformanceBonus(employee);

    // Apply training completion bonus
    salary += this.calculateTrainingBonus(employee.id);

    return Math.round(salary * 100) / 100; // Round to 2 decimal places
  }

  private getLevelMultiplier(level: string): number {
    const multipliers: { [key: string]: number } = {
      junior: 1.0,
      mid: 1.2,
      senior: 1.5,
    };

    return multipliers[level] || 1.0;
  }

  private calculatePerformanceBonus(employee: Employee): number {
    const averageRating = this.performanceReviewService.getAverageRating(employee.id);

    if (averageRating >= 4.5) return employee.baseSalary * 0.15; // 15% bonus
    if (averageRating >= 4.0) return employee.baseSalary * 0.1; // 10% bonus
    if (averageRating >= 3.5) return employee.baseSalary * 0.05; // 5% bonus

    return 0;
  }

  private calculateTrainingBonus(employeeId: number): number {
    const completedTrainings = this.trainingService.getCompletedTrainings(employeeId);
    return completedTrainings.length * 500; // $500 per completed training
  }
}

// Single responsibility: Email notifications
class EmailService {
  sendWelcomeEmail(employee: Employee): void {
    console.log(`📧 Sending welcome email to ${employee.name} (${employee.email})`);
    console.log(`Subject: Welcome to the company!`);
  }

  sendTrainingEnrollmentEmail(employee: Employee, trainingName: string): void {
    console.log(`📧 Sending training enrollment email to ${employee.name}`);
    console.log(`Subject: You've been enrolled in ${trainingName}`);
  }

  sendPerformanceReviewNotification(employee: Employee): void {
    console.log(`📧 Sending performance review notification to ${employee.name}`);
    console.log(`Subject: Your performance review is ready`);
  }
}

// Orchestrator class - coordinates between services
class EmployeeManagementFacade {
  constructor(
    private employeeRepository: EmployeeRepository,
    private performanceReviewService: PerformanceReviewService,
    private trainingService: TrainingService,
    private payrollService: PayrollService,
    private emailService: EmailService
  ) {}

  addEmployee(employee: Employee): void {
    this.employeeRepository.add(employee);
    this.emailService.sendWelcomeEmail(employee);
  }

  removeEmployee(id: number): boolean {
    return this.employeeRepository.remove(id);
  }

  enrollInTraining(employeeId: number, trainingName: string): void {
    const employee = this.employeeRepository.findById(employeeId);
    if (!employee) {
      throw new Error(`Employee with ID ${employeeId} not found`);
    }

    this.trainingService.enrollEmployee(employeeId, trainingName);
    this.emailService.sendTrainingEnrollmentEmail(employee, trainingName);
  }

  addPerformanceReview(review: PerformanceReview): void {
    const employee = this.employeeRepository.findById(review.employeeId);
    if (!employee) {
      throw new Error(`Employee with ID ${review.employeeId} not found`);
    }

    this.performanceReviewService.addReview(review);
    this.emailService.sendPerformanceReviewNotification(employee);
  }

  calculateEmployeeSalary(employeeId: number): number {
    const employee = this.employeeRepository.findById(employeeId);
    if (!employee) {
      throw new Error(`Employee with ID ${employeeId} not found`);
    }

    return this.payrollService.calculateSalary(employee);
  }

  getEmployee(id: number): Employee | undefined {
    return this.employeeRepository.findById(id);
  }
}
