import { useState } from 'react';
import { Bot, Sparkles, Calculator, Utensils, Dumbbell, ChevronRight, Loader2, Lightbulb, Target, Zap } from 'lucide-react';
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

  const goals = [
    { name: 'Fat Loss', icon: '🔥' },
    { name: 'Muscle Building', icon: '💪' },
    { name: 'Strength', icon: '🏋️' },
    { name: 'Maintenance', icon: '⚖️' },
  ];
  const diets = [
    { name: 'Vegetarian', icon: '🥗' },
    { name: 'Non-Vegetarian', icon: '🍗' },
  ];

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
      '🥣 Oatmeal with nuts & banana',
      '🥗 Quinoa salad with chickpeas',
      '🍛 Dal with brown rice',
      '🥜 Protein shake with peanut butter',
      '🧀 Paneer stir-fry',
    ];

    const nonVegMeals = [
      '🍳 Eggs with toast',
      '🍗 Grilled chicken with rice',
      '🐟 Salmon with sweet potato',
      '🥩 Lean steak with veggies',
      '🍖 Turkey wrap',
    ];

    const workoutSplits: Record<string, string[]> = {
      'Fat Loss': ['Mon: HIIT', 'Tue: Upper', 'Wed: Rest', 'Thu: HIIT', 'Fri: Lower', 'Sat: Circuit', 'Sun: Rest'],
      'Muscle Building': ['Mon: Chest', 'Tue: Back', 'Wed: Legs', 'Thu: Arms', 'Fri: Chest/Back', 'Sat: Legs', 'Sun: Rest'],
      'Strength': ['Mon: Squat', 'Tue: Bench', 'Wed: Rest', 'Thu: Deadlift', 'Fri: OHP', 'Sat: Accessory', 'Sun: Rest'],
      'Maintenance': ['Mon: Full Body', 'Tue: Cardio', 'Wed: Upper', 'Thu: Rest', 'Fri: Lower', 'Sat: Recovery', 'Sun: Rest'],
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
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 md:mb-6 border border-primary/20">
              <Bot className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-4">
              AI Fitness Coach
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8 px-2">
              Get your personalized fitness plan in 30 seconds
            </p>
            <Button variant="hero" onClick={() => setStep(1)} className="w-full sm:w-auto">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Start Now
            </Button>
          </div>
        );
      case 1:
        return (
          <QuestionStep
            question="Your Age"
            value={formData.age}
            onChange={(val) => setFormData({ ...formData, age: val })}
            placeholder="25"
            type="number"
            onNext={handleNext}
            step={1}
            total={5}
          />
        );
      case 2:
        return (
          <QuestionStep
            question="Height (cm)"
            value={formData.height}
            onChange={(val) => setFormData({ ...formData, height: val })}
            placeholder="175"
            type="number"
            onNext={handleNext}
            step={2}
            total={5}
          />
        );
      case 3:
        return (
          <QuestionStep
            question="Weight (kg)"
            value={formData.weight}
            onChange={(val) => setFormData({ ...formData, weight: val })}
            placeholder="70"
            type="number"
            onNext={handleNext}
            step={3}
            total={5}
          />
        );
      case 4:
        return (
          <div className="text-center animate-fade-in">
            <ProgressIndicator current={4} total={5} />
            <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
              Fitness Goal
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
              {goals.map((goal) => (
                <button
                  key={goal.name}
                  onClick={() => setFormData({ ...formData, goal: goal.name })}
                  className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 text-sm md:text-base ${
                    formData.goal === goal.name
                      ? 'border-primary bg-primary/10 text-primary scale-[1.02]'
                      : 'border-border bg-card/50 hover:border-primary/50 text-foreground'
                  }`}
                >
                  <span className="text-lg md:text-xl block mb-1">{goal.icon}</span>
                  <span className="text-xs md:text-sm font-medium">{goal.name}</span>
                </button>
              ))}
            </div>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!formData.goal}
              className="w-full"
            >
              Continue <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </div>
        );
      case 5:
        return (
          <div className="text-center animate-fade-in">
            <ProgressIndicator current={5} total={5} />
            <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
              Diet Preference
            </h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              {diets.map((diet) => (
                <button
                  key={diet.name}
                  onClick={() => setFormData({ ...formData, diet: diet.name })}
                  className={`p-4 md:p-5 rounded-xl border-2 transition-all duration-200 ${
                    formData.diet === diet.name
                      ? 'border-primary bg-primary/10 text-primary scale-[1.02]'
                      : 'border-border bg-card/50 hover:border-primary/50 text-foreground'
                  }`}
                >
                  <span className="text-2xl md:text-3xl block mb-2">{diet.icon}</span>
                  <span className="text-xs md:text-sm font-medium">{diet.name}</span>
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
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Plan <Sparkles className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        );
      case 6:
        return results && (
          <div className="space-y-4 md:space-y-5 animate-fade-in">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs md:text-sm mb-2">
                <Target className="w-3 h-3 md:w-4 md:h-4" />
                {formData.goal}
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
                Your Plan
              </h3>
            </div>

            {results.tip && (
              <div className="p-3 md:p-4 rounded-xl border border-primary/30 bg-primary/5">
                <div className="flex items-start gap-2 md:gap-3">
                  <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-xs md:text-sm leading-relaxed">{results.tip}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <MacroCard icon={<Calculator className="w-4 h-4 md:w-5 md:h-5" />} value={results.calories} label="Calories" color="text-primary" />
              <MacroCard value={`${results.protein}g`} label="Protein" color="text-green-400" />
              <MacroCard value={`${results.carbs}g`} label="Carbs" color="text-orange-400" />
              <MacroCard value={`${results.fats}g`} label="Fats" color="text-purple-400" />
            </div>

            <div className="p-3 md:p-4 rounded-xl border border-border bg-card/50">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <Utensils className="w-4 h-4 text-primary" />
                <h4 className="font-display text-sm md:text-base font-bold">Meals</h4>
              </div>
              <div className="space-y-1 md:space-y-2">
                {results.dietPlan.map((meal, i) => (
                  <div key={i} className="text-muted-foreground text-xs md:text-sm">{meal}</div>
                ))}
              </div>
            </div>

            <div className="p-3 md:p-4 rounded-xl border border-border bg-card/50">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <Dumbbell className="w-4 h-4 text-primary" />
                <h4 className="font-display text-sm md:text-base font-bold">Weekly Split</h4>
              </div>
              <div className="grid grid-cols-2 gap-1 md:gap-2">
                {results.workoutSplit.map((day, i) => (
                  <div key={i} className="text-muted-foreground text-xs md:text-sm">{day}</div>
                ))}
              </div>
            </div>

            <Button variant="hero" className="w-full" onClick={() => { setStep(0); setResults(null); setFormData({ age: '', height: '', weight: '', goal: '', diet: '' }); }}>
              Start Over
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="ai-coach" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-background to-muted/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 rounded-full text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-4">
              <Zap className="w-3 h-3 md:w-4 md:h-4" />
              AI Powered
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              <span className="text-foreground">Smart </span>
              <span className="text-primary">Fitness Coach</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">
              Get a personalized diet plan and workout split powered by AI. Answer 5 questions, receive your custom fitness blueprint.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: Calculator, text: 'Calorie Calc' },
                { icon: Target, text: 'Custom Macros' },
                { icon: Utensils, text: 'Meal Plans' },
                { icon: Dumbbell, text: 'Workout Split' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <span className="text-foreground text-xs md:text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - AI Coach Card with rotating border */}
          <div className="order-1 lg:order-2">
            <div className="card-rotating-border">
              <div className="card-rotating-content p-5 md:p-8">
                {renderStep()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProgressIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center justify-center gap-1.5 mb-4">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1 rounded-full transition-all duration-300 ${
          i < current ? 'w-6 bg-primary' : 'w-2 bg-border'
        }`}
      />
    ))}
  </div>
);

const MacroCard = ({ icon, value, label, color }: { icon?: React.ReactNode; value: string | number; label: string; color: string }) => (
  <div className="p-3 md:p-4 rounded-xl border border-border bg-card/50 text-center">
    {icon && <div className={`${color} mx-auto mb-1`}>{icon}</div>}
    <div className={`font-display text-lg md:text-xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const QuestionStep = ({
  question,
  value,
  onChange,
  placeholder,
  type,
  onNext,
  step,
  total,
}: {
  question: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type: string;
  onNext: () => void;
  step: number;
  total: number;
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
    <div className="text-center animate-fade-in">
      <ProgressIndicator current={step} total={total} />
      <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">{question}</h3>
      <input
        type={type}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus
        className="w-full px-4 md:px-6 py-3 md:py-4 bg-muted border border-border rounded-xl text-foreground text-center text-lg md:text-xl font-display focus:outline-none focus:border-primary transition-colors mb-4 md:mb-6 relative z-10"
      />
      <Button variant="hero" onClick={onNext} disabled={!value} className="w-full">
        Continue <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
      </Button>
    </div>
  );
};

export default AICoachSection;