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
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-8">
      <div className="max-w-3xl mx-auto px-2">
        <Card className="bg-white shadow-xl rounded-4xl p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-5xl font-extrabold text-blue-600">
              DermMatch
            </CardTitle>
            <p className="text-lg text-gray-500 mt-2">Personalized Skincare Recommendations</p>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <>
                <div className="flex items-center justify-center mb-10">
                  <div className={`flex items-center space-x-4 ${step === 1 ? 'text-blue-500' : ''}`}>
                    <Sun /> <span>1. Skin Type</span>
                  </div>
                  <div className="w-10 border-t border-gray-300"></div>
                  <div className={`flex items-center space-x-4 ${step === 2 ? 'text-blue-500' : ''}`}>
                    <Leaf /> <span>2. Concerns</span>
                  </div>
                  <div className="w-10 border-t border-gray-300"></div>
                  <div className={`flex items-center space-x-4 ${step === 3 ? 'text-blue-500' : ''}`}>
                    <Droplet /> <span>3. Allergies</span>
                  </div>
                  <div className="w-10 border-t border-gray-300"></div>
                  <div className={`flex items-center space-x-4 ${step === 4 ? 'text-blue-500' : ''}`}>
                    <Bot /> <span>4. Routine Level</span>
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-10">
                    <h2 className="text-xl font-semibold">🌿 Select Your Skin Type</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      {skinTypes.map((type) => (
                        <Button
                          key={type}
                          variant={userProfile.skinType === type ? 'default' : 'outline'}
                          className="h-24"
                          onClick={() => handleSkinTypeSelect(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-10">
                    <h2 className="text-xl font-semibold">💧 Select Your Skin Concerns</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      {skinConcerns.map(concern => (
                        <Button
                          key={concern}
                          variant={userProfile.concerns.includes(concern) ? "default" : "outline"}
                          className="h-24"
                          onClick={() => handleConcernToggle(concern)}
                        >
                          {concern}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button variant="outline" onClick={() => setStep(3)}>Next</Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-10">
                    <h2 className="text-xl font-semibold">🌸 Select Any Allergies</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      {commonAllergies.map(allergy => (
                        <Button
                          key={allergy}
                          variant={userProfile.allergies.includes(allergy) ? "default" : "outline"}
                          className="h-24"
                          onClick={() => handleAllergyToggle(allergy)}
                        >
                          {allergy}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                      <Button variant="outline" onClick={() => setStep(4)}>Next</Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-10">
                    <h2 className="text-xl font-semibold">🧴 Select Your Routine Level</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {routineLevels.map(level => (
                        <Button
                          key={level}
                          variant={userProfile.routineLevel === level ? "default" : "outline"}
                          className="h-24"
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
              <div className="space-y-10">
                <div className="space-y-10">
                  <h2 className="text-xl font-semibold">Your Profile</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="font-medium">Skin Type:</p>
                        <p>{userProfile.skinType}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <p className="font-medium">Concerns:</p>
                        <p>{userProfile.concerns.join(', ') || 'None selected'}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                      <p className="font-medium">Allergies:</p>
                        <p>{userProfile.allergies.join(', ') || 'None selected'}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <p className="font-medium">Routine Level:</p>
                        <p>{userProfile.routineLevel}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-10">
                  <h2 className="text-xl font-semibold">Recommended Products ✅</h2>
                  {getRecommendations()?.map((product) => (
                    <Card key={product.name}>
                      <CardContent className="pt-6">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-gray-500">Category: {product.category}</p>
                      </CardContent>
                    </Card>
                  )) || <p>No recommendations available.</p>}
                </div>
                
                <div className="space-y-10">
                  <h2 className="text-xl font-semibold">Ingredients to Avoid ❌</h2>
                  {getAvoidanceRecommendations().length > 0 ? (
                    getAvoidanceRecommendations().map((item, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <p className="font-medium">{item.ingredient}</p>
                          <p className="text-gray-500">{item.reason}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p>No specific ingredients to avoid.</p>
                  )}
                </div>
                
                <div className="flex justify-center mt-15">
                  <Button variant="outline" className="border-4 border-gray-500 text-l px-6 py-3" onClick={() => {
                    setUserProfile({ skinType: '', concerns: [], allergies: [], routineLevel: '' });
                    setStep(1);
                    setShowResults(false);
                  }}>Start Over</Button>
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
