import React from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
          <CheckCircle2 size={16} />
          <span className="text-sm font-medium">No credit card required</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Business?
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Join thousands of companies already growing with SaaS Pro. Start your 14-day free trial today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="group bg-white hover:bg-gray-50 text-primary-700 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center space-x-2">
            <span>Start Free Trial</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all border-2 border-white flex items-center space-x-2">
            <span>Schedule Demo</span>
          </button>
        </div>

        {/* Features List */}
        <div className="flex flex-wrap justify-center gap-6 text-primary-100">
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={18} className="text-primary-200" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={18} className="text-primary-200" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={18} className="text-primary-200" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
