export default function page() {
  return (
    <div className="max-w-3xl mx-auto bg-white/20 rounded-xl shadow p-8 my-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Vision, Mission &amp; Core Values
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">VISION</h2>
        <p className="text-gray-700 leading-relaxed">
          The vision of SAI India represents what we aspire to become: We strive to be a global leader and initiator of national and international best practices in public sector auditing and accounting and recognised for independent, credible, balanced and timely reporting on public finance and governance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">MISSION</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission enunciates our current role and describes what we are doing today: Mandated by the Constitution of India, we promote accountability, transparency and good governance through high quality auditing and accounting and provide independent assurance to our stakeholders, the Legislature, the Executive and the Public, that public funds are being used efficiently and for the intended purposes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-blue-700 mb-2">CORE VALUES</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          Our core values are the guiding beacons for all that we do and give us the benchmarks for assessing our performance:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
          <li>Independence</li>
          <li>Objectivity</li>
          <li>Integrity</li>
          <li>Reliability</li>
          <li>Professional Excellence</li>
          <li>Transparency</li>
          <li>Positive Approach</li>
        </ul>
      </section>
    </div>
  );
}