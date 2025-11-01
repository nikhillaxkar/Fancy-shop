import React from 'react';

// This is a helper component for the 3 columns
const FeatureIcon = ({ icon, title, text }) => (
  <div className="text-center p-6 bg-white shadow-lg rounded-xl border-t-4 border-pink-400 hover:shadow-2xl transition-shadow duration-300">
    <div className="text-5xl mb-4 flex justify-center text-pink-500">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pink-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
            The Heart of 
            <span className="bg-gradient-to-r from-pink-600 to-rose-400 text-transparent bg-clip-text"> Fancy Shop</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            It's not just an item. It's a little piece of happiness. ✨
          </p>
        </div>

        {/* --- Our Story Card --- */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-10 mb-16 border border-pink-100">
          <h2 className="text-3xl font-bold text-pink-600 mb-5 text-center">
            How We Started 💖
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            <span className="font-semibold text-pink-600">Fancy Shop</span> started with a simple passion:
            finding <span className="font-semibold text-gray-800">unique and charming items</span> that make you smile.
            We believe you don't need a big occasion to feel special.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            A colorful bangle, a fun keychain, or a soft-glowing lamp—these 
            little things make every day <span className="font-semibold text-pink-500">beautiful</span>. 
            We pick each item with care, just like we would for ourselves.
          </p>
        </div>

        {/* --- What We Offer Grid --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureIcon
            icon="💍"
            title="Beautiful Bangles & Gifts"
            text="Handpicked bangles and perfect gifts to complete your look."
          />
          <FeatureIcon
            icon="💡"
            title="Charming Lamps & Decor"
            text="Unique lamps and decor items to make your space feel cozy."
          /> 
          {/* YEH WALA PART FIX KIYA HAI (This line was fixed) */}
          <FeatureIcon
            icon="🔑"
            title="Fun Keychains & More"
            text="Little treasures that bring you a big smile every day."
          />
        </div>

        {/* --- Our Promise Card --- */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Our Promise to You 💫</h2>
          <p className="text-lg text-pink-100 leading-relaxed max-w-xl mx-auto">
            We don't just sell products; we deliver happiness.
            Every item is checked for <span className="font-bold text-white">quality</span>, 
            chosen for its <span className="font-bold text-white">uniqueness</span>, 
            and packed with <span className="font-bold text-white">love</span>.
          </p>
        </div>

      </div>
    </div>
  );
}
