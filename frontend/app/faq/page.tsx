export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
        <p className="text-slate-600">Find answers to common questions about properties, site visits, and booking process.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h3 className="text-lg font-bold text-slate-900">Are all Bhavya Homes properties legally approved?</h3>
          <p className="text-slate-600 text-sm">Yes, all our projects and properties have 100% clear titles and required HMDA/DTCP/RERA approvals.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h3 className="text-lg font-bold text-slate-900">How do I schedule a site visit?</h3>
          <p className="text-slate-600 text-sm">You can schedule a site visit directly on any property page or through your Customer Dashboard.</p>
        </div>
      </div>
    </div>
  );
}
