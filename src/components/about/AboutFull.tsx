import Image from "next/image";

export default function AboutFull() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-64 bg-gray-800">
        <Image
          src="/image/about.png"
          alt="MBSTU,CSE Alumni Building"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          The Mawlana Bhashani Science and Technology University CSE Alumni Association connects graduates and empowers
          members through professional events, mentoring, and service to MBSTU,CSE and society. We partner with global
          alumni networks, support student development, and strengthen bonds through networking, scholarships, and
          community projects.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Mission &amp; Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>Mission:</strong> Unite MBSTU,CSE alumni globally to further professional excellence, mentorship,
            and innovation—and enhance student success through networking and scholarships.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            <strong>Vision:</strong> To be a leading alumni body catalyzing national development through expertise,
            collaboration, and lifelong connection to MBSTU,CSE.
          </p>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="max-w-3xl mx-auto px-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Message from the President</h3>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <Image
            src="/president.jpg"
            alt="President of Alumni Association"
            width={120}
            height={120}
            className="rounded-full mx-auto"
          />
          <p className="text-gray-700 leading-relaxed text-center italic">
            “Welcome to our alumni community! We value our shared history and are dedicated to empowering our members
            and supporting mbstu through service, mentorship, and innovation. Together, we build a stronger future.”
          </p>
          <p className="text-gray-800 font-semibold text-right">— Prof. xyz, President</p>
        </div>
      </section>
    </div>
  );
}
