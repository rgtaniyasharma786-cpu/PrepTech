import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-technical-aptitude',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './technical-aptitude.component.html',
  styleUrl: './technical-aptitude.component.css'
})
export class TechnicalAptitudeComponent {
quizForm: FormGroup;
  currentQuestionIndex = 0;
  score = 0;
  showResult = false;

  userAnswers: number[] = [];

  timer: number = 20 * 60; // 20 minutes in seconds
  displayTime: string = '';
  timerInterval: any;

quizData = [
  {
    question: "1. Which of the following is a programming language?",
    options: ["HTML", "CSS", "Python", "SQL"],
    correct: 2
  },
  {
    question: "2. What does CPU stand for?",
    options: ["Central Power Unit", "Central Processing Unit", "Control Panel Unit", "Central Program Unit"],
    correct: 1
  },
  {
    question: "3. Which data type is used to store true/false values?",
    options: ["int", "char", "float", "boolean"],
    correct: 3
  },
  {
    question: "4. What is the output of 3 + 2 * 2?",
    options: ["10", "7", "9", "12"],
    correct: 1
  },
  {
    question: "5. Which is not an operating system?",
    options: ["Linux", "Windows", "Oracle", "MacOS"],
    correct: 2
  },
  {
    question: "6. Which of the following is a loop in programming?",
    options: ["if", "switch", "while", "try"],
    correct: 2
  },
  {
    question: "7. What is the full form of SQL?",
    options: ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Standard Question Language"],
    correct: 0
  },
  {
    question: "8. In networking, what does LAN stand for?",
    options: ["Large Area Network", "Local Access Network", "Local Area Network", "Limited Area Network"],
    correct: 2
  },
  {
    question: "9. Which HTML tag is used to display an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    correct: 0
  },
  {
    question: "10. Which one is not a relational database?",
    options: ["MySQL", "MongoDB", "Oracle", "PostgreSQL"],
    correct: 1
  },
  {
    question: "11. Which keyword is used to define a function in Python?",
    options: ["func", "function", "def", "define"],
    correct: 2
  },
  {
    question: "12. Which port number is used for HTTP?",
    options: ["21", "80", "443", "25"],
    correct: 1
  },
  {
    question: "13. Which symbol is used for single-line comments in C?",
    options: ["//", "#", "/*", "--"],
    correct: 0
  },
  {
    question: "14. What type of device is a keyboard?",
    options: ["Output", "Input", "Storage", "Processing"],
    correct: 1
  },
  {
    question: "15. In which memory data is lost when power is off?",
    options: ["ROM", "Cache", "RAM", "Hard Disk"],
    correct: 2
  },
  {
    question: "16. Which of these is used for version control?",
    options: ["Git", "Node", "Java", "Docker"],
    correct: 0
  },
  {
    question: "17. Which protocol is used to transfer web pages?",
    options: ["FTP", "SMTP", "HTTP", "IP"],
    correct: 2
  },
  {
    question: "18. What is the extension for a Java file?",
    options: [".jav", ".js", ".java", ".jv"],
    correct: 2
  },
  {
    question: "19. Which of the following is a compiled language?",
    options: ["Python", "Java", "HTML", "CSS"],
    correct: 1
  },
  {
    question: "20. What is the purpose of an IP address?",
    options: ["Identify a device on the internet", "Store files", "Encrypt data", "Boost Wi-Fi"],
    correct: 0
  }
];


  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      answer: [null]
    });
  }

  ngOnInit(): void {
    this.updateDisplayTime();
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateDisplayTime();
      } else {
        this.autoSubmit();
      }
    }, 1000);
  }

  updateDisplayTime(): void {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  get currentQuestion() {
    return this.quizData[this.currentQuestionIndex];
  }

  nextQuestion(): void {
    const selected = this.quizForm.value.answer;
    this.userAnswers[this.currentQuestionIndex] = selected;

    if (selected === this.currentQuestion.correct) {
      this.score++;
    }

    this.quizForm.reset();
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.quizData.length) {
      this.showResult = true;
      clearInterval(this.timerInterval);
    }
  }

  autoSubmit(): void {
    this.userAnswers[this.currentQuestionIndex] = this.quizForm.value.answer;

    // Final check if answer was correct
    if (this.quizForm.value.answer === this.currentQuestion.correct) {
      this.score++;
    }

    this.showResult = true;
    clearInterval(this.timerInterval);
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResult = false;
    this.userAnswers = [];
    this.quizForm.reset();
    this.timer = 20 * 60;
    this.updateDisplayTime();
    this.startTimer();
  }
}
