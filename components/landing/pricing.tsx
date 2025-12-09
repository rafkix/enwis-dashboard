import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for getting started",
        features: ["Daily lessons", "Basic flashcards", "Limited AI chat", "Progress tracking"],
        cta: "Get Started",
        highlighted: false,
    },
    {
        name: "Pro",
        price: "$9.99",
        period: "/month",
        description: "For serious learners",
        features: [
        "Everything in Starter",
        "Unlimited AI conversations",
        "Advanced pronunciation feedback",
        "Personalized learning paths",
        "Offline mode",
        "Priority support",
        ],
        cta: "Start Free Trial",
        highlighted: true,
    },
    {
        name: "Premium",
        price: "$19.99",
        period: "/month",
        description: "For fluency seekers",
        features: [
        "Everything in Pro",
        "1-on-1 tutor sessions",
        "Custom curriculum",
        "Advanced analytics",
        "Certificate of completion",
        "Lifetime access to content",
        ],
        cta: "Start Free Trial",
        highlighted: false,
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-12 sm:py-22 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your learning goals</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
                <Card
                key={index}
                className={`p-8 flex flex-col ${plan.highlighted ? "ring-2 ring-primary bg-primary/5" : ""}`}
                >
                {plan.highlighted && (
                    <div className="mb-4 inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-fit">
                    Most Popular
                    </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
                </div>

                <Button
                    className={`mb-8 ${
                    plan.highlighted ? "bg-primary hover:bg-primary/90" : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                >
                    {plan.cta}
                </Button>

                <div className="space-y-3 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                        <Check size={20} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                    ))}
                </div>
                </Card>
            ))}
            </div>
        </div>
        </section>
    )
}
