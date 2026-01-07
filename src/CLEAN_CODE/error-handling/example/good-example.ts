// ✅ GOOD EXAMPLE: Clean error handling with meaningful exceptions

// Custom exception classes that provide context
class FileProcessingError extends Error {
  constructor(
    message: string,
    public readonly filename: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = "FileProcessingError";
  }
}

class FileOpenError extends FileProcessingError {
  constructor(filename: string, cause?: Error) {
    super(`Failed to open file: ${filename}`, filename, cause);
    this.name = "FileOpenError";
  }
}

class FileReadError extends FileProcessingError {
  constructor(filename: string, cause?: Error) {
    super(`Failed to read file: ${filename}`, filename, cause);
    this.name = "FileReadError";
  }
}

class ContentParseError extends FileProcessingError {
  constructor(filename: string, content: string, cause?: Error) {
    super(
      `Failed to parse content in file: ${filename}. Content length: ${content.length}`,
      filename,
      cause
    );
    this.name = "ContentParseError";
  }
}

class FileSaveError extends FileProcessingError {
  constructor(filename: string, cause?: Error) {
    super(`Failed to save processed result for file: ${filename}`, filename, cause);
    this.name = "FileSaveError";
  }
}

interface FileHandle {
  name: string;
  handle: string;
  size: number;
}

interface ParsedContent {
  originalFile: string;
  data: string;
  processedAt: Date;
}

class CleanFileProcessor {
  // Clean method signature - throws meaningful exceptions
  async processFile(filename: string): Promise<ParsedContent> {
    this.validateInput(filename);

    try {
      const file = await this.openFile(filename);
      const content = await this.readFile(file);
      const result = this.parseContent(content, filename);
      await this.saveResult(result, filename);

      return result;
    } catch (error) {
      // Re-throw with additional context if needed
      if (error instanceof FileProcessingError) {
        throw error;
      }

      // Wrap unexpected errors
      throw new FileProcessingError(
        `Unexpected error while processing file: ${filename}`,
        filename,
        error as Error
      );
    }
  }

  private validateInput(filename: string): void {
    if (!filename) {
      throw new Error("Filename cannot be null or empty");
    }

    if (typeof filename !== "string") {
      throw new Error("Filename must be a string");
    }

    if (filename.trim().length === 0) {
      throw new Error("Filename cannot be empty or whitespace only");
    }
  }

  private async openFile(filename: string): Promise<FileHandle> {
    try {
      // Validate file extension
      if (!filename.endsWith(".txt")) {
        throw new FileOpenError(filename, new Error("Only .txt files are supported"));
      }

      // Simulate file opening with potential failure
      if (filename.includes("nonexistent")) {
        throw new FileOpenError(filename, new Error("File does not exist"));
      }

      return {
        name: filename,
        handle: `handle_${Date.now()}`,
        size: Math.floor(Math.random() * 1000) + 100,
      };
    } catch (error) {
      if (error instanceof FileOpenError) {
        throw error;
      }
      throw new FileOpenError(filename, error as Error);
    }
  }

  private async readFile(file: FileHandle): Promise<string> {
    try {
      // Simulate file reading
      if (file.size === 0) {
        // Empty file is a valid case, return empty content
        return "";
      }

      if (file.name.includes("corrupted")) {
        throw new FileReadError(file.name, new Error("File data is corrupted"));
      }

      // Simulate successful read
      return `Content of ${file.name} with ${file.size} bytes`;
    } catch (error) {
      if (error instanceof FileReadError) {
        throw error;
      }
      throw new FileReadError(file.name, error as Error);
    }
  }

  private parseContent(content: string, filename: string): ParsedContent {
    try {
      // Handle empty content gracefully
      if (content.length === 0) {
        return {
          originalFile: filename,
          data: "",
          processedAt: new Date(),
        };
      }

      // Validate content format
      if (content.includes("invalid_format")) {
        throw new ContentParseError(
          filename,
          content,
          new Error("Content contains invalid format markers")
        );
      }

      // Simulate successful parsing
      return {
        originalFile: filename,
        data: content.toUpperCase(), // Simple transformation
        processedAt: new Date(),
      };
    } catch (error) {
      if (error instanceof ContentParseError) {
        throw error;
      }
      throw new ContentParseError(filename, content, error as Error);
    }
  }

  private async saveResult(result: ParsedContent, filename: string): Promise<void> {
    try {
      // Validate result before saving
      if (!result.data) {
        console.warn(`Warning: Saving empty result for file: ${filename}`);
      }

      // Simulate save operation
      if (filename.includes("readonly")) {
        throw new FileSaveError(filename, new Error("Cannot write to readonly location"));
      }

      console.log(`Successfully saved processed result for: ${filename}`);
    } catch (error) {
      if (error instanceof FileSaveError) {
        throw error;
      }
      throw new FileSaveError(filename, error as Error);
    }
  }

  // Helper method to process multiple files with error aggregation
  async processMultipleFiles(filenames: string[]): Promise<{
    successful: ParsedContent[];
    failed: { filename: string; error: Error }[];
  }> {
    const successful: ParsedContent[] = [];
    const failed: { filename: string; error: Error }[] = [];

    for (const filename of filenames) {
      try {
        const result = await this.processFile(filename);
        successful.push(result);
      } catch (error) {
        failed.push({
          filename,
          error: error as Error,
        });
      }
    }

    return { successful, failed };
  }
}

// Usage - clean error handling
async function example() {
  const processor = new CleanFileProcessor();

  try {
    const result = await processor.processFile("example.txt");
    console.log("Processing successful:", result);
  } catch (error) {
    if (error instanceof FileProcessingError) {
      console.error(`File processing error: ${error.message}`);
      console.error(`Filename: ${error.filename}`);

      if (error.cause) {
        console.error(`Root cause: ${error.cause.message}`);
      }

      // Handle specific error types
      if (error instanceof FileOpenError) {
        console.log("Suggestion: Check if file exists and permissions are correct");
      } else if (error instanceof ContentParseError) {
        console.log("Suggestion: Verify file format and content structure");
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
}
