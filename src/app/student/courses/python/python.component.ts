import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-python',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './python.component.html',
  styleUrl: './python.component.css'
})
export class PythonComponent {
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
    "question": "1. What is the correct file extension for Python files?",
    "options": [".py", ".pt", ".pyt", ".python"],
    "correct": 0
  },
  {
    "question": "2. Which keyword is used to define a function in Python?",
    "options": ["function", "define", "def", "fun"],
    "correct": 2
  },
  {
    "question": "3. What is the output of: print(2 ** 3)?",
    "options": ["6", "8", "9", "5"],
    "correct": 1
  },
  {
    "question": "4. Which of the following is a valid variable name in Python?",
    "options": ["2name", "name2", "name-2", "name 2"],
    "correct": 1
  },
  {
    "question": "5. What is the result of: 10 // 3?",
    "options": ["3.33", "3", "3.0", "Error"],
    "correct": 1
  },
  {
    "question": "6. What data type is the result of: type(5.0)?",
    "options": ["int", "float", "double", "long"],
    "correct": 1
  },
  {
    "question": "7. Which keyword is used for a conditional statement in Python?",
    "options": ["if", "cond", "when", "case"],
    "correct": 0
  },
  {
    "question": "8. Which of these is used to import a module in Python?",
    "options": ["include", "import", "require", "using"],
    "correct": 1
  },
  {
    "question": "9. Which of the following is a mutable data type in Python?",
    "options": ["tuple", "string", "list", "int"],
    "correct": 2
  },
  {
    "question": "10. What does the len() function do?",
    "options": ["Adds numbers", "Returns the length", "Converts to integer", "Prints the value"],
    "correct": 1
  },
  {
    "question": "11. What is the output of: print('Hello' + 'World')?",
    "options": ["Hello World", "HelloWorld", "Hello+World", "Error"],
    "correct": 1
  },
  {
    "question": "12. Which of these is a Python boolean operator?",
    "options": ["&&", "||", "and", "plus"],
    "correct": 2
  },
  {
    "question": "13. Which of these is not a Python loop type?",
    "options": ["for", "while", "loop", "None of the above"],
    "correct": 2
  },
  {
    "question": "14. What does the 'pass' statement do in Python?",
    "options": ["Terminates a loop", "Skips an iteration", "Does nothing", "Exits the program"],
    "correct": 2
  },
  {
    "question": "15. What symbol is used to start a comment in Python?",
    "options": ["//", "#", "--", "/*"],
    "correct": 1
  },
  {
    "question": "16. What is the output of: bool(0)?",
    "options": ["True", "False", "0", "None"],
    "correct": 1
  },
  {
    "question": "17. Which keyword is used to handle exceptions?",
    "options": ["catch", "try", "throw", "except"],
    "correct": 3
  },
  {
    "question": "18. Which built-in function is used to get user input?",
    "options": ["input()", "get()", "read()", "scan()"],
    "correct": 0
  },
  {
    "question": "19. Which of the following is used to define a class in Python?",
    "options": ["function", "object", "class", "defclass"],
    "correct": 2
  },
  {
    "question": "20. What is the output of: type('Hello')?",
    "options": ["str", "char", "text", "string"],
    "correct": 0
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
