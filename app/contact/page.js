import React from 'react';

// WhatsApp Icon component
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="mr-2"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.451 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.847 6.03l-.34-1.219 1.251-.328zM9.003 8.824l-.131-.003-1.01 1.03c-.011.011-.021.021-.032.031.02.16.052.319.094.475.213.628.514 1.235.884 1.798.532.812 1.203 1.505 1.96 2.062.276.2.566.386.87.547.242.128.497.24.76.336.03.011.061.021.092.03.344.095.698.143 1.059.141.488-.001.968-.093 1.412-.271.011-.005.022-.009.033-.014.045-.02.09-.04.134-.062.045-.02.09-.04.134-.062.151-.075.292-.165.42-.268.024-.019.047-.038.07-.058.072-.061.139-.128.2-.202l1.008-1.008-.002-.13c-.009-.595-.231-1.162-.62-1.59l-1.439-1.666c-.19-.22-.44-.349-.705-.351-.264-.001-.52.093-.711.284l-.527.527c-.011.011-.021.021-.031.032-.12.12-.246.234-.377.343l-.01.008c-.126.106-.258.205-.396.295-.002.001-.005.003-.007.004-.15.098-.307.186-.469.263-.101.049-.204.09-.308.125-.184.063-.374.095-.565.096-.217.001-.43-.03-.633-.091-.176-.053-.346-.127-.506-.217-.184-.103-.358-.225-.52-.361-.207-.17-.4-.358-.578-.561-.21-.24-.408-.5-.59-.775-.149-.228-.282-.468-.4-.718l.004-.131z"/>
  </svg>
);

// Email Icon component
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="mr-2"
  >
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
  </svg>
);

// SMS / Message Icon component
const MessageIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="mr-2"
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h10v2H7zm0-4h10v2H7z"/>
  </svg>
);


export default function ContactPage() {
  const whatsappNumber = "9649281609"; // Replace with your number
  const emailAddress = "help@fancyshop.com"; // Replace with your email

  // --- NEW: Pre-filled message template ---
  const messageTemplate = `Hello Fancy Shop! 👋\n\nI'm interested in your products.\n\nMy Name: \nMy Address: \nMy Query: \n`;
  
  // URL-encode the message
  const encodedMessage = encodeURIComponent(messageTemplate);

  return (
    <div className="min-h-screen bg-pink-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
            Get In <span className="bg-gradient-to-r from-pink-600 to-rose-400 text-transparent bg-clip-text">Touch!</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We'd love to hear from you. ✨
          </p>
        </div>

        {/* --- Contact Card --- */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-10 border border-pink-100">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
            Have a question or a special request?
          </h2>
          
          <p className="text-gray-700 text-center leading-relaxed mb-8">
            Choose your preferred way to connect. We'll get back to you as soon as possible!
          </p>

          {/* --- WhatsApp Button (Updated) --- */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-green-500 text-white text-lg font-semibold px-6 py-4 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 mb-6"
          >
            <WhatsAppIcon />
            Chat with us on WhatsApp
          </a>

          {/* --- NEW: SMS Button --- */}
          <a
            href={`sms:${whatsappNumber}`}
            className="flex items-center justify-center w-full bg-blue-500 text-white text-lg font-semibold px-6 py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 mb-6"
          >
            <MessageIcon />
            Send us a Text Message (SMS)
          </a>

          {/* --- Email Button --- */}
          <a
            href={`mailto:${emailAddress}`}
            className="flex items-center justify-center w-full bg-gray-700 text-white text-lg font-semibold px-6 py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <EmailIcon />
            Send us an Email
          </a>

          {/* --- Response Time --- */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Our Business Hours:</span> 10:00 AM - 6:00 PM (Mon-Sat)
            </p>
            <p className="text-sm text-gray-500">
              We try our best to reply within a few hours.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

