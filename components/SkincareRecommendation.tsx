"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sun, Leaf, Droplet, Bot } from 'lucide-react';

type SkinConcern = 'Acne' | 'Aging' | 'Hyperpigmentation' | 'Redness' | 'Large Pores';

interface UserProfile {
    skinType: string;
    concerns: SkinConcern[];
    allergies: string[];
    routineLevel: string;
  }
  
  interface Product {
    name: string;
    category: string;
  }

  interface ProductRecommendations {
    [key: string]: {
      [key: string]: Product[];
    };
  }

const SkincareRecommendation = () => {
  const [step, setStep] = useState(1);
  const [userProfile, setUserProfile] = useState({
    skinType: '',
    concerns: [],
    allergies: [],
    routineLevel: '',
  });
  const [showResults, setShowResults] = useState(false);

  const skinTypes = ['Oily', 'Dry', 'Combination'];
  const skinConcerns: SkinConcern[] = ['Acne', 'Aging', 'Hyperpigmentation', 'Redness', 'Large Pores'];
  const commonAllergies = ['Fragrance', 'Essential Oils', 'Salicylic Acid', 'Benzoyl Peroxide', 'Nuts'];
  const routineLevels = ['Minimal', 'Medium', 'Complete'];
  
  const productRecommendations = {
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
    }
};


if (userProfile.skinType === 'Oily' && userProfile.concerns.includes('Aging')) {
    productRecommendations.Oily.Complete.push({ name: 'Retinol 1% in Squalane - The Ordinary', category: 'Serum' });
  }
  if (userProfile.concerns.includes('Hyperpigmentation')) {
    Object.keys(productRecommendations).forEach(skinType => {
      Object.keys(productRecommendations[skinType]).forEach(level => {
        productRecommendations[skinType][level].push({ name: 'Niacinamide 10% + Zinc 1% - The Ordinary', category: 'Serum' });
      });
    });
  }
  if (userProfile.concerns.includes('Redness')) {
    Object.keys(productRecommendations).forEach(skinType => {
      Object.keys(productRecommendations[skinType]).forEach(level => {
        productRecommendations[skinType][level].push({ name: 'Azelaic Acid Suspension 10% - The Ordinary', category: 'Serum' });
      });
    });
  }
  if (userProfile.concerns.includes('Large Pores')) {
    Object.keys(productRecommendations).forEach(skinType => {
      Object.keys(productRecommendations[skinType]).forEach(level => {
        productRecommendations[skinType][level].push({ name: 'Paula’s Choice 2% BHA Liquid Exfoliant', category: 'Exfoliant' });
      });
    });
  }

  const handleSkinTypeSelect = (type) => {
    setUserProfile(prev => ({ ...prev, skinType: type }));
    setStep(2);
  };

  const handleConcernToggle = (concern) => {
    setUserProfile(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const handleAllergyToggle = (allergy) => {
    setUserProfile(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleRoutineLevelSelect = (level) => {
    setUserProfile(prev => ({ ...prev, routineLevel: level }));
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-8">
      <div className="max-w-5xl mx-auto px-6">
        <Card className="bg-white shadow-xl rounded-3xl p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-5xl font-extrabold text-blue-600">
              DermMatch
            </CardTitle>
            <p className="text-lg text-gray-500 mt-2">Personalized Skincare Recommendations</p>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <>
                <div className="flex items-center justify-center mb-8">
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
                      {skinTypes.map(type => (
                        <Button
                          key={type}
                          variant={userProfile.skinType === type ? "default" : "outline"}
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

                {productRecommendations[userProfile.skinType] && productRecommendations[userProfile.skinType][userProfile.routineLevel] && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <CheckCircle2 className="text-green-500" />
                      Recommended Products for {userProfile.routineLevel} Routine
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {productRecommendations[userProfile.skinType][userProfile.routineLevel].map((product, idx) => (
                        <Card key={idx}>
                          <CardContent className="pt-6">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="font-medium">Category:</span> {product.category}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowResults(false);
                    setStep(1);
                    setUserProfile({ skinType: '', concerns: [], allergies: [], routineLevel: '' });
                  }}
                  className="w-full py-4 border-2 border-gray-300 rounded-2xl hover:border-gray-500"
                >
                  Start Over
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkincareRecommendation;
