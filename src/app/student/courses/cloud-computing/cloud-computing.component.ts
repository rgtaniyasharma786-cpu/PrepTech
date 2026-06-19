import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cloud-computing',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cloud-computing.component.html',
  styleUrl: './cloud-computing.component.css'
})
export class CloudComputingComponent {
   quizForm:FormGroup;
      currentQuestionIndex = 0;
      score = 0;
      showResult = false;
    
      userAnswers: number[] = [];
    
      timer: number = 20 * 60; // 20 minutes in seconds
      displayTime: string = '';
      timerInterval: any;
    
      quizData = [
        {
    question: "1. What is cloud computing?",
    options: [
      "Computing using local servers",
      "Delivering computing services over the internet",
      "Storing data on physical devices",
      "Creating software using cloud"
    ],
    correct: 1
  },
  {
    question: "2. Which of the following is a cloud computing service model?",
    options: ["PaaS", "LAN", "HTTP", "USB"],
    correct: 0
  },
  {
    question: "3. What does 'IaaS' stand for?",
    options: [
      "Information as a Service",
      "Infrastructure as a Service",
      "Internet as a Service",
      "Interface as a Service"
    ],
    correct: 1
  },
  {
    question: "4. Which one is a benefit of cloud computing?",
    options: [
      "Higher electricity consumption",
      "Limited scalability",
      "Cost-efficiency",
      "On-site hardware dependency"
    ],
    correct: 2
  },
  {
    question: "5. Which cloud model offers the most control to the user?",
    options: ["SaaS", "PaaS", "IaaS", "All offer same control"],
    correct: 2
  },
  {
    question: "6. Google Drive is an example of which service model?",
    options: ["PaaS", "IaaS", "SaaS", "VPN"],
    correct: 2
  },
  {
    question: "7. What is virtualization in cloud computing?",
    options: [
      "Creating real hardware",
      "Using physical servers only",
      "Creating a virtual version of something",
      "Disabling services"
    ],
    correct: 2
  },
  {
    question: "8. Which of these is NOT a cloud deployment model?",
    options: ["Private", "Public", "Hybrid", "Offline"],
    correct: 3
  },
  {
    question: "9. Which company offers AWS cloud services?",
    options: ["Google", "Amazon", "Microsoft", "Apple"],
    correct: 1
  },
  {
    question: "10. What does PaaS provide?",
    options: [
      "Only hardware",
      "Platform to develop and run applications",
      "Only storage",
      "Security tools only"
    ],
    correct: 1
  },
  {
    question: "11. Which of the following is **not** a cloud service provider?",
    options: ["Azure", "AWS", "Google Cloud", "Oracle VM VirtualBox"],
    correct: 3
  },
  {
    question: "12. What does scalability in cloud computing mean?",
    options: [
      "The cloud is always online",
      "Ability to scale resources up/down as needed",
      "Cloud never crashes",
      "No updates are needed"
    ],
    correct: 1
  },
  {
    question: "13. Which layer is responsible for delivering software applications over the internet?",
    options: ["IaaS", "PaaS", "SaaS", "NaaS"],
    correct: 2
  },
  {
    question: "14. What is a cloud bursting?",
    options: [
      "Destroying cloud data",
      "Sending data to multiple clouds",
      "Using public cloud during high demand",
      "Cloud crashing"
    ],
    correct: 2
  },
  {
    question: "15. What is the main function of cloud storage?",
    options: [
      "To compute code faster",
      "To allow physical hardware upgrades",
      "To store and manage data online",
      "To protect from malware"
    ],
    correct: 2
  },
  {
    question: "16. Which of these best describes multi-tenancy?",
    options: [
      "One user per server",
      "Multiple users share the same resources securely",
      "Many data centers in one region",
      "Each tenant has their own cloud"
    ],
    correct: 1
  },
  {
    question: "17. Which service model is ideal for developers building applications?",
    options: ["IaaS", "SaaS", "PaaS", "DBaaS"],
    correct: 2
  },
  {
    question: "18. What is a hypervisor?",
    options: [
      "A type of cloud storage",
      "A tool to monitor network",
      "Software to run virtual machines",
      "An API management tool"
    ],
    correct: 2
  },
  {
    question: "19. Which of these is a characteristic of public cloud?",
    options: [
      "Hosted in-house",
      "Accessible only by one company",
      "Owned by a third-party provider",
      "Not scalable"
    ],
    correct: 2
  },
  {
    question: "20. Which is the first step in migrating to the cloud?",
    options: [
      "Deploying the app",
      "Monitoring performance",
      "Planning and assessment",
      "Testing features"
    ],
    correct: 2
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
