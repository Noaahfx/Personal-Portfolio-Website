document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    const form = document.getElementById('contact-form');
    const responseMessage = document.getElementById('form-response');
    document.getElementById("current-year").textContent = new Date().getFullYear();

    messageInput.addEventListener('input', function () {
        const currentLength = messageInput.value.length;
        charCounter.textContent = `${currentLength} / 1000`;
    });
    function validateForm(formData) {
        const name = formData.get('name');
        if (!name) {
            return 'Name is required.';
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            return 'Name can only contain letters and spaces.';
        }

        const email = formData.get('email');
        if (!email) {
            return 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return 'Please enter a valid email address.';
        }

        const message = formData.get('message');
        if (!message) {
            return 'Message is required.';
        } else if (message.length > 1000) {
            return 'Message cannot exceed 1000 characters.';
        }

        return null; 
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const validationError = validateForm(formData);

        if (validationError) {
            responseMessage.textContent = validationError;
            responseMessage.style.color = "red";
            return;
        }

        fetch('https://formspree.io/f/xwpezebk', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                responseMessage.textContent = "Message sent successfully!";
                responseMessage.style.color = "green";
                form.reset();
                charCounter.textContent = '0 / 1000'; 
            } else {
                return response.json().then(data => {
                    responseMessage.textContent = `Failed to send message: ${data.error || 'Unknown error'}. Please try again.`;
                    responseMessage.style.color = "red";
                });
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            responseMessage.textContent = "An error occurred while sending your message. Please try again later.";
            responseMessage.style.color = "red";
        });
    });
});
