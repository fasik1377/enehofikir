(function () {
  'use strict';

  const CHAT_STORAGE_KEY = 'enehofikir_chat_history';
  const MAX_HISTORY = 20;

  const orgKnowledge = {
    name: 'Eneho Fikir Humanitarian and Development Organization',
    founded: '2019 G.C.',
    location: 'Addis Ababa, Ethiopia',
    mission: 'To transform the lives of vulnerable children, teachers, young people, and women through education, healthcare, livelihood support, and emergency aid programs.',
    vision: 'A society where every child and family has access to quality education, healthcare, and sustainable livelihoods.',
    values: ['Compassion', 'Integrity', 'Community-led', 'Accountability', 'Sustainability'],
    programs: {
      education: 'School feeding, learning materials, scholarship support, teacher capacity building, school infrastructure',
      health: 'Medical campaigns, health education, screening, referral linkages, community health awareness',
      nutrition: 'School feeding programs, nutritional support for vulnerable families',
      livelihood: 'Skills training, women empowerment, youth employment support, income-generating activities',
      dignity: 'Hygiene kits, clothing support, safe spaces for women and children',
      environment: 'Green Legacy tree planting, environmental education, community clean-up campaigns'
    },
    impact: {
      beneficiaries: '32,901+',
      schools: '14+',
      volunteers: '50+',
      years: 'Since 2019',
      campaigns: '5,000+ people reached through medical campaigns'
    },
    contact: {
      phone: '+251 902 200 020',
      email: 'info@enehofiker.org',
      address: 'Addis Ababa, Ethiopia'
    },
    donation: {
      methods: ['Telebirr', 'CBE Birr', 'M-Pesa', 'Bank Transfer', 'Credit/Debit Card (coming soon)'],
      page: 'donation.html'
    },
    volunteer: {
      roles: ['Education support', 'Health outreach', 'Media/communications', 'Skills-based', 'Events/campaigns', 'Remote volunteering'],
      page: 'volunteer.html'
    },
    social: {
      facebook: 'https://www.facebook.com/profile.php?id=61583776258199',
      instagram: 'https://www.instagram.com/eneho_fikir',
      linkedin: 'https://www.linkedin.com/company/eneho-fiker/',
      youtube: 'https://www.youtube.com/channel/UCWWUkwSKkab4SGOPQ10S5Lw'
    }
  };

  function getResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    if (msg.match(/\b(hi|hello|hey|greetings|selam|ሰላም)\b/)) {
      return "Hello! 👋 Welcome to Eneho Fikir. I'm here to answer your questions about our organization, programs, and how you can get involved. What would you like to know?";
    }

    if (msg.match(/\b(who|what|about|organization|mission|vision|values)\b/)) {
      return `Eneho Fikir Humanitarian and Development Organization was founded in ${orgKnowledge.founded} and is based in ${orgKnowledge.location}.

**Mission:** ${orgKnowledge.mission}

**Vision:** ${orgKnowledge.vision}

**Core Values:** ${orgKnowledge.values.join(', ')}`;
    }

    if (msg.match(/\b(program|project|work|activity|education|health|nutrition|livelihood|dignity|environment)\b/)) {
      let response = "We run six core program areas:\n\n";
      Object.entries(orgKnowledge.programs).forEach(([key, value]) => {
        response += `• **${key.charAt(0).toUpperCase() + key.slice(1)}:** ${value}\n`;
      });
      return response;
    }

    if (msg.match(/\b(impact|achievement|result|beneficiary|reach|number|statistic)\b/)) {
      return `Our impact since ${orgKnowledge.founded}:\n\n• **${orgKnowledge.impact.beneficiaries}** beneficiaries reached\n• **${orgKnowledge.impact.schools}** schools supported\n• **${orgKnowledge.impact.volunteers}** active volunteers\n• **${orgKnowledge.impact.campaigns}**\n• **${orgKnowledge.impact.years}** of service`;
    }

    if (msg.match(/\b(contact|phone|email|address|location|where|reach)\b/)) {
      return `You can reach us at:\n\n📞 **Phone:** ${orgKnowledge.contact.phone}\n📧 **Email:** ${orgKnowledge.contact.email}\n📍 **Address:** ${orgKnowledge.contact.address}\n\nOr visit our Contact page on the website.`;
    }

    if (msg.match(/\b(donate|donation|support|give|contribute|money|fund|payment)\b/)) {
      return `You can support our work through:\n\n**Payment Methods:** ${orgKnowledge.donation.methods.join(', ')}\n\nVisit our **Donation page** (${orgKnowledge.donation.page}) to make a contribution. Every donation helps us reach more children and families in need.`;
    }

    if (msg.match(/\b(volunteer|volunteering|join|help|participate|opportunity)\b/)) {
      return `We welcome volunteers in these areas:\n\n${orgKnowledge.volunteer.roles.map(r => `• ${r}`).join('\n')}\n\nVisit our **Volunteer page** (${orgKnowledge.volunteer.page}) to submit an application. We'll match your skills with community needs.`;
    }

    if (msg.match(/\b(social|facebook|instagram|linkedin|youtube|follow|media)\b/)) {
      return `Follow us on social media:\n\n📘 Facebook: ${orgKnowledge.social.facebook}\n📷 Instagram: ${orgKnowledge.social.instagram}\n💼 LinkedIn: ${orgKnowledge.social.linkedin}\n▶️ YouTube: ${orgKnowledge.social.youtube}`;
    }

    if (msg.match(/\b(thank|thanks|አመሰግናለሁ|የቅናት)\b/)) {
      return "You're very welcome! 🙏 Thank you for your interest in Eneho Fikir. Together, we can make a lasting difference in the lives of vulnerable children and families.";
    }

    return "I'm here to help with questions about Eneho Fikir! You can ask me about:\n\n• Our mission, vision, and values\n• Programs (education, health, nutrition, livelihood, dignity, environment)\n• Impact statistics\n• How to donate or volunteer\n• Contact information\n• Social media links\n\nWhat would you like to know?";
  }

  function saveMessage(role, content) {
    try {
      const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
      history.push({ role, content, timestamp: Date.now() });
      if (history.length > MAX_HISTORY) history.shift();
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save chat history');
    }
  }

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function createChatWidget() {
    const widget = document.createElement('div');
    widget.id = 'eneho-chat-widget';
    widget.innerHTML = `
      <style>
        #eneho-chat-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 10000;
          font-family: 'Open Sans', sans-serif;
        }
        .chat-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1c9288, #178074);
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(28, 146, 136, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .chat-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(28, 146, 136, 0.5);
        }
        .chat-toggle svg {
          width: 28px;
          height: 28px;
          color: white;
        }
        .chat-toggle .close-icon { display: none; }
        .chat-toggle.open .chat-icon { display: none; }
        .chat-toggle.open .close-icon { display: block; }
        
        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          max-height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          display: none;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .chat-window.open {
          display: flex;
          opacity: 1;
          transform: translateY(0);
        }
        
        .chat-header {
          background: linear-gradient(135deg, #1c9288, #178074);
          color: white;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .chat-header-info h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        .chat-header-info span {
          font-size: 12px;
          opacity: 0.9;
        }
        
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 340px;
        }
        
        .message {
          display: flex;
          gap: 8px;
          max-width: 85%;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .message.bot {
          align-self: flex-start;
        }
        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }
        .message.user .message-avatar {
          background: #e8f5f3;
          color: #1c9288;
        }
        .message.bot .message-avatar {
          background: linear-gradient(135deg, #1c9288, #178074);
          color: white;
        }
        .message-content {
          background: #f5f9f8;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .message.user .message-content {
          background: #1c9288;
          color: white;
          border-bottom-right-radius: 4px;
        }
        .message.bot .message-content {
          border-bottom-left-radius: 4px;
        }
        
        .chat-input-area {
          padding: 16px;
          border-top: 1px solid #e8f5f3;
          display: flex;
          gap: 8px;
        }
        .chat-input {
          flex: 1;
          border: 1px solid #e0e8e6;
          border-radius: 24px;
          padding: 10px 16px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .chat-input:focus {
          border-color: #1c9288;
        }
        .chat-send {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1c9288, #178074);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }
        .chat-send:hover {
          transform: scale(1.05);
        }
        .chat-send:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .chat-send svg {
          width: 20px;
          height: 20px;
        }
        
        .quick-replies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 16px 16px;
        }
        .quick-reply {
          background: #e8f5f3;
          color: #1c9288;
          border: none;
          border-radius: 16px;
          padding: 6px 12px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quick-reply:hover {
          background: #1c9288;
          color: white;
        }
        
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 8px 12px;
        }
        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1c9288;
          opacity: 0.4;
          animation: typing 1.4s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        
        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 32px);
            right: -12px;
            max-height: 70vh;
          }
        }
      </style>
      
      <button class="chat-toggle" aria-label="Open chat" aria-expanded="false">
        <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="chat-window" aria-live="polite">
        <div class="chat-header">
          <div class="chat-header-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div class="chat-header-info">
            <h4>Eneho Fikir Assistant</h4>
            <span>Online • Ready to help</span>
          </div>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
        <div class="quick-replies" id="quickReplies"></div>
        <div class="chat-input-area">
          <input type="text" class="chat-input" placeholder="Ask about our programs, donation, volunteering..." aria-label="Type your message">
          <button class="chat-send" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(widget);
    
    const toggle = widget.querySelector('.chat-toggle');
    const window = widget.querySelector('.chat-window');
    const input = widget.querySelector('.chat-input');
    const sendBtn = widget.querySelector('.chat-send');
    const messagesContainer = widget.querySelector('#chatMessages');
    const quickRepliesContainer = widget.querySelector('#quickReplies');
    
    const quickReplies = [
      'Our programs',
      'How to donate',
      'Volunteer opportunities',
      'Contact info',
      'Impact statistics'
    ];
    
    function renderQuickReplies() {
      quickRepliesContainer.innerHTML = quickReplies.map(q => 
        `<button class="quick-reply" data-reply="${q}">${q}</button>`
      ).join('');
      
      quickRepliesContainer.querySelectorAll('.quick-reply').forEach(btn => {
        btn.addEventListener('click', () => {
          handleUserMessage(btn.dataset.reply);
        });
      });
    }
    
    function addMessage(role, content) {
      const msg = document.createElement('div');
      msg.className = `message ${role}`;
      msg.innerHTML = `
        <div class="message-avatar">
          ${role === 'user' ? 
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="8" r="4"></circle><path d="M12 14c-5 0-6 4-6 6h12c0-2-1-6-6-6z"></path></svg>' :
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>'
          }
        </div>
        <div class="message-content">${escapeHtml(content)}</div>
      `;
      messagesContainer.appendChild(msg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'message bot typing-indicator';
      typing.innerHTML = '<span></span><span></span><span></span>';
      typing.id = 'typingIndicator';
      messagesContainer.appendChild(typing);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function hideTyping() {
      const typing = document.getElementById('typingIndicator');
      if (typing) typing.remove();
    }
    
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
    
    function handleUserMessage(text) {
      if (!text.trim()) return;
      
      addMessage('user', text);
      saveMessage('user', text);
      input.value = '';
      sendBtn.disabled = true;
      quickRepliesContainer.innerHTML = '';
      
      showTyping();
      
      setTimeout(() => {
        const response = getResponse(text);
        hideTyping();
        addMessage('bot', response);
        saveMessage('bot', response);
        sendBtn.disabled = false;
        renderQuickReplies();
      }, 600 + Math.random() * 400);
    }
    
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      window.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      
      if (isOpen && messagesContainer.children.length === 0) {
        addMessage('bot', "Hello! 👋 I'm the Eneho Fikir assistant. Ask me anything about our organization, programs, donation, volunteering, or contact details!");
        renderQuickReplies();
      }
    });
    
    sendBtn.addEventListener('click', () => handleUserMessage(input.value));
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserMessage(input.value);
    });
    
    input.addEventListener('input', () => {
      sendBtn.disabled = !input.value.trim();
    });
    
    renderQuickReplies();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatWidget);
  } else {
    createChatWidget();
  }
})();