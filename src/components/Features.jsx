import React from 'react'
import { Zap, Shield, BarChart3, Users, Cloud, Lock } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with 99.9% uptime guarantee. Experience blazing fast load times.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights and powerful reporting tools to make data-driven decisions.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless collaboration tools with role-based access and real-time updates.',
    color: 'from-green-400 to-teal-500'
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Built on modern cloud infrastructure for unlimited scalability and reliability.',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    icon: Lock,
    title: 'Data Privacy',
    description: 'Your data is encrypted at rest and in transit. We never share your information.',
    color: 'from-red-400 to-pink-500'
  }
]

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help your business grow faster and work smarter
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-primary-200 transition-all hover:shadow-xl"
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Want to see all features?</p>
          <button className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center space-x-2 group">
            <span>View Full Feature List</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Features
