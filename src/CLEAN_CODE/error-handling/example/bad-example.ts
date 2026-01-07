// ❌ BAD EXAMPLE: Poor error handling practices

class FileProcessor {
  // Returns error codes instead of using exceptions
  processFile(filename: string): number {
    // No input validation

    const file = this.openFile(filename);
    if (file === null) {
      return -1; // Error code - what does -1 mean?
    }

    const content = this.readFile(file);
    if (content === null) {
      return -2; // Another error code - confusing!
    }

    const result = this.parseContent(content);
    if (result === null) {
      return -3; // Yet another error code
    }

    const saved = this.saveResult(result);
    if (!saved) {
      return -4; // More magic numbers
    }

    return 0; // Success? What does 0 mean?
  }

  // Returns null on error - forces caller to check
  openFile(filename: string): any {
    if (!filename) {
      return null; // No information about what went wrong
    }

    try {
      // Simulate file opening
      if (filename.endsWith(".txt")) {
        return { name: filename, handle: "file_handle" };
      }
      return null; // Why did this fail?
    } catch (error) {
      return null; // Swallowing the actual error
    }
  }

  // Inconsistent error handling
  readFile(file: any): string | null {
    if (file === null) {
      console.log("File is null"); // Logging instead of proper error handling
      return null;
    }

    // Simulate file reading
    if (file.name.includes("empty")) {
      return null; // Is empty file an error or valid case?
    }

    return "file content";
  }

  parseContent(content: string): any {
    if (!content) {
      return null; // No context about what went wrong
    }

    try {
      // Simulate parsing
      if (content.includes("invalid")) {
        return null; // Should this throw an exception?
      }

      return { parsed: true, data: content };
    } catch (error) {
      // Generic error handling
      console.error("Something went wrong");
      return null;
    }
  }

  saveResult(result: unknown): boolean {
    if (result === null) {
      return false; // No information about why it failed
    }

    try {
      // Simulate saving
      console.log("Saving result...");

      if (Math.random() > 0.5) {
        return false; // Random failure - no context
      }

      return true;
    } catch (error) {
      // Swallowing exceptions
      console.log("Error:", error);
      return false;
    }
  }

  // Caller has to decode error codes
  getErrorMessage(errorCode: number): string {
    switch (errorCode) {
      case -1:
        return "File open failed";
      case -2:
        return "File read failed";
      case -3:
        return "Parse failed";
      case -4:
        return "Save failed";
      default:
        return "Unknown error";
    }
  }
}

// Usage - messy error handling
const processor = new FileProcessor();
const processorResult = processor.processFile("test.txt");

if (processorResult !== 0) {
  console.error("Error:", processor.getErrorMessage(processorResult));
  // What should we do now? How do we recover?
}
