import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <div
        className="bg-[url('/src/assets/aboutHero.jpg')] bg-cover bg-center h-96 flex items-center justify-center"
        style={{ backgroundBlendMode: "multiply", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
          About Our Hotel Management App
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-10">
        <section>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            We strive to provide seamless hotel management solutions combining luxury, efficiency, and technology. Our goal is to empower hotel owners with tools to manage bookings, rooms, and guests effortlessly.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Easy-to-use and intuitive interface powered by React & Tailwind CSS</li>
            <li>Real-time booking and dashboard insights</li>
            <li>Mobile responsive and fast performance</li>
            <li>Secure authentication with Clerk</li>
            <li>Dedicated support team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alice Johnson", role: "Founder & CEO", img: "./team1.jpg" },
              { name: "Bob Smith", role: "Lead Developer", img: "./team2.jpg" },
              { name: "Catherine Lee", role: "UX Designer", img: "./team3.jpg" },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-full w-32 h-32 object-cover mb-4 shadow-md"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
