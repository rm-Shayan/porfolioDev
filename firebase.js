// firebase-config.js
import { initializeApp, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Global Firebase variables to be exported
export let firebaseApp = null;
export let db = null;
// Auth is removed
export let testimonials = []; // Array to store testimonials
export let currentTestimonialIndex = 0; // Current testimonial index for navigation

// User-provided Firebase configuration
const firebaseConfigFromUser = {
    
};

let currentAppId; // To store the current application ID

// Initialize Firebase
export const initializeFirebase = async () => {
    try {
        // Use the hardcoded Firebase configuration provided by the user
        const appConfig = firebaseConfigFromUser;

        if (!appConfig || !appConfig.apiKey) { // Basic check for a valid config object
            console.error("Firebase configuration is missing or invalid. Cannot initialize Firebase.");
            showMessageBox('Firebase configuration is missing or invalid. Please check the script.', 'error');
            return;
        }
        
        currentAppId = appConfig.appId; // Set currentAppId from the hardcoded config

        firebaseApp = initializeApp(appConfig);
        db = getFirestore(firebaseApp);
        
        // Enable Firestore debug logging (optional, good for development)
        setLogLevel('debug'); 

        console.log(`Firebase initialized with hardcoded config for app ID: ${currentAppId} (Authentication has been removed).`);
        console.log("Firebase debug logging enabled.");

        // Start listening for testimonials
        listenForTestimonials();

    } catch (error) {
        console.error("Error initializing Firebase:", error);
        showMessageBox(`Error initializing Firebase: ${error.message || error}`, 'error');
    }
};

// Function to display a message box (assumed to be in your HTML or main script)
export const showMessageBox = (message, type = 'info') => {
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    const closeButton = document.getElementById('message-close-button');

    // If message box elements are not found, log to console as a fallback
    if (!messageBox || !messageText || !closeButton) {
        console.log(`MessageBox: [${type}] ${message}`);
        return;
    }

    messageText.textContent = message;
    // Reset classes, then apply new ones
    messageBox.className = `fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white z-[1000] transition-all duration-300 transform translate-y-full opacity-0`; // Base classes

    if (type === 'success') {
        messageBox.classList.add('bg-green-500');
    } else if (type === 'error') {
        messageBox.classList.add('bg-red-500');
    } else { // 'info' or default
        messageBox.classList.add('bg-blue-500');
    }

    // Show the message box
    setTimeout(() => {
        messageBox.classList.remove('translate-y-full', 'opacity-0');
        messageBox.classList.add('translate-y-0', 'opacity-100');
    }, 50); // Short delay to ensure transition occurs

    // Auto-hide after 3 seconds
    const autoHideTimeout = setTimeout(() => {
        messageBox.classList.remove('translate-y-0', 'opacity-100');
        messageBox.classList.add('translate-y-full', 'opacity-0');
    }, 3000);

    // Clear auto-hide if closed manually
    closeButton.onclick = () => {
        clearTimeout(autoHideTimeout);
        messageBox.classList.remove('translate-y-0', 'opacity-100');
        messageBox.classList.add('translate-y-full', 'opacity-0');
    };
};


// Function to render a single testimonial
export const renderTestimonial = (testimonial) => {
    const testimonialCard = document.getElementById('testimonial-card');
    if (!testimonialCard) {
        console.warn("Element with ID 'testimonial-card' not found. Cannot render testimonial.");
        return;
    }
    if (!testimonial) {
        testimonialCard.innerHTML = '<p class="text-gray-700-themed text-lg">No testimonial data to display.</p>';
        return;
    }

    testimonialCard.innerHTML = `
        <div class="flex items-center mb-6">
            <img src="${testimonial.imageUrl || 'https://placehold.co/80x80/6a11cb/ffffff?text=C'}" alt="${testimonial.clientName || 'Client'}" class="w-20 h-20 rounded-full mr-6 shadow-md object-cover">
            <div>
                <p class="text-xl font-bold text-gray-900 dark:text-gray-100">${testimonial.clientName || 'Anonymous Client'}</p>
                <p class="text-blue-600 dark:text-blue-400 font-semibold">${testimonial.clientTitle || 'Client Title'}</p>
            </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic mb-6">
            "${testimonial.quote || 'No quote provided.'}"
        </p>
        <div class="flex justify-start text-yellow-500 text-xl">
            ${Array(testimonial.rating || 0).fill('<i class="fas fa-star"></i>').join('')}
            ${Array(5 - (testimonial.rating || 0)).fill('<i class="far fa-star"></i>').join('')}
        </div>
    `;
};

// Function to navigate testimonials
export const navigateTestimonials = (direction) => {
    if (testimonials.length === 0) return;

    currentTestimonialIndex += direction;
    if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    } else if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    }
    renderTestimonial(testimonials[currentTestimonialIndex]);
};

