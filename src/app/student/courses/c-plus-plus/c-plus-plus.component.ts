import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-plus-plus',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './c-plus-plus.component.html',
  styleUrl: './c-plus-plus.component.css'
})
export class CPlusPlusComponent {
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
    question: "1. What is the correct file extension for C++ programs?",
    options: [".cpp", ".java", ".c", ".py"],
    correct: 0
  },
  {
    question: "2. Which of the following is used to create a comment in C++?",
    options: ["// comment", "/* comment */", "# comment", "Both 1 and 2"],
    correct: 3
  },
  {
    question: "3. Which of the following is not a C++ data type?",
    options: ["int", "float", "real", "char"],
    correct: 2
  },
  {
    question: "4. What is the output of: cout << 5 + 2 << endl;",
    options: ["7", "5 + 2", "cout<<7", "Error"],
    correct: 0
  },
  {
    question: "5. Who developed the C++ language?",
    options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Guido van Rossum"],
    correct: 1
  },
  {
    question: "6. What is the default access specifier for class members in C++?",
    options: ["public", "private", "protected", "global"],
    correct: 1
  },
  {
    question: "7. Which symbol is used to declare a pointer in C++?",
    options: ["&", "*", "#", "@"],
    correct: 1
  },
  {
    question: "8. What will be the output of: int x = 10; cout << ++x;",
    options: ["10", "11", "Error", "x"],
    correct: 1
  },
  {
    question: "9. Which keyword is used to define a constant in C++?",
    options: ["const", "constant", "define", "immutable"],
    correct: 0
  },
  {
    question: "10. Which of the following is a loop structure in C++?",
    options: ["for", "while", "do-while", "All of the above"],
    correct: 3
  },
  {
    question: "11. What is the size of int on a typical 32-bit system?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on compiler"],
    correct: 1
  },
  {
    question: "12. Which header file is needed to use 'cout' in C++?",
    options: ["<iostream>", "<stdio.h>", "<conio.h>", "<stdlib.h>"],
    correct: 0
  },
  {
    question: "13. Which operator is used to access members of a class using a pointer?",
    options: [".", "->", "*", "&"],
    correct: 1
  },
  {
    question: "14. What is the purpose of a constructor in C++?",
    options: ["Initialize objects", "Destroy objects", "Allocate memory", "None of the above"],
    correct: 0
  },
  {
    question: "15. Which concept allows the same function name to have different meanings?",
    options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
    correct: 2
  },
  {
    question: "16. Which keyword is used for inheritance in C++?",
    options: ["inherits", "extends", "public", "virtual"],
    correct: 2
  },
  {
    question: "17. Which of the following is not a valid loop control statement?",
    options: ["break", "continue", "exit", "repeat"],
    correct: 3
  },
  {
    question: "18. What does STL stand for in C++?",
    options: ["Standard Template Library", "System Template Library", "Simple Template Language", "Standard Type Library"],
    correct: 0
  },
  {
    question: "19. Which of the following is a correct function declaration?",
    options: ["int func;", "int func()", "function int();", "declare int func();"],
    correct: 1
  },
  {
    question: "20. What is the return type of 'main()' in standard C++?",
    options: ["void", "int", "main", "char"],
    correct: 1
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
