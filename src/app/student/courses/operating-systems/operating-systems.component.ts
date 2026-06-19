import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-operating-systems',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './operating-systems.component.html',
  styleUrl: './operating-systems.component.css'
})
export class OperatingSystemsComponent {
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
    "question": "1. What is the primary purpose of an operating system?",
    "options": ["Run antivirus software", "Manage hardware and software resources", "Edit documents", "Access the internet"],
    "correct": 1
  },
  {
    "question": "2. Which of the following is an example of an operating system?",
    "options": ["Chrome", "Linux", "Photoshop", "Python"],
    "correct": 1
  },
  {
    "question": "3. Which part of the OS interacts directly with the hardware?",
    "options": ["User interface", "Kernel", "Application layer", "File manager"],
    "correct": 1
  },
  {
    "question": "4. What is multitasking in operating systems?",
    "options": ["Running one program slowly", "Running multiple programs at once", "Installing several OS", "Copying files"],
    "correct": 1
  },
  {
    "question": "5. What does RAM stand for?",
    "options": ["Random Access Memory", "Real Active Memory", "Read-Only Access Memory", "Rapid Application Monitor"],
    "correct": 0
  },
  {
    "question": "6. Which scheduling algorithm assigns the CPU to the process with the shortest burst time?",
    "options": ["Round Robin", "FCFS", "SJF", "Priority"],
    "correct": 2
  },
  {
    "question": "7. What does a context switch involve?",
    "options": ["Changing network settings", "Switching users", "Saving and loading process state", "Opening a new file"],
    "correct": 2
  },
  {
    "question": "8. Which memory management scheme uses pages and frames?",
    "options": ["Segmentation", "Paging", "Fragmentation", "Swapping"],
    "correct": 1
  },
  {
    "question": "9. What is a system call?",
    "options": ["A hardware alert", "A virus", "A request to the kernel", "A network message"],
    "correct": 2
  },
  {
    "question": "10. Which of the following avoids starvation using aging?",
    "options": ["SJF", "FCFS", "Round Robin", "Priority scheduling"],
    "correct": 3
  },
  {
    "question": "11. What causes thrashing in virtual memory?",
    "options": ["Too many background processes", "Insufficient disk space", "Too many page faults", "Driver errors"],
    "correct": 2
  },
  {
    "question": "12. What is a deadlock?",
    "options": ["Process crash", "Loss of memory", "Circular wait with resource hold", "CPU overload"],
    "correct": 2
  },
  {
    "question": "13. Which algorithm is used in disk scheduling to reduce head movement?",
    "options": ["FCFS", "SSTF", "FIFO", "Round Robin"],
    "correct": 1
  },
  {
    "question": "14. What is the difference between a process and a thread?",
    "options": ["Threads are slower than processes", "Processes share memory, threads do not", "Threads are lighter and share process resources", "Processes run in the browser"],
    "correct": 2
  },
  {
    "question": "15. What does the `fork()` system call do?",
    "options": ["Starts the OS", "Creates a new thread", "Terminates the process", "Creates a new process"],
    "correct": 3
  },
  {
    "question": "16. What is the Banker’s algorithm used for?",
    "options": ["File backup", "CPU scheduling", "Deadlock avoidance", "User authentication"],
    "correct": 2
  },
  {
    "question": "17. What is the purpose of the TLB in memory management?",
    "options": ["Disk backup", "Translation lookaside buffer for fast address mapping", "Cache clearing", "Fragment detection"],
    "correct": 1
  },
  {
    "question": "18. Which strategy combines segmentation and paging?",
    "options": ["Swapping", "Virtual segmentation", "Multi-level memory", "Segmented paging"],
    "correct": 3
  },
  {
    "question": "19. What type of scheduler decides which process should be executed next?",
    "options": ["Long-term scheduler", "Medium-term scheduler", "Short-term scheduler", "Batch scheduler"],
    "correct": 2
  },
  {
    "question": "20. Which of the following is true about real-time operating systems?",
    "options": ["They are always graphical", "They have variable latency", "They respond within strict time constraints", "They are used only in desktop computers"],
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
  
  
  


