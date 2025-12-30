import { motion } from "framer-motion";
import { Terminal, Users, Target, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { label: "Active Readers", value: "50K+" },
    { label: "Daily Articles", value: "20+" },
    { label: "Contributors", value: "100+" },
    { label: "Countries", value: "30+" },
  ];

  const values = [
    {
      icon: <Target className="text-primary" size={24} />,
      title: "Accuracy First",
      description: "We verify every piece of code and news before it reaches you."
    },
    {
      icon: <Users className="text-primary" size={24} />,
      title: "Community Driven",
      description: "Built by developers, for developers. Your voice shapes our content."
    },
    {
      icon: <Shield className="text-primary" size={24} />,
      title: "Unbiased Tech",
      description: "No paid shills. Just honest reviews and deep technical analysis."
    }
  ];

  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4"
        >
          <Terminal className="text-primary" size={48} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-foreground tracking-tight"
        >
          We decode the <span className="text-primary">matrix</span> of technology.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          TechTrends isn't just another news site. It's a daily intelligence briefing for the people building the future.
        </motion.p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center p-6 bg-card rounded-2xl border border-border shadow-sm"
          >
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Mission & Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground"
          >
            Our Core Mission
          </motion.h2>
          <div className="space-y-6">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="mt-1 p-2 bg-primary/10 rounded-lg">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative h-[500px] rounded-3xl overflow-hidden hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
            alt="Team collaboration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative p-12 rounded-3xl overflow-hidden bg-primary/5 border border-primary/10 text-center">
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to join the revolution?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stay ahead of the curve with our daily newsletter. No spam, just pure tech insights.
          </p>
          <Link
            to="/latest"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Start Reading Now <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
};

export default About;
