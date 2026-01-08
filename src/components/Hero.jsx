import React from 'react'
import { ArrowRight, CheckCircle2, Play } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50 via-white to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
              <CheckCircle2 size={16} />
              <span className="text-sm font-medium">Trusted by 10,000+ companies</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Business with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                SaaS Pro
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Streamline your workflow, boost productivity, and scale your business with our all-in-one platform. Start your free trial today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all border-2 border-gray-200 flex items-center justify-center space-x-2">
                <Play size={20} className="text-primary-600" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600 mt-1">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50M+</div>
                <div className="text-sm text-gray-600 mt-1">API Calls/day</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600 mt-1">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative animate-float hidden lg:block">
            {/* Main Dashboard Mockup */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white px-4 py-1 rounded text-xs text-gray-600">saaspro.com</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                  <div className="h-8 bg-primary-100 rounded w-24"></div>
                </div>
                {/* Chart Area */}
                <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-end justify-around p-4">
                  {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
                    <div
                      key={i}
                      className="bg-primary-500 rounded-t w-12 transition-all hover:bg-primary-600"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-600 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
