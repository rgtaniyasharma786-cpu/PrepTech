import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-java-script',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './java-script.component.html',
  styleUrl: './java-script.component.css'
})
export class JavaScriptComponent {


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
    "question": "1. What is the type of NaN in JavaScript?",
    "options": ["undefined", "number", "object", "NaN"],
    "correct": 1
  },
  {
    "question": "2. Which company developed JavaScript?",
    "options": ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"],
    "correct": 2
  },
  {
    "question": "3. Which symbol is used for single-line comments?",
    "options": ["//", "/* */", "#", "--"],
    "correct": 0
  },
  {
    "question": "4. What does '===' mean in JavaScript?",
    "options": ["Equality with type coercion", "Strict equality", "Assignment", "Not equal"],
    "correct": 1
  },
  {
    "question": "5. Which keyword is used to declare a variable with block scope?",
    "options": ["var", "let", "int", "scope"],
    "correct": 1
  },
  {
    "question": "6. What will `typeof null` return?",
    "options": ["null", "object", "undefined", "boolean"],
    "correct": 1
  },
  {
    "question": "7. What is the purpose of `isNaN()`?",
    "options": ["Checks if a value is not a number", "Checks if a value is null", "Checks if a value is a string", "Checks if a value is undefined"],
    "correct": 0
  },
  {
    "question": "8. Which method converts a JSON string to a JavaScript object?",
    "options": ["JSON.toObject()", "JSON.stringify()", "JSON.parse()", "JSON.convert()"],
    "correct": 2
  },
  {
    "question": "9. What will `0 == '0'` evaluate to?",
    "options": ["true", "false", "NaN", "undefined"],
    "correct": 0
  },
  {
    "question": "10. Which array method removes the last element?",
    "options": ["shift()", "pop()", "slice()", "splice()"],
    "correct": 1
  },
  {
    "question": "11. What is a closure in JavaScript?",
    "options": ["A loop inside a function", "An inner function that has access to outer function’s variables", "A deprecated feature", "A method to close a browser tab"],
    "correct": 1
  },
  {
    "question": "12. What does 'this' refer to in a regular function?",
    "options": ["Global object", "Calling object", "Document object", "Function itself"],
    "correct": 1
  },
  {
    "question": "13. Which method returns the index of an element in an array?",
    "options": ["find()", "indexOf()", "map()", "filter()"],
    "correct": 1
  },
  {
    "question": "14. Which of the following is not a JavaScript data type?",
    "options": ["Number", "Boolean", "Character", "Object"],
    "correct": 2
  },
  {
    "question": "15. What does `const` declare?",
    "options": ["A variable that can’t be reassigned", "A variable scoped globally", "A constant function", "A class property"],
    "correct": 0
  },
  {
    "question": "16. How is JavaScript code usually embedded in HTML?",
    "options": ["<js>", "<script>", "<javascript>", "<code>"],
    "correct": 1
  },
  {
    "question": "17. Which loop guarantees at least one execution?",
    "options": ["for", "while", "do...while", "forEach"],
    "correct": 2
  },
  {
    "question": "18. What does the `map()` method return?",
    "options": ["A filtered array", "The original array", "A new array", "Undefined"],
    "correct": 2
  },
  {
    "question": "19. What will `Boolean(0)` return?",
    "options": ["true", "false", "undefined", "0"],
    "correct": 1
  },
  {
    "question": "20. Which object is the root of all JavaScript objects?",
    "options": ["Array", "Document", "Window", "Object"],
    "correct": 3
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