// Listen for real-time updates to testimonials
export function listenForTestimonials() {
    if (!db) {
        console.error("Firestore not initialized. Cannot fetch testimonials.");
        return;
    }
    // Use 'testimonial' as the top-level collection name as requested
    const testimonialsCol = collection(db, 'testimonial'); 
    const q = query(testimonialsCol); // Removed orderBy, will sort client-side

    onSnapshot(q, (snapshot) => {
        const fetchedTestimonials = [];
        snapshot.forEach((doc) => {
            fetchedTestimonials.push({ id: doc.id, ...doc.data() });
        });

        // Sort testimonials by timestamp client-side (newest first)
        testimonials = fetchedTestimonials.sort((a, b) => {
            const tsA = a.timestamp || 0; // Default to 0 if timestamp is missing/null
            const tsB = b.timestamp || 0; // Default to 0 if timestamp is missing/null
            return tsB - tsA; // Descending order
        });

        const testimonialCard = document.getElementById('testimonial-card');
        if (testimonials.length > 0) {
            currentTestimonialIndex = 0; // Reset index to show the newest first
            renderTestimonial(testimonials[currentTestimonialIndex]);
        } else if (testimonialCard) {
            testimonialCard.innerHTML = '<p class="text-gray-700-themed text-lg">No testimonials yet. Be the first to add one!</p>';
        }
    }, (error) => {
        console.error("Error fetching testimonials:", error);
        showMessageBox('Error loading testimonials. See console for details.', 'error');
    });
}

// Add Testimonial Function
export const addTestimonial = async (event) => {
    event.preventDefault();
    if (!db) { // Check if Firestore is initialized
        showMessageBox('Firestore is not initialized. Please wait or check configuration.', 'error');
        return;
    }

    const clientNameInput = document.getElementById('testimonial-client-name');
    const clientTitleInput = document.getElementById('testimonial-client-title');
    const quoteInput = document.getElementById('testimonial-quote');
    const ratingInput = document.getElementById('testimonial-rating');
    const imageUrlInput = document.getElementById('testimonial-image-url');

    // Ensure all form elements exist before trying to get their values
    if (!clientNameInput || !clientTitleInput || !quoteInput || !ratingInput || !imageUrlInput) {
        showMessageBox('One or more testimonial form fields are missing from the HTML.', 'error');
        console.error('Testimonial form field(s) missing.');
        return;
    }

    const clientName = clientNameInput.value;
    const clientTitle = clientTitleInput.value;
    const quote = quoteInput.value;
    const rating = parseInt(ratingInput.value, 10);
    const imageUrl = imageUrlInput.value;

    if (!clientName.trim() || !clientTitle.trim() || !quote.trim() || isNaN(rating) || rating < 1 || rating > 5) {
        showMessageBox('Please fill all testimonial fields correctly. Rating must be between 1 and 5.', 'error');
        return;
    }

    try {
        // Add to 'testimonial' collection directly
        await addDoc(collection(db, 'testimonial'), {
            clientName,
            clientTitle,
            quote,
            rating,
            imageUrl: imageUrl.trim() || 'https://placehold.co/80x80/6a11cb/ffffff?text=C', // Placeholder if empty
            timestamp: Date.now(),
            // userId field is removed as authentication is removed
        });
        showMessageBox('Testimonial added successfully!', 'success');
        if (event.target.reset) { // Check if reset is a function (it should be for a form)
            event.target.reset();
        }
    } catch (e) {
        console.error("Error adding document: ", e);
        showMessageBox(`Error adding testimonial: ${e.message || e}`, 'error');
    }
};
