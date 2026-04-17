"use client";

import { useState, FormEvent } from "react";

interface InquiryFormProps {
  productName?: string;
  compact?: boolean;
}

export default function InquiryForm({ productName, compact }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    product: productName || "",
    quantity: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    console.log("Inquiry submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <div className={`bg-green/10 border border-green rounded-xl p-6 text-center ${compact ? "" : "max-w-lg mx-auto"}`}>
        <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green mb-2">Inquiry Sent Successfully!</h3>
        <p className="text-gray-500 text-sm">Our team will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      {productName && (
        <div className="bg-primary/5 border border-primary/10 rounded-lg px-4 py-2.5 text-sm">
          <span className="text-gray-500">Product: </span>
          <span className="font-medium text-primary">{productName}</span>
        </div>
      )}
      
      <div className={compact ? "" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <input
          type="text"
          placeholder="Your Name *"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
        {!compact && (
          <input
            type="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        )}
      </div>
      
      <div className={compact ? "" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <input
          type="tel"
          placeholder="Phone Number *"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
        {!compact && (
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        )}
      </div>

      {!compact && (
        <input
          type="text"
          placeholder="Required Quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
      )}

      <textarea
        placeholder={compact ? "Your Requirement *" : "Describe your requirement in detail *"}
        required
        rows={compact ? 3 : 4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
      />

      <button
        type="submit"
        className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-accent/20"
      >
        {compact ? "Send Inquiry" : "Submit Inquiry"}
      </button>

      {!compact && (
        <p className="text-xs text-gray-400 text-center">
          Or contact us directly on{" "}
          <a href={`https://wa.me/919457893678`} className="text-green font-medium hover:underline">
            WhatsApp
          </a>
        </p>
      )}
    </form>
  );
}
