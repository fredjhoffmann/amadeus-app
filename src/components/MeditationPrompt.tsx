import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const meditationPrompts = [
  // Gratitude & Connection
  "Take a moment to feel grateful for this peaceful time with your little one.",
  "Feel the love flowing between you and your child in this serene space.",
  "Cherish this sacred time of connection and calm.",
  "Notice how your presence brings comfort and security to your little one.",
  "Let yourself rest in the beauty of this nighttime journey together.",
  "Appreciate the gift of these precious moments that will become cherished memories.",
  "Feel grateful for the privilege of being your child's safe harbor at the end of each day.",
  "Embrace the deep bond that grows stronger with each peaceful bedtime ritual.",
  
  // Presence & Mindfulness
  "Embrace this quiet moment and let go of the day's worries.",
  "Allow yourself to be present in this tender bedtime ritual.",
  "Breathe deeply and appreciate the gift of these precious moments together.",
  "Focus on the warmth and safety you're creating for your child.",
  "Feel your heart slow and sync with the peaceful energy around you.",
  "Notice the gentle sounds around you - the music, breathing, and quiet settling in.",
  "Let this moment be exactly what it is, without needing anything more.",
  "Ground yourself in the here and now, releasing thoughts of tomorrow or yesterday.",
  "Feel the weight of your child's trust in you during this vulnerable time.",
  "Allow the stillness to fill you with calm and contentment.",
  
  // Breathing & Relaxation
  "Notice the gentle rhythm of your child's breathing as they settle into sleep.",
  "Let the soft music carry away any tension from your day.",
  "Feel yourself rest in the beauty of this nighttime journey together.",
  "Breathe in peace, breathe out any stress or worry from your day.",
  "Let each exhale release what no longer serves you or your family.",
  "Feel your shoulders drop and your jaw unclench as you settle into this moment.",
  "Allow the rhythm of the music to guide your breathing into a peaceful pace.",
  "Notice how your calm energy helps your child feel safe and relaxed.",
  "Let each breath bring you deeper into this moment of tranquility.",
  
  // Love & Protection
  "Send waves of love and protection to surround your sleeping child.",
  "Feel the invisible thread of love that connects you to your little one always.",
  "Trust in your natural ability to provide comfort and security.",
  "Imagine your love as a warm, golden light enveloping your child.",
  "Feel proud of the safe, loving environment you've created for bedtime.",
  "Let your child feel your unconditional love through your peaceful presence.",
  "Know that your calm energy is a gift that helps your child feel secure.",
  "Embrace your role as the guardian of your child's peaceful dreams.",
  
  // Reflection & Growth
  "Reflect on one small moment of joy from today with your child.",
  "Think about how your child has grown and changed, even in small ways.",
  "Consider the person your child is becoming and feel proud of your guidance.",
  "Remember that every bedtime is an opportunity to end the day with love.",
  "Appreciate how these quiet moments are shaping your child's sense of security.",
  "Think about the traditions and memories you're creating together.",
  "Feel grateful for your patience and dedication as a parent or caregiver.",
  "Recognize that rest is essential for both you and your child's wellbeing.",
  
  // Peace & Serenity
  "Let the classical music wash over you like gentle waves of tranquility.",
  "Feel yourself melting into this pocket of peace you've created together.",
  "Allow any worries about tomorrow to dissolve into the soft melodies.",
  "Trust that everything you both need for tonight is already here.",
  "Feel the day's activities settling into memory as peace takes their place.",
  "Let this moment remind you that love is found in the simplest gestures.",
  "Allow yourself to feel proud of prioritizing peace and calm in your home.",
  "Rest in knowing that these moments of stillness nourish both your souls.",
  
  // Hope & Future
  "Send your child peaceful dreams filled with wonder and joy.",
  "Imagine all the beautiful tomorrows that await your little one.",
  "Feel hopeful about the love and adventures that lie ahead for your family.",
  "Trust that your child will carry this feeling of safety with them always.",
  "Envision your child growing up knowing they are deeply loved and cherished.",
  "Feel confident that you're giving your child the foundation for peaceful sleep.",
  "Know that these moments of care ripple out into all areas of your child's life.",
  "Look forward to many more evenings of connection and calm together.",
  
  // Self-Care & Compassion
  "Remember that taking care of yourself helps you take better care of your child.",
  "Be gentle with yourself - parenting is one of life's greatest challenges and privileges.",
  "Forgive yourself for any moments today when you felt less than perfect.",
  "Recognize that creating peaceful bedtimes is an act of love for your whole family.",
  "Feel proud of showing up consistently for these important moments.",
  "Trust that your love is enough, even when days feel difficult.",
  "Allow yourself to feel nourished by this peaceful time too.",
  "Remember that rest and calm are necessities, not luxuries, for parents.",
  
  // Wisdom & Intuition
  "Trust your instincts about what your child needs for peaceful sleep.",
  "Feel confident in your ability to create safety and comfort.",
  "Know that your love and presence are the most powerful tools you have.",
  "Listen to the wisdom that comes from your heart as a parent.",
  "Trust that you and your child are exactly where you need to be tonight.",
  "Feel grateful for your intuitive understanding of your child's needs.",
  "Remember that every family's bedtime rhythm is unique and perfect for them.",
  "Trust the journey of parenthood, with all its moments of uncertainty and joy."
];

export const MeditationPrompt: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState('');

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * meditationPrompts.length);
    setCurrentPrompt(meditationPrompts[randomIndex]);
  };

  useEffect(() => {
    getRandomPrompt();
  }, []);

  return (
    <div className="text-center space-y-6 mb-8">
      <div className="space-y-4">
        <div className="min-h-[100px] flex items-center justify-center">
          <p className="text-xl font-serif italic leading-relaxed text-foreground/90 px-4">
            "{currentPrompt}"
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <p className="text-sm text-muted-foreground font-serif">
            — A moment of reflection
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={getRandomPrompt}
            className="text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100 h-8 w-8 p-0"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="w-24 h-px bg-gradient-primary mx-auto opacity-60"></div>
    </div>
  );
};