'use client'

import { useState } from 'react'
import { CallQueue } from '../_components/dialer/CallQueue'
import { DialerTabs } from '../_components/dialer/DialerTabs'
import CustomerInfoAndScript from '../_components/dialer/CustomerInfoAndScript'

const sampleCalls = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'Tech Solutions Inc',
      time: '2:30 PM',
      status: 'queued'
    },
    {
      id: '2',
      name: 'Michael Brown',
      company: 'Digital Systems',
      time: '2:45 PM',
      status: 'queued'
    },
    {
      id: '3',
      name: 'Emily Davis',
      company: 'Marketing Pro',
      time: '3:00 PM',
      status: 'queued'
    }
  ] as const
  
  const sampleCustomerInfo = {
    name: "John Doe",
    phoneNumber: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    location: "New York, NY",
    priority: "High"
  }
  
  const sampleCallHistory = {
    status: "Missed",
    notes: "Customer was not available during the last attempt. Suggested to call back in the evening."
  }
  
  const sampleCampaignScript = {
    greeting: "Hello [Customer Name], this is [Agent Name] calling from [Company Name]. How are you doing today?",
    introduction: "I'm calling regarding our latest [product/service name] that I believe you might be interested in.",
    keyPoints: [
      "Our product increases productivity by 30%",
      "It comes with a 30-day money-back guarantee",
      "We offer 24/7 customer support"
    ],
    faqs: [
      {
        question: "What makes your product different from others?",
        answer: "Our product is unique because it uses AI to adapt to your specific needs, providing a personalized experience that improves over time."
      },
      {
        question: "How much does it cost?",
        answer: "We offer flexible pricing plans starting at $49/month. We can customize a plan that fits your budget and needs."
      }
    ],
    closing: "Thank you for your time. Would you like to proceed with a free trial or schedule a demo?"
  }
  
  export default function DialerPage() {
    const [currentCall, setCurrentCall] = useState({
      name: 'Natalie Young',
      company: 'Bank of America',
      duration: '00:02:15'
    })
  
    const [activeTab, setActiveTab] = useState<'dialer' | 'current-call'>('current-call')
  
    const handleEndCall = () => {
      setCurrentCall(null)
    }
  
    const handleOutcomeChange = (outcome: string) => {
      console.log('Call outcome:', outcome)
    }
  
    const handleNotesChange = (notes: string) => {
      console.log('Agent notes:', notes)
    }
  
    return (
      <div className="flex h-auto dark:bg-boxdark">
        <CallQueue 
          calls={sampleCalls} 
          onSelectCall={(call) => console.log('Selected call:', call)} 
        />
        <div className="flex-1 flex h-full">
          <div className="flex-1 ">
            <CustomerInfoAndScript
              customerInfo={sampleCustomerInfo}
              callHistory={sampleCallHistory}
              campaignScript={sampleCampaignScript}
            />
          </div>
          <div className="w-80 ">
            <DialerTabs 
              onTabChange={setActiveTab}
              currentCall={currentCall}
              onEndCall={handleEndCall}
              onOutcomeChange={handleOutcomeChange}
              onNotesChange={handleNotesChange}
            />
          </div>
        </div>
      </div>
    )
  }
  
  

