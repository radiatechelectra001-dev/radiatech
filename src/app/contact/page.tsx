import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { companyInfo } from "@/data/company";
import InquiryForm from "@/components/InquiryForm";

export const metadata = {
  title: "Contact Us - Radiatech Electra",
  description: "Get in touch with Radiatech Electra for PPR-C pipes, fittings, and industrial piping solutions.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Have a question or need a quote? Reach out and our team will get back to you promptly.</p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary shrink-0"><Phone size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href={`tel:${companyInfo.contact.phone}`} className="text-gray-600 hover:text-primary text-sm">{companyInfo.contact.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary shrink-0"><Mail size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href={`mailto:${companyInfo.contact.email}`} className="text-gray-600 hover:text-primary text-sm">{companyInfo.contact.email}</a>
                  </div>
                </div>
                {companyInfo.addresses.map((addr) => (
                <div key={addr.label} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary shrink-0"><MapPin size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{addr.label}</h3>
                    <p className="text-gray-600 text-sm">{addr.address}</p>
                  </div>
                </div>
                ))}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary shrink-0"><Clock size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600 text-sm">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2 bg-gray-50 p-5 sm:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <InquiryForm />
            </div>
          </div>

          {/* Map Embed */}
          <div className="mt-16 overflow-hidden shadow-lg h-[320px] sm:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.123456!2d77.3100!3d28.5800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNoida%2C+Uttar+Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Radiatech Electra Location"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
