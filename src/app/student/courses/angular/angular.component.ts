import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReactJsComponent } from '../react-js/react-js.component';

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, ReactJsComponent],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.css'
})
export class AngularComponent {

  
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
    "question": "1. What architecture does Angular use?",
    "options": ["MVC", "MVVM", "Component-based", "Layered"],
    "correct": 2
  },
  {
    "question": "2. Angular is written in which programming language?",
    "options": ["JavaScript", "TypeScript", "Python", "Java"],
    "correct": 1
  },
  {
    "question": "3. What is a decorator in Angular?",
    "options": ["A CSS utility", "A TypeScript feature for modifying classes", "A routing directive", "A service"],
    "correct": 1
  },
  {
    "question": "4. Which file holds metadata for an Angular component?",
    "options": ["component.html", "component.ts", "app.module.ts", "angular.json"],
    "correct": 1
  },
  {
    "question": "5. What is the purpose of `ngOnInit()`?",
    "options": ["Initialize component state", "Handle routing events", "Bind HTML", "Create services"],
    "correct": 0
  },
  {
    "question": "6. What does `*ngIf` do?",
    "options": ["Loop through items", "Add styles", "Render element conditionally", "Navigate pages"],
    "correct": 2
  },
  {
    "question": "7. Which command creates a new Angular component?",
    "options": ["ng create component", "ng make component", "ng new component", "ng generate component"],
    "correct": 3
  },
  {
    "question": "8. Which directive is used to loop over a collection?",
    "options": ["*ngIf", "*ngFor", "ngLoop", "ngEach"],
    "correct": 1
  },
  {
    "question": "9. How do you bind data from component to template?",
    "options": ["[]", "()", "{{ }}", "*"],
    "correct": 2
  },
  {
    "question": "10. What is dependency injection in Angular?",
    "options": ["Injecting styles", "Routing between views", "Providing services to components", "Creating dynamic forms"],
    "correct": 2
  },
  {
    "question": "11. Which lifecycle hook detects changes in data-bound properties?",
    "options": ["ngOnInit", "ngOnChanges", "ngAfterViewInit", "ngDoCheck"],
    "correct": 1
  },
  {
    "question": "12. What does Angular CLI stand for?",
    "options": ["Command Line Interpreter", "Component-Level Interface", "Command Line Interface", "Component Loading Input"],
    "correct": 2
  },
  {
    "question": "13. What does a service typically contain in Angular?",
    "options": ["HTML template", "Component logic", "Reusable business logic", "Routing definitions"],
    "correct": 2
  },
  {
    "question": "14. What is `RouterModule.forRoot()` used for?",
    "options": ["Register global routes", "Import HTTP services", "Declare components", "Initialize animations"],
    "correct": 0
  },
  {
    "question": "15. Which pipe transforms text to uppercase?",
    "options": ["textPipe", "UpperPipe", "toUpperCase", "uppercase"],
    "correct": 3
  },
  {
    "question": "16. What are observables used for?",
    "options": ["Managing CSS classes", "Handling asynchronous data streams", "Defining routes", "Declaring templates"],
    "correct": 1
  },
  {
    "question": "17. What is the purpose of the `HttpClientModule`?",
    "options": ["Form validation", "Component creation", "Making HTTP requests", "Managing animations"],
    "correct": 2
  },
  {
    "question": "18. What does lazy loading do in Angular?",
    "options": ["Loads animations on demand", "Delays data binding", "Loads modules only when needed", "Pauses routing"],
    "correct": 2
  },
  {
    "question": "19. How do you create a two-way data binding?",
    "options": ["[value]", "(value)", "{{value}}", "[(ngModel)]"],
    "correct": 3
  },
  {
    "question": "20. What does `ng build` do?",
    "options": ["Starts dev server", "Installs dependencies", "Compiles the project for production", "Creates a component"],
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
