export default function AboutPage() {
  const people = [
    {
      name: "Khannapong Wangkrasaer",
      role: "Developer",
      image: "/images/you.jpg", // Put your image in public/images
      bio: "eiei",
    },
    {
      name: "Kritsada Limsripraphan",
      role: "Developer",
      image: "/images/friend.jpg",
      bio: "haha",
    },
  ];
  return (
    <main>
      <div className="min-h-screen mt-24 px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-gray-600 text-lg mb-12">lnwza007 ❤️</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {people.map((person, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl shadow-md p-6 flex flex-col items-center text-center 
           transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-32 h-32 object-cover rounded-full mb-4 shadow"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {person.name}
                </h2>
                <p className="text-sm text-indigo-500 mb-2">{person.role}</p>
                <p className="text-gray-600 text-sm">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
