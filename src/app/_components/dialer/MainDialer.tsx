"use client";

import { useEffect, useState } from "react";
import { CallQueue } from "./CallQueue";
import { DialerTabs } from "./DialerTabs";
import CustomerInfoAndScript from "./CustomerInfoAndScript";
import useCustomers from "~/app/hooks/useCustomers";

const sampleCampaignScript = {
  greeting:
    "Hello [Customer Name], this is [Agent Name] calling from [Company Name]. How are you doing today?",
  introduction:
    "I'm calling regarding our latest [product/service name] that I believe you might be interested in.",
  keyPoints: [
    "Our product increases productivity by 30%",
    "It comes with a 30-day money-back guarantee",
    "We offer 24/7 customer support",
  ],
  faqs: [
    {
      question: "What makes your product different from others?",
      answer:
        "Our product is unique because it uses AI to adapt to your specific needs, providing a personalized experience that improves over time.",
    },
    {
      question: "How much does it cost?",
      answer:
        "We offer flexible pricing plans starting at $49/month. We can customize a plan that fits your budget and needs.",
    },
  ],
  closing:
    "Thank you for your time. Would you like to proceed with a free trial or schedule a demo?",
};

export default function DialerPage({ page: initialPage, limit }) {
  const [currentCallIndex, setCurrentCallIndex] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [startCalling, setStartCalling] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [elapsedTime, setElapsedTime] = useState(0); // Timer state
  const { query } = useCustomers(page, limit, "pending", {
    enabled: startCalling,
  });
  const { data, isLoading, isFetching } = query;

  useEffect(() => {
    if (data?.data?.customers) {
      setCustomers((prev) => [...prev, ...data.data.customers]);
    }
  }, [data]);

  // Timer logic: Start and reset when the current customer changes
  useEffect(() => {
    if (!startCalling || !customers.length) return;

    setElapsedTime(0); // Reset timer for new customer
    const timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);

    return () => clearInterval(timer); // Cleanup on unmount or customer change
  }, [startCalling, customers, currentCallIndex]);

  const handleStartCalling = () => {
    setStartCalling(true);
    setCurrentCallIndex(0); // Reset index
  };

  const handleEndCall = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((_, index) => index !== currentCallIndex),
    );
    setElapsedTime(0); // Reset timer
    setCurrentCallIndex(0); // Reset the currentCallIndex

    if (customers.length === 2 && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  const currentCustomer = customers[currentCallIndex];

  return (
    <div className="flex h-auto dark:bg-boxdark">
      {/* Show "Start Calling" button if not calling yet */}
      {!startCalling ? (
        <div className="flex h-screen w-64 items-center justify-center">
          <button
            onClick={handleStartCalling}
            className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Start Calling
          </button>
        </div>
      ) : (
        <>
          {/* Loading state for call queue or customers */}
          {isLoading ? (
            <div className="flex h-screen w-64 items-center justify-center">
              {" "}
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : customers.length === 0 ? (
            <div className="flex h-screen w-64 items-center justify-center">
              <div className="text-center text-xl text-gray-500 dark:text-gray-300">
                <p>No calls pending</p>
                <p className="mt-4 text-lg text-blue-500">
                  You've completed all the calls. Great job!
                </p>
              </div>
            </div>
          ) : (
            <CallQueue
              initialCalls={customers}
              onSelectCall={(call) =>
                console.log("Manually selected call:", call)
              }
            />
          )}
        </>
      )}

      {/* Only render the other components if the customer data is available */}
      <div className="flex h-full flex-1">
        <div className="flex-1">
          <CustomerInfoAndScript
            customer={currentCustomer}
            campaignScript={sampleCampaignScript} // Placeholder
          />
        </div>
        <div className="w-80">
          <DialerTabs
            onTabChange={() => console.log("Tab changed")}
            onEndCall={handleEndCall}
            currentCall={currentCustomer}
            timer={elapsedTime}
            onOutcomeChange={(outcome) => console.log("Call outcome:", outcome)}
            onNotesChange={(notes) => console.log("Agent notes:", notes)}
          />
        </div>
      </div>
    </div>
  );
}
