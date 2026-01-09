import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Bot, Sparkles, Calculator, Utensils, Dumbbell, ChevronRight, Loader2, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FormData {
  age: string;
  height: string;
  weight: string;
  goal: string;
  diet: string;
}

interface Results {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  dietPlan: string[];
  workoutSplit: string[];
  tip?: string;
}

const AICoachSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    height: '',
    weight: '',
    goal: '',
    diet: '',
  });
  const [results, setResults] = useState<Results | null>(null);

  const goals = ['Fat Loss', 'Muscle Building', 'Strength', 'Maintenance'];
  const diets = ['Vegetarian', 'Non-Vegetarian'];

  const generateAIPlan = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-fitness-coach', {
        body: formData,
      });

      if (error) throw error;

      setResults({
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fats: data.fats,
        dietPlan: data.dietPlan,
        workoutSplit: data.workoutSplit,
        tip: data.tip,
      });
      setStep(6);
    } catch (error) {
      console.error('AI Coach error:', error);
      toast.error('Failed to generate plan. Using fallback calculation.');
      // Fallback to local calculation
      calculateLocalResults();
    } finally {
      setIsLoading(false);
    }
  };

  const calculateLocalResults = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseInt(formData.age);
    
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    let tdee = bmr * 1.55;
    
    let calories = tdee;
    if (formData.goal === 'Fat Loss') calories = tdee - 500;
    if (formData.goal === 'Muscle Building') calories = tdee + 300;
    if (formData.goal === 'Strength') calories = tdee + 200;
    
    const protein = weight * 2;
    const fats = (calories * 0.25) / 9;
    const carbs = (calories - protein * 4 - fats * 9) / 4;

    const vegMeals = [
      '🥣 Oatmeal with nuts and banana',
      '🥗 Quinoa salad with chickpeas',
      '🍛 Dal with brown rice and vegetables',
      '🥜 Protein shake with peanut butter',
      '🧀 Paneer stir-fry with veggies',
    ];

    const nonVegMeals = [
      '🍳 Eggs with whole wheat toast',
      '🍗 Grilled chicken breast with rice',
      '🐟 Salmon with sweet potato',
      '🥩 Lean beef steak with vegetables',
      '🍖 Turkey wrap with salad',
    ];

    const workoutSplits: Record<string, string[]> = {
      'Fat Loss': ['Mon: HIIT Cardio', 'Tue: Upper Body', 'Wed: Active Rest', 'Thu: HIIT Cardio', 'Fri: Lower Body', 'Sat: Full Body Circuit', 'Sun: Rest'],
      'Muscle Building': ['Mon: Chest & Triceps', 'Tue: Back & Biceps', 'Wed: Legs', 'Thu: Shoulders & Arms', 'Fri: Chest & Back', 'Sat: Legs & Core', 'Sun: Rest'],
      'Strength': ['Mon: Squat Day', 'Tue: Bench Day', 'Wed: Rest', 'Thu: Deadlift Day', 'Fri: OHP Day', 'Sat: Accessory Work', 'Sun: Rest'],
      'Maintenance': ['Mon: Full Body', 'Tue: Cardio', 'Wed: Upper Body', 'Thu: Rest', 'Fri: Lower Body', 'Sat: Active Recovery', 'Sun: Rest'],
    };

    setResults({
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      dietPlan: formData.diet === 'Vegetarian' ? vegMeals : nonVegMeals,
      workoutSplit: workoutSplits[formData.goal] || workoutSplits['Maintenance'],
    });
    setStep(6);
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else generateAIPlan();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Bot className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Meet Your AI Fitness Coach
            </h3>
            <p className="text-muted-foreground mb-8">
              Get a personalized diet and workout plan powered by AI in just 5 questions!
            </p>
            <Button variant="hero" onClick={() => setStep(1)}>
              <Sparkles className="w-5 h-5 mr-2" />
              Start My Plan
            </Button>
          </motion.div>
        );
      case 1:
        return (
          <QuestionStep
            question="What's your age?"
            value={formData.age}
            onChange={(val) => setFormData({ ...formData, age: val })}
            placeholder="Enter your age"
            type="number"
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <QuestionStep
            question="What's your height? (cm)"
            value={formData.height}
            onChange={(val) => setFormData({ ...formData, height: val })}
            placeholder="Enter height in cm"
            type="number"
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <QuestionStep
            question="What's your weight? (kg)"
            value={formData.weight}
            onChange={(val) => setFormData({ ...formData, weight: val })}
            placeholder="Enter weight in kg"
            type="number"
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              What's your fitness goal?
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setFormData({ ...formData, goal })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.goal === goal
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card hover:border-primary/50 text-foreground'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!formData.goal}
              className="w-full"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              What's your diet preference?
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {diets.map((diet) => (
                <button
                  key={diet}
                  onClick={() => setFormData({ ...formData, diet })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.diet === diet
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card hover:border-primary/50 text-foreground'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!formData.diet || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate My Plan <Sparkles className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        );
      case 6:
        return results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Your AI-Powered Plan
              </h3>
              <p className="text-muted-foreground">Personalized for your {formData.goal} goal</p>
            </div>

            {/* AI Tip */}
            {results.tip && (
              <div className="card-premium p-4 border-primary/30 bg-primary/5">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm">{results.tip}</p>
                </div>
              </div>
            )}

            {/* Macros */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-premium p-4 text-center">
                <Calculator className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-primary">{results.calories}</div>
                <div className="text-sm text-muted-foreground">Daily Calories</div>
              </div>
              <div className="card-premium p-4 text-center">
                <div className="font-display text-2xl font-bold text-green-500">{results.protein}g</div>
                <div className="text-sm text-muted-foreground">Protein</div>
              </div>
              <div className="card-premium p-4 text-center">
                <div className="font-display text-2xl font-bold text-orange-500">{results.carbs}g</div>
                <div className="text-sm text-muted-foreground">Carbs</div>
              </div>
              <div className="card-premium p-4 text-center">
                <div className="font-display text-2xl font-bold text-purple-500">{results.fats}g</div>
                <div className="text-sm text-muted-foreground">Fats</div>
              </div>
            </div>

            {/* Diet Plan */}
            <div className="card-premium p-4">
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="w-5 h-5 text-primary" />
                <h4 className="font-display text-lg font-bold">Sample Meals</h4>
              </div>
              <div className="space-y-2">
                {results.dietPlan.map((meal, i) => (
                  <div key={i} className="text-muted-foreground text-sm">{meal}</div>
                ))}
              </div>
            </div>

            {/* Workout Split */}
            <div className="card-premium p-4">
              <div className="flex items-center gap-2 mb-3">
                <Dumbbell className="w-5 h-5 text-primary" />
                <h4 className="font-display text-lg font-bold">Weekly Split</h4>
              </div>
              <div className="space-y-2">
                {results.workoutSplit.map((day, i) => (
                  <div key={i} className="text-muted-foreground text-sm">{day}</div>
                ))}
              </div>
            </div>

            <Button variant="hero" className="w-full" onClick={() => { setStep(0); setResults(null); setFormData({ age: '', height: '', weight: '', goal: '', diet: '' }); }}>
              Start Over
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="ai-coach" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(200_55%_50%_/_0.03)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-sm font-medium uppercase tracking-widest mb-4">
              Exclusive Feature
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">AI </span>
              <span className="text-primary text-glow">FITNESS COACH</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Get a personalized diet plan and workout split powered by AI. Just answer a few questions and receive your custom fitness blueprint in seconds.
            </p>
            <div className="space-y-4">
              {['Personalized calorie calculation', 'Custom macro breakdown', 'Diet-specific meal suggestions', 'Weekly workout schedule'].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - AI Coach Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-premium p-8 border-electric"
          >
            {renderStep()}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const QuestionStep = ({
  question,
  value,
  onChange,
  placeholder,
  type,
  onNext,
}: {
  question: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type: string;
  onNext: () => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-center"
    >
      <h3 className="font-display text-2xl font-bold text-foreground mb-6">{question}</h3>
      <input
        type={type}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus
        className="w-full px-6 py-4 bg-muted border border-border rounded-xl text-foreground text-center text-xl font-display focus:outline-none focus:border-primary transition-colors mb-6"
      />
      <Button variant="hero" onClick={onNext} disabled={!value} className="w-full">
        Continue <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  );
};

export default AICoachSection;
