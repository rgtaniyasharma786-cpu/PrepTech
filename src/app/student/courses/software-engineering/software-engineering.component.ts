import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-software-engineering',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './software-engineering.component.html',
  styleUrl: './software-engineering.component.css'
})
export class SoftwareEngineeringComponent {
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
    question: "1. What is Software Engineering?",
    options: [
      "Creating computer hardware",
      "Designing websites only",
      "Applying engineering principles to software development",
      "Assembling computer parts"
    ],
    correct: 2
  },
  {
    question: "2. Which model is known as the linear model?",
    options: ["Waterfall Model", "Agile Model", "Spiral Model", "V-Model"],
    correct: 0
  },
  {
    question: "3. What does SDLC stand for?",
    options: [
      "Software Design Life Cycle",
      "System Development Life Cycle",
      "Software Development Life Cycle",
      "System Design Logical Cycle"
    ],
    correct: 2
  },
  {
    question: "4. Which phase comes first in the SDLC?",
    options: ["Design", "Testing", "Maintenance", "Requirement Analysis"],
    correct: 3
  },
  {
    question: "5. Which model allows feedback after each iteration?",
    options: ["Waterfall", "Spiral", "V-Model", "RAD"],
    correct: 1
  },
  {
    question: "6. Which is not a part of software requirement specification (SRS)?",
    options: ["Functional requirements", "Design diagrams", "Non-functional requirements", "Performance requirements"],
    correct: 1
  },
  {
    question: "7. Which document defines how the software will be built?",
    options: ["Test Plan", "SRS", "Design Document", "User Manual"],
    correct: 2
  },
  {
    question: "8. Agile development emphasizes:",
    options: [
      "Heavy documentation",
      "Customer collaboration and working software",
      "Rigid planning",
      "Long release cycles"
    ],
    correct: 1
  },
  {
    question: "9. In software testing, what is a 'bug'?",
    options: [
      "A virus",
      "An error in code or logic",
      "A new feature",
      "A backup file"
    ],
    correct: 1
  },
  {
    question: "10. Which testing checks if components work together?",
    options: ["Unit Testing", "Integration Testing", "System Testing", "Acceptance Testing"],
    correct: 1
  },
  {
    question: "11. What is the main aim of software maintenance?",
    options: [
      "Add bugs",
      "Fix hardware issues",
      "Correct faults and improve performance",
      "Reinstall OS"
    ],
    correct: 2
  },
  {
    question: "12. Which of these is a non-functional requirement?",
    options: ["Login feature", "File upload", "System response time", "Data validation"],
    correct: 2
  },
  {
    question: "13. What is modularity in software design?",
    options: [
      "Repeating the same code",
      "Designing without structure",
      "Breaking software into independent modules",
      "Ignoring software structure"
    ],
    correct: 2
  },
  {
    question: "14. Which one is a design principle?",
    options: ["Coupling", "Debugging", "Deployment", "Data mining"],
    correct: 0
  },
  {
    question: "15. What does CASE stand for?",
    options: [
      "Computer Automated Software Engineering",
      "Code Assistance and Software Evaluation",
      "Computer-Aided Software Engineering",
      "Central Application System Environment"
    ],
    correct: 2
  },
  {
    question: "16. What is the Spiral model best suited for?",
    options: [
      "Projects with no risk",
      "Small and simple projects",
      "High-risk large projects",
      "Real-time embedded systems only"
    ],
    correct: 2
  },
  {
    question: "17. Which of these is an Agile methodology?",
    options: ["Scrum", "Waterfall", "Spiral", "RAD"],
    correct: 0
  },
  {
    question: "18. Who is responsible for gathering user requirements?",
    options: ["Database Admin", "System Analyst", "Tester", "Network Engineer"],
    correct: 1
  },
  {
    question: "19. What does UML stand for?",
    options: [
      "Unified Modeling Language",
      "Universal Machine Language",
      "User Mode Language",
      "Unlimited Model Logic"
    ],
    correct: 0
  },
  {
    question: "20. Which diagram is used for showing system activities?",
    options: ["Class diagram", "Activity diagram", "Use case diagram", "Component diagram"],
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
