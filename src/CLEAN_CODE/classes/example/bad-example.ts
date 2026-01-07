/* eslint-disable @typescript-eslint/no-explicit-any */
// ❌ BAD EXAMPLE: Large class with multiple responsibilities

export class EmployeeManager {
  // Too many responsibilities mixed together
  private employees: any[] = [];
  private payrollData: any[] = [];
  private performanceReviews: any[] = [];
  private benefits: any[] = [];
  private trainingRecords: any[] = [];
  private departments: any[] = [];

  // Employee management
  addEmployee(employee: any): void {
    this.employees.push(employee);
    this.createPayrollRecord(employee);
    this.assignDefaultBenefits(employee);
    this.sendWelcomeEmail(employee);
    this.updateDepartmentCount(employee.departmentId);
  }

  removeEmployee(id: number): void {
    const employee = this.employees.find((emp) => emp.id === id);
    if (employee) {
      this.employees = this.employees.filter((emp) => emp.id !== id);
      this.removePayrollRecord(id);
      this.removeBenefits(id);
      this.removeTrainingRecords(id);
      this.updateDepartmentCount(employee.departmentId, -1);
    }
  }

  // Payroll management (should be separate class)
  calculateSalary(employeeId: number): number {
    const employee = this.employees.find((emp) => emp.id === employeeId);
    const payroll = this.payrollData.find((p) => p.employeeId === employeeId);

    let salary = payroll.baseSalary;

    // Complex payroll calculations mixed with employee management
    if (employee.level === "senior") {
      salary *= 1.2;
    }

    const benefits = this.benefits.filter((b) => b.employeeId === employeeId);
    benefits.forEach((benefit) => {
      if (benefit.type === "bonus") {
        salary += benefit.amount;
      }
    });

    return salary;
  }

  // Performance review management (should be separate class)
  addPerformanceReview(employeeId: number, review: any): void {
    this.performanceReviews.push({
      employeeId,
      review,
      date: new Date(),
    });

    // Mixed responsibilities - updating salary based on performance
    if (review.rating >= 4) {
      const payroll = this.payrollData.find((p) => p.employeeId === employeeId);
      if (payroll) {
        payroll.baseSalary *= 1.1; // 10% raise
      }
    }
  }

  // Benefits management (should be separate class)
  addBenefit(employeeId: number, benefit: any): void {
    this.benefits.push({
      employeeId,
      ...benefit,
      enrolledDate: new Date(),
    });
  }

  // Training management (should be separate class)
  enrollInTraining(employeeId: number, trainingName: string): void {
    this.trainingRecords.push({
      employeeId,
      trainingName,
      enrolledDate: new Date(),
      completed: false,
    });
  }

  // Department management (should be separate class)
  createDepartment(name: string): void {
    this.departments.push({
      id: this.departments.length + 1,
      name,
      employeeCount: 0,
    });
  }

  // Email functionality (should be separate service)
  private sendWelcomeEmail(employee: any): void {
    console.log(`Sending welcome email to ${employee.email}`);
  }

  // Database operations mixed in (should be separate repository)
  private createPayrollRecord(employee: any): void {
    this.payrollData.push({
      employeeId: employee.id,
      baseSalary: employee.baseSalary,
      createdDate: new Date(),
    });
  }

  private removePayrollRecord(employeeId: number): void {
    this.payrollData = this.payrollData.filter((p) => p.employeeId !== employeeId);
  }

  private removeBenefits(employeeId: number): void {
    this.benefits = this.benefits.filter((b) => b.employeeId !== employeeId);
  }

  private removeTrainingRecords(employeeId: number): void {
    this.trainingRecords = this.trainingRecords.filter((t) => t.employeeId !== employeeId);
  }

  private assignDefaultBenefits(employee: any): void {
    this.addBenefit(employee.id, { type: "health", plan: "basic" });
    this.addBenefit(employee.id, { type: "dental", plan: "standard" });
  }

  private updateDepartmentCount(departmentId: number, change: number = 1): void {
    const dept = this.departments.find((d) => d.id === departmentId);
    if (dept) {
      dept.employeeCount += change;
    }
  }

  // Too many getters for different concerns
  getEmployees(): any[] {
    return this.employees;
  }
  getPayrollData(): any[] {
    return this.payrollData;
  }
  getPerformanceReviews(): any[] {
    return this.performanceReviews;
  }
  getBenefits(): any[] {
    return this.benefits;
  }
  getTrainingRecords(): any[] {
    return this.trainingRecords;
  }
  getDepartments(): any[] {
    return this.departments;
  }
}
