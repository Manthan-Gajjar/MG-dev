import { GoogleGenerativeAI } from '@google/generative-ai';
import portfolioData from '../../data/portfolio-data.json';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("🚀 ~ genAI:", genAI)

export async function POST(request) {
  const { message } = await request.json();
  
  try {
    // Build services and pricing text
    const servicesText = Object.entries(portfolioData.services).map(([key, service]) => {
      const pricing = portfolioData.pricing[key];
      return `- ${service.title}: ${service.description} (${pricing})`;
    }).join('\n');

    // Build projects text
    const projectsText = portfolioData.projects.map(project => 
      `- ${project.name}: ${project.description} (Tech: ${project.technologies.join(', ')})`
    ).join('\n');

    // Build pricing text
    const pricingText = 'Starting rates: Web Development (₹15,000+), Frontend (₹10,000+), Backend (₹12,000+), UI/UX (₹8,000+), Consulting (₹2,000/hour)';

    // Build free demo text
    const freeDemoText = 'Available: 30-minute discovery call to discuss your project and provide estimates';

    // Create context with portfolio data
    const context = `You are MG Dev's personal AI assistant. Here's my portfolio information:

**Personal Info:**
- Name: ${portfolioData.personalInfo.name}
- Title: ${portfolioData.personalInfo.title}
- Location: ${portfolioData.personalInfo.location}
- Contact: ${portfolioData.personalInfo.email}, ${portfolioData.personalInfo.phone}

**About Me:**
${portfolioData.about.summary}
Experience: ${portfolioData.about.experience}
Specialization: ${portfolioData.about.specialization}

**Skills:**
Frontend: ${portfolioData.skills.frontend.join(', ')}
Backend: ${portfolioData.skills.backend.join(', ')}
Databases: ${portfolioData.skills.databases.join(', ')}
Tools: ${portfolioData.skills.tools.join(', ')}

**Services & Pricing:**
${servicesText}

**Projects:**
${projectsText}

**Pricing:**
${pricingText}

**Contact Info:**
- Availability: ${portfolioData.contactInfo.availability}
- Response Time: ${portfolioData.contactInfo.responseTime}
- Preferred Contact: ${portfolioData.contactInfo.preferredContact}
- LinkedIn: ${portfolioData.personalInfo.linkedin}
- Instagram: ${portfolioData.personalInfo.instagram}
- WhatsApp: ${portfolioData.personalInfo.whatsapp}

**Free Demo:**
${freeDemoText}

**Instructions:**
- Be friendly, professional, and helpful
- Always respond as MG Dev's assistant
- Answer the specific question asked, don't give generic responses
- Be concise and direct
- Only mention contact info if the user asks about it or if it's relevant
- Focus on the actual question content
- Keep responses under 100 words unless more detail is specifically requested
- Don't repeat the same information in every response`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${context}

User Question: ${message}

Instructions for response:
- Answer the specific question asked, don't give generic responses
- Be concise and direct
- Only mention contact info if the user asks about it or if it's relevant
- Focus on the actual question content
- Keep responses under 100 words unless more detail is specifically requested
- Don't repeat the same information in every response

Please respond as MG Dev's personal assistant.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({ 
      success: true, 
      message: text.trim(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Use fallback responses when API fails
    const fallbackResponse = getFallbackResponse(message);
    return Response.json({ 
      success: true, 
      message: fallbackResponse,
      timestamp: new Date().toISOString()
    });
  }
}

// Fallback response function
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Skills related
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
    return "React, Next.js, TypeScript, Node.js, Express. High-performance apps with payment gateways and admin panels. 💻";
  }
  
  // Services related
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('build')) {
    return "Web development with React, Node.js. Mobile apps via our team. Payment gateways, admin panels, performance optimization. ⚡";
  }
  
  // Pricing related
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
    return "Web development starts from ₹15,000, mobile from ₹25,000. Pricing varies by requirements. 💰";
  }
  
  // Mobile related
  if (lowerMessage.includes('mobile') || lowerMessage.includes('app') || lowerMessage.includes('flutter') || lowerMessage.includes('ios')) {
    return "Our team handles Flutter and iOS development with cross-platform solutions. 📱";
  }
  
  // Contact related
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return "WhatsApp: +91 8141930612, Email: manthangajjar@gmail.com, LinkedIn: in.linkedin.com/in/manthan-gajjar-7654b52a5 📞";
  }
  
  // Greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hi! I'm MG Dev's assistant. How can I help you today? 👋";
  }
  
  // Default response
  return "I'm MG Dev's assistant. We specialize in React, Node.js web development with payment gateways and admin panels. How can I help? 💻";
} 