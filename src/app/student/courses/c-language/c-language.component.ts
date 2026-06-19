import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-language',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './c-language.component.html',
  styleUrl: './c-language.component.css'
})
export class CLanguageComponent {
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
    question: "1. What is the correct file extension for C programs?",
    options: [".cpp", ".java", ".c", ".py"],
    correct: 2
  },
  {
    question: "2. Which function is used to output data in C?",
    options: ["printf()", "scanf()", "print()", "cin"],
    correct: 0
  },
  {
    question: "3. Who is the creator of C language?",
    options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
    correct: 1
  },
  {
    question: "4. Which symbol ends a C statement?",
    options: ["!", ".", ";", ":"],
    correct: 2
  },
  {
    question: "5. Which keyword is used to declare an integer variable?",
    options: ["int", "char", "float", "string"],
    correct: 0
  },
  {
    question: "6. Which of the following is a correct variable name?",
    options: ["2value", "value_2", "value-2", "value 2"],
    correct: 1
  },
  {
    question: "7. What is the value of 10 % 3?",
    options: ["3", "1", "0", "10"],
    correct: 1
  },
  {
    question: "8. Which data type is used to store decimal values?",
    options: ["int", "char", "float", "bool"],
    correct: 2
  },
  {
    question: "9. What is the correct way to start the main function?",
    options: ["main()", "int main()", "start()", "void main[]"],
    correct: 1
  },
  {
    question: "10. Which function is used to read input from user?",
    options: ["print()", "get()", "scanf()", "output()"],
    correct: 2
  },
  {
    question: "11. What does '==' mean in C?",
    options: ["Assignment", "Equals to", "Not equal", "Greater than"],
    correct: 1
  },
  {
    question: "12. Which symbol is used for single-line comments in C?",
    options: ["//", "/* */", "#", "--"],
    correct: 0
  },
  {
    question: "13. Which loop always runs at least once?",
    options: ["for", "while", "do-while", "if"],
    correct: 2
  },
  {
    question: "14. Which header file is required for printf()?",
    options: ["string.h", "math.h", "stdio.h", "conio.h"],
    correct: 2
  },
  {
    question: "15. Which operator is used for multiplication?",
    options: ["x", "*", "/", "%"],
    correct: 1
  },
  {
    question: "16. What will `printf(\"%d\", 5+2);` display?",
    options: ["52", "7", "5+2", "Error"],
    correct: 1
  },
  {
    question: "17. Which keyword is used to return a value from a function?",
    options: ["end", "exit", "return", "stop"],
    correct: 2
  },
  {
    question: "18. Which format specifier is used for float values?",
    options: ["%d", "%c", "%f", "%s"],
    correct: 2
  },
  {
    question: "19. Which is a valid C data type?",
    options: ["integer", "decimal", "float", "real"],
    correct: 2
  },
  {
    question: "20. What is the default return type of main() if not specified?",
    options: ["int", "void", "char", "float"],
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


