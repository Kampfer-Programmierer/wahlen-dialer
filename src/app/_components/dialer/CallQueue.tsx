"use client"
import { useEffect, useState } from 'react';
import { Phone, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QueuedCall {
  id: string;
  name: string;
  company: string;
  time: string;
  status: 'queued' | 'missed' | 'completed';
}

interface CallQueueProps {
  initialCalls: QueuedCall[];
  onSelectCall: (call: QueuedCall) => void;
}

export function CallQueue({ initialCalls, onSelectCall }: CallQueueProps) {
  const [calls, setCalls] = useState(initialCalls);

  useEffect(() => {
    setCalls(initialCalls);
  }, [initialCalls]);

  // Simulate removing an item for testing animations
  const removeCall = (id: string) => {
    setCalls((prev) => prev.filter((call) => call.id !== id));
  };

  return (
    <div className="w-64 bg-white dark:bg-strokedark dark:text-white h-auto flex flex-col">
      <div className="py-3 px-4 border-b border-white/10">
        <h2 className="text-sm font-medium">Call Queue</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <AnimatePresence>
          {calls && calls.map((call) => (
            <motion.button
              key={call.id}
              onClick={() => {
                onSelectCall(call);
                removeCall(call.id); 
              }}
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 70 }}
              transition={{ duration: 0.5 }}
              className="w-full py-2.5 px-4 text-left hover:bg-gray-300 dark:hover:bg-white/5 border-b border-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Phone className="h-4 w-4 dark:text-white/60" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <div className="font-medium text-black-2 dark:text-white truncate">
                      {call.name}
                    </div>
                  </div>
                  <div className="text-sm dark:text-white/60 truncate">{call.phone}</div>
                  <div className="text-xs dark:text-white/60 flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3 w-3" />
                    {call.status}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
