// email-sender.js

/**
 * Initializes EmailJS and sets up the contact form submission.
 * This function should be called after the EmailJS SDK is loaded in index.html.
 *
 * IMPORTANT: Replace "YOUR_PUBLIC_KEY", "YOUR_SERVICE_ID", and "YOUR_TEMPLATE_ID"
 * with your actual EmailJS credentials from your EmailJS Account Dashboard.
 */
export function setupEmailJsContactForm() {
    // 1. Initialize EmailJS
    // Ensure emailjs SDK is loaded before calling this
    if (typeof emailjs === 'undefined') {
        console.error("EmailJS SDK is not loaded. Please ensure it's included in your index.html before this script.");
        return;
    }

    // Replace "YOUR_PUBLIC_KEY" with your actual EmailJS Public Key
    // You can find this in your EmailJS Account Dashboard -> Account
    emailjs.init({
        publicKey: "meKe5nVRSeG24rRhh", // <-- Replace this with your Public Key
    });
    console.log("EmailJS initialized.");

    // 2. Get the contact form element
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) {
        console.warn("Contact form with ID 'contact-form' not found. EmailJS submission will not be set up.");
        return;
    }

    // 3. Attach event listener for form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission to handle it with EmailJS

        const sendButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = sendButton.textContent;

        // Provide immediate feedback to the user
        sendButton.textContent = 'Sending...';
        sendButton.disabled = true; // Disable button to prevent multiple submissions

        // Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your actual EmailJS IDs
        // These are from your EmailJS Dashboard -> Email Services and Email Templates
        emailjs.sendForm('service_u3qjfsl', 'template_2xt5109', this)
            .then(() => {
                alert('Message sent successfully!'); // Or show a custom success message on UI
                console.log('EmailJS: SUCCESS!');
                contactForm.reset(); // Clear the form fields
            }, (error) => {
                alert('Failed to send message. Please try again later.'); // Or show a custom error message on UI
                console.error('EmailJS: FAILED...', error);
            })
            .finally(() => {
                // Restore button state after sending (success or failure)
                sendButton.textContent = originalButtonText;
                sendButton.disabled = false;
            });
    });

    console.log("Contact form submission listener set up from email-sender.js.");
}
