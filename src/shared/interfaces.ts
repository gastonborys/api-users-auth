export interface ValidationRules {
  [key: string]: string;
}

export interface ValidationMessages {
  [key: string]: string;
}

export interface ValidationResult {
    result	:     boolean;
    message	:   string;
}

export interface EmailOptions {
    to      : string;
    subject : string;
    text    : string;
}
