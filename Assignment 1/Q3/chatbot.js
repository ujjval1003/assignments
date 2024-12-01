const responses = {
    greeting: "Hello! Welcome to the Real Estate Assistant. How can I help you today?",
    faq: {
        "what is your service": "We help you find properties to buy, rent, or invest in.",
        "how can i buy a property": "You can buy a property by visiting our website or contacting our broker.",
        "do you offer rental options": "Yes, we provide rental options for apartments, houses, and more.",
        "who can i contact for help": "You can contact our broker, who is available during working hours."
    },
    fallback: "I'm sorry, I don't have the answer to that question. Can you rephrase?",
};

function getResponse(userInput) {
    const input = userInput.toLowerCase();
    if (responses.faq[input]) {
    return responses.faq[input];
    }
    return responses.fallback;
}

module.exports = {responses, getResponse};