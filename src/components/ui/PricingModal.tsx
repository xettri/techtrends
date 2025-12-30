import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Star } from "lucide-react";
import { cn } from "../../lib/utils";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Essential access for casual readers.",
      features: [
        "Access to daily articles",
        "Weekly newsletter",
        "Basic search functionality",
        "Community comment access",
      ],
      cta: "Get Started",
      recommended: false,
    },
    {
      name: "Pro",
      price: "$9",
      originalPrice: "$15",
      period: "/month",
      description: "Perfect for dedicated developers.",
      features: [
        "Unlimited article access",
        "Ad-free experience",
        "Advanced filtering & tags",
        "Priority support",
        "Exclusive deep-dives",
      ],
      cta: "Start Free Trial",
      recommended: true,
      discount: "Save 40%",
    },
    {
      name: "Elite",
      price: "$29",
      period: "/month",
      description: "For teams and power users.",
      features: [
        "Everything in Pro",
        "API Access",
        "Team Dashboard",
        "1-on-1 Mentorship sessions",
        "Early access to features",
      ],
      cta: "Contact Sales",
      recommended: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 md:glass z-60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-70 flex items-center justify-center p-0 md:p-4 pointer-events-none"
          >
            <div className="bg-background md:bg-card border-none md:border md:border-border w-full md:max-w-5xl h-full md:h-auto md:max-h-[90vh] md:rounded-3xl shadow-2xl overflow-y-auto pointer-events-auto">
              <div className="relative p-6 md:p-10 min-h-full">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Upgrade your <span className="text-primary">Tech Journey</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Choose the plan that fits your needs. Cancel anytime.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={cn(
                        "relative p-8 rounded-2xl border transition-all duration-300 flex flex-col",
                        plan.recommended
                          ? "bg-primary/5 border-primary shadow-lg shadow-primary/10 scale-100 md:scale-105 z-10"
                          : "bg-card border-border hover:border-foreground/20"
                      )}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-full flex items-center shadow-lg">
                          <Star size={12} className="mr-1 fill-current" />
                          Recommended
                        </div>
                      )}
                      
                      {plan.recommended && plan.discount && (
                        <div className="absolute top-4 right-4 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-md border border-green-500/20">
                          {plan.discount}
                        </div>
                      )}

                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                          {plan.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">
                              {plan.originalPrice}
                            </span>
                          )}
                          {plan.period && (
                            <span className="text-sm text-muted-foreground">{plan.period}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">
                          {plan.description}
                        </p>
                      </div>

                      <div className="grow space-y-3 mb-8">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start space-x-3">
                            <Check size={16} className="text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        className={cn(
                          "w-full py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer",
                          plan.recommended
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        )}
                      >
                        {plan.cta}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
