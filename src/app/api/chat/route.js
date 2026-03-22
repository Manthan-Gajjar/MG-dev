import { GoogleGenerativeAI } from '@google/generative-ai';
import portfolioData from '../../data/portfolio-data.json';

// Make sure to NOT initialize genAI at the top level, as it crashes if environment variables are undefined at boot time.

export async function POST(request) {
  const { message } = await request.json()

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const enhancedContext = buildEnhancedContext()
    const intelligentPrompt = buildIntelligentPrompt(message, enhancedContext)

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        maxOutputTokens: 300,
      },
    })

    const result = await model.generateContent(intelligentPrompt)
    const response = await result.response
    const text = response.text()

    // Process and enhance the response
    const enhancedResponse = processAIResponse(text, message)

    return Response.json({
      success: true,
      message: enhancedResponse.message,
      suggestions: enhancedResponse.suggestions,
      contactActions: enhancedResponse.contactActions,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API Error:", error)

    const fallbackResponse = getIntelligentFallback(message)
    return Response.json({
      success: true,
      message: fallbackResponse.message,
      suggestions: fallbackResponse.suggestions,
      contactActions: fallbackResponse.contactActions,
      timestamp: new Date().toISOString(),
    })
  }
}

function buildEnhancedContext() {
  const { personalInfo, about, services, contactInfo, pricing } = portfolioData

  return `You are MG Dev's intelligent AI assistant. Your primary goal is to help potential clients understand MG Dev's services and facilitate meaningful connections.

**PERSONALITY & TONE:**
- Be warm, professional, and genuinely helpful
- Show enthusiasm about projects and technology
- Be conversational but concise
- Always aim to move the conversation toward a connection

**CORE INFORMATION:**
👨‍💻 **Developer:** ${personalInfo.name}
🎯 **Expertise:** ${about.specialization.join(", ")}
📍 **Location:** ${personalInfo.location}
⏰ **Experience:** ${about.experienceYears}+ years
💬 **Response Time:** ${contactInfo.responseTime}

**WHY WORK WITH MG DEV:**
${about.whyWorkWithMe ? about.whyWorkWithMe.map(r => `✅ ${r}`).join('\n') : ''}

**SERVICES & PRICING:**
🌐 **Web Development:** ₹${pricing.projectEstimates.smallWebsite.range[0]}+ (React/Next.js, full-stack)
📱 **Mobile Apps:** ₹${services.mobileDevelopment.pricing.freelancerStarting}+ (Flutter, iOS/Android)
⚙️ **Backend APIs:** ₹${services.backendDevelopment.pricing.freelancerStarting}+ (Node.js, databases)
🎨 **UI/UX Design:** ₹${services.uiUxDesign.pricing.starting}+ (User-centered design)
🔧 **Consulting:** ₹${pricing.hourlyRates.consulting}/hour (Free 30-min discovery call)

**CONTACT CHANNELS:**
📱 WhatsApp: ${personalInfo.phone} (Fastest response)
📧 Email: ${personalInfo.email}
💼 LinkedIn: ${personalInfo.linkedin}
📸 Instagram: ${personalInfo.instagram}

**KEY FEATURES:**
✅ Free 30-minute discovery call
✅ 30% upfront, milestone payments
✅ Usually responds within 2-4 hours
✅ Available for freelance & team projects`
}

function buildIntelligentPrompt(userMessage, context) {
  const messageIntent = analyzeMessageIntent(userMessage)

  return `${context}

**USER MESSAGE:** "${userMessage}"
**DETECTED INTENT:** ${messageIntent}

**RESPONSE GUIDELINES:**
1. Address the user's specific question directly
2. Be helpful and informative without being overwhelming
3. If appropriate, suggest the best way to connect (WhatsApp for quick questions, email for detailed proposals, LinkedIn for professional networking)
4. Include relevant pricing only if asked or highly relevant
5. Always end with a gentle call-to-action to connect
6. Keep response under 150 words unless more detail is specifically requested
7. Use emojis sparingly but effectively
8. If they're interested in a project, guide them toward a discovery call

**IMPORTANT:** Focus on being genuinely helpful rather than just promotional. Build trust first.

Please respond as MG Dev's personal AI assistant:`
}

function analyzeMessageIntent(message) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("budget")) {
    return "pricing_inquiry"
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("call")) {
    return "contact_request"
  }
  if (lowerMessage.includes("project") || lowerMessage.includes("build") || lowerMessage.includes("develop")) {
    return "project_inquiry"
  }
  if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("experience")) {
    return "skills_inquiry"
  }
  if (lowerMessage.includes("mobile") || lowerMessage.includes("app") || lowerMessage.includes("flutter")) {
    return "mobile_inquiry"
  }
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "greeting"
  }
  if (lowerMessage.includes("portfolio") || lowerMessage.includes("work") || lowerMessage.includes("example")) {
    return "portfolio_inquiry"
  }

  return "general_inquiry"
}

