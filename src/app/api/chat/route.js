import { GoogleGenerativeAI } from '@google/generative-ai';
import portfolioData from '../../data/portfolio-data.json';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { message } = await request.json();

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
- Provide specific information about services, skills, and projects
- Encourage contact through the provided channels
- Keep responses concise but informative (under 120 words)
- If asked about pricing, provide the specific rates from the data
- Offer free 30-minute discovery for qualified leads
- Include up to two short portfolio examples when relevant`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${context}

User Question: ${message}

Please respond as MG Dev's personal assistant. Be helpful, professional, and encourage them to reach out for projects or collaborations.`;

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
    return Response.json({ 
      success: false, 
      message: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact MG Dev directly through WhatsApp, LinkedIn, or email.",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 