import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-react-js',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './react-js.component.html',
  styleUrl: './react-js.component.css'
})
export class ReactJsComponent {

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
    "question": "1. What is React primarily used for?",
    "options": ["Database management", "Server-side scripting", "Building user interfaces", "Machine learning"],
    "correct": 2
  },
  {
    "question": "2. Who developed React?",
    "options": ["Google", "Microsoft", "Facebook", "Amazon"],
    "correct": 2
  },
  {
    "question": "3. What is a React component?",
    "options": ["A CSS class", "A function or class that returns JSX", "A database entry", "A browser extension"],
    "correct": 1
  },
  {
    "question": "4. Which hook is used to manage state in functional components?",
    "options": ["useRef", "useEffect", "useState", "useMemo"],
    "correct": 2
  },
  {
    "question": "5. What does JSX stand for?",
    "options": ["JavaScript Syntax", "Java Syntax Extension", "JavaScript XML", "JSON XML Syntax"],
    "correct": 2
  },
  {
    "question": "6. What is the default port number for a React development server?",
    "options": ["3000", "8000", "5000", "8080"],
    "correct": 0
  },
  {
    "question": "7. What does 'props' stand for?",
    "options": ["Properties", "Prototypes", "Procedures", "Processes"],
    "correct": 0
  },
  {
    "question": "8. Which lifecycle method is called after a component mounts?",
    "options": ["componentDidUpdate", "componentWillUnmount", "componentDidMount", "componentWillMount"],
    "correct": 2
  },
  {
    "question": "9. What does the useEffect hook do?",
    "options": ["Handles form input", "Performs side effects", "Stores state", "Defines routes"],
    "correct": 1
  },
  {
    "question": "10. How are props passed to components?",
    "options": ["Using hooks", "Inside component state", "As HTML attributes", "Via Redux"],
    "correct": 2
  },
  {
    "question": "11. What is the virtual DOM?",
    "options": ["A copy of the browser's DOM", "A database schema", "An actual HTML file", "A React debugging tool"],
    "correct": 0
  },
  {
    "question": "12. What is React Router used for?",
    "options": ["Connecting to databases", "State management", "Navigation between views", "Form validation"],
    "correct": 2
  },
  {
    "question": "13. Which hook is used to optimize performance by memoizing values?",
    "options": ["useMemo", "useState", "useEffect", "useReducer"],
    "correct": 0
  },
  {
    "question": "14. What does 'key' prop help React identify?",
    "options": ["The component’s identity", "Element styles", "Unique list items", "Event handlers"],
    "correct": 2
  },
  {
    "question": "15. Which command creates a new React app?",
    "options": ["npx react-install", "npx create-react-app", "npm init react", "npm start react"],
    "correct": 1
  },
  {
    "question": "16. What is the purpose of 'strict mode' in React?",
    "options": ["To enforce authentication", "To catch potential issues", "To improve performance", "To enable routing"],
    "correct": 1
  },
  {
    "question": "17. What does lifting state up mean in React?",
    "options": ["Moving state into Redux", "Sharing state between unrelated components", "Moving state to a common ancestor", "Exporting state to backend"],
    "correct": 2
  },
  {
    "question": "18. How can forms be handled in React?",
    "options": ["Using class names", "Using context API", "Using controlled components", "Using JSX only"],
    "correct": 2
  },
  {
    "question": "19. Which hook handles reducers in React?",
    "options": ["useEffect", "useReducer", "useRef", "useState"],
    "correct": 1
  },
  {
    "question": "20. What is context API used for?",
    "options": ["Global state management", "DOM manipulation", "Animation support", "Routing configuration"],
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