function processAIResponse(aiText, userMessage) {
  const intent = analyzeMessageIntent(userMessage)
  const suggestions = generateSmartSuggestions(intent)
  const contactActions = generateContactActions(intent)

  // Clean up the AI response
  let processedMessage = aiText.trim()

  // Ensure the response isn't too long
  if (processedMessage.length > 400) {
    processedMessage = processedMessage.substring(0, 380) + "..."
  }

  return {
    message: processedMessage,
    suggestions,
    contactActions,
  }
}

function generateSmartSuggestions(intent) {
  const suggestionMap = {
    greeting: [
      "What services do you offer?",
      "Can you tell me about your pricing?",
      "I have a project idea to discuss",
    ],
    pricing_inquiry: [
      "Can we schedule a discovery call?",
      "What's included in web development?",
      "Do you offer payment plans?",
    ],
    project_inquiry: [
      "Let's schedule a free consultation",
      "What information do you need from me?",
      "Can you share some portfolio examples?",
    ],
    contact_request: ["Send a WhatsApp message", "Schedule a discovery call", "Connect on LinkedIn"],
    skills_inquiry: ["Can you handle my project type?", "What's your development process?", "Show me some examples"],
    mobile_inquiry: [
      "What's the mobile app development process?",
      "Can you handle both iOS and Android?",
      "What's the timeline for mobile apps?",
    ],
  }

  return (
    suggestionMap[intent] || [
      "Tell me more about your services",
      "What's your availability?",
      "Can we schedule a call?",
    ]
  )
}

function generateContactActions(intent) {
  const baseActions = [
    {
      type: "whatsapp",
      label: "WhatsApp Chat",
      url: `https://wa.me/918141930612?text=${encodeURIComponent("Hi Manthan! I found your portfolio and would like to discuss a project. When are you available for a quick chat?")}`,
      icon: "💬",
      primary: true,
    },
    {
      type: "email",
      label: "Send Email",
      url: `mailto:manthangajjar@gmail.com?subject=${encodeURIComponent("Project Inquiry - Let's Connect")}&body=${encodeURIComponent("Hi Manthan,\n\nI'd like to discuss a project with you. Please let me know your availability for a 30-minute discovery call.\n\nThanks!")}`,
      icon: "📧",
    },
    {
      type: "linkedin",
      label: "LinkedIn",
      url: "https://in.linkedin.com/in/manthan-gajjar-7654b52a5",
      icon: "💼",
    },
  ]

  // Prioritize actions based on intent
  if (intent === "contact_request" || intent === "project_inquiry") {
    return baseActions
  }

  return baseActions.slice(0, 2) // Show fewer actions for other intents
}

function getIntelligentFallback(message) {
  const intent = analyzeMessageIntent(message)

  const fallbackResponses = {
    greeting: {
      message:
        "Hi there! 👋 I'm MG Dev's AI assistant. Manthan specializes in full-stack web development with React/Next.js and mobile apps with Flutter. How can I help you today?",
    },
    pricing_inquiry: {
      message:
        "Great question! 💰 Web development starts from ₹15,000, mobile apps from ₹25,000. Pricing depends on your specific requirements. I'd recommend a free 30-minute discovery call to give you an accurate estimate. Shall I help you connect with Manthan?",
    },
    project_inquiry: {
      message:
        "Exciting! 🚀 Manthan loves working on new projects. He specializes in React/Next.js web apps, Flutter mobile apps, and full-stack solutions. The best next step would be a free 30-minute discovery call to discuss your vision. Ready to connect?",
    },
    contact_request: {
      message:
        "Perfect! 📞 Manthan typically responds within 2-4 hours. WhatsApp (+91 8141930612) is the fastest way to reach him, or you can email (manthangajjar@gmail.com) for detailed discussions. He also offers free 30-minute discovery calls!",
    },
    skills_inquiry: {
      message:
        "Manthan's expertise includes: React, Next.js, Node.js, Express, MongoDB, Flutter (iOS/Android), and TypeScript. 💻 He builds everything from simple websites to complex web applications with payment gateways and admin panels. What type of project are you considering?",
    },
    mobile_inquiry: {
      message:
        "Yes! 📱 Manthan's team handles Flutter development for both iOS and Android. They create cross-platform apps with native performance, app store submission, and ongoing support. Mobile projects start from ₹25,000. Want to discuss your app idea?",
    },
  }

  const response = fallbackResponses[intent] || {
    message:
      "I'm here to help! 🤖 Manthan is a full-stack developer specializing in React, Node.js, and Flutter. He's available for web development, mobile apps, and consulting. What would you like to know more about?",
  }

  return {
    message: response.message,
    suggestions: generateSmartSuggestions(intent),
    contactActions: generateContactActions(intent),
  }
}
