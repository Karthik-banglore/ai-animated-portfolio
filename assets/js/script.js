// Particle Background Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 100;
const particleSize = 2;
const particleSpeed = 0.5;
const connectionDistance = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 188, 212, ${this.alpha})`;
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const distance = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(0, 188, 212, ${1 - (distance / connectionDistance)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
createParticles();
animateParticles();

// Typewriter Effect
const nameElement = document.getElementById('typewriter-name');
const titleElement = document.getElementById('typewriter-title');
const nameText = "Karthik";
const titleText = "AI Developer";
let nameIndex = 0;
let titleIndex = 0;

function typeWriter(element, text, index, callback) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        // Sound effect integration point: Typewriter key press sound
        // playSound('keypress.mp3'); 
        setTimeout(() => typeWriter(element, text, index + 1, callback), 100);
    } else if (callback) {
        callback();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeWriter(nameElement, nameText, nameIndex, () => {
        setTimeout(() => typeWriter(titleElement, titleText, titleIndex), 500);
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('.main-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            // Sound effect integration point: Navigation click sound
            // playSound('nav_click.mp3');
        }
    });
});

// Project Card Flip Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
        // Sound effect integration point: Card flip sound
        // playSound('card_flip.mp3');
    });
});

// Skills Section Animated Progress Bars
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-bar');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const progress = bar.dataset.progress;
        bar.style.width = `${progress}%`;
    });
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(skillsSection); // Only animate once
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the section is visible
});

observer.observe(skillsSection);

// Sound Effect Utility (Placeholder - requires actual sound files)
function playSound(soundFileName) {
    // const audio = new Audio(`assets/sounds/${soundFileName}`);
    // audio.play().catch(e => console.error("Error playing sound:", e));
    console.log(`Playing sound: ${soundFileName}`); // For demonstration
}

// Chatbot Widget Implementation
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatQuickActions = document.getElementById('chat-quick-actions');

chatToggleBtn.addEventListener('click', () => {
    chatbotWidget.classList.toggle('open');
    if (chatbotWidget.classList.contains('open')) {
        addBotMessage("Hello! I'm Karthik's AI Assistant. How can I help you today?");
        // Sound effect integration point: Chatbot open sound
        // playSound('chatbot_open.mp3');
    }
});

chatCloseBtn.addEventListener('click', () => {
    chatbotWidget.classList.remove('open');
    // Sound effect integration point: Chatbot close sound
    // playSound('chatbot_close.mp3');
});

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}

function addBotMessage(text) {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        chatMessages.removeChild(typingIndicator);
        addMessage(text, 'bot');
        // Sound effect integration point: Bot message received sound
        // playSound('bot_message.mp3');
    }, 1500); // Simulate typing delay
}

chatSendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');
        chatInput.value = '';
        // Sound effect integration point: User message sent sound
        // playSound('user_message.mp3');
        processUserMessage(userMessage);
    }
}

chatQuickActions.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-action-btn')) {
        const question = e.target.dataset.question;
        addMessage(question, 'user');
        processUserMessage(question);
    }
});

// Hardcoded responses for demonstration. For production, integrate with Gemini API.
async function processUserMessage(message) {
    const lowerCaseMessage = message.toLowerCase();
    let botResponse = "I'm sorry, I don't have information on that. Please try asking about Karthik's skills, projects, or experience.";

    if (lowerCaseMessage.includes("skills")) {
        botResponse = "Karthik is proficient in Python, Machine Learning, Deep Learning, TensorFlow/PyTorch, Natural Language Processing, and Data Science.";
    } else if (lowerCaseMessage.includes("projects")) {
        botResponse = "Karthik has worked on impressive projects like an AI Chatbot with Gemini API, a Predictive Analytics Platform, Real-time Object Detection, a Sentiment Analysis Tool, an AI-Powered E-commerce App, and an Automated Data Pipeline.";
    } else if (lowerCaseMessage.includes("experience")) {
        botResponse = "Karthik is an AI Developer passionate about building intelligent systems and innovative solutions, with a strong background in machine learning, deep learning, and natural language processing.";
    } else if (lowerCaseMessage.includes("contact")) {
        botResponse = "You can contact Karthik through the contact form on this portfolio, or find his details in the contact section.";
    } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        botResponse = "Hello there! How can I assist you with Karthik's portfolio?";
    }

    // Placeholder for Gemini API integration:
    /*
    try {
        const response = await fetch('/api/gemini-proxy', { // Your server-side proxy endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: message }),
        });
        const data = await response.json();
        if (data.text) {
            botResponse = data.text;
        }
    } catch (error) {
        console.error('Error communicating with Gemini API proxy:', error);
        botResponse = "I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }
    */

    addBotMessage(botResponse);
}