"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, Leaf, Droplet, Bot } from 'lucide-react';

// Define all possible values as literal types
type SkinType = 'Oily' | 'Dry' | 'Combination';
type SkinConcern = 'Acne' | 'Aging' | 'Hyperpigmentation' | 'Redness' | 'Large Pores';
type Allergy = 'Fragrance' | 'Essential Oils' | 'Salicylic Acid' | 'Benzoyl Peroxide' | 'Nuts';
type RoutineLevel = 'Minimal' | 'Medium' | 'Complete';

type AvoidanceGuideline = {
    ingredient: string;
    reason: string;
};

type SkinTypeAvoidance = {
    [key in SkinType]: AvoidanceGuideline[];
};
  
type AllergyAvoidance = {
    [key in Allergy]: AvoidanceGuideline[];
};

type UserProfile = {
    skinType: SkinType | '';
    concerns: SkinConcern[];
    allergies: Allergy[];
    routineLevel: RoutineLevel | '';
};

type Product = {
    name: string;
    category: string;
};

type ProductRecommendations = {
    [key in SkinType]: {
        [key in RoutineLevel]: Product[];
    };
};

const SkincareRecommendation = () => {
  const [step, setStep] = useState(1);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    skinType: '',
    concerns: [],
    allergies: [],
    routineLevel: '',
  });
  
  const [showResults, setShowResults] = useState(false);

  const skinTypes: SkinType[] = ['Oily', 'Dry', 'Combination'];
  const skinConcerns: SkinConcern[] = ['Acne', 'Aging', 'Hyperpigmentation', 'Redness', 'Large Pores'];
  const commonAllergies: Allergy[] = ['Fragrance', 'Essential Oils', 'Salicylic Acid', 'Benzoyl Peroxide', 'Nuts'];
  const routineLevels: RoutineLevel[] = ['Minimal', 'Medium', 'Complete'];

  const productRecommendations: ProductRecommendations = {
    Oily: {
        Minimal: [
          { name: 'CeraVe Foaming Facial Cleanser', category: 'Cleanser' },
          { name: 'Neutrogena Hydro Boost Water Gel', category: 'Moisturizer' }
        ],
        Medium: [
          { name: 'CeraVe Foaming Facial Cleanser', category: 'Cleanser' },
          { name: 'Neutrogena Hydro Boost Water Gel', category: 'Moisturizer' },
          { name: 'Desconstruct Gel Sunscreen', category: 'Sunscreen' }
        ],
        Complete: [
          { name: 'CeraVe Foaming Facial Cleanser', category: 'Cleanser' },
          { name: 'Neutrogena Hydro Boost Water Gel', category: 'Moisturizer' },
          { name: 'Desconstruct Gel Sunscreen', category: 'Sunscreen' }
        ]
    },
    Dry: {
        Minimal: [
          { name: 'Cetaphil Gentle Cleanser', category: 'Cleanser' },
          { name: 'Emolene or Venusia Max', category: 'Moisturizer' }
        ],
        Medium: [
          { name: 'Cetaphil Gentle Cleanser', category: 'Cleanser' },
          { name: 'Emolene or Venusia Max', category: 'Moisturizer' },
          { name: 'Minimalist SPF 50 PA ++++', category: 'Sunscreen' }
        ],
        Complete: [
          { name: 'Cetaphil Gentle Cleanser', category: 'Cleanser' },
          { name: 'TONYMOLY Moisturising Wonder Ceramide Mochi Toner', category: 'Toner' },
          { name: 'The Ordinary Hyaluronic Acid 2% + B5 or Vitamin C', category: 'Serum' },
          { name: 'Emolene or Venusia Max', category: 'Moisturizer' },
          { name: 'Minimalist SPF 50 PA ++++', category: 'Sunscreen' }
        ]
    },
    Combination: {
        Minimal: [
          { name: 'Cetaphil Gentle Cleanser', category: 'Cleanser' },
          { name: 'CeraVe Moisturizer', category: 'Moisturizer' }
        ],
        Medium: [
          { name: 'Cetaphil Gentle Cleanser', category: 'Cleanser' },
          { name: 'CeraVe Moisturizer', category: 'Moisturizer' },
          { name: 'Dot And Key SPF 50 PA ++++', category: 'Sunscreen' }
        ],
        Complete: [
          { name: 'Cetaphil Gentle Cleanser', category: 'Cleanser' },
          { name: 'Klairs Supple Preparation Toner', category: 'Toner' },
          { name: 'The Ordinary Niacinamide 10% + Zinc 1% or Vitamin C', category: 'Serum' },
          { name: 'CeraVe Moisturizer', category: 'Moisturizer' },
          { name: 'Dot And Key SPF 50 PA ++++', category: 'Sunscreen' }
        ]
    }
  };

  const skinTypeAvoidance: SkinTypeAvoidance = {
    Oily: [
      { ingredient: 'Heavy oils and butters', reason: 'Can clog pores and increase sebum production' },
      { ingredient: 'Alcohol-heavy products', reason: 'Can trigger increased oil production' },
      { ingredient: 'Thick creams', reason: 'May lead to congestion and breakouts' }
    ],
    Dry: [
      { ingredient: 'Harsh cleansers', reason: 'Can strip natural oils and worsen dryness' },
      { ingredient: 'High concentration alcohols', reason: 'Can cause further dehydration' },
      { ingredient: 'Hot water washing', reason: 'Disrupts skin barrier and removes natural oils' }
    ],
    Combination: [
      { ingredient: 'Very heavy oils', reason: 'May clog pores in oily areas' },
      { ingredient: 'Harsh exfoliants', reason: 'Can irritate dry areas while over-stimulating oily zones' },
      { ingredient: 'One-size-fits-all products', reason: 'May not address different needs of different facial areas' }
    ]
  };

  const allergyAvoidance: AllergyAvoidance = {
    'Fragrance': [
      { ingredient: 'Synthetic fragrances', reason: 'Direct allergen' },
      { ingredient: 'Natural fragrances', reason: 'Can still cause reactions' },
      { ingredient: 'Essential oils', reason: 'Often contain natural fragrances' }
    ],
    'Essential Oils': [
      { ingredient: 'All essential oils', reason: 'Direct allergen' },
      { ingredient: 'Natural extracts', reason: 'May contain essential oils' },
      { ingredient: 'Botanical fragrances', reason: 'Often derived from essential oils' }
    ],
    'Salicylic Acid': [
      { ingredient: 'BHA (Beta Hydroxy Acid)', reason: 'Another name for salicylic acid' },
      { ingredient: 'Willow bark extract', reason: 'Natural source of salicylic acid' },
      { ingredient: 'Oil-soluble exfoliants', reason: 'May contain salicylic acid' }
    ],
    'Benzoyl Peroxide': [
      { ingredient: 'BP treatments', reason: 'Direct allergen' },
      { ingredient: 'Acne-specific products', reason: 'Often contain benzoyl peroxide' },
      { ingredient: 'Oxidizing agents', reason: 'May cause similar reactions' }
    ],
    'Nuts': [
      { ingredient: 'Nut oils', reason: 'Direct allergen source' },
      { ingredient: 'Natural oil blends', reason: 'May contain nut oils' },
      { ingredient: 'Plant-based emollients', reason: 'Check for nut-derived ingredients' }
    ]
  };

  const getAvoidanceRecommendations = () => {
    let recommendations: AvoidanceGuideline[] = [];
    
    // Add skin type specific recommendations
    if (isSkinType(userProfile.skinType)) {
      recommendations = [...skinTypeAvoidance[userProfile.skinType]];
    }

    // Add allergy specific recommendations
    userProfile.allergies.forEach(allergy => {
      recommendations = [...recommendations, ...allergyAvoidance[allergy]];
    });
    return recommendations;
};

  const handleSkinTypeSelect = (type: SkinType) => {
    setUserProfile(prev => ({ ...prev, skinType: type }));
    setStep(2);
  };

  const handleConcernToggle = (concern: SkinConcern) => {
    setUserProfile(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };
  
  const handleAllergyToggle = (allergy: Allergy) => {
    setUserProfile(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };  

  const handleRoutineLevelSelect = (level: RoutineLevel) => {
    setUserProfile(prev => ({ ...prev, routineLevel: level }));
    setShowResults(true);
  };

  // Type guard functions
  const isSkinType = (type: string): type is SkinType => {
    return skinTypes.includes(type as SkinType);
  };

  const isRoutineLevel = (level: string): level is RoutineLevel => {
    return routineLevels.includes(level as RoutineLevel);
  };

  // Helper function to get recommendations safely
  const getRecommendations = () => {
    if (
      isSkinType(userProfile.skinType) && 
      isRoutineLevel(userProfile.routineLevel)
    ) {
      return productRecommendations[userProfile.skinType][userProfile.routineLevel];
    }
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-2 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-xl rounded-xl sm:rounded-3xl">
          <CardHeader className="text-center p-4 sm:p-6">
            <CardTitle className="text-3xl sm:text-5xl font-extrabold text-blue-600">
              DermMatch
            </CardTitle>
            <p className="text-sm sm:text-lg text-gray-500 mt-2">Personalized Skincare Recommendations</p>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            {!showResults ? (
              <>
                <div className="flex flex-wrap justify-center mb-10">
                {[
                  { icon: Sun, label: "1" },
                  { icon: Leaf, label: "2" },
                  { icon: Droplet, label: "3" },
                  { icon: Bot, label: "4" }
                ].map((stepItem, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`flex items-center space-x-2 ${step === index + 1 ? 'text-blue-500' : ''} flex-grow sm:flex-none`}
                    >
                      <stepItem.icon size={24} className="sm:w-6 sm:h-6 w-5 h-5" />
                      <span className="text-sm sm:text-base">{stepItem.label}</span>
                    </div>
                    {index < 3 && <div className="w-10 border-t border-gray-300"></div>}
                  </React.Fragment>
                ))}
            </div>

                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-lg sm:text-xl font-semibold">🌿 Select Your Skin Type</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {skinTypes.map((type) => (
                        <Button
                          key={type}
                          variant={userProfile.skinType === type ? 'default' : 'outline'}
                          className="h-16 sm:h-24 text-sm sm:text-base"
                          onClick={() => handleSkinTypeSelect(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold">💧 Select Your Skin Concerns</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {skinConcerns.map(concern => (
                      <Button
                        key={concern}
                        variant={userProfile.concerns.includes(concern) ? "default" : "outline"}
                        className="h-16 sm:h-24 text-sm sm:text-base"
                        onClick={() => handleConcernToggle(concern)}
                      >
                        {concern}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button variant="outline" onClick={() => setStep(3)}>Next</Button>
                  </div>
                </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold">🌸 Select Any Allergies</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {commonAllergies.map(allergy => (
                      <Button
                        key={allergy}
                        variant={userProfile.allergies.includes(allergy) ? "default" : "outline"}
                        className="h-16 sm:h-24 text-sm sm:text-base"
                        onClick={() => handleAllergyToggle(allergy)}
                      >
                        {allergy}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                    <Button variant="outline" onClick={() => setStep(4)}>Next</Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold">🧴 Select Your Routine Level</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {routineLevels.map(level => (
                      <Button
                        key={level}
                        variant={userProfile.routineLevel === level ? "default" : "outline"}
                        className="h-16 sm:h-24 text-sm sm:text-base"
                        onClick={() => handleRoutineLevelSelect(level)}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
                )}
              </>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Profile</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: "Skin Type", value: userProfile.skinType },
                      { label: "Concerns", value: userProfile.concerns.join(", ") || "None selected" },
                      { label: "Allergies", value: userProfile.allergies.join(", ") || "None selected" },
                      { label: "Routine Level", value: userProfile.routineLevel },
                    ].map((item, index) => (
                      <Card key={index} className="bg-gray-50">
                        <CardContent className="p-4 flex items-center justify-between min-h-[60px]">
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-gray-700">{item.value}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    Recommended Products ✅
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {getRecommendations()?.map((product) => (
                      <Card key={product.name} className="bg-gray-50">
                        <CardContent className="p-4 flex flex-col justify-center min-h-[70px]">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">
                    Ingredients to Avoid ❌
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {getAvoidanceRecommendations().map((item, index) => (
                      <Card key={index} className="bg-gray-50">
                        <CardContent className="p-4 flex flex-col justify-center min-h-[70px]">
                          <p className="font-medium">{item.ingredient}</p>
                          <p className="text-sm text-gray-500 mt-1">{item.reason}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center pt-4 pb-2">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 px-8 py-2"
                    onClick={() => {
                      setUserProfile({ skinType: '', concerns: [], allergies: [], routineLevel: '' });
                      setStep(1);
                      setShowResults(false);
                    }}
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkincareRecommendation;