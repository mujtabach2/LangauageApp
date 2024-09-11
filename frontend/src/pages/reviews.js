import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import user1 from './images/1.jpg';
import user2 from './images/2.jpg';
import user3 from './images/3.jpg';
import user4 from './images/4.jpg';
import user5 from './images/5.jpg';
import user6 from './images/6.jpg';


const reviews = [
  {
    language: 'English',
    review: 'Intellichat is a fantastic language learning app! The AI-driven chat feature makes learning English feel like having a conversation with a native speaker. The immersive experience helps me improve my language skills while having fun. The speech interaction feature is especially helpful for practicing pronunciation. Highly recommended for English learners of all levels!',
    user: {
      name: 'Christina Smith',
      avatar: user1,
    },
  },
  {
    language: 'Spanish',
    review: '¡Intellichat es una aplicación increíble para aprender idiomas! La herramienta de chat impulsada por IA hace que aprender español sea divertido y eficaz. Me encanta la variedad de temas que puedo discutir con el bot, lo que me ayuda a mejorar mi vocabulario y gramática. ¡La interacción por voz es genial para practicar mi pronunciación! Definitivamente, recomiendo esta aplicación a cualquiera que quiera aprender español de manera divertida y efectiva.',
    user: {
      name: 'María Pérez',
      avatar: user2,
    },
  },
  {
    language: 'French',
    review: 'Intellichat est une application géniale pour apprendre le français ! L\'outil de chat basé sur l\'IA rend l\'apprentissage du français interactif et amusant. J\'apprécie la diversité des sujets de conversation disponibles, ce qui me permet d\'améliorer mon vocabulaire et ma compréhension. La fonctionnalité d\'interaction vocale est un plus pour pratiquer ma prononciation. Je recommande vivement cette application à tous ceux qui veulent progresser en français de manière ludique.',
    user: {
      name: 'Pierre Dupont',
      avatar: user3,
    },
  },
  {
    language: 'German',
    review: 'Intellichat ist eine fantastische App zum Sprachenlernen! Die KI-gesteuerte Chatfunktion macht das Lernen von Deutsch zu einem unterhaltsamen Erlebnis. Die Vielfalt der Themen, über die ich mit dem Bot sprechen kann, hilft mir, meinen Wortschatz zu erweitern und meine Grammatik zu verbessern. Die Sprachinteraktion ist besonders hilfreich, um meine Aussprache zu üben. Sehr zu empfehlen für Deutschlerner aller Niveaus!',
    user: {
      name: 'Hans Müller',
      avatar: user4,
    },
  },
  {
    language: 'Chinese',
    review: 'Intellichat 是一个很棒的语言学习应用！AI 驱动的聊天功能使学习中文变得轻松有趣。我喜欢与机器人聊天的体验，这让我觉得像是在和一个母语人士交流一样。语音交互功能有助于提高我的口语能力。强烈推荐给所有想学习中文的人！',
    user: {
      name: 'Joshua Williams',
      avatar: user5,
    },
  },
  {
    language: 'Japanese',
    review: 'Intellichatは、言語学習に最適なアプリです！AI駆動のチャット機能を使えば、まるでネイティブスピーカーと会話しているような感覚で英語を学ぶことができます。没入感のある体験で、楽しみながら語学力を向上させることができます。特に音声インタラクション機能は、発音を練習するのに役立ちます。あらゆるレベルの英語学習者に強くお勧めします!',
    user: {
      name: '田中花子',
      avatar: user6,
    },
  },
];

function Review() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-100 to-white h-[80vh]">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          What Our Users <span className="relative inline-block">
            Are Saying 💬
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-blue-400 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 665 40.7"
            >
              <path d="M220.5 3.6c-73.4-.8-147 2.2-218 15.2-1.3.2-1.8.7-1.9.8-.6.6-.6 1.3-.6 1.8 0 .3.4 1.7 2.1 1.8l12.7-.7c15.1-.8 30.3-2 45.4-3.3 34.2-3 68.4-5.6 102.7-8 19.3-1.3 38.5-2.4 57.8-3.3 46.3.5 92.5 2.7 137.8 4.8l-48.3 3a2309 2309 0 0 0-105 7.9l-5.7.5a3 3 0 0 0-1.3.3 2 2 0 0 0-1.4 2c0 .3 0 2 2.2 2.3 98.1 15.1 200.5-2.5 299 12.2 1.2.2 2.2-.6 2.4-1.8s-.6-2.2-1.8-2.4c-92.8-13.9-189 1-281.9-9.9a1843 1843 0 0 1 93.6-6.8c23.3-1.2 54.7-3.6 87.6-5.2l84.7 4.8 35.7 1.8c4.9.3 17.5 1.4 19.3.9 1.4-.3 1.8-1.3 1.8-1.8 0-.6 0-1.2-.6-1.9-.2-.2-.8-.6-2-1-33.2-9.5-87.6-9.4-138.5-7.1l-32.9-1.7c-25.1-1.2-50.5-2.4-76-3.4a5008 5008 0 0 1 215.8 0c30.2.5 111.6 3.8 143.7 6.7-.4.4-.6 1-.6 1.6a2 2 0 0 0 2.2 2c6.6-.3 10.4-.7 12-1.1.9-.2 1.5-.6 1.7-.9.6-.6.7-1.3.6-1.9 0-.4-.3-.8-.7-1.2a5 5 0 0 0-2.1-1c-12.6-3.1-120.8-7.7-156.7-8.3C410.4-.5 315.4-.9 220.5 3.6" />
            </svg>
          </span>
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Read some of the reviews from our users around the world!
        </p>
        <div className="w-full max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-10 bg-gradient-to-b from-gray-100 to-white">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="px-2 sm:px-4">
                <div className="bg-white rounded-lg   overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-800 mb-4">{review.review}</p>
                    <div className="flex items-center">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="rounded-full h-10 w-10 sm:h-12 sm:w-12 mr-3 sm:mr-4"
                      />
                      <div>
                        <h2 className="font-semibold text-base sm:text-lg">{review.user.name}</h2>
                        <span className="text-xs sm:text-sm text-gray-600">{review.language}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Review;
