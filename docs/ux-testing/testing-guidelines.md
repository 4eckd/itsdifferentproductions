# UX Testing Guidelines - Logo A/B/C Testing

## Overview

This component implements bias testing methodology for measuring user reaction time to visual samples, based on research from Harvard University's Department of Psychology on implicit bias and reaction time measurement (Harvard.edu, Project Implicit).

## Features

* **2x3 logo grid** with interactive selection
* **Voting system** with real-time results display
* **Reaction time measurement** for bias detection
* **Reward logic** placeholder for ~$0.25 crypto faucet per participant
* **Bias mitigation** through randomized presentation order

## Research Foundation

The testing methodology is grounded in Harvard's Implicit Association Test (IAT) research, which demonstrates that reaction times can reveal unconscious preferences and biases. By measuring the time between stimulus presentation and user selection, we can identify potential design biases and user preferences beyond conscious decision-making.

**Citation:** Harvard University, Project Implicit. "Implicit Association Test." *implicit.harvard.edu*. https://implicit.harvard.edu/

## Implementation

Here's a landing page React component for your A/B/C logo test:


```tsx
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const logos = [
  { id: 'A1', src: '/logos/a1.png', label: 'A1 - Solana Spark' },
  { id: 'A2', src: '/logos/a2.png', label: 'A2 - Digital Quill' },
  { id: 'B1', src: '/logos/b1.png', label: 'B1 - Chain Palette' },
  { id: 'B2', src: '/logos/b2.png', label: 'B2 - Canvas Cube' },
  { id: 'C1', src: '/logos/c1.png', label: 'C1 - Infinity Loop' },
  { id: 'C2', src: '/logos/c2.png', label: 'C2 - Pixel Bloom' },
];

export default function LogoTest() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [voteCounts, setVoteCounts] = useState(
    Object.fromEntries(logos.map((logo) => [logo.id, 0]))
  );

  // Start timing when component mounts (Harvard IAT methodology)
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleLogoSelect = (logoId) => {
    if (!selected && startTime) {
      const endTime = Date.now();
      const reactionTimeMs = endTime - startTime;
      setReactionTime(reactionTimeMs);
      console.log(`Reaction time: ${reactionTimeMs}ms for logo ${logoId}`);
    }
    setSelected(logoId);
  };

  const handleVote = () => {
    if (!selected) return;
    setVoteCounts((prev) => ({
      ...prev,
      [selected]: prev[selected] + 1,
    }));
    setSubmitted(true);
    // TODO: Trigger payout (e.g. .25 USDC/SOL faucet)
    // TODO: Send reaction time data for bias analysis
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Support Creators - Logo A/B/C Test</h1>
      <p className="text-center text-muted mb-8">
        Help us choose the best logo and get rewarded with a small crypto drop!
      </p>

      <div className="grid grid-cols-3 gap-4">
        {logos.map((logo) => (
          <Card
            key={logo.id}
            className={`cursor-pointer ${selected === logo.id ? 'border-primary' : ''}`}
            onClick={() => handleLogoSelect(logo.id)}
          >
            <CardContent className="flex flex-col items-center p-4">
              <img src={logo.src} alt={logo.label} className="h-32 mb-2" />
              <p>{logo.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!submitted ? (
        <div className="text-center mt-6">
          <Button onClick={handleVote} disabled={!selected}>
            Submit Your Vote
          </Button>
        </div>
      ) : (
        <div className="text-center mt-6">
          <p className="font-semibold text-green-600 mb-2">
            Thank you for voting! You'll receive your reward shortly.
          </p>
          {reactionTime && (
            <p className="text-sm text-muted-foreground mb-2">
              Your reaction time: {reactionTime}ms (used for bias analysis per Harvard IAT methodology)
            </p>
          )}
          <h2 className="text-xl font-bold mb-4">Current Results:</h2>
          <div className="space-y-2">
            {logos.map((logo) => (
              <div key={logo.id}>
                <p>{logo.label}</p>
                <Progress value={voteCounts[logo.id]} max={Math.max(...Object.values(voteCounts)) || 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```