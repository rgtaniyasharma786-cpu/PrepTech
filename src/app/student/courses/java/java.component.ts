import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-java',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './java.component.html',
  styleUrl: './java.component.css'
})
export class JavaComponent {
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
    "question": "1. Which keyword is used to define a class in Java?",
    "options": ["object", "define", "class", "struct"],
    "correct": 2
  },
  {
    "question": "2. What is the entry point of a Java application?",
    "options": ["main()", "start()", "run()", "init()"],
    "correct": 0
  },
  {
    "question": "3. Which data type is used to store whole numbers?",
    "options": ["float", "int", "double", "boolean"],
    "correct": 1
  },
  {
    "question": "4. What does `System.out.println()` do?",
    "options": ["Reads input", "Prints text", "Declares a variable", "Creates a class"],
    "correct": 1
  },
  {
    "question": "5. Which symbol is used for single-line comments in Java?",
    "options": ["#", "//", "/*", "--"],
    "correct": 1
  },
  {
    "question": "6. What is the size of a `boolean` in Java?",
    "options": ["1 bit", "8 bits", "16 bits", "32 bits"],
    "correct": 0
  },
  {
    "question": "7. What will `true && false` return?",
    "options": ["true", "false", "null", "0"],
    "correct": 1
  },
  {
    "question": "8. Which operator is used for addition?",
    "options": ["+", "-", "*", "%"],
    "correct": 0
  },
  {
    "question": "9. What is used to store multiple values of the same type?",
    "options": ["array", "object", "class", "float"],
    "correct": 0
  },
  {
    "question": "10. What is the default value of an uninitialized `int`?",
    "options": ["1", "null", "0", "undefined"],
    "correct": 2
  },
  {
    "question": "11. Which keyword is used to create an object?",
    "options": ["make", "create", "new", "init"],
    "correct": 2
  },
  {
    "question": "12. What is inheritance in Java?",
    "options": ["Copying data", "Using methods from another class", "Saving a file", "Printing values"],
    "correct": 1
  },
  {
    "question": "13. Which keyword prevents inheritance?",
    "options": ["private", "final", "static", "void"],
    "correct": 1
  },
  {
    "question": "14. Which access modifier allows visibility only within the same class?",
    "options": ["public", "private", "protected", "default"],
    "correct": 1
  },
  {
    "question": "15. What is the extension for compiled Java files?",
    "options": [".java", ".class", ".exe", ".jar"],
    "correct": 1
  },
  {
    "question": "16. Which loop runs at least once?",
    "options": ["while", "for", "do-while", "foreach"],
    "correct": 2
  },
  {
    "question": "17. How do you declare a constant variable?",
    "options": ["const", "static", "final", "immutable"],
    "correct": 2
  },
  {
    "question": "18. Which keyword is used to inherit a class?",
    "options": ["inherits", "extends", "implements", "uses"],
    "correct": 1
  },
  {
    "question": "19. Which data type is used to store text?",
    "options": ["int", "char", "String", "double"],
    "correct": 2
  },
  {
    "question": "20. What does `==` compare?",
    "options": ["References", "Methods", "Values", "Sizes"],
    "correct": 2
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
